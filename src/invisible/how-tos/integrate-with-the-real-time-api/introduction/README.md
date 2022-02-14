# Introduction
For some applications it is critical to have access to eye tracking data in real-time. Imagine for example an application utilizing gaze-interaction to allow users to press a button using only their eyes.

In other cases it may be important to automatically start or stop a recording and save [events](/invisible/explainers/basic-concepts/#events). For example you might want to launch a screen-based experiment and have the recording start automatically when the stimulus presentation begins. Additionally, you might want to save the timestamps of when the subject interacted with the screen.

All of this is possible for developers using Pupil Invisible's real-time API. It allows you to stream gaze data and scene video to any device connected to the same local network. Further, you can control all devices remotely to start and stop recordings or save events.

If you are not a developer and simply need a tool to monitor and control all your devices in real-time, check out [Pupil Invisible Monitor](/invisible/how-tos/tools/monitor-your-data-collection-in-real-time).

We have created a Python client library for the API that makes it very easy to use. If you require access to the API from a different programming language, you will have to write your own client. Please see the documentation [here](https://pupil-labs-realtime-api.readthedocs.io/en/latest/index.html).

To install the client library execute the following command in a terminal:

```
pip install pupil_labs
```

### Using the Client Library
The client comes in two modes, `simple` and `async`. The simple mode is very easy to use and is the one we will focus on in this tutorial. 

The async mode is using Python's async.io in order to implement non-blocking asynchronous communication. The calls made using the simple mode are blocking. If you don't know what any of this means, that's okay! The simple mode suffices for most use-cases and you usually do not need to understand the differences!

The simple client is located in `pupil_labs.realtime_api.simple`. Using the `discover_one_device` method we can connect to a Pupil Invisible device connected to your local network. Make sure the Invisible Companion app is running! If no device can be found, please check [this section](/invisible/troubleshooting/#i-can-not-connect-to-devices-using-the-real-time-api) in our troubleshooting area! 


```python
# The two lines below are only needed to execute this code in a Jupyter Notebook
import nest_asyncio
nest_asyncio.apply()

from pupil_labs.realtime_api.simple import discover_one_device
device = discover_one_device(max_search_duration_seconds=10)
```

With the device connected, you can check various properties of the Companion device and the Pupil Invisible Glasses:


```python
print(f"Phone IP address: {device.phone_ip}")
print(f"Phone name: {device.phone_name}")
print(f"Battery level: {device.battery_level_percent}%")
print(f"Free storage: {device.memory_num_free_bytes / 1024**3:.1f} GB")
print(f"Serial number of connected glasses: {device.serial_number_glasses}")
```

    Phone IP address: 192.168.1.169
    Phone name: OnePlus8
    Battery level: 25%
    Free storage: 89.1 GB
    Serial number of connected glasses: None
    

### Remote Control of Pupil Invisible Devices
Use the `recording_start` and `recording_stop_and_save` methods to remotely start and stop recordings.


```python
import time

recording_id = device.recording_start()
print(f"Started recording with id {recording_id}")

time.sleep(5)

device.recording_stop_and_save()
```

    Started recording with id 2f99d9f9-f009-4015-97dd-eb253de443b0
    

While a recording is running, you can save [events](/invisible/explainers/basic-concepts/#events) using the `send_event` method. By default, the Pupil Invisible device receiving the event will assign assign a timestamp to it, using the time of arrival. Optionally, you can set a custom nanosecond timestamp for your event instead.


```python
device.recording_start()

print(device.send_event("test event 1"))

time.sleep(5)

# send event with current timestamp
print(device.send_event("test event 2", event_timestamp_unix_ns=time.time_ns()))

device.recording_stop_and_save()
```

    Event(name=None recording_id=None timestamp_unix_ns=1642599117043000000 datetime=2022-01-19 14:31:57.043000)
    Event(name=None recording_id=fd8c98ca-cd6c-4d3f-9a05-fbdb0ef42668 timestamp_unix_ns=1642599122555200500 datetime=2022-01-19 14:32:02.555201)
    

### Streaming Scene Video and Gaze Data
You can receive the current scene camera frame using the `receive_scene_video_frame` method. Additionally, this method returns the UTC timestamp of the frame in seconds. The image's color space is BGR.


```python
from datetime import datetime
import matplotlib.pyplot as plt
import cv2

scene_sample = device.receive_scene_video_frame()

dt = datetime.fromtimestamp(scene_sample.timestamp_unix_seconds)
print(f"This scene camera image was recorded at {dt}")

# matplotlib expects images to be in RGB rather than BGR.
# Thus we use OpenCv to convert color spaces.
scene_image_rgb = cv2.cvtColor(scene_sample.bgr_pixels, cv2.COLOR_BGR2RGB)
plt.imshow(scene_image_rgb)
```

    This scene camera image was recorded at 2022-01-19 16:08:55.194978
    




    <matplotlib.image.AxesImage at 0x1351cabf640>




    
![png](./output_10_2.png)
    


Analogously, you can receive gaze data using the `receive_gaze_datum` method, which returns a triple of x- and y-coordinate, and timestamp. The timestamp is again a UTC timestamp in seconds.


```python
gaze_sample = device.receive_gaze_datum()

dt = datetime.fromtimestamp(gaze_sample.timestamp_unix_seconds)
print(f"This gaze sample was recorded at {dt}")

plt.scatter(gaze_sample.x, gaze_sample.y, s=200, facecolors='none', edgecolors='r')
plt.xlim(0, 1088)
plt.ylim(1080, 0)
```

    This gaze sample was recorded at 2022-01-19 16:09:05.963011
    




    (1080.0, 0.0)




    
![png](./output_12_2.png)
    


If you tried to correlate the scene video and gaze data to e.g. make a gaze overlay visualization, you might find that there is small temporal misalignment if you simply use the most recent data.
This is because the gaze data is much smaller and is transferred more quickly. When plotting the most recent samples, the scene video would lag slightly behind.

To compensate for this you need to align the incoming data based on it's timestamps. The client library contains a method `receive_matched_scene_video_frame_and_gaze` to do all of this automatically. It returns the most recent pair of scene video and gaze data that matches temporally.


```python
scene_sample, gaze_sample = device.receive_matched_scene_video_frame_and_gaze()

dt_gaze = datetime.fromtimestamp(gaze_sample.timestamp_unix_seconds)
dt_scene = datetime.fromtimestamp(scene_sample.timestamp_unix_seconds)
print(f"This gaze sample was recorded at {dt_gaze}")
print(f"This scene video was recorded at {dt_scene}")
print(f"Temporal difference between both is {abs(gaze_sample.timestamp_unix_seconds - scene_sample.timestamp_unix_seconds) * 1000:.1f} ms")

scene_image_rgb = cv2.cvtColor(scene_sample.bgr_pixels, cv2.COLOR_BGR2RGB)
plt.imshow(scene_image_rgb)
plt.scatter(gaze_sample.x, gaze_sample.y, s=200, facecolors='none', edgecolors='r')
```

    This gaze sample was recorded at 2022-01-19 16:09:40.947967
    This scene video was recorded at 2022-01-19 16:09:40.938255
    Temporal difference between both is 9.7 ms
    




    <matplotlib.collections.PathCollection at 0x1351d1a0850>




    
![png](./output_14_2.png)
    


### Conclusion

Using the the simple mode of the real-time API client you can easily access scene video and gaze data in real-time as well as remote control your Pupil Invisible devices.

You can find the full API reference [here](/invisible/reference/real-time-api).

For an example implementation on how to use the real-time API in action, please see [Implement HCI Applications with Screen Tracking](/invisible/how-tos/applications/implement-hci-applications-with-screen-tracking) or [/invisible/how-tos/applications/track-your-experiment-progress-using-events]().

To learn more about the `async` mode of the client see [here](https://pupil-labs-realtime-api.readthedocs.io/en/latest/index.html).
