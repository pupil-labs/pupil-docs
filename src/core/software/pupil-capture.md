---
permalink: /core/software/pupil-capture
---

# Pupil Capture
Pupil Capture is the software used with your Pupil Core Headset. The software reads the video streams coming in from the world camera and the eye camera(s). Pupil Capture uses the video streams to detect your pupil, track your gaze, detect and track markers in your environment, record video and events, and stream data in realtime.

<div class="pb-4">
  <img src="../../media/core/icons/pc.png" style="display:flex;margin:0 auto;width:100px;">
</div>

## World Window
The World window is the main control center for Pupil Capture. It displays a live world camera video feed from your Pupil Core headset.

<div class="pb-4">
  <img src="../../media/core/imgs/capture-callout.jpg" style="display:flex;margin:0 auto;">
</div>

1. **Graphs**: This area contains performance graphs. By default the graphs `CPU`, `FPS`, and pupil algorithm detection confidence will be displayed. You can control graph settings with the System Graphs plugin.
1. **Hot keys**: This area contains clickable buttons for plugins.
1. **Menu**: This area contains settings and contextual information for each plugin.
1. **Sidebar**: This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below a horizontal separator.

## Capture Selection
By default Pupil Capture will use Local USB as the capture source. If you have a Pupil Core headset connected to your computer you will see videos displayed from your Pupil Core headset in the World and Eye windows.

If no headset is connected or Pupil Capture is unable to open capture devices it will fall back to Ghost capture and display a gray screen. Other options for capture source are described below.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/backend-manager.mp4" type="video/mp4">
</video>

