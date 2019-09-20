# Pupil Service



Pupil Service is like Pupil Capture except it does not have a world video feed or GUI. It is intended to be used with VR and AR eye tracking setups.

Pupil Service is designed to run in the background and to be controlled via network commands only. The service process has no GUI. The tools introduced in the [hmd-eyes project](https://github.com/pupil-labs/hmd-eyes) are made to work with Pupil Service and Pupil Capture alike.

## Talking to Pupil Service
Code examples below demonstrate how to control Pupil Service over the network.

```
Starting and stopping Pupil Service:
```

```python
import zmq, msgpack, time
ctx = zmq.Context()

#create a zmq REQ socket to talk to Pupil Service/Capture
req = ctx.socket(zmq.REQ)
req.connect('tcp://localhost:50020')

#convenience functions
def send_recv_notification(n):
    # REQ REP requirese lock step communication with multipart msg (topic,msgpack_encoded dict)
    req.send_multipart(('notify.%s'%n['subject'], msgpack.dumps(n)))
    return req.recv()

def get_pupil_timestamp():
    req.send('t') #see Pupil Remote Plugin for details
    return float(req.recv())

# set start eye windows
n = {'subject':'eye_process.should_start.0','eye_id':0, 'args':{}}
print(send_recv_notification(n))
n = {'subject':'eye_process.should_start.1','eye_id':1, 'args':{}}
print(send_recv_notification(n))
time.sleep(2)


# set calibration method to hmd calibration
n = {'subject':'start_plugin','name':'HMD_Calibration', 'args':{}}
print(send_recv_notification(n))


time.sleep(2)
# set calibration method to hmd calibration
n = {'subject':'service_process.should_stop'}
print(send_recv_notification(n))
```

## Notifications
The code demonstrates how you can listen to all notification from Pupil Service. This requires a little helper script called [zmq_tools.py](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/zmq_tools.py).


```python
from zmq_tools import *

ctx = zmq.Context()
requester = ctx.socket(zmq.REQ)
requester.connect('tcp://localhost:50020') #change ip if using remote machine

requester.send('SUB_PORT')
ipc_sub_port = requester.recv()
monitor = Msg_Receiver(ctx,'tcp://localhost:%s'%ipc_sub_port,topics=('notify.',)) #change ip if using remote machine

while True:
    print(monitor.recv())
```

## Clients
An example client for Unity3d can be found [here](https://github.com/pupil-labs/hmd-eyes/releases/latest)