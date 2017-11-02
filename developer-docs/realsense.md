+++
title = "realsense"
section_weight = 4
page_weight = 1.6
+++

## Intel RealSense 3D

<aside class="notice">
The 3d world camera is not available for Linux bundles. This is due to <a href="https://github.com/IntelRealSense/librealsense/blob/66e42069837ed6e0eb46351cc4aa2acca49a4728/doc/installation.md#video4linux-backend-preparation">"librealsense" requiring kernel patches for the "Video4Linux" backend</a>.
</aside>

### RealSense Dependencies

#### `librealsense`

All Intel RealSense cameras require [`librealsense`](https://github.com/pupil-labs/librealsense/) to be installed. Please follow the [install instructions](https://github.com/pupil-labs/librealsense/#table-of-contents) for your operating system.

#### `pyrealsense`

[`pyrealsense`](https://github.com/pupil-labs/pyrealsense) provides Python bindings for [`librealsense`](#librealsense). Run the following command in your terminal to install it.

```bash
pip3 install  git+https://github.com/pupil-labs/pyrealsense
```

### Usage

Select `RealSense 3D` in the Capture Selection menu and activate your RealSense camera. Afterwards you should see the colored video stream of the selected camera.

Pupil Capture accesses both streams, color and depth, at all times but only previews one at a time. Enable the `Preview Depth` option to see the normalized depth video stream.

The `Record Depth Stream` option (enabled by default) will save the depth stream during a recording session to the file `depth.mp4` within your recording folder.

By default, you can choose different resolutions for the color and depth streams. This is advantageous if you want to run both streams at full resolution. The Intel RealSense R200 has a maximum color resolution of `1920 x 1080` pixels and maximum depth resolution of `640 x 480` pixels. `librealsense` also provides the possibility to pixel-align color and depth streams. `Align Streams` enables this functionality. This is required if you want to infer from depth pixels to color pixels and vice versa.

The `Sensor Settings` menu lists all available device options. These may differ depending on your OS, installed `librealsense` version, and device firmware.


<aside class="faq">
Not all resolutions support all frame rates. Try different resolutions if your desired frame rate is not listed.
</aside>


#### Color Frames

Pupil Capture accesses the `YUVY` color stream of the RealSense camera. All color frames are accessible through the `events` object using the `frame` key within your plugin's `recent_events` method. See the [plugin guide](#plugin-guide) for details.

#### Depth Frames

Depth frame objects are accessible through the `events` object using the `depth_frame` key within your plugin's `recent_events` method. The orginal 16-bit grayscale image of the camera can be accessed using the `depth` attribute of the frame object. The `bgr` attribute provides a colored image that is calculated using [histogram equalization](https://en.wikipedia.org/wiki/Histogram_equalization). These colored images are previewed in Pupil Capture, stored during recordings, and referred to as "normalized depth stream" in the above section. The [`librealsense` examples](https://github.com/IntelRealSense/librealsense/tree/master/examples) use the same coloring method to visualize depth images.