- Ghost Capture - This is default gray screen that is displayed if no capture device is found.
- Test Image - A fake source that displays the current frame number, resolution, and size of the "fake" video being generated.
- Video File Source - select this option to use previously recorded videos for the capture selection.
- Pupil Mobile - select this option when using Pupil Capture with the Pupil Mobile Android application.
- Local USB - select this option if your Pupil Headset is connected to the machine running Pupil Capture. This is the default setting.
- RealSense 3D - select this option if you are using an Intel RealSense 3D camera as your scene camera. Read more in the [section on Intel RealSense Support on GitHub](https://github.com/pupil-labs/pupil#intel-realsense-3d-support).


After switching to a different capture source, you can click the `Start with default devices` button. This will automatically select the correct sensor and start capturing for corresponding world and eye windows. Or, you can manually select the capture source to use from the world and eye windows.

## Troubleshooting

### Windows

Videos do not appear in Pupil Capture. This could mean that drivers were not automatically installed when you run Pupil Capture as **administrator**. You should first try to run Pupil Capture as **administrator** (right click `pupil_capture.exe` > Run as administrator). If that does not work, follow the troubleshooting steps below:

1. In `Device Manager` (`System > Device Manager`)
1. `View > Show Hidden Devices`
1. Expand `libUSBK Usb Devices`, `Cameras`, and `Imaging Devices` categories.
1. For each **Pupil Cam** device (even hidden devices) click `Uninstall` and check the box agreeing to `Delete the driver software for this device` and press `OK`
1. Unplug Pupil headset (if plugged in) and plug back in.
1. Right click on `pupil_capture.exe` > Run as administrator. This should install drivers automatically.

Still having trouble? [Chat with us.](https://pupil-labs.com/chat "Pupil Labs chat on DiscordApp")

### Linux

If the cameras are listed as `unknown` and you are not able to access cameras in Pupil Capture. Please try the following:
1. Shut down Pupil Capture if it is still running.
1. Add your user to the `plugdev` group by executing the following command in the terminal:
```sh
sudo usermod -a -G plugdev $USER
```

## Pupil Detection
Pupil's algorithms automatically detect the participant's pupil. With the 3d detection and mapping mode, Pupil uses a 3d model of the eye(s) that constantly updates based on observations of the eye. This enables the system to compensate for movements of the headset - slippage. To build up an initial model, you can just look around your field of view.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/pd.mp4" type="video/mp4">
</video>

### Fine-tuning Pupil Detection
As a first step it is recommended to check the eye camera resolution as some parameters are resolution dependent.



### Pupil Detector 2D/3D

* `Pupil Min/Max` : Change to `General > Algorithm Mode`. The two red circles represent the min and max pupil size settings. The green circle visualizes the current apparent pupil size. Set the min and max values so the green circle (current pupil size) is within the min/max range for _all_ eye movements.
* `Intensity Range` : Defines the minimum "darkness" of a pixel to be considered as the pupil. The pixels considered for pupil detection are visualized in blue within the `Algorithm Mode`. Try to minimize the range so that the pupil is always fully covered while having as little leakage as possible outside of the pupil. Be aware that this is dependent on the brightness and therefore has a strong interaction with `UVC Source/Sensor Settings/Absolute Exposure Time`.

::: tip
<v-icon large color="info">info_outline</v-icon>
Keep in mind that pupil size values are defined in pixels and are therefore dependent on the resolution settings of your sensor.
:::

## Calibration
Pupil uses two cameras. One camera records a participant's eye movements - we call this the `eye camera`. Another camera records the subject's field of vision -we call this the `world camera`. In order to know what someone is looking at, we must find the parameters to a function that correlates these two streams of information.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/clb-hd.mp4" type="video/mp4">
</video>

### Calibration Process
Pupil Core headsets comes in a variety of configurations. Calibration can be conducted with a monocular or binocular eye camera setup.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/clb-mobo.mp4" type="video/mp4">
</video>

<div style="display:flex;" class="pb-4">
    <p style="flex-grow:1;display:flex;justify-content:center;">Monocular</p>
    <p style="flex-grow:1;display:flex;justify-content:center;">Binocualar</p>
</div>

### Before Every Calibration

Make sure that the users pupil is properly detected and tracked. Make sure that the world camera is in focus for the distance at which you want to calibrate, and that you can see the entire area you want to calibrate within the world cameras extents (FOV).

<div style="display:flex;" class="pb-4">
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/pupil-detect.jpg" style="width:300px;height:300px;">
        <p>Your Pupil is properly detected by the camera.</p>
    </div>
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/focus.jpg" style="width:300px;height:300px;">
        <p>Make sure the world camera is in focus.</p>
    </div>
</div>

### Calibration Methods
Before starting calibration, ensure that eye(s) are robustly detected and that the headset is comfortable for the participant.

#### Screen Marker Calibration
This is the default method, and a quick way to get started. It is best suited for close range eye-tracking in a narrow field of view.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/clb-s.mp4" type="video/mp4">
</video>

1. Select `Screen Marker Calibration`
1. Select your `Monitor` (if more than 1 monitor)
1. Toggle `Use fullscreen` to use the entire extents of your monitor (recommended). You can adjust the scale of the pattern for a larger or smaller calibration target.
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Follow the marker on the screen with your eyes. Try to keep your head still during calibration.
1. The calibration window will close when calibration is complete.

In the `Advanced` sub-menu you can set the `sample duration` - the number of frames to sample the eye and marker position. You can also set parameters that are used to debug and detect the circular marker on the screen.

#### Calibration Marker

If you're not going to be doing calibration on screen with the `Screen Marker Calibration` method, then you will need to download the Pupil's Circular Calibration Marker. This marker can be automatically detected by Pupil software in the world scene video.

In most use cases you will only need to use the `Pupil Calibration Marker`. The `Stop Marker` is used if you want to be able to conclude a calibration sequence by showing this marker.

::: tip
<v-icon large color="info">info_outline</v-icon>
Make sure to always use the **v0.4 marker design** for best detection performance!
:::

<div style="display:flex;" class="pb-4">
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/v0.4_calib_marker_02.jpg" style="width:300px;height:300px;">
        <p>Pupil Calibration Marker v0.4</p>
    </div>
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/v0.4_calib_marker_01.jpg" style="width:300px;height:300px;">
        <p>Pupil Calibration Stop Marker v0.4</p>
    </div>
</div>

<a :href="$withBase('/pdfs/v0.4_marker.pdf')" alt="Pupil Labs calibration marker v4.0" target="_blank" rel="noopener">Download Pupil Labs Calibration Marker v0.4</a> to print or display on smartphone/tablet screen.



#### Manual Marker Calibration

This method is done with an operator and a subject. It is suited for midrange distances and can accommodate a wide field of view. The operator will use a printed calibration marker like the one shown in the video.


<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/clb-man.mp4" type="video/mp4">
</video>


1. Select `Manual Marker Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button on the left hand side of the world window to start calibration.
1. Stand in front of the subject (the person wearing the Pupil headset) at the distance you would like to calibrate. (1.5-2m)
1. Ask the subject to follow the marker with their eyes and hold their head still.
1. Show the marker to the subject and hold the marker still. You will hear a "click" sound when data sampling starts, and one second later a "tick" sound when data sampling stops.
1. Move the marker to the next location and hold the marker still.
1. Repeat until you have covered the subject's field of view (generally about 9 points should suffice).
1. Show the 'stop marker' or press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.

You will notice that there are no standard controls, only an `Advanced` sub-menu to control detection parameters of the marker and to debug by showing edges of the detected marker in the world view.

::: tip
<v-icon large color="info">info_outline</v-icon>
When should I use the Pupil Calibration <strong>Stop</strong> Marker? - Use the <strong>stop</strong> marker to stop/end a calibration. You can also stop a calibration via the Pupil Capture GUI.</a>
:::



#### Single Marker Calibration
Calibrate using a single marker displayed on screen or hand held marker. Gaze at the center of the marker and move your head in a spiral motion. You can also move your head in other patterns. This calibration method enables you to quickly sample a wide range of gaze angles and cover a large range of your FOV.

1. Select Single Marker Calibration
1. Press `c` on your keyboard or click the blue circular `C` button on the left hand side of the world window to start calibration.
1. Look at the center of the marker.
1. Slowly move your head while gazing at the center of the marker. We have found that a spiral pattern is an efficient way to cover a large area of the FOV.
1. Press the `C` button on your keyboard  or show the stop marker to stop calibrating.

::: tip
<v-icon large color="info">info_outline</v-icon>
If you're using a manual marker, make sure to select <code>Marker display mode > manual</code>. Also make sure that you do <strong>not</strong> display the marker on the screen when using a printed marker. Two markers visible to the world view at the same time will result in an inaccurate calibration.
:::

::: tip
<v-icon large color="info">info_outline</v-icon>
This paper introduces and evaluates this type of single marker calibration - <code>CalibMe: Fast and Unsupervised Eye Tracker Calibration for Gaze-Based Pervasive Human-Computer Interaction</code>
:::

#### Natural Features Calibration
This method is for special situations and far distances. Usually not required.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/clb-natural.mp4" type="video/mp4">
</video>

1. Select `Natural Features Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Ask the subject (the person wearing the Pupil headset) to look a point within their field of vision. Note: pick a salient feature in the environment.
1. Click on that point in the world window.
1. Data will be sampled.
1. Repeat until you have covered the subject's field of view (generally about 9 points should suffice)
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.


### Notes on calibration accuracy

In 2D mode, you should easily be able to achieve tracking accuracy within the physiological limits (sub 1 deg visual degrees). Using the 3d mode you should achieve 1.5-2.5 deg of accuracy.

* Any monocular calibration is accurate only at its depth level relative to the eye (parallax error).
* Any calibration is only accurate inside the field of view (in the world video) you have calibrated. For example: If during your calibration you only looked at markers or natural features (depending on your calibration method) that are in the left half, you will not have good accuracy in the right half.
* Calibration accuracy can be visualized with the `Accuracy Visualizer` plugin. If the `Accuracy Visualizer` plugin is loaded, it will display the residual between reference points and matching gaze positions that were recorded during calibration.
* Gaze Prediction Accuracy can be estimated with an accuracy test. Start the accuracy by running a normal calibration procedure but press the `T` button in the world window and **not** the `C` button. After completing the test, the plugin will display the error between reference points and matching gaze positions that were recorded during the accuracy test.

## Recording
<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/rec.mp4" type="video/mp4">
</video>

Press `r` on your keyboard or press the blue circular `R` button on the left hand side of the world window to start recording. You will see red text with the elapsed time of recording next to the `R` button. To stop recording, press `r` on your keyboard or press the `R` button on screen.

You can change recording settings in the `Recorder` plugin menu. Set the folder where recordings are saved under `Path to recordings`. Set the recording name in `Recording session name`.

::: tip
Note - you must specify an existing folder, otherwise the `Path to recordings` will revert to the default path.
:::

### Recording files
If you open up a recording session folder you will see a collection of video(s) and data files. Take a look at [Recording format](/core/software/recording-format) for an overview.

## Plugins
Open the `Plugin Manager` menu on the right.

<div class="pb-4">
  <img src="../../media/core/imgs//capture-plugin.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

It lists all available plugins.
Click the button next to the plugin's name to turn on or off the plugin.

### Third-party plugins
You can easily load third party plugins. Third party plugins will appear in the
Pupil Capture or Pupil Player plugin list. Copy the plugin to the plugins folder
within the `pupil_capture_settings` or `pupil_player_settings` folder.

### Fixation Detector
The online fixation detector classifies fixations based on the dispersion-duration principle. A fixation is visualized as a yellow circle around the gaze point that is shown in the Pupil Capture `world` window.

You can find more information in our [dedicated fixation detection section](/core/terminology/#fixations "Pupil Core terminology - fixations").

### Network plugins
Pupil Capture has a built-in data broadcast functionality. It is based on the network library [ZeroMQ](http://zeromq.org/)
and follows the [`PUB-SUB` pattern](http://zguide.zeromq.org/php:chapter1#Getting-the-Message-Out). Data is published with an affiliated topic.
Clients need to subscribe to their topic of interest to receive the respective data. To reduce network traffic, only data
with at least one subscription is transferred.

#### Pupil Remote
`Pupil Remote` is the plugin that functions as the entry point to the broadcast infrastructure. It also provides a high level interface to control Pupil Capture over the network (e.g. start/stop a recording).

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/pr.mp4" type="video/mp4">
</video>

* Load the `Pupil Remote` plugin from the `Plugin Manager` sub-menu in the GUI (it is loaded by default).
* It will automatically open a network port at the default `Address`.
* Change the address and port as desired.
* If you want to change the address, just type in the address after the `tcp://`

::: tip
<v-icon large color="info">info_outline</v-icon>
See the developer documentation on how to access Pupil Remote from your own application.
:::

#### Pupil Groups
`Pupil Groups` can help you to collect data from different devices and control an experiment with multiple actors (data generators and sensors) or use more than one Pupil device simultaneously:

* Load the `Pupil Groups` plugin from the `General` sub-menu in the GUI.
* Once the plugin is active it will show all other local network Pupil Group nodes in the GUI
* Furthermore, actions like starting and stopping a recording on one device will be mirrored instantly on all other devices.

::: tip
<v-icon large color="info">info_outline</v-icon>
For this to work your network needs to allow `UDP` transport. If the nodes do not find each other, create a local wifi network and use that instead.
:::

::: tip
<v-icon large color="info">info_outline</v-icon>
Pupil Groups can easily be integrated in your own app or device. Have a look at <a href="https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync">pupil helpers</a> to get started.
:::

#### Pupil Time Sync
If you want to record data from multiple sensors (e.g. multiple Pupil Capture instances)
with different sampling rates it is important to synchronize the clock of each sensor.
You will not be able to reliably correlate the data without the synchronization.

The [Pupil Time Sync protocol](https://github.com/pupil-labs/pupil/blob/0fbccd412a9e0ff553eb91727dd0da54d33e9637/pupil_src/shared_modules/time_sync_spec.md)
defines how multiple nodes can find a common clock master and synchronize their time with it.

The Pupil Time Sync plugin is able to act as clock master as well as clock follower.
This means that each Pupil Capture instance can act as a clock reference for others
as well as changing its own clock such that it is synchronized with another reference
clock.

Pupil Time Sync nodes only synchronize time within their respective group. Be aware
that each node has to implement the same protocol version to be able to talk to
each other.

::: tip
<v-icon large color="info">info_outline</v-icon>
See the <a href="https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync">pupil-helpers</a> for example Python implementations.
:::

::: tip
<v-icon large color="info">info_outline</v-icon>
For this to work your network needs to allow `UDP` transport. If the nodes do not find each other, create a local wifi network and use that instead.
:::

#### Frame Publisher
The `Frame Publisher` plugin broadcasts video frames from the world and eye cameras.

There is a [pupil-helper example script](https://github.com/pupil-labs/pupil-helpers/blob/0df77b47cebd49a6c35b6769da483c115a626836/pupil_remote/recv_world_video_frames.py) that demonstrates how to receive and decode world frames.

#### Remote Recorder
The [Pupil Mobile](https://docs.pupil-labs.com/#pupil-mobile) app can be controlled
via Pupil Capture when connected. This includes changing camera and streaming
settings. The `Remote Recorder` plugin extends this list with the possibility
to start and stop recordings that are stored in the phone.

### Surface Tracking
The `Surface Tracker` plugin allows you to define planar surfaces within your environment to track areas of interest (AOI). Surfaces are defined with [Apriltag Markers](https://april.eecs.umich.edu/software/apriltag.html).

::: tip
<v-icon large color="info">info_outline</v-icon>
The legacy surface tracker used simple square markers, which are less robust to detect.
For all new projects we strongly recommend using Apriltags.
You can find more information on the legacy markers below.
:::

#### Markers
There are many different Apriltag types, currently we support 7 families listed below. You can click on the links to download the individual markers from the [AprilTags repository](https://github.com/AprilRobotics/apriltag-imgs/tree/master/ "April Tags Github Repository"). For your convenience we have also prepared some tags from the **tag36h11** family in the two images below.

If you want to generate your own marker sheets, you can find more information in the [the pupil-helpers repository](https://github.com/pupil-labs/pupil-helpers/tree/master/markers_stickersheet).

Supported Apriltag families:

* [tag25h9](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tag25h9)
* [**tag36h11 (default)**](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tag36h11)
* [tagCircle21h7](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tagCircle21h7)
* [tagCircle49h12](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tagCircle49h12)
* [tagCustom48h12](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tagCustom48h12)
* [tagStandard41h12](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tagStandard41h12)
* [tagStandard52h13](https://github.com/AprilRobotics/apriltag-imgs/tree/master/tagStandard52h13)

Apriltags ready to use:

<div style="display:flex;" class="pb-4">
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/apriltags_tag36h11_0-23.jpg" style="padding-bottom:16px;width:60%;">
        <p>Apriltags tag36h11 0-23</p>
    </div>
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:center;" class="pa-2">
        <img src="../../media/core/imgs/apriltags_tag36h11_24-47.jpg" style="padding-bottom:16px;width:60%;">
        <p>Apriltags tag36h11 24-47</p>
    </div>
</div>


Markers can be printed on paper, stickers, or displayed on a screen.


#### Preparing your Environment
A surface can be based on one or more markers.
The markers need to be placed in close proximity or within your desired AOI.
If your AOI is for example a computer monitor, you could display your markers in the corners of the screen or place them somewhere on the bezel.
If your AOI is a magazine page, you could place the markers in the corners of the page, or anywhere else on the page where they are not occluding the content.
When placing your markers please follow the guidelines:

*   All markers of a surface need to lie within the same two dimensional plane.
*   An individual marker can be part of multiple surfaces.
*   The used markers need to be unique, i.e. you may not use multiple instances of the same marker in your environment.
*   Using more markers to define a surface yields greater robustness in the tracking of that surface.
*   Surfaces defined with more than 2 markers are detected even if some markers lie outside of the camera image or are obscured.


#### Defining a Surface
Surfaces can be defined with Pupil Capture in real-time, or post-hoc with Pupil Player.
In both cases the necessary steps are as follows:

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/srf-tracking.mp4" type="video/mp4">
</video>

*   Prepare your environment as described above.
*   Turn on the `Surface Tracker` plugin .
*   Make sure the camera is pointing at your AOI and the markers are well detected.
    In the post-hoc case (using Pupil Player) seek to a frame that contains a good view of your desired AOI.
*   Add a new surface by clicking the `Add surface` button.
*   Give your surface a name.
*   Click the `edit surface` button and move the corners of your surface into the desired position.
    In the real-time case (using Pupil Capture) this is much easier if you freeze the video by clicking the `Freeze Scene` button.
*   If markers have been erroneously added or left out, click the `add/remove markers` button and afterwards onto the according marker to add/remove them from your surface.


#### Reusing Surface Definitions
Your surfaces are automatically saved in a file called `surface_definitions` in the `pupil_capture_settings` directory.

If you restart Pupil Capture or the Surface Tracker plugin, your surface definitions from previous sessions will be loaded.

The `surface_definitions` file is copied into each recording folder as well, so you will have access to your surface definitions in Pupil Player.
You can copy & paste this file to move definitions from one session or recording to another.


#### Gaze Heatmaps for Surfaces
You can display gaze heatmaps for each surface by enabling `Show Heatmap` in the `Surface Tracker` menu.
Two heatmap modes are supported:
* `Gaze within each surface`: Visualizes the distribution of gaze points that lie within each surface.
* `Gaze across different surfaces`: Color codes the surfaces to visualize the amount of time spend gazing on each surface in relation to other surfaces.
Red color represents a lot of gaze points or time spent. Blue color represents few gaze points or little time spent.

The smoothness of the heatmap in `Gaze within each surface` mode can be set using the `Heatmap Smoothness` slider, which will effectively change the bin size of the underlying histogram.
In the online case the heatmap is computed over the most recent data.
The exact time window to consider can be set using the `Gaze History Length` field.

#### Performance Settings
The detector for Apriltag Markers offers two parameters `Use high resolution` and `Sharpen image` that are turned on by default. If you are experiencing high CPU load you can try turning off those settings. This will result in less CPU load but also decreases the detection rate.

#### Further Functionality
* You can click the `Open Surface in Window` button to open a view of the surface in a separate window. Gaze positions on the surface will be visualized in this window in real-time.
* Streaming Surfaces with Pupil Capture - Detected surfaces as well as gaze positions relative to the surface are broadcast under the `surface` topic. Check out [this video](http://youtu.be/qHmfMxGST7A) for a demonstration.
* Surface Metrics with Pupil Player - if you have defined surfaces, you can generate surface visibility reports or gaze count per surface. See our [blog post](https://pupil-labs.com/blog/0392-release) for more information.

#### Legacy Markers
The legacy surface system used simple square markers, which are less robust to detect.
For all new projects we strongly recommend using Apriltags!



### Blink Detection
The pupil detection algorithm assigns a `confidence` value to each pupil datum. It represents the quality of the detection result. While the eye is closed the assigned confidence is very low. The `Blink Detection` plugin makes use of this fact by defining a `blink onset` as a significant confidence drop - or a `blink offset` as a significant confidence gain - within a short period of time. The plugin creates a `blink` event for each event loop iteration in the following format:

```python
{  # blink datum
	'topic': 'blink',
    'confidence': <float>,  # blink confidence
    'timestamp': <timestamp float>,
    'base_data': [<pupil positions>, ...]
    'type': 'onset' or 'offset'}
```

The `Filter length` is the time window's length in which the plugin tries to find such confidence drops and gains. The plugin fires the above events if the blink confidence within the current time window exceeds the `onset` or `offset` confidence threshold. Setting both thresholds to `0` will always trigger blink events, even if the confidence is very low. This means that onsets and offsets do not appear necessarily as pairs but in waves.

### Audio Capture
The `Audio Capture` plugin provides access to a selected audio source for other plugins and writes its output to the `audio.mp4` file during a recording. It also writes the Pupil Capture timestamp for each audio packet to the `audio_timestamps.npy` file. This way you can easily correlate single audio packets to their corresponding video frames.

Audio is recorded separately from the video in Pupil Capture. You can play back audio in sync with video in Pupil Player. Audio is automatically merged with the video when you export a video using Pupil Player.

### Annotations
The `Annotation Capture` plugin allows you to mark timestamps with a label -- sometimes
referred to as triggers. These labels can be created by pressing their respective hotkey
or by sending a message with the topic `annotation`. This is useful to mark external
events (e.g. "start of condition A") within the Pupil recording. The `Annotation Player`
plugin is able to correlate and [export these events](/core/software/pupil-player/#annotation-export)
as well as add new ones.

You can also create [remote annotation](/developer/core/network-api/#remote-annotations)
events programmatically and send them to Pupil Capture via the
[Pupil Core Network API](/developer/core/network-api).

### Camera Intrinsics Estimation
This plugin is used to calculate camera intrinsics, which will enable one to correct camera distortion. Pupil Capture has built in, default camera intrinsics models for the high speed world camera and the high resolution world camera. You can re-calibrate your camera and/or calibrate a camera that is not supplied by Pupil Labs by running this calibration routine. We support two different distortion models, radial distortion and fisheye distortion. For cameras with a FOV of 100 degrees or greater (like e.g. the high speed world camera) the fisheye distortion model usually performs better, for cameras with a smaller FOV (e.g. the high resolution world camera) we recommend the radial distortion model.

1. Select `Camera Intrinsics Estimation`
2. Click on 'show pattern' to display the pattern
3. Resize the pattern to fill the screen
4. Hold your Pupil headset and aim it at the pattern.
5. With the world window in focus, press `c` on your keyboard or the circular `C` button in the world windows to detect and capture a pattern.
6. Data will be sampled and displayed on the screen as a border of the calibrated pattern. (Note - make sure to move your headset at different angles and try to cover the entire FOV of the world camera for best possible calibration results)
7. Repeat until you have captured 10 patterns.
8. Click on `show undistorted image` to display the results of camera intrinsic estimation. This will display an undistorted view of your scene. If well calibrated, parallel lines in the real world will appear as parallel lines in the undistorted view.

Note that in some rare cases the processing of the recorded patterns can fail, which would lead to a warning message in the world window. In this case just repeat the above process from step 6 and try to get a better coverage of the entire FOV of the camera.
