---
title = "usb bandwidth sync"
date = "2017-01-20T11:34:49+07:00"
section_weight = 4
page_weight = 6
---

## USB Bandwidth And Synchronization

### USB Bandwidth limits and ways to make it work regardless
The Pupil headset uses 2-3 cameras that are electrically- and firmware wise identical (except for the name in the usb descriptor). Our Pupil camera can supply frames in various resolutions and rates uncompressed (YUV) and compressed (MJPEG). When looking at uncompressed data even a single camera can saturate a high speed USB bus. This is why we always use MJPEG compression: We can squeeze the data of 3 cameras through one USB bus because the image data is compressed  by a factor of ~10.

### JPEG size estimation and custom video backends
However, the actual size of each image depends on the complexity of the content  (JPEGs of images with more features will be bigger) and implementation details of the camera firmware. Because the cameras use isochronous usb transfers, we need to allocate bandwidth during stream initialization. Here we need to make an estimate on how much bandwidth we believe the camera will require. If we are too conservative we require more bandwidth for 3 cameras than is available and initialization will fail. If we allocate to little, we risk that image transport will fail during capture. According to the UVC specs the amount of bandwidth that is required must be read from the camera usb descriptor and usually this estimate is super conservative. This is why with the normal drivers you can never run more that one camera at decent resolutions on a single usb bus.

> With our version of libuvc and pyuvc we ignore the cameras request and estimate the bandwidth ourselves like this:

```c
//the proper way: ask the camera
config_bytes_per_packet = strmh->cur_ctrl.dwMaxPayloadTransferSize;

// our way: estimate it:
size_t bandwidth = frame_desc->wWidth * frame_desc->wHeight / 8 * bandwidth_factor; //the last one is bpp default 4 but we use if for compression, 2 is save, 1.5 is needed to run 3 high speed cameras. on one bus.
bandwidth *= 10000000 / strmh->cur_ctrl.dwFrameInterval + 1;
bandwidth /= 1000; //unit
bandwidth /= 8; // 8 high speed usb microframes per ms
bandwidth += 12; //header size
config_bytes_per_packet = bandwidth;
```

The scale factor bandwidth_factor is settable through the api.

We have tested these and found that we can run 3 pupil camera at 720p@60fps+2x480p@120fps on our Mac and Linux machines. If you play with the resolutions and frame rates in pupil capture you may hit a combination where the total bandwidth requirements cannot be met, thus the crash (I assume).

<aside class="notice">
Note - You may have other consumers on the same USB bus already so your milage may vary depending on your machine and selected usb plug on that machine.
</aside>

### Use more BUS
If you want to not be limited by the bandwidth of a single usb bus, you can mod the hardware and expose every camera directly. Just make sure that you also have three free USB controllers (not plugs) on your PC.

### Multi Camera Synchronization
Each camera we use is a free running capture device. Additionally each camera runs in a separate process. Instead of frame-locking the camera through special hardware we acquire timestamps for each frame. These timestamps are then used to correlate data from each camera in time and match frames based on closest proximity.

Data from each eye camera is sent via IPC to the world process. Since this involves three separate processes it can happen that data from one camera arrives earlier that another. However for each camera the frames will be ordered and timestamps are monotonically increasing. In the main process we match the available data timewise when we need. In Pupil Player we can do matching after the fact to work with perfectly sorted data from all three cameras. If you require the data to be matched over being recent I would recommend collecting data in the queue for a few more frames in world.py before dispatching them in the events dict. (I ll actually do some tests on this subject soon.)

### A note on synchronization and rolling shutters
While synchronization through hardware is preferable, its implementation would come at added hardware cost.
The benefits of that become questionable at 120fps. At this rate the frame interval is about 8ms which very close to the exposure time of the eye cameras. Since our cameras use a rolling shutter the image is actually taken continuously and the time of exposure changes based on the pixel position on the sensor. You can think of the camera image stream as a scanning sensor readout with data packed into frames and timestamped with the time of the first pixel readout. If we then match frames from two or more sensors we can assume that the pixels across two camera are generally no further apart in time than the first and last pixel of one frame from a single camera.
