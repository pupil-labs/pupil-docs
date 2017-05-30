+++
date = "2017-01-19T12:35:24+07:00"
title = "pupil capture"
section_weight = 3
page_weight = 0
+++

# User Docs

This section of the documentation is targeted towards users of Pupil software and provides deeper explanation of features and methods.

## Pupil Capture

> {{< figure-img src="/images/icons/svg/pc.svg" img-class="feature-center logo" width="20%" alt="Pupil Capture logo" >}}

Pupil Capture is the software used with the Pupil Headset. The software reads the video streams coming in from the world camera and the eye camera. Pupil Capture uses the video streams to detect your pupil, track your gaze, detect and track markers in your environment, record video and events, and stream data in realtime.

### Capture Window

> {{< webp-img src="/images/pupil-capture/pc_cl_main.webp" alt="Pupil Capture UI call-out" >}}

The Capture window is the main control center for `Pupil Capture`. It displays live video feed from pupil headset.

1. **Graphs** - This area contains performance graphs. You can monitor `CPU` and `FPS` and pupil algorithm detection confidence. These graphs are the same as in the `World` window..
1. **Settings GUI Menu** - This is the main GUI for Pupil Player. You can use this menu primarily to launch plugins and control global settings.
1. **Hot keys** - This area contains clickable buttons for plugins.

### Capture Selection

> {{< video-webm src="/videos/capture-selection/pc-select.webm" >}}

By default Pupil Capture will use Local USB as the capture source. If you have a Pupil headset connected to your machine you will see video displayed from your Pupil headset in the World and eye windows. If no headset is connected or Pupil Capture is unable to open capture devices it will fall back to the Test Image. Other options for capture source are described below.

- Test Image - This is the fallback behavior if no capture device is found, or if you do not want to connect to any capture device.
- Video File Source - select this option to use previously recorded videos for the capture selection.
- Pupil Mobile - select this option When using Pupil Capture with the Pupil Mobile android application.
- Local USB - select this option if your Pupil Headset is connected to the machine running Pupil Capture. This is the default setting.

### Pupil Detection

Pupil's algorithms automatically detect the participant's pupil. With the 3d detection and mapping mode, Pupil uses a 3d model of the eye(s) that constantly updates based on observations of the eye. This enables the system to compensate for movements of the headset - slippage. To build up an initial model, you can just look around your field of view.

> {{< video-webm src="/videos/calibration/pupil-detection/pd.webm" >}}

<!-- > <div class="figure-container">
	<div class="Grid Grid-row">
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				<p>Eye point to each marker to create a sampling point</p>
			</div>
		</div>
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				<p>Eye point to each marker to create a sampling point</p>
			</div>
		</div>
	</div>
</div> -->

### Calibration

> {{< video-webm src="/videos/calibration/calibration-headset/clb-hd.webm" >}}

Pupil uses two cameras. One camera records a subject's eye movements -- we call this the `eye camera`. Another camera records the subject's field of vision -- we call this the `world camera`. In order to know what someone is looking at, we must find the parameters to a function that correlates these two streams of information.

### Before every calibration

Make sure that the users pupil is properly tracked. Make sure that the world camera is in focus for the distance at which you want to calibrate, and that you can see the entire area you want to calibrate within the world cameras extents (FOV).

> <div class="figure-container">
	<div class="Grid Grid-row">
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				{{< lqip-img figure-class="img-m" src="/images/pupil-hardware/pupil-detect.jpg" >}}
			</div>
		</div>
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				{{< lqip-img figure-class="img-m" src="/images/pupil-hardware/focus.jpg" >}}
			</div>
		</div>
	</div>
</div>

> <div class="figure-container">
	<div class="Grid Grid-row">
		<div class="Grid-cell--1of2">
			<div class="Grid-cell" style="padding:0 .5em 0 .5em;">
				<p>Your pupil is properly detected by the eye camera</p>
			</div>
		</div>
		<div class="Grid-cell--1of2">
			<div class="Grid-cell" style="padding:0 .5em 0 .5em;">
				<p>Make sure the world camera is in focus</p>
			</div>
		</div>
	</div>
</div>

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

### Calibration Methods

<!-- First select the calibration method you would like to use: -->

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

