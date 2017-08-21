+++
title = "realsense"
section_weight = 4
page_weight = 1.99
+++

# Intel RealSense 3D

<aside class="notice">
This is a developer feature. ``
</aside>

## RealSense Dependencies

### `librealsense`

All Intel RealSense cameras require [`librealsense`](https://github.com/IntelRealSense/librealsense/) to be installed. Please follow the [install instructions](https://github.com/IntelRealSense/librealsense/#table-of-contents) for your respective operating system.

### `pyrealsense`

[`pyrealsense`](https://github.com/toinsson/pyrealsense) provides Python bindings for [`librealsense`](#librealsense). Run the following command in your terminal to install it.

```
pip3 install  git+https://github.com/toinsson/pyrealsense
```

## Usage

Select `RealSense 3D` in the Capture Selection menu and activate your RealSense camera. Afterwards you should see the colored video stream of the selected camera.

Pupil Capture accesses both streams, color and depth, at all time but only previews one. Enable the `Preview Depth` option to see the normalized depth stream.

The `Record Depth Stream` option (enabled by default) will save the depth stream during a recording session to the file `depth.mp4` within your recording folder.
