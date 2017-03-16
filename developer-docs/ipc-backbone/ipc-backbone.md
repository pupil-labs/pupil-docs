+++
date = "2017-01-20T11:27:25+07:00"
title = "ipc backbone"
section_weight = 4
page_weight = 10
+++

## Interprocess and Network Communication

This page outlines the way `Pupil Capture` and `Pupil Service` communicate via a message bus internally and how to read and write to this bus from another application on the same machine or on a remote machine.

### The IPC Backbone
Starting with `v0.8` `Pupil Capture` and a new App called `Pupil Service` use a [ZeroMQ](http://http://zeromq.org/) PUBSUB Proxy as its messaging bus. We call it the `IPC Backbone`. The IPC Backbone runs as a thread in the main process. 

<aside class="notice">
Note - The main process does not do any CPU heavy work. It only run the proxy, launches other processes and does a few other light tasks.
</aside>

**IPC Backbone used by Pupil Capture and Service**
The IPC Backbone has a `SUB` and a `PUB` address. Both are bound to a random port on app launch and known to all components of the app. All processes and threads within the app use the IPC backbone to communicate.
 - Using a `ZMQ PUB` socket other actors in the app connect to the `pub_port` of the Backbone and publish messages to the IPC Backbone. (For important low volume msgs a PUSH socket is also supported.)
 - Using a `ZMQ SUB` socket other actors connect to the `sub_port` of the Backbone to subscribe to parts of the message stream.

Example: The eye process sends pupil data onto the IPC Backbone. The gaze mappers in the world process receive this data, generate gaze data and publish it on the IPC Backbone. World, Launcher and Eye exchange control messages on the bus for coordination.

### Message Format
Currently all messages on the IPC Backbone are multipart messages containing two messages frames:

 - `Frame 1` contains a string we call `topic`. Examples are : `pupil.0`, `logging.info`, `notify.recording.has_started`

 - `Frame 2` contains a [`msgpack`](http://msgpack.org/) encoded dictionary with `key`:`value` pairs. This is the actual message. We choose `msgpack` as the serializer due to its efficient format (45% smaller than `json` 200% faster than `ujson`) and because encoders exist for almost every language.

**Message Topics**
Messages can have any topic chooses by the user. Below a a list of Message types used by Pupil Capture.

**Pupil and Gaze Messages**

Pupil data is sent from the eye0 and eye1 process with topic `pupil.0/1`. Gaze mappers receive this data and publish messages with topic `gaze`. Example `pupil` message: 

```python
# message topic:
'pupil.0'
# message payload, a pupil datum dict:
{'diameter': 92.4450351347, 'confidence': 0.9986412066, 'projected_sphere': {'axes': [400.5235138265, 400.5235138265], 'angle': 90.0, 'center': [240.3164804152, 243.842873636]}, 'model_id': 1, 'timestamp': 123067.177618013, 'model_confidence': 0.8049109973, 'model_birth_timestamp': 123011.36560298, 'id': 0, 'phi': -1.8997389857, 'sphere': {'radius': 12.0, 'center': [-4.7747620402, 0.230271043, 37.1513768514]}, 'diameter_3d': 3.8605282008, 'ellipse': {'axes': [75.475922102, 92.4450351347], 'angle': -21.7620924999, 'center': [115.0446652426, 288.3183483897]}, 'norm_pos': [0.17975728940000002, 0.3993367742], 'theta': 1.7221210994, 'circle_3d': {'radius': 1.9302641004, 'center': [-8.606972898, 2.0392458162, 25.9245442521], 'normal': [-0.3193509048, 0.1507478978, -0.9355693833000001]}, 'method': '3d c++'})
```

**Notification Message**

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

You should use the `notification` topic for coordination with the app. All notifications on the IPC Backbone are automatically made available to all plugins in their `on_notify` callback and used in all Pupil Apps.

In stark contrast to gaze and pupil, the notify topic should not be used at high volume. If you find that you need to write more that 10 messages a second, its probably not a notification but another kind of data, make a custom topic instead.

**Log Messages**

Pupil sends all log messages onto the IPC. 

The topic is `logging.log_level_name` (debug,info,warning,error,...). The message is a dictionary that contains all attributes of the python `logging.record` instance.

```python
# message topic:
'logging.warning' 
# message payload, logging record attributes as dict:
{'levelname': 'WARNING', 'msg': 'Process started.', 'threadName': 'MainThread', 'name': 'eye', 'thread': 140735165432592L, 'created': 1465210820.609704, 'process': 14239, 'processName': 'eye0', 'args': [], 'module': 'eye', 'filename': 'eye.py', 'levelno': 30, 'msecs': 609.7040176392, 'pathname': '/Users/mkassner/Pupil/pupil_code/pupil_src/capture/eye.py', 'lineno': 299, 'exc_text': None, 'exc_info': None, 'funcName': 'eye', 'relativeCreated': 4107.3870658875})
```

### Message Documentation
Read up on how to get documentation for all messages here: [Message-Documentation](#ipc-message-docs)

### Connecting to the Backbone via Pupil Remote
If you want to tap into the IPC backbone you will not only need the IP address but also the session unique port. You can get these by talking to 'Pupil Remote':

```python
import zmq
ctx = zmq.Context()
# The requester talks to Pupil remote and receives the session unique IPC SUB PORT
requester = ctx.socket(zmq.REQ)
ip = 'localhost' #If you talk to a different machine use its IP.
port = 50020 #The port defaults to 50020 but can be set in the GUI of Pupil Capture.
requester.connect('tcp://%s:%s'%(ip,port)) 
requester.send('SUB_PORT')
sub_port = requester.recv()
```

**Reading from the Backbone**
Subscribe to desired topics and receive all relevant messages (Meaning messages who's topic prefix matches the subscription). Be aware that the IPC Backbone can carry a lot of data. Do not subscribe to the whole stream unless you know that your code can drink from a firehose. (If it can not, you become `the snail`, see Delivery Guarantees REQREP.)

```python 
#...continued from above
subscriber = ctx.socket(zmq.SUB)
subscriber.connect('tcp://%s:%s'%(ip,sub_port)) 
subscriber.set(zmq.SUBSCRIBE, 'notify.') #receive all notification messages
subscriber.set(zmq.SUBSCRIBE, 'logging.error') #receive logging error messages
#subscriber.set(zmq.SUBSCRIBE, '') #receive everything (don't do this)
# you can setup multiple subscriber sockets
# Sockets can be polled or read in different threads.

# we need a serialiser 
import msgpack as serializer

while True:
    topic,payload = subscriber.recv_multipart()
    message = serializer.loads(payload)
    print topic,':',message
```

**Writing to the Backbone from outside**
You can send notifications to the IPC Backbone for everybody to read as well. Pupil Remote acts as an intermediary for reliable transport:

```python
notification = {'subject':'recording.should_start', 'session_name':'my session'}
topic = 'notify.' + notification['subject']
payload = serializer.dumps(notification)
requester.send_multipart((topic,payload))
print requester.recv()
```

We say reliable transport because pupil remote will confirm every notification we send with 'Notification received'. When we get this message we have a guarantee that the notification is on the IPC Backbone.

If we listen to the backbone using our subscriber from above, we will see the message again because we had subscribed to all notifications.

Pupil remote has a few additional commands that are useful:

```python
#get the current Pupil time.
req.send('t')
current_pupil_time = float(req.recv())

#set the pupil timebase to 1000.
req.send('T 1000')
print req.recv() 
```

Pupil remote will only forward messages of the `notify` topic. If you need to send other topics see below.

**Writing to the Backbone directly**
If you want to write messages other than notifications onto the IPC backbone, you can publish to the bus directly. Because this uses a PUB socket, you should read up on Delivery Guarantees PUBSUB below.

```python
requester.send('PUB_PORT')
pub_port = requester.recv()
publisher = ctx.socket(zmq.SUB)
publisher.connect('tcp://%s:%s'%(ip,sub_port)) 
from time import sleep
sleep(1) # see Async connect in the paragraphs below
notification = {'subject':'calibration.should_start'}
topic = notification['subject']
payload = serializer.dumps(notification)
publisher.send_multipart((topic,payload))
```

### A full example
A full example can be found in `shared_modules/zmq-tools.py`.

### Delivery guarantees ZMQ
ZMQ is a great abstraction for us. Its super fast, has a multitude of language bindings and solves a lot of the nitty gritty networking problems we don't want to deal with. Our short description of ZMQ does not do ZMQ any justice, we recommend reading the [ZMQ guide](http://zguide.zeromq.org/page:all) if you have the time. Below are some insights from the guide that are relevant for our use cases.

 - Messages are guaranteed to be delivered whole or not at all.
 - Unlike bare TCP it is ok the connect before binding. 
 - ZMQ will try to repair broken connections in the background for us. 
 - It will deal with a lot of low level tcp handling so we don't have to.

**Delivery Guarantees PUBSUB**
ZMQ PUB SUB will make no guarantees for delivery. Reasons for dropped messages are:

 - `Async connect`: PUB sockets drop messages before are connection has been made (connections are async in the background) and topics subscribed. *1 
 - `The Late joiner`: SUB Sockets will only receive messages that have been sent after they connect. *2
 - `The Snail`: If SUB sockets do not consume delivered messages fast enough they start dropping them. *3
 - `fast close`: A PUB socket may loose packages if you close it right after sending. *1

1. In Pupil we prevent this by using a `PUSH` socket as intermediary for notifications. See `shared_modules/zmq_tools.py`.

2. Caching all massages in the sender or proxy is not an option. This is not really considered a problem of the transport.

3. In Pupil we pay close attention to be fast enough or to subscribe only to low volume topics. Dropping messages in this case is by design. It is better than stalling data producers or running out of memory.

**Delivery Guarantees REQREP**
When writing to the Backbone via REQREP we will get confirmations/replies for every message sent. Since REPREQ requires lockstep communication that is always initiated from the actor connecting to Pupil Capture/Service. It does not suffer the above issues. 

**Delivery Guarantees in general**
We use TCP in zmq, it is generally a reliable transport. The app communicates to the IPC Backbone via localhost loopback, this is *very* reliable. I have not been able to produce a dropped message for network reasons on localhost. 

However, unreliable, congested networks (wifi with many actors.) can cause problems when talking and listening to Pupil Capture/Service from a different machine. If using a unreliable network we will need to design our scripts and apps so that interfaces are able to deal with dropped messages.

### Latency
Latency is bound by the latency of the network. On the same machine we can use the loopback interface (localhost) and do a quick test to understand delay and jitter of Pupil Remote requests...

```python
for x in range(100):
    sleep(0.003) #simulate spaced requests as in real world
    t = time()
    requester.send('t')
    requester.recv()
    ts.append(time()-t)
print min(ts), sum(ts)/len(ts), max(ts) 
>>>0.000266075134277 0.000597472190857 0.00339102745056
```

... and when talking directly to the IPC backbone and waiting for the same message to appear to the subscriber:


```python
for x in range(100):
    sleep(0.003)  #simulate spaced requests as in real world
    t = time()
    publisher.notify({'subject':'pingback_test'}) #notify is a method of the Msg_Dispatcher class in zmq_tools.py
    monitor.recv()
    ts.append(time()-t)
print min(ts), sum(ts)/len(ts) , max(ts)
>>>0.000180959701538 0.000300960540771 0.000565052032471
```

**Throughput**
During a test we have run dual 120fps eye tracking with a dummy gaze mapper that turned every pupil datum into a gaze datum. This is effectively 480 messages/sec. The main process running the `IPC backbone proxi` showed a cpu load of `3%` on a MacBook Air (late 2012). 

Artificially increasing the pupil messages by a factor 100 increases the message load to  24.000 pupil messages/sec. At this rate the gaze mapper cannot keep up but the `IPC backbone proxi` runs at only `38%` cpu load.

It appears ZMQ is indeed highly optimized for speed. 

### Final remarks
You can send a message anywhere in the app. Don't send something that crashes anywhere.