<!--
1. Load the `Show Calibration` plugin from the `General` sub-menu to evaluate calibration quality.
-->

In the `Advanced` sub-menu you can set the `sample duration` -- the number of frames to sample the eye and marker position. You can also set parameters that are used to debug and detect the circular marker on the screen.

#### Manual Marker Calibration

> {{< video-webm src="/videos/calibration/calibration-manual/clb-man.webm" >}}

This method is done with an operator and a subject. It is suited for midrange distances and can accommodate a wide field of view. You need markers made of concentric circles, like the two shown below.

1. Select `Manual Marker Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Stand in front of the subject (the person wearing the Pupil headset) at the distance you would like to calibrate. (1.5-2m)
1. Ask the subject to follow the marker with their eyes and hold their head still.
1. Show the marker to the subject and hold the marker still. You will hear a "click" sound when data sampling starts, and one second later a "tick" sound when data sampling stops.
1. Move the marker to the next location and hold the marker still.
1. Repeat until you have covered the subjects field of view (generally about 9 points should suffice).
1. Show the 'stop marker' or press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.

<!--
1. Load the `Show Calibration` plugin from the `General` sub-menu to evaluate calibration quality.
-->

You will notice that there are no standard controls, only an `Advanced` sub-menu to control detection parameters of the marker and to debug by showing edges of the detected marker in the world view.

[Download markers to print](/images/pupil-capture/calibration-markers/pupil_calibration_marker.pdf) or display on smartphone/tablet screen.

<aside class="notice">
  Note - v2.0 Markers can be <a href="/images/pupil-capture/calibration-markers/v2.0_markers/pupil_calibration_marker.pdf">downloaded here</a>.
</aside>


#### Natural Features Calibration

> {{< video-webm src="/videos/calibration/calibration-natural/clb-natural.webm" >}}

This method is for special situations and far distances. Usually not required.

1. Select `Natural Features Calibration`
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to start calibration.
1. Ask the subject (the person wearing the Pupil headset) to look a point in within their field of vision. Note -- pick a salient feature in the environment.
1. Click on that point in the world window.
1. Data will be sampled.
1. Repeat until you have covered the subjects field of view (generally about 9 points should suffice)
1. Press `c` on your keyboard or click the blue circular `C` button in the left hand side of the world window to stop calibration.

<!--
1. Load the `Show Calibration` plugin from the `General` sub-menu to evaluate calibration quality.
-->

<!--
## Calibration Results
Loading the `Show Calibration` plugin from the `General` sub-menu will show an evaluation of the calibration quality. In a "good" calibration, the `Number of used samples` should be more than `180` and the `fraction of used data points` should be more that `0.75`.

![Show Calibration Results](media/screenshots/v04_calibration_show_calibration_results.png)

The green outline show the calibrated area. Orange shows the sampled data points. Red shows outliers. Usually large outliers are blinks, other large outliers can often be attributed to subject error (not looking at the marker). Open image in another tab to see it at full resolution.
-->

### Pupil Detection

Pupil's algorithms automatically detect the participant's pupil. With the 3d detection and mapping mode, Pupil uses a 3d model of the eye(s) that constantly updates based on observations of the eye. This enables the system to compensate for movements of the headset - slippage. To build up an initial model, you can just look around your field of view.

> {{< video-webm src="/videos/calibration/pupil-detection/pd.webm" >}}

<!-- > <div class="figure-container">
	<div class="Grid Grid-row">
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				<p>Eye point to each marker to create a sampling point</p>
			</div>
		</div>
		<div class="Grid-cell--1of2">
			<div class="Grid-cell">
				<p>Eye point to each marker to create a sampling point</p>
			</div>
		</div>
	</div>
</div> -->

### Before every calibration
Make sure that the users pupil is properly tracked. Make sure that the world camera is in focus for the distance at which you want to calibrate, and that you can see the entire area you want to calibrate within the world cameras extents (FOV).

> <div class="figure-container">
	<div class="Grid Grid--justifyCenter Grid--center Grid--alignContentCenter Feature-row">
		<div class="Grid-cell Grid-cell--full">
			<div class="Grid Grid--1of2 Text-center u-padBottom--2">
				<div class="Grid-cell ">
					{{< webp-img figure-class="img-m" src="/images/pupil-hardware/pupil-detect.webp" alt="Pupil detection" >}}
					<p>Your pupil is properly detected by the eye camera</p>
				</div>
				<div class="Grid-cell">
					{{< webp-img figure-class="img-m" src="/images/pupil-hardware/focus.webp" alt="World camera" >}}
					<p>Make sure the world camera is in focus</p>
				</div>
			</div>
		</div>
	</div>
</div>

### Notes on calibration accuracy
Using screen based 9 point calibration method, you should easily be able to achieve tracking accuracy within the physiological limits (1-2 visual degrees).

* Any calibration is accurate only at its depth level relative to the eye (parallax error).
* Any calibration is only accurate inside the field of view (in the world video) you have calibrated. For example: If during your calibration you only looked at markers or natural features (depending on your calibration method) that are in the left half, you will not have good accuracy in the right half.

### Recording

> {{< video-webm src="/videos/recording/rec.webm" >}}

Press `r` on your keyboard or press the blue circular `R` button in the left hand side of the world window to start recording. You will see red text with the elapsed time of recording next to the `R` button. To stop recording, press `r` on your keyboard or press the `R` button on screen.

You can set the folder or `Path to recordings` and the `Recording session name` in the `Recorder` sub-menu within the GUI. Note - you must specify an existing folder, otherwise the `Path to recordings` will revert to the default path.

**What will be in the session folder?**

If you open up a session folder you will see a collection of video(s) and data files. Take a look at [Data format](#data-format) to see exactly what you get.

### Open a plugin

> {{< webp-img src="/images/pupil-capture/pc-plugin.webp" alt="Pupil Capture plugins" >}}

Click on the selector "Open Plugin" and select your plugin.

### Pupil Groups
`Pupil Groups` can help you to collect data from different devices and control an experiment with multiple actors (data generators and sensors) or use more than one Pupil device simultaneously:

* Load the `Pupil Groups` plugin from the `General` sub-menu in the GUI.
* Once the plugin is active it will show all other local network Pupil Group nodes in the GUI
* Furthermore actions like starting and stopping a recording on one device will be mirrored instantly on all other devices.

For this to work your network needs to allow `UDP` transport. If the nodes do not find each other, create a local wifi network and use that instead.

<aside class="notice">
  Pupil Groups can easily be integrated in your own app or device. Have a look at <a href="https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync">pupil helpers</a> to get started.
</aside>

### Streaming Pupil Data over the network

Pupil Capture has a built-in data broadcast functionality. It is based on the network library [ZeroMQ](http://zeromq.org/)
and follows the [`PUB-SUB` pattern](http://zguide.zeromq.org/php:chapter1#Getting-the-Message-Out). Data is published with an affiliated topic.
Clients need to subscribe to their topic of interest to receive the respective data. To save network traffic, only data
with at least one subscription is transferred.

> {{< video-webm src="/videos/pupil-remote/pr.webm" >}}

`Pupil Remote` is the plugin that functions as entry point to the broadcast infrastructure. It also provides a high level
interface to control Pupil Capture over the network (e.g. start/stop a recording).

* Load the `Pupil Remote` plugin from the `General` sub-menu in the GUI (it is loaded by default).
* It will automatically open a network port at the default `Address`.
* Change the address and port as desired.
* If you want to change the address, just type in the address after the `tcp://`

