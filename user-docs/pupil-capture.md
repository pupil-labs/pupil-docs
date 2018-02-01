+++
date = "2017-01-19T12:35:24+07:00"
title = "pupil capture"
section_weight = 3
page_weight = 0
+++

# User Docs

This section of the documentation is targeted towards users of Pupil software and provides a deeper explanation of features and methods.

## Pupil Capture

> {{< figure-img src="/images/icons/svg/pc.svg" img-class="feature-center logo" width="20%" alt="Pupil Capture logo" >}}

Pupil Capture is the software used with the Pupil Headset. The software reads the video streams coming in from the world camera and the eye camera. Pupil Capture uses the video streams to detect your pupil, track your gaze, detect and track markers in your environment, record video and events, and stream data in realtime.

### Capture Window

> {{< webp-img src="/images/pupil-capture/capture-callout.webp" alt="Pupil Capture UI call-out" >}}

The Capture window is the main control center for `Pupil Capture`. It displays live video feed from pupil headset.

1. **Graphs** - This area contains performance graphs. By default the graphs `CPU`, `FPS`, and pupil algorithm detection confidence will be displayed. You can control graph settings with the `System Graphs` plugin.
1. **Hot keys** - This area contains clickable buttons for plugins.
1. **Menu** - This area contains settings and contextual information for each plugin.
1. **Sidebar** - This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below the horizontal separator.

### Capture Selection

> {{< video-webm src="/videos/backend-manager/backend-manager.webm" >}}

By default Pupil Capture will use Local USB as the capture source. If you have a Pupil headset connected to your machine you will see the video displayed from your Pupil headset in the World and eye windows. If no headset is connected or Pupil Capture is unable to open capture devices it will fall back to the Test Image. Other options for capture source are described below.

