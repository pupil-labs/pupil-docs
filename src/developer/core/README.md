# Core

If you're a first time visitor, we would highly recommend that you open another tab with the Pupil Core source code. 

Pupil Core source code is available on [Github](https://github.com/pupil-labs/pupil).

<!-- this is a horizontal divider -->
<v-divider></v-divider>


## Setup

Follow the setup instructions for your OS on the Pupil Core [Github repo](https://github.com/pupil-labs/pupil)

## Overview
Overview of language, code structure, and general conventions

### Language
Pupil is written in `Python 3`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though [cython](http://cython.org/). Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's *quick and easy* to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

### Process Structure
When Pupil Capture starts, in default settings two processes are spawned:

**[Eye](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/eye.py)** and **[World](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/world.py)**. Both processes grab image frames from a video capture stream but they have very different tasks.

### Eye Process
The eye process only has one purpose - to detect the pupil and broadcast its position. The process breakdown looks like this:

* Grabs eye camera images from eye camera video stream
* Find the pupil position in the image
* Broadcast/stream the detected pupil position.

<aside class="notice">
Note - Pupil position refers to the position of the pupil in the eye camera space. This is different from gaze position which is what we call the mapped pupil positions in the world camera space.
</aside>

### World Process
This is the workhorse.

* Grabs the world camera images from the world camera video stream
* Receives pupil positions from the eye process
* Performs calibration mapping from pupil positions to gaze positions
* Loads plugins - to detect fixations, track surfaces, and more...
* Records video and data.
Most, and preferably all coordination and control happens within the World process.

### Pupil Datum Format

The pupil detector, run by the Eye process are required to return a result in the form of a Python dictionary with *at least* the following content:

```python
    result = {}
    result['timestamp'] = frame.timestamp
    result['norm_pos'] = (x,y) # pupil center in normalized coordinates
    result['confidence'] = # a value between 1 (very certain) and 0 (not certain, nothing found)
    result['whatever_else_you_want'] = # you can add other things to this dict

    # if no pupil was detected
    result = {}
    result['timestamp'] = frame.timestamp
    result['confidence'] = 0
```

This dictionary is sent on the IPC and read by gaze mapping plugins in the world process. Mapping from pupil position to gaze position happens here. The mapping plugin is initialized by a calibration plugin. The [3D pupil detector](#pupil-detection) extends the 2D pupil datum with additional information. Below you can see the Python representation of a pupil and a gaze datum.

```python
{  # pupil datum
    'topic': 'pupil',
    'method': '3d c++',
    'norm_pos': [0.5, 0.5],  # norm space, [0, 1]
    'diameter': 0.0,  # 2D image space, unit: pixel
    'timestamp': 535741.715303987,  # time, unit: seconds
    'confidence': 0.0,  # [0, 1]

    # 2D ellipse of the pupil in image coordinates
    'ellipse': {  # image space, unit: pixel
        'angle': 90.0,  # unit: degrees
        'center': [320.0, 240.0],
        'axes': [0.0, 0.0]},
    'id': 0,  # eye id, 0 or 1

    # 3D model data
    'model_birth_timestamp': -1.0,  # -1 means that the model is building up and has not finished fitting
    'model_confidence': 0.0,
    'model_id': 1

    # pupil polar coordinates on 3D eye model. The model assumes a fixed
    # eye ball size. Therefore there is no `radius` key
    'theta': 0,
    'phi': 0,

    # 3D pupil ellipse
    'circle_3d': {  # 3D space, unit: mm
        'normal': [0.0, -0.0, 0.0],
        'radius': 0.0,
        'center': [0.0, -0.0, 0.0]},
    'diameter_3d': 0.0,  # 3D space, unit: mm

    # 3D eye ball sphere
    'sphere': {  # 3D space, unit: mm
        'radius': 0.0,
        'center': [0.0, -0.0, 0.0]},
    'projected_sphere': {  # image space, unit: pixel
        'angle': 90.0,
        'center': [0, 0],
        'axes': [0, 0]}}
```

Gaza data is based on one (monocular) or two (binocular) pupil positions. The gaze mapper is automatically setup after calibration and maps pupil positions into world camera coordinate system. The pupil data on which the gaze datum is based on can be accessed using the `base_data` key.

```python
 {  # gaze datum
    'topic': 'gaze',
    'confidence': 1.0,  # [0, 1]
    'norm_pos': [0.5238293689178297, 0.5811187961748036],  # norm space, [0, 1]
    'timestamp': 536522.568094512,  # time, unit: seconds

    # 3D space, unit: mm
    'gaze_normal_3d': [-0.03966349641933964, 0.007685562866422135, 0.9991835362811073],
    'eye_center_3d': [20.713998951917564, -22.466222119962115, 11.201474469783548],
    'gaze_point_3d': [0.8822507422478054, -18.62344068675104, 510.7932426103372],
    'base_data': [<pupil datum>]}  # list of pupil data that was used to calculate the gaze
```

### Timing & Data Conventions
Pupil Capture is designed to work with multiple captures that free-run at different frame rates that may not be in sync. World and eye images are timestamped and any resulting artifacts (detected pupil, markers, etc) inherit the source timestamp. Any correlation of these data streams is the responsibility of the functional part that needs the data to be correlated (e.g. calibration, visualization, analyses).

For example: The pupil capture data format records the world video frames with their respective timestamps. Independent of this, the recorder also saves the detected gaze and pupil positions at their frame rate and with their timestamps. For more detail see [Data Format](#data-format).

<!-- this is a horizontal divider -->
<v-divider></v-divider>

## Network API


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

Example output for `v0.8`:

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

### Pupil Remote

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


<!-- this is a horizontal divider -->
<v-divider></v-divider>

## Recording Format

### Required Files

```csv
key,value
Recording Name,2018_07_19
Start Date,19.07.2018
Start Time,14:56:21
Start Time (System),1532004981.666572
Start Time (Synced),701730.897108953
Duration Time,00:00:13
World Camera Frames,402
World Camera Resolution,1280x720
Capture Software Version,1.7.159
Data Format Version,1.8
System Info,"User: name, Platform: Linux, ..."
```

Each recording requires three files:
1. An `info.csv` file that includes two columns -- `key` and `value`. (See left for example)
2. At least one video file and its corresponding timestamp file. See the [*Video Files*](#video-files) section below for details.

A minimum requirement of two key, value pairs are required in the `info.csv` file.
1. `Recording Name,<name>`
2. `Data Format Version,<version>`

### Data Files

#### Timestamp Files
Timestamp files must follow this strict naming convention:
Given that a data file is named `<name>.<ext>` then its timestamps file has to be named `<name>_timestamps.npy`.

Timestamp files are saved in the [NPY binary format](https://docs.scipy.org/doc/numpy/neps/npy-format.html). You can use [`numpy.load()`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.load.html#numpy.load) to access the timestamps in Python.

A datum and its timestamp have the same index within their respective files, i.e. the `i`th timestamp in `world_timestamps.npy` belongs to the `i`th video frame in `world.mp4`.

#### Video Files
Video files are only recognized if they comply with the following constraints:

Allowed video file extentions are:

- `.mp4`
- `.mkv`
- `.avi`
- `.h264`
- `.mjpeg`

Allowed video file names are:

- `world`: Scene video
- `eye0`: Right eye video
- `eye1`: Left eye video

The video files should look like:

- `world.mp4`, `eye0.mjpeg`, `eye1.mjpeg`

We also support multiple parts of video files as input. For instance:

- `world.mp4`, `world_001.mp4`
- `eye0.mjpeg`, `eye0_001.mjpeg`

And their corresponding timestamp files should follow the pattern:

- `world_timestamps.npy`, `world_001_timestamps.npy`

### Audio File
An audio file is only recognized in Pupil Player's playback plugin if the file is named `audio.mp4`.

### `pldata` Files
These files contain a sequence of independently msgpack-encoded messages. Each message consists of two frames:
1. frame: The payload's topic as a string, e.g. `"pupil.0"`
2. frame: The payload, e.g. a pupil datum, encoded as msgpack

For clarification: The second frame is encoded twice!

Pupil Player decodes the messages into [`file_methods.Serialized_Dict`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L209)s. Each `Serialized_Dict` instance holds the serialized second frame and is responsible for decoding it on demand. The class is designed such that there is a maximum number of decoded frames at the same time. This prevents Pupil Player from using excessive amounts of memory.

You can use [`file_methods.PLData_Writer`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L138) and [`file_methods.load_pldata_file()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L111) to read and write `pldata` files.

### Other Files
Files without file extention, e.g. the deprecated `pupil_data` file, and files with a `.meta` extention are msgpack-encoded dictionaries. They can be read and written using [`file_methods.load_object()` and `file_methods.save_object()`](https://github.com/pupil-labs/pupil/blob/315188dcfba9bef02a5b1d9a3770929d7510ae2f/pupil_src/shared_modules/file_methods.py#L57-L87) and do *not* have a corresponding timestamps file.

<!-- this is a horizontal divider -->
<v-divider></v-divider>

## Plugin API