Its network interface is based on the ZeroMQ [`REQ-REP` pattern](http://zguide.zeromq.org/php:chapter1#Ask-and-Ye-Shall-Receive).
The plugin opens the "Reply" socket and waits for client connections. The Pupil Remote protocol consists mostly of single messages.

> ```
Send simple string messages to control Pupil Capture functions:
    'R' start recording with auto generated session name
    'R rec_name' start recording and name new session name: rec_name
    'r' stop recording
    'C' start currently selected calibration
    'c' stop currently selected calibration
    'T 1234.56' Timesync: make timestamps count form 1234.56 from now on.
    't' get pupil capture timestamp returns a float as string.


    # IPC Backbone communication
    'PUB_PORT' return the current pub port of the IPC Backbone
    'SUB_PORT' return the current sub port of the IPC Backbone

Mulitpart messages conforming to pattern:
    part1: 'notify.' part2: a msgpack serialized dict with at least key 'subject':'my_notification_subject'
    will be forwared to the Pupil IPC Backbone.
```

The "IPC Backbone" is the name for the built-in broadcast functionality. You will need to request the `SUB_PORT`
most frequently to be able to subscribe to the published data.

See the pupil-helper [`filter_messages.py`](https://github.com/pupil-labs/pupil-helpers/blob/master/pupil_remote/filter_messages.py)
script for an example on how to subscribe to a specific topic.


### "IPC Backbone" Message Format

All messages that are broadcasted by Pupil Capture comply with the following format:
* Messages are at least two-part containing the topic and the payload
* The payload is a [msgpack](http://msgpack.org/index.html) serialized dictionary

The exact payload format depends on the data topic. You can find example payloads
for the `pupil.` and `gaze.` topics below.

```python
{  # pupil datum
	'model_birth_timestamp': -1.0,
	'ellipse': {
		'angle': 90.0,
		'center': [320.0, 240.0],
		'axes': [0.0, 0.0]},
	'id': 0,
	'theta': 0,
	'timestamp': 535741.715303987,
	'circle_3d': {
		'normal': [0.0, -0.0, 0.0],
		'radius': 0.0,
		'center': [0.0, -0.0, 0.0]},
	'diameter': 0.0,
	'topic': 'pupil',
	'diameter_3d': 0.0,
	'norm_pos': [0.5, 0.5],
	'model_confidence': 0.0,
	'phi': 0,
	'confidence': 0.0,
	'sphere': {
		'radius': 0.0,
		'center': [0.0, -0.0, 0.0]},
	'projected_sphere': {
		'angle': 90.0,
		'center': [0, 0],
		'axes': [0, 0]},
	'model_id': 1,
	'method': '3d c++'}
```

```python
 {  # gaze datum
 	'gaze_normal_3d': [-0.03966349641933964, 0.007685562866422135, 0.9991835362811073],
 	'norm_pos': [0.5238293689178297, 0.5811187961748036],
 	'timestamp': 536522.568094512,
 	'eye_center_3d': [20.713998951917564, -22.466222119962115, 11.201474469783548],
 	'gaze_point_3d': [0.8822507422478054, -18.62344068675104, 510.7932426103372],
 	'base_data': [<pupil datum>],  # list of pupil data that was used to calculate the gaze
 	'confidence': 1.0,
 	'topic': 'gaze'}
```

See [Data format](#data-format) for a detailed explanation of the dictionary keys.

### Frame Publisher

The `Frame Publisher` plugin broadcasts frames from the world and eye cameras
with help of the "IPC backbone". You can subscribe using the topic prefix `frame.`.

There is a [pupil-helper example script](https://github.com/pupil-labs/pupil-helpers/blob/0df77b47cebd49a6c35b6769da483c115a626836/pupil_remote/recv_world_video_frames.py) that showcases how to receive and decode world frames.

### Pupil Time Sync

If you want to record data from multiple sensors (e.g. multiple Pupil Capture instances)
with different sampling rates it is important to synchronize the clock of each sensor.
You will not be able to reliably correlate the data without the synchronization.

The [Pupil Time Sync protocol](https://github.com/pupil-labs/pupil/blob/0fbccd412a9e0ff553eb91727dd0da54d33e9637/pupil_src/shared_modules/time_sync_spec.md)
defines how multiple nodes can find a common clock master and synchronize their time with it.

The Pupil Time Sync plugin is able to act as clock master as well as clock follower.
This means that each Pupil Capture instance can act as a clock reference for others
as well as changing its own clock such that it is synchronized with an other reference
clock.

Pupil Time Sync nodes only synchronize time within their respective group. Be aware
that each node has to implement the same protocol version to be able to talk to
each other.

See the [pupil-helpers](https://github.com/pupil-labs/pupil-helpers/tree/master/pupil_sync) for example Python implementations.

### Surface Tracking

> {{< video-webm src="/videos/surface-tracking/srf-tracking.webm" >}}

The `Surface Tracker` plugin allows you to define surfaces within your environment and track surfaces in realtime using a 5x5 square marker. We were greatly inspired by the [ArUco marker tracking library](http://www.uco.es/investiga/grupos/ava/node/26).

*  Markers - We use a 5x5 square marker. This is not the same marker that is used by ArUco (they use 7x7).
*  Using a 5x5 marker gives us 64 unique markers.
*  Why the 5x5 grid? The 5x5 grid allows us to make smaller markers that can still be detected. Markers can be printed on paper, stickers, or displayed on the screen.

<!-- See the video linked for an introduction and workflow. -->

#### Defining Surfaces with Markers

> {{< webp-img figure-class="img-m" src="/images/pupil-capture/calibration-markers/pupil_surface_markers.webp" alt="Calibration markers" >}}

A surface can be defined by one or more markers. Surfaces can be defined with Pupil Capture in real-time, or offline with Pupil Player. Below we provide an outline of steps.

*  Define surfaces within your environment using one or more fiducial markers. Surfaces can be defined with a minimum of one marker. The maximum number of markers per surface is limited by the number of markers we can produce with a 5x5 grid.
*  Use Pupil Capture or Pupil Player to register surfaces, name them, and edit them.
*  Registered surfaces are saved automatically, so that the next time you run Pupil Capture or Pupil Player, your surfaces (if they can be seen) will appear when you start the marker tracking plugin.
*  Surfaces defined with more than 2 markers are detected even if some markers go outside the field of vision or are obscured.
*  We have created a window that shows registered surfaces within the world view and the gaze positions that occur within those surfaces in realtime.
*  Streaming Surfaces with Pupil Capture - Detected surfaces as well as gaze positions relative to the surface are broadcasted under the `surface` topic. Check out [this video](http://youtu.be/qHmfMxGST7A) for a demonstration.
*  Surface Metrics with Pupil Player - if you have defined surfaces, you can generate surface visibility reports or gaze count per surface. See our [blog post](http://pupil-labs.com/blog/2014/07/0392-player-release.html) for more information.


*  Generate markers with [this script](https://gist.github.com/willpatera/7908319#file-make_square_markers-py), or download the image.

<aside class="notice">
  <strong>Note</strong> - When printing markers, ensure that white space remains around the square marker. You can scale the markers to different sizes, but make sure to have a white border width of at least 1.2 x the marker grid size for marker, unless the marker is affixed onto a white (or light colored) background.
</aside>

### Blink Detection

The pupil detection algorithm assigns a `confidence` value to each pupil datum. It represents
the quality of the detection result. While the eye is closed the assigned confidence is very low.
The `Blink Detection` plugin makes use of this fact by defining a blink as a significant
confidence drop within a short period of time. The plugin creates a `blink` event for each pupil datum of the following format:

```python
{  # blink datum
	'topic': 'blink',
    'activation': <float>,
    'timestamp': <timestamp float>,
    'is_blink': <bool>}
```

The `activation` field denotes how strong the confidence dropped. Values bigger than `0.4` are classified as blinks.
If this is the case the `is_blink` field is set to `True`.

### Audio Capture

The `Audio Capture` plugin provides access to a selected audio source for other plugins and writes its output to the `audio.wav` file during a recording. It also writes the Pupil Capture timestamp for each audio packet to the `audio_timestamps.npy` file. This way you can easily correlate single audio packets to their corresponding video frames. If you want to merge audio and video into a single file you will need to follow these steps:

1. Open the recording in Pupil Player
2. Make sure that the `Video Export` plugin is active
3. Export the recording
4. Use `ffmpeg` to mux the audio file and the *exported* video file:

```
ffmpeg -i <recording directory>/exports/<exported frame range>/world_viz.mp4 -i <recording directory>/world.wav -map 0:v:0 -map 1:a:0 -shortest muxed_post_export.mp4
```

Only the exported video contains the timestamps that are required for ffmpeg to sync audio and video correctly.

### Annotations

The `Annotation Capture` plugin allows you to mark timestamps with a label -- sometimes reffered to as triggers.
These labels can be created by pressing their respective hotkey or by sending a notification with the subject `annotation`.
This is useful to mark external events (e.g. "start of condition A") within the Pupil recording. The `Annotation Player`
plugin is able to correlate export these events.
