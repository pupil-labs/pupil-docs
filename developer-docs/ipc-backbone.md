+++
date = "2017-01-20T11:27:25+07:00"
title = "ipc backbone"
section_weight = 4
page_weight = 2
+++

## Interprocess and Network Communication

This page outlines the way `Pupil Capture` and `Pupil Service` communicate via a message bus internally and how to read and write to this bus from another application on the same machine or on a remote machine.

### Networking
All networking in Pupil Capture and Service is based on the [ZeroMQ](http://zeromq.org/) network library.
The following socket types are most often used in our networking schemes:
- [REQ-REP](http://zguide.zeromq.org/php:chapter3#The-Request-Reply-Mechanisms), reliable one-to-one communication
- PUB-SUB, one-to-many communication

We highly recommend to read [Chapter 2 of the ZeroMQ guide](http://zguide.zeromq.org/php:chapter2) to get an intuition on the philosophy behind these socket types.

The Pupil apps use the [pyzmq](https://github.com/zeromq/pyzmq) module, a great Python ZeroMQ implementation.
For auto-discovery of other Pupil app instances in the local network, we use [Pyre](https://github.com/zeromq/pyre).

### The IPC Backbone
Pupil Capture/Service/Player use a PUB-SUB Proxy as their messaging bus. We call it the `IPC Backbone`. The IPC Backbone runs as a thread in the main process. It is basically a big message relay station. Actors can push messages into it and subscribe to other actors' messages. Therefore, it is the backbone of all communication from, to, and within Pupil apps.
<aside class="notice">
Note - The main process does not do any CPU heavy work. It only runs the proxy, launches other processes and does a few other light tasks.
</aside>

#### IPC Backbone used by Pupil Capture and Service
The IPC Backbone has a `SUB` and a `PUB` address. Both are bound to a random port on app launch and are known to all components of the app. All processes and threads within the app use the IPC Backbone to communicate.
 - Using a `ZMQ PUB` socket, other actors in the app connect to the `pub_port` of the Backbone and publish messages to the IPC Backbone. (For important low volume msgs a PUSH socket is also supported.)
 - Using a `ZMQ SUB` socket, other actors connect to the `sub_port` of the Backbone to subscribe to parts of the message stream.

Example: The eye process sends pupil data onto the IPC Backbone. The gaze mappers in the world process receive this data, generate gaze data and publish it on the IPC Backbone. World, Launcher, and Eye exchange control messages on the bus for coordination.

### Message Format
Currently all messages on the IPC Backbone are multipart messages containing two message frames:

 - `Frame 1` contains a string we call `topic`. Examples are : `pupil.0`, `logging.info`, `notify.recording.has_started`

 - `Frame 2` contains a [`msgpack`](https://msgpack.org/) encoded dictionary with `key`:`value` pairs. This is the actual message. We choose `msgpack` as the serializer due to its efficient format (45% smaller than `json`, 200% faster than `ujson`) and because encoders exist for almost every language.

#### Message Topics
Messages can have any topic chosen by the user. Below a list of message types used by the Pupil apps.

#### Pupil and Gaze Messages

Pupil data is sent from the eye0 and eye1 process with the topic `pupil.0` or `pupil.1`. Gaze mappers receive this data and publish messages with topic `gaze`. See the [Pupil Datum format](#pupil-datum-format) for example messages for the topics `pupil` and `gaze`.

#### Notification Message
Pupil uses special messages called `notifications` to coordinate all activities. Notifications are dictionaries with the required field `subject`. Subjects are grouped by categories `category.command_or_statement`. Example: `recording.should_stop`

```python
# message topic:
'notify.recording.should_start'
# message payload, a notification dict
{'subject':'recording.should_start', 'session_name':'my session'}
```

> The message topic construction in python:

```python
topic = 'notify'+'.'+notification['subject']
```

You should use the `notification` topic for coordination with the app. All notifications on the IPC Backbone are automatically made available to all plugins in their `on_notify` callback and used in all Pupil apps.

In stark contrast to gaze and pupil, the notify topic should not be used at high volume. If you find that you need to write more that 10 messages a second, it is probably not a notification but another kind of data, make a custom topic instead.

```python
import zmq
import msgpack

topic = 'your_custom_topic'
payload = {'topic': topic}

# create and connect PUB socket to IPC
pub_socket = zmq.Socket(zmq.Context(), zmq.PUB)
pub_socket.connect(ipc_pub_url)

# send payload using custom topic
socket.send_string(topic, flags=zmq.SNDMORE)
socket.send(msgpack.dumps(payload, use_bin_type=True))
```

#### Log Messages

Pupil sends all log messages onto the IPC.

The topic is `logging.log_level_name` (debug,info,warning,error,...). The message is a dictionary that contains all attributes of the python `logging.record` instance.

```python
# message topic:
'logging.warning'
# message payload, logging record attributes as dict:
{'levelname': 'WARNING', 'msg': 'Process started.', 'threadName': 'MainThread', 'name': 'eye', 'thread': 140735165432592L, 'created': 1465210820.609704, 'process': 14239, 'processName': 'eye0', 'args': [], 'module': 'eye', 'filename': 'eye.py', 'levelno': 30, 'msecs': 609.7040176392, 'pathname': '/Users/mkassner/Pupil/pupil_code/pupil_src/capture/eye.py', 'lineno': 299, 'exc_text': None, 'exc_info': None, 'funcName': 'eye', 'relativeCreated': 4107.3870658875})
```

### Message Documentation

Pupil software uses introduces a consistent naming scheme for message topics. They are used to publish and subscribe to the [`IPC Backbone`](#the-ipc-backbone). Pre-defined message topics are `pupil`, `gaze`, `notify`, `delayed_notify`, `logging`. Notifications sent with the `notify_all()` function of the `Plugin` class will be published automatically as `notify.<notification subject>`.

#### Message Reactor and Emitter Documentation

Every actor who either reacts to or emits messages is supposed to document its behavior. Therefore every actor should react to `notify.meta.should_doc` by emitting a message with the topic `notify.meta.doc`. The answer's payload should be a serialized dictionary with the following format:

```
{
  'subject':'meta.doc',
  'actor': <actor name>,
  'doc': <string containing documentation>
}
```

Plugins use notifications as their primary communication channel to the IPC Backbone. This makes plugins natural actors in the Pupil message scheme. To simplify the above mentioned documentation behavior, plugins will only have to add a [docstring](https://www.python.org/dev/peps/pep-0257/) to their `on_notify()` method. It should include a list of messages to which the plugin reacts and of those which the plugin emits itself. The docstring should follow [Google docstring style](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html). The main process will automatically generate messages in the format from above using the plugin's class name as `actor` and the `on_notify()` docstring as content for the `doc` key.

#### Notification Overview

You can use the following script to get an overview over the notification handling of the currently running actors:

```python
import zmq, msgpack
from zmq_tools import Msg_Receiver
ctx = zmq.Context()
ip = 'localhost' #If you talk to a different machine use its IP.
port = 50020 #The port defaults to 50020 but can be set in the GUI of Pupil Capture.

# open Pupil Remote socket
requester = ctx.socket(zmq.REQ)
requester.connect('tcp://%s:%s'%(ip,port))
requester.send_string('SUB_PORT')
ipc_sub_port = requester.recv_string()

# setup message receiver
sub_url = 'tcp://%s:%s'%(ip,ipc_sub_port)
receiver = Msg_Receiver(ctx, sub_url, topics=('notify.meta.doc',))

# construct message
topic = 'notify.meta.should_doc'
payload = msgpack.dumps({'subject':'meta.should_doc'})
requester.send_string(topic, flags=zmq.SNDMORE)
requester.send(payload)
requester.recv_string()

# wait and print responses
while True:
    # receiver is a Msg_Receiver, that returns a topic/payload tuple on recv()
    topic, payload = receiver.recv()
    actor = payload.get('actor')
    doc = payload.get('doc')
    print('%s: %s'%(actor,doc))
```

> Example output for `v0.8`:

```
launcher: Starts eye processes. Hosts the IPC Backbone and Logging functions.

    Reacts to notifications:
       ``launcher_process.should_stop``: Stops the launcher process
       ``eye_process.should_start``: Starts the eye process

eye0: Reads eye video and detects the pupil.

    Creates a window, gl context.
    Grabs images from a capture.
    Streams Pupil coordinates.

    Reacts to notifications:
       ``set_detection_mapping_mode``: Sets detection method
       ``eye_process.should_stop``: Stops the eye process
       ``recording.started``: Starts recording eye video
       ``recording.stopped``: Stops recording eye video

    Emits notifications:
        ``eye_process.started``: Eye process started
        ``eye_process.stopped``: Eye process stopped

    Emits data:
        ``pupil.<eye id>``: Pupil data for eye with id ``<eye id>``

capture: Reads world video and runs plugins.

    Creates a window, gl context.
    Grabs images from a capture.
    Maps pupil to gaze data
    Can run various plugins.

    Reacts to notifications:
        ``set_detection_mapping_mode``
        ``eye_process.started``
        ``start_plugin``

    Emits notifications:
        ``eye_process.should_start``
        ``eye_process.should_stop``
        ``set_detection_mapping_mode``
        ``world_process.started``
        ``world_process.stopped``
        ``recording.should_stop``: Emits on camera failure
        ``launcher_process.should_stop``

    Emits data:
        ``gaze``: Gaze data from current gaze mapping plugin.``
        ``*``: any other plugin generated data in the events that it not [dt,pupil,gaze].

Pupil_Remote: send simple string messages to control application functions.

        Emits notifications:
            ``recording.should_start``
            ``recording.should_stop``
            ``calibration.should_start``
            ``calibration.should_stop``
            Any other notification received though the reqrepl port.

Screen_Marker_Calibration: Handles calibration notifications

        Reacts to notifications:
           ``calibration.should_start``: Starts the calibration procedure
           ``calibration.should_stop``: Stops the calibration procedure

        Emits notifications:
            ``calibration.started``: Calibration procedure started
            ``calibration.stopped``: Calibration procedure stopped
            ``calibration.failed``: Calibration failed
            ``calibration.successful``: Calibration succeeded

        Args:
            notification (dictionary): Notification dictionary

Recorder: Handles recorder notifications

        Reacts to notifications:
            ``recording.should_start``: Starts a new recording session
            ``recording.should_stop``: Stops current recording session

        Emits notifications:
            ``recording.started``: New recording session started
            ``recording.stopped``: Current recording session stopped

        Args:
            notification (dictionary): Notification dictionary

```

### Pupil Remote {#ipc-pupil-remote}
<!-- Shorter heading such that it fits into the sidebar -->
If you want to tap into the IPC backbone you will not only need the IP address but also the session unique port. You can get these by talking to 'Pupil Remote':

```python
import zmq
ctx = zmq.Context()
# The requester talks to Pupil remote and receives the session unique IPC SUB PORT
requester = ctx.socket(zmq.REQ)
ip = 'localhost' #If you talk to a different machine use its IP.
port = 50020 #The port defaults to 50020 but can be set in the GUI of Pupil Capture.
requester.connect('tcp://%s:%s'%(ip,port))
requester.send_string('SUB_PORT')
sub_port = requester.recv_string()
```

Pupil Remote uses the fixed port `50020` and is the entry point to the IPC backbone for external applications.
It also exposes a simple string-based interface for basic interaction with the Pupil apps:
```
Send simple string messages to control Pupil Capture functions:
    'R' start recording with auto generated session name
    'R rec_name' start recording and name new session name: rec_name
    'r' stop recording
    'C' start currently selected calibration
    'c' stop currently selected calibration
    'T 1234.56' Timesync: make timestamps count form 1234.56 from now on.
    't' get pupil capture timestamp; returns a float as string.


    # IPC Backbone communication
    'PUB_PORT' return the current pub port of the IPC Backbone
    'SUB_PORT' return the current sub port of the IPC Backbone
```

#### Reading from the Backbone

Subscribe to desired topics and receive all relevant messages (i.e. messages whose topic prefix matches the subscription). Be aware that the IPC Backbone can carry a lot of data. Do not subscribe to the whole stream unless you know that your code can drink from a firehose. (If it can not, you become `the snail`, see Delivery Guarantees REQ-REP.)

```python
#...continued from above
subscriber = ctx.socket(zmq.SUB)
subscriber.connect('tcp://%s:%s'%(ip,sub_port))
subscriber.set(zmq.SUBSCRIBE, 'notify.') #receive all notification messages
subscriber.set(zmq.SUBSCRIBE, 'logging.error') #receive logging error messages
#subscriber.set(zmq.SUBSCRIBE, '') #receive everything (don't do this)
# you can setup multiple subscriber sockets
# Sockets can be polled or read in different threads.

# we need a serializer
import msgpack as serializer

while True:
    topic,payload = subscriber.recv_multipart()
    message = serializer.loads(payload)
    print topic,':',message
```

#### Writing to the Backbone from outside

You can send notifications to the IPC Backbone for everybody to read as well. Pupil Remote acts as an intermediary for reliable transport:

```python
# continued from above
import msgpack as serializer
notification = {'subject':'recording.should_start', 'session_name':'my session'}
topic = 'notify.' + notification['subject']
payload = serializer.dumps(notification)
requester.send_string(topic, flags=zmq.SNDMORE)
requester.send(payload)
print(requester.recv_string())
```

We say reliable transport because pupil remote will confirm every notification we send with 'Notification received'. When we get this message we have a guarantee that the notification is on the IPC Backbone.

If we listen to the backbone using our subscriber from above, we will see the message again because we have subscribed to all notifications.

#### Writing to the Backbone directly

If you want to write messages other than notifications onto the IPC backbone, you can publish to the bus directly. Because this uses a PUB socket, you should read up on Delivery Guarantees PUB-SUB below.

```python
# continued from above
from time import time, sleep

requester.send_string('PUB_PORT')
pub_port = requester.recv_string()
publisher = ctx.socket(zmq.PUB)
publisher.connect('tcp://%s:%s'%(ip, pub_port))
sleep(1) # see Async connect in the paragraphs below
notification = {'subject':'calibration.should_start'}
topic = 'notify.' + notification['subject']
payload = serializer.dumps(notification)
publisher.send_string(topic, flags=zmq.SNDMORE)
publisher.send(payload)
```

### A full example
A full example can be found in `shared_modules/zmq-tools.py`.

### Delivery guarantees ZMQ
ZMQ is a great abstraction for us. It is super fast, has a multitude of language bindings and solves a lot of the nitty-gritty networking problems we don't want to deal with. As our short description of ZMQ does not do ZMQ any justice, we recommend reading the [ZMQ guide](http://zguide.zeromq.org/page:all) if you have the time. Below are some insights from the guide that are relevant for our use cases.

 - Messages are guaranteed to be delivered whole or not at all.
 - Unlike bare TCP it is ok to connect before binding.
 - ZMQ will try to repair broken connections in the background for us.
 - It will deal with a lot of low level tcp handling so we don't have to.

#### Delivery Guarantees PUB-SUB
ZMQ PUB SUB will make no guarantees for delivery. Reasons for dropped messages are:

 - `Async connect`: PUB sockets drop messages before a connection has been made (connections are async in the background) and topics subscribed. *1
 - `The Late joiner`: SUB sockets will only receive messages that have been sent after they connect. *2
 - `The Snail`: If SUB sockets do not consume delivered messages fast enough they start dropping them. *3
 - `fast close`: A PUB socket may loose packages if you close it right after sending. *1

1. In Pupil we prevent this by using a `PUSH` socket as intermediary for notifications. See `shared_modules/zmq_tools.py`.

2. Caching all messages in the sender or proxy is not an option. This is not really considered a problem of the transport.

3. In Pupil we pay close attention to be fast enough or to subscribe only to low volume topics. Dropping messages in this case is by design. It is better than stalling data producers or running out of memory.

#### Delivery Guarantees REQ-REP
When writing to the Backbone via REQ-REP we will get confirmations/replies for every message sent. Since REPREQ requires lockstep communication that is always initiated from the actor connecting to Pupil Capture/Service. It does not suffer the above issues.

#### Delivery Guarantees in general
We use TCP in ZMQ, it is generally a reliable transport. The app communicates to the IPC Backbone via localhost loopback, this is *very* reliable. We have not been able to produce a dropped message for network reasons on localhost.

However, unreliable, congested networks (e.g. wifi with many actors) can cause problems when talking and listening to Pupil Capture/Service from a different machine. If using a unreliable network we will need to design our scripts and apps so that interfaces are able to deal with dropped messages.

### Latency
Latency is bound by the latency of the network. On the same machine we can use the loopback interface (localhost) and do a quick test to understand delay and jitter of Pupil Remote requests...

```python
# continued from above
ts = []
for x in range(100):
    sleep(0.003) #simulate spaced requests as in real world
    t = time()
    requester.send_string('t')
    requester.recv_string()
    ts.append(time()-t)
print(min(ts), sum(ts)/len(ts), max(ts))
>>>0.000266075134277 0.000597472190857 0.00339102745056
```

... and when talking directly to the IPC backbone and waiting for the same message to appear to the subscriber:


```python
# continued from above
monitor = Msg_Receiver(ctx, sub_url, topics=('notify.pingback_test',))
sleep(1.)

ts = []
for x in range(100):
    sleep(0.003)  #simulate spaced requests as in real world
    t = time()
    #notify is a method of the Msg_Dispatcher class in zmq_tools.py
    notification = {'subject':'pingback_test'}
    topic = 'notify.' + notification['subject']
    payload = serializer.dumps(notification)
    publisher.send_string(topic, flags=zmq.SNDMORE)
    publisher.send(payload)
    monitor.recv()
    ts.append(time()-t)
print(min(ts), sum(ts)/len(ts) , max(ts))
>>>0.000180959701538 0.000300960540771 0.000565052032471
```

#### Throughput
During a test we have run dual 120fps eye tracking with a dummy gaze mapper that turned every pupil datum into a gaze datum. This is effectively 480 messages/sec. The main process running the `IPC backbone proxi` showed a cpu load of `3%` on a MacBook Air (late 2012).

Artificially increasing the pupil messages by a factor 100 increases the message load to  24.000 pupil messages/sec. At this rate the gaze mapper cannot keep up but the `IPC backbone proxi` runs at only `38%` cpu load.

It appears ZMQ is indeed highly optimized for speed.

### Final remarks
You can send a message anywhere in the app. Don't send something that crashes anywhere.