- Test Image - This is the fallback behavior if no capture device is found, or if you do not want to connect to any capture device.
- Video File Source - select this option to use previously recorded videos for the capture selection.
- Pupil Mobile - select this option when using Pupil Capture with the Pupil Mobile Android application.
- Local USB - select this option if your Pupil Headset is connected to the machine running Pupil Capture. This is the default setting.
- RealSense 3D - select this option if you are using an Intel RealSense 3D camera as your scene camera. Read more in the [RealSense 3D section](#intel-realsense-3d).

### Pupil Detection

Pupil's algorithms automatically detect the participant's pupil. With the 3d detection and mapping mode, Pupil uses a 3d model of the eye(s) that constantly updates based on observations of the eye. This enables the system to compensate for movements of the headset - slippage. To build up an initial model, you can just look around your field of view.

> {{< video-webm src="/videos/calibration/pupil-detection/pd.webm" >}}


### Calibration

> {{< video-webm src="/videos/calibration/calibration-headset/clb-hd.webm" >}}

Pupil uses two cameras. One camera records a subject's eye movements -- we call this the `eye camera`. Another camera records the subject's field of vision -- we call this the `world camera`. In order to know what someone is looking at, we must find the parameters to a function that correlates these two streams of information.

### Calibration Process

> {{< video-webm src="/videos/calibration/calibration-mobo/clb-mobo.webm" >}}

> <div class="figure-container">
	<div class="Grid Grid-row">
		<div class="Grid-cell--1of2">
			<div class="Grid-cell Text-center">
				<h4 style="margin-top: 0;">Monocular</h4>
			</div>
		</div>
		<div class="Grid-cell--1of2">
			<div class="Grid-cell Text-center">
				<h4 style="margin-top: 0;">Binocular</h4>
			</div>
		</div>
	</div>
</div>

Pupil Headset comes in a variety of configurations.  Calibration can be conducted with a monocular or binocular eye camera setup.

### Before every calibration

Make sure that the users pupil is properly tracked. Make sure that the world camera is in focus for the distance at which you want to calibrate, and that you can see the entire area you want to calibrate within the world cameras extents (FOV).

<aside class="faq">
Make sure the lens and image sensor are clean. Dust on the lens or image sensor will appear as a black spot in the video. These black spots will negatively affect pupil detection and marker detection algorithms.
</aside>

> <div class="figure-container">
	<div class="Grid Grid--1of2 img-row">
		<div class="Grid-cell" style="padding-right:5px;">
			{{< lqip-img figure-class="img-m" src="/images/pupil-hardware/pupil-detect.jpg" alt="YOur pupil is properly detected by the eye camera" >}}
			<p>Your pupil is properly detected by the eye camera</p>
		</div>
		<div class="Grid-cell">
			{{< lqip-img figure-class="img-m" src="/images/pupil-hardware/focus.jpg" alt="Make sure the world camera is in focus" >}}
			<p>Make sure the world camera is in focus</p>
		</div>
	</div>
</div>

### Calibration Methods

Before starting calibration, ensure that eye(s) are robustly detected and that the headset is comfortable for the participant.

#### Screen Marker Calibration

> {{< video-webm src="/videos/calibration/calibration-screen/clb-s.webm" >}}

This is the default method, and a quick method to get started. It is best suited for close range eye-tracking in a narrow field of view.

1. Select `Screen Marker Calibration`
1. Select your `Monitor` (if more than 1 monitor)
1. Toggle `Use fullscreen` to use the entire extents of your monitor (recommended). You can adjust the scale of the pattern for a larger or smaller calibration target.
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Follow the marker on the screen with your eyes. Try to keep your head still during calibration.
1. The calibration window will close when calibration is complete.


In the `Advanced` sub-menu you can set the `sample duration` -- the number of frames to sample the eye and marker position. You can also set parameters that are used to debug and detect the circular marker on the screen.

#### Manual Marker Calibration

> {{< video-webm src="/videos/calibration/calibration-manual/clb-man.webm" >}}

> <a href="/images/pupil-capture/calibration-markers/v0.4_markers/v0.4_marker.v12.pdf">
		{{< webp-img figure-class="img-s" src="/images/pupil-capture/calibration-markers/v0.4_markers/v0.4_calibration_marker_02.webp" alt="Pupil Calibration Marker v0.4" >}}
	</a>

> <h5 align="center">Pupil Calibration Marker v0.4</h5>

This method is done with an operator and a subject. It is suited for midrange distances and can accommodate a wide field of view. The operator will use a
printed calibration marker like the one shown in the video. [Download Pupil Labs Calibration Marker v0.4 to print](/images/pupil-capture/calibration-markers/v0.4_markers/v0.4_marker.v12.pdf) or display on smartphone/tablet screen.

1. Select `Manual Marker Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button on the left hand side of the world window to start calibration.
1. Stand in front of the subject (the person wearing the Pupil headset) at the distance you would like to calibrate. (1.5-2m)
1. Ask the subject to follow the marker with their eyes and hold their head still.
1. Show the marker to the subject and hold the marker still. You will hear a "click" sound when data sampling starts, and one second later a "tick" sound when data sampling stops.
1. Move the marker to the next location and hold the marker still.
1. Repeat until you have covered the subject's field of view (generally about 9 points should suffice).
1. Show the 'stop marker' or press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.


You will notice that there are no standard controls, only an `Advanced` sub-menu to control detection parameters of the marker and to debug by showing edges of the detected marker in the world view.

<aside class="faq">
  When should I use the Pupil Calibration <strong>Stop</strong> Marker? - Use the <strong>stop</strong> marker to stop/end a calibration. You can also stop a calibration via the Pupil Capture GUI.</a>
</aside>

<aside class="notice">
Make sure to always use the v0.4 marker design for best detection performance!
</aside>

#### Single Marker Calibration

Calibrate using a single marker displayed on screen or hand held marker. Gaze at the center of the marker and move your head in a spiral motion. You can also move your head in other patterns. This calibration method enables you to quickly sample a wide range of gaze angles and cover a large range of your FOV.

1. Select Single Marker Calibration
1. Press `c` on your keyboard or click the blue circular `C` button on the left hand side of the world window to start calibration.
1. Look at the center of the marker.
1. Slowly move your head while gazing at the center of the marker. We have found that a spiral pattern is an efficient way to cover a large area of the FOV.
1. Press the `C` button on your keyboard  or show the stop marker to stop calibrating.

<aside class="notice">
Make sure to not display the marker on the screen when using a printed marker. Two markers visible at once result in bad calibrations.
</aside>

<aside class="notice">
  This paper introduces and evaluates this type of single marker calibration - <code>CalibMe: Fast and Unsupervised Eye Tracker Calibration for Gaze-Based Pervasive Human-Computer Interaction</code>. 
</aside>


#### Natural Features Calibration

> {{< video-webm src="/videos/calibration/calibration-natural/clb-natural.webm" >}}

This method is for special situations and far distances. Usually not required.

1. Select `Natural Features Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Ask the subject (the person wearing the Pupil headset) to look a point within their field of vision. Note -- pick a salient feature in the environment.
1. Click on that point in the world window.
1. Data will be sampled.
1. Repeat until you have covered the subject's field of view (generally about 9 points should suffice)
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.


### Notes on calibration accuracy
In 2D mode, you should easily be able to achieve tracking accuracy within the physiological limits (sub 1 deg visual degrees). Using the 3d mode you should achive 1.5-2.5 deg of accuracy.

* Any monocular calibration is accurate only at its depth level relative to the eye (parallax error).
* Any calibration is only accurate inside the field of view (in the world video) you have calibrated. For example: If during your calibration you only looked at markers or natural features (depending on your calibration method) that are in the left half, you will not have good accuracy in the right half.
* Calibration accuracy can be visualized with the `Accuracy Vizualizer` plugin. If the `Accuracy Visualizer` plugin is loaded, it will display the residual between reference points and matching gaze positions that were recorded during calibration.
* Gaze Prediction Accuracy can be estimated with an accuracy test. Start the accuracy by running a normal calibration procedure but press the `T` button in the world window and **not** the `C` button. After completing the test, the plugin will display the error between reference points and matching gaze positions that were recorded during the accuracy test.


### Recording

> {{< video-webm src="/videos/recording/rec.webm" >}}

Press `r` on your keyboard or press the blue circular `R` button on the left hand side of the world window to start recording. You will see red text with the elapsed time of recording next to the `R` button. To stop recording, press `r` on your keyboard or press the `R` button on screen.

You can set the folder or `Path to recordings` and the `Recording session name` in the `Recorder` sub-menu within the GUI. Note - you must specify an existing folder, otherwise the `Path to recordings` will revert to the default path.

**What will be in the session folder?**

If you open up a session folder you will see a collection of video(s) and data files. Take a look at [Data format](#data-format) to see exactly what you get.

### Open a plugin

> {{< webp-img src="/images/pupil-capture/capture-plugin.webp" alt="Pupil Capture plugins" >}}

Click on the selector "Open Plugin" and select your plugin.

#### Third-party plugins

You can easily load third party plugins. Third party plugins will appear in the
Pupil Capture or Pupil Player plugin list. Copy the plugin to the plugins folder
within the `pupil_capture_settings` or `pupil_player_settings` folder.

### Fixation Detector {#capture-fixation-detector}

The online fixation detector classifies fixations based on the [dispersion-duration principle](#fixation-detector). Fixations are used by the [screen and manual marker calibrations](#calibration-methods) to speed up the procedure. A fixation is visualized as a yellow circle around the gaze point that is shown in the Pupil Capture `world` window.

You can find more information in our [dedicated fixation detector section](#fixation-detector).

### Network plugins

Pupil Capture has a built-in data broadcast functionality. It is based on the network library [ZeroMQ](http://zeromq.org/)
and follows the [`PUB-SUB` pattern](http://zguide.zeromq.org/php:chapter1#Getting-the-Message-Out). Data is published with an affiliated topic.
Clients need to subscribe to their topic of interest to receive the respective data. To reduce network traffic, only data
with at least one subscription is transferred.

#### Pupil Remote

> {{< video-webm src="/videos/pupil-remote/pr.webm" >}}

`Pupil Remote` is the plugin that functions as the entry point to the broadcast infrastructure. It also provides a high level interface to control Pupil Capture over the network (e.g. start/stop a recording).

* Load the `Pupil Remote` plugin from the `General` sub-menu in the GUI (it is loaded by default).
* It will automatically open a network port at the default `Address`.
* Change the address and port as desired.
* If you want to change the address, just type in the address after the `tcp://`

<aside class="notice">
See the developer documentation on how to access Pupil Remote from your own application.
</aside>

#### Pupil Groups

`Pupil Groups` can help you to collect data from different devices and control an experiment with multiple actors (data generators and sensors) or use more than one Pupil device simultaneously:

* Load the `Pupil Groups` plugin from the `General` sub-menu in the GUI.
* Once the plugin is active it will show all other local network Pupil Group nodes in the GUI
* Furthermore, actions like starting and stopping a recording on one device will be mirrored instantly on all other devices.

<aside class="notice">
For this to work your network needs to allow `UDP` transport. If the nodes do not find each other, create a local wifi network and use that instead.
</aside>

<aside class="notice">
  Pupil Groups can easily be integrated in your own app or device. Have a look at <a href="https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync">pupil helpers</a> to get started.
</aside>

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

<aside class="notice">
See the [pupil-helpers](https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync) for example Python implementations.
</aside>

<aside class="notice">
For this to work your network needs to allow `UDP` transport. If the nodes do not find each other, create a local wifi network and use that instead.
</aside>

#### Frame Publisher

The `Frame Publisher` plugin broadcasts video frames from the world and eye cameras.

There is a [pupil-helper example script](https://github.com/pupil-labs/pupil-helpers/blob/0df77b47cebd49a6c35b6769da483c115a626836/pupil_remote/recv_world_video_frames.py) that demonstrates how to receive and decode world frames.

#### Remote Recorder

The [Pupil Mobile](https://docs.pupil-labs.com/#pupil-mobile) app can be controlled
via Pupil Capture when connected. This includes changing camera and streaming
settings. The `Remote Recorder` plugin extends this list with the possibility
to start and stop recordings that are stored in the phone.

### Surface Tracking

> {{< video-webm src="/videos/surface-tracking/srf-tracking.webm" >}}

The `Surface Tracker` plugin allows you to define surfaces within your environment and track surfaces in realtime using a 5x5 square marker. We were greatly inspired by the [ArUco marker tracking library](http://www.uco.es/investiga/grupos/ava/node/26).

*  Markers - We use a 5x5 square marker. This is not the same marker that is used by ArUco (they use 7x7).
*  Using a 5x5 marker gives us 64 unique markers.
*  Why the 5x5 grid? The 5x5 grid allows us to make smaller markers that can still be detected. Markers can be printed on paper, stickers, or displayed on the screen.


#### Defining Surfaces with Markers

> {{< webp-img figure-class="img-m" src="/images/pupil-capture/calibration-markers/pupil_surface_markers.webp" alt="Calibration markers" >}}

A surface can be defined by one or more markers. Surfaces can be defined with Pupil Capture in real-time, or offline with Pupil Player. Below we provide an outline of steps.

*  Define surfaces within your environment using one or more fiducial markers. Surfaces can be defined with a minimum of one marker. The maximum number of markers per surface is limited by the number of markers we can produce with a 5x5 grid.
*  Use Pupil Capture or Pupil Player to register surfaces, name them, and edit them.
*  Registered surfaces are saved automatically, so that the next time you run Pupil Capture or Pupil Player, your surfaces (if they can be seen) will appear when you start the marker tracking plugin.
*  Surfaces defined with more than 2 markers are detected even if some markers go outside the field of vision or are obscured.
*  We have created a window that shows registered surfaces within the world view and the gaze positions that occur within those surfaces in realtime.
*  Streaming Surfaces with Pupil Capture - Detected surfaces as well as gaze positions relative to the surface are broadcast under the `surface` topic. Check out [this video](http://youtu.be/qHmfMxGST7A) for a demonstration.
*  Surface Metrics with Pupil Player - if you have defined surfaces, you can generate surface visibility reports or gaze count per surface. See our [blog post](http://pupil-labs.com/blog/2014/07/0392-player-release.html) for more information.


*  Generate markers with [this script](https://gist.github.com/willpatera/7908319#file-make_square_markers-py), or download the image.

<aside class="notice">
  <strong>Note</strong> - When printing markers, ensure that white space remains around the square marker. You can scale the markers to different sizes, but make sure to have a white border width of at least 1.2 x the marker grid size for marker, unless the marker is affixed onto a white (or light colored) background.
</aside>

#### Surface Heatmaps

It is possbile to dispay gaze heatmaps for each surface by selecting `Show Heatmaps` mode in the `Surface Tracker` menu.
The surface is divided into a two dimensional grid to calculate the heatmap. The grid can be refined by setting the
`X` and `Y` size field of each surface. The colors are normalized such that cells with the highest amount of gaze are
displayed in red and those with the least gaze are displayed in blue. The `Gaze History Length` option for each surface
decides how many recent gaze positions will be used to calculate the heatmap.

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

Audio is recorded separately from the video in Pupil Capture. Audio is merged automatically with videos when videos are exported with Pupil Player.

<aside class="notice">
Audio Capture is only available in macOS and Linux at this time.
</aside>

### Annotations

The `Annotation Capture` plugin allows you to mark timestamps with a label -- sometimes reffered to as triggers.
These labels can be created by pressing their respective hotkey or by sending a notification with the subject `annotation`.
This is useful to mark external events (e.g. "start of condition A") within the Pupil recording. The `Annotation Player`
plugin is able to correlate and export these events as well as add new ones.


#### Remote Annotations

You can also create annotation events programatically and send them using the IPC, or by sending messages to the Pupil Remote interface. Here is an example annotation notification.

```python
{'subject':"annotation",'label':"Hi this is my annotation 1",'timestamp':[set a correct timestamp as float here],'duration':1.0,'source':'a test script','record':True}
```


### Camera Intrinsics Estimation

This plugin is used to calculate camera intrinsics, which will enable one to correct camera distortion. Pupil Capture has built in, default camera intrinsics models for the high speed world camera and the high resolution world camera. You can re-calibrate your camera and/or calibrate a camera that is not supplied by Pupil Labs by running this calibration routine. We support two different distortion models, radial distortion and fisheye distortion. For cameras with a FOV of 100 degrees or greater (like e.g. the high speed world camera) the fisheye distotion model usually performs better, for cameras with a smaller FOV (e.g. the high resolution world camera) we recommend the radial distortion model.

1. Select `Camera Intrinsics Estimation`
1. Select the correct 'Distortion Model'
1. Click on 'show pattern' to display the pattern
1. Resize the pattern to fill the screen
1. Hold your Pupil headset and aim it at the pattern.
1. With the world window in focus, press `c` on your keyboard or the circular `C` button in the world windows to detect and capture a pattern.
1. Data will be sampled and displayed on the screen as a border of the calibrated pattern. (Note - make sure to move your headset at different angles and try to cover the entire FOV of the world camera for best possible calibration results)
1. Repeat until you have captured 10 patterns.
1. Click on `show undistorted image` to display the results of camera intrinsic estimation. This will display an undistorted view of your scene. If well calibrated, straight lines in the real world will appear as straight lines in the undistorted view.

<aside class="notice">
Note that in some rare cases the processing of the recorded patterns can fail, which would lead to a warning message in the world window. In this case just repeat the above process from step 6 and try to get a better coverage of the entire FOV of the camera.
</aside>
