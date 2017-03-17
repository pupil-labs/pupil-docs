+++
date = "2017-01-20T11:21:30+07:00"
section_weight = 4
page_weight = 2.1
+++

## Message Documentation

`v0.8` of the Pupil software introduces a consistent naming scheme for message topics. They are used to publish and subscribe to the [`IPC Backbone`](#ipc). Pre-defined message topics are `pupil`, `gaze`, `notify`, `delayed_notify`, `logging`. Notifications sent with the `notify_all()` function of the `Plugin` class will be published automatically as `notify.<notification subject>`.

**Message Reactor and Emitter Documentation**

From version `v0.8` on, every actor who either reacts to or emits messages is supposed to document its behaviour. Therefore every actor should react to `notify.meta.should_doc` by emitting a message with the topic `notify.meta.doc`. The answer's payload should be a serialized dictionary with the following format:

```
{
  'subject':'meta.doc',
  'actor': <actor name>,
  'doc': <string containing documentation>
}
```

Plugins use notifications as primary communication channel to the IPC Backbone. This makes plugins natural actors in the Pupil message scheme. To simplify the above mentioned documentation behaviour, plugins will only have to add an [docstring](https://www.python.org/dev/peps/pep-0257/) to their `on_notify()` method. It should include an list of messages to which the plugin reacts and those which the plugin emits itself. The docstring should follow [Google docstring style](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html). The main process will automatically generate messages in the format from above using the plugin's class name as `actor` and the `on_notify()` docstring as content for the `doc` key.

**Notification Overview**

You can use the following script to get an overview over the notification handling of the currently running actors:

```python
import zmq, msgpack
from zmq_tools import Msg_Receiver
ctx = zmq.Context()
url = 'tcp://localhost'

# open Pupil Remote socket
requester = ctx.socket(zmq.REQ)
requester.connect('%s:%s'%(url,50020))
requester.send('SUB_PORT')
ipc_sub_port = requester.recv()

# setup message receiver
sub_url = '%s:%s'%(url,ipc_sub_port)
receiver = Msg_Receiver(ctx,sub_url,topics=('notify.meta.doc',))

# construct message
topic = 'notify.meta.should_doc'
payload = msgpack.dumps({'subject':'meta.should_doc'})
requester.send_multipart([topic,payload])

# wait and print responses
while True:
    topic, payload = receiver.recv()
    actor = payload.get('actor')
    doc = payload.get('doc')
    print '%s: %s'%(actor,doc)
```

> Example output for `v0.8`:

```
launcher: Starts eye processes. Hosts the IPC Backbone and Logging functions.

    Reacts to notifications:
       ``launcher_process.should_stop``: Stops the launcher process
       ``eye_process.should_start``: Starts the eye process
    
eye0: reads eye video and detects the pupil.

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
    Can run various plug-ins.

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

