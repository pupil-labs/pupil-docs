+++
date = "2017-01-19T12:24:57+07:00"
title = "getting started"
weight = 2
+++

# Getting Started

This guide will lead you through a basic workflow using Pupil hardware and software.

<p align="center">
  <img width="20%" src="/images/icons/Pupil_Logo_wiki-03.png">
</p>

Once you have a Pupil Headset all you need to do is install the Pupil bundled apps on a computer running Linux, MacOS, or Windows. There are two ways to get up and running with Pupil.

<div class="content-container padTop--1 padBottom--1">
  <p align="center"><strong>Normal Users</strong></p>
  <p align="center">
    <a href="https://github.com/pupil-labs/pupil/releases/latest">
      <button class="ui-button">Get the latest Pupil App</button>
    </a>
  </p>
  <p align="center">
  <strong>Developers, tinkerers, über-nerds!</strong></p>
  <p align="center">
    <a href="#dev-setup">
      <button class="ui-button">Run Pupil from the source</button>
    </a>
  </p>
</div>

A quick note on operating systems -- If you have a choice we recommend the OS's in this order

<div class="content-container padTop--1 padBottom--1">
  <div class="flex-container flex-row">
    <button class="ui-icon"> Linux
      <div class="ui-material">
        <i class="icon-container icons">laptop_chromebook</i>
      </div>
    </button>
    <button class="ui-icon"> Mac
      <div class="ui-material">
        <i class="icon-container icons">laptop_mac</i>
      </div>
    </button>
    <button class="ui-icon"> Windows
      <div class="ui-material">
        <i class="icon-container icons">laptop_windows</i>
      </div>
    </button>
  </div>
</div>

Pupil is equally well supported on Mac and Linux. Information on Windows can be found [here](#windows).

We are always working on new features, fixing bugs, and making improvements so make sure to visit the release page frequently to get the latest.

<div class="content-container">
  <div class="header-link">
    <a href="#first-steps">
      <h3 id="first-steps">First Steps</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

Download and install the Pupil Capture application bundle. Put on the Pupil headset and plug it into your computer. Open the Pupil Capture app. You will be presented with 2 windows – `World` and `Eye`.

Work through the following steps to get familiar with the Pupil workflow. You can also check out [video tutorials](#walkthrough-videos) at the end of the guide. 

<!-- Dive deeper in the [user guide](https://github.com/pupil-labs/pupil/wiki/User-Guide). -->

<div class="content-container">
  <div class="header-link">
    <a href="#steps-hardware">
      <h4 id="steps-hardware">1. Pupil Hardware</h4>
    </a>
  </div>
</div>

Put on and plug in your Pupil headset. Headsets are adjustable and shipped with additional parts. For more information head over to the [Pupil Hardware](#pupil-hardware) guide.

<div class="content-container">
  <div class="header-link">
    <a href="#steps-capture">
      <h4 id="steps-capture">2. Start the Pupil Capture App</h4>
    </a>
  </div>
</div>

If headset is plugged in and detected, `World` and `Eye` windows will open and display the real-time video.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/icon/pupil-capture-pointer.png" width="20%">
</p>

<div class="content-container">
  <div class="header-link">
    <a href="#steps-ui">
      <h4 id="steps-ui">3. Intro to the UI</h4>
    </a>
  </div>
</div>

Below are the two main windows we will interface with throughout the application.

##### World Window
Let's get familiar with the `World` window.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/world-callout.png" width="80%">
</p>

The `World` window is the main control center for `Pupil Capture`. It  displays a real-time video feed of your field of view (FOV), camera controls for the world view, controls for plugins like calibration, recording, streaming, and more.

  1. **Graphs** - this area contains performance graphs. You can monitor `CPU` and `FPS` as well as the `Confidence` of the pupil detection algorithm.  
  1. **Sidebar** - The main GUI for the `World` window is a sidebar. Click the `<|` icons to expand sidebar and sub-menus and  `|||` to collapse. The sidebar is scrollable. Plugins will launch new sub-menus in the sidebar.
  1. **Gaze dot** - the red dot shows where you are looking within the `world` FOV.
  1. **Hot keys** - this area contains clickable buttons for plugins. Letters correspond to keyboard shortcuts. Example: press the `C` key to start calibrating or press the `R` key to start/stop recording.

Let's take a closer look at the `General` sub-menu.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/world-sidebar-callout.png" width="40%">
</p>

1. **Detection and mapping mode** - you can select `2d` or `3d` detection and mapping mode. We recommend 3d mode for almost all use cases.
1. **Detect eye0** and **Detect eye1** - these toggled buttons launch and stop eye processes in a new `Eye` window. All settings you make will be saved for the next time `Pupil Capture` is opened.
1. **Open plugin** - select a plugin from the drop down list. A plugin sub-menu will be added to the GUI with (optional) hot key. You can make your own plugins. Read more about that [here](#plugin-guide).



##### Eye Window

The `Eye` window displays a real-time video of your eye. You will primarily use the `Eye` window GUI to configure pupil detection algorithm parameters and eye camera settings.  

<img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/eye-callout.png" width="100%">

1. **Graph** - this area contains performance graphs. You can monitor `CPU` and `FPS`.
1. **Sidebar** - the main GUI for the `World` window is a sidebar. Click the `<|` icons to expand sidebar and sub-menus and  `|||` to collapse. The sidebar is scrollable. Plugins will launch new sub-menus in the sidebar.
1. **Pupil diameter** - Red circles are visualizations of `pupil min` and `pupil max` diameter. The Green circle is a visualization of the current apparent pupil diameter. Blue number in the center is the current apparent pupil diameter in pixels.

<div class="content-container">
  <div class="header-link">
    <a href="#steps-detection">
      <h4 id="steps-detection">4. Pupil Detection</h4>
    </a>
  </div>
</div>

After focusing the eye camera, take a look at the Eye window. If the pupil is detected you will see a red circle around the edge of your pupil and a red dot at the center of your pupil.

If the algorithm's detection confidence is high, the red circle will be opaque. If confidence diminishes the circle will become more transparent.

Try moving your head around a bit while looking at your eye to see that the pupil is robustly detected in various orientations.

##### Eye image mode

There are three modes that you can select from the `General` menu: Camera Image, Region of Interest (ROI), and Algorithm. Here we will discuss Camera Image and Algorithm view mode.

<table>
<tr>
  <th><p align='center'>Camera Image</p></th>
  <th><p align='center'>Algorithm
</tr>
  <tr>
    <td width="50%">
    <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-hardware/pupil-detection/pupil-camimage2.png" width="100%">
    </td>
    <td width="50%">
    <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-hardware/pupil-detection/pupil-algorithm.png" width="100%">
    </td>
  </tr>
  <tr>
    <td valign='top'>
    <small>Raw eye camera image. This uses the least amount of CPU power. Red ellipse and red dot are visualizations of the pupil detection algorithm.</small>
    </td>
    <td valign='top'>
    <small>Algorithm mode shows a visualization of the pupil detection algorithm parameters on top of the eye video stream.</p></small>
    </td>
  </tr>
</table>

##### Pupil detection algorithm settings
Switch to `Algorithm` mode so that you can see a visualization of the pupil algorithm parameters set in the GUI.

<table>
  <p align="center"></p>
  <tr>
    <td><img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/eye-ui/pupil-detect-algor.png" width="100%"></td>
    <td><img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-hardware/pupil-detection/pupil-algorithm.png" width="100%"></td>
  </tr>
</table>

* In the `General` menu in the sidebar, switch the `Mode` to `Algorithm`
  * Scroll down to the `Pupil Detector 2D` submenu
  * Adjust `Pupil min` and `Pupil max` sliders.
  * Red circles in the bottom left visualize `Pupil min` and `Pupil max` values.
  * The green circle and value displayed at the center of the circles is the current pupil diameter. Make sure the green circle is within the two red circles.

<aside class="notice">
See <a href="#pupil-capture">Pupil Capture</a> for more details about pupil detector settings and advanced options.
</aside>

<div class="content-container">
  <div class="header-link">
    <a href="#steps-calibrate">
      <h4 id="steps-calibrate">5. Calibrate</h4>
    </a>
  </div>
</div>

Pupil calibration process establishes the mapping from pupil to gaze coordinates. One or two cameras capture a subject's eye movements - Eye Camera - and another one records the subject's FOV - World Camera. In order to know what someone is looking at -- specifically where their `gaze` or fovea is regarding the word camera space -- we first need to find out how pupil and gaze positions are mapped. This is what we call calibration.

Steps
1. Go to the `World` window.
1. In the `Calibration` sub-menu select `Screen Marker Calibration` as the method.

##### Screen Marker Calibration Method
<table>
  <tr>
    <td width="50%"><img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/recording-directory/record-callout.png" width="100%"></td>
    <td width="50%"><img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-hardware/calibrate/calibrate-border.png" width="100%"></td>
  </tr>
  <tr>
    <td valign='top'>
    <small>Click `c` on the world screen or press `c` on the keyboard to start calibrate.</small>
    </td>
    <td valign='top'>
    <small>Follow the marker on the screen with your eyes and try to keep your head stationary</small>
    </td>
  </tr>  
</table>

There are other calibration methods and lots more information about how calibration works -- read more on [calibration](#calibration).

<div class="content-container">
  <div class="header-link">
    <a href="#steps-calibrate-success">
      <h4 id="steps-calibrate-success">6. Verify Successful Calibration</h4>
    </a>
  </div>
</div>

If the system has been calibrated correctly you will see a message "Calibration Successful". After calibration the red dot will point directly to the current gaze point.

<div class="content-container">
  <div class="header-link">
    <a href="#steps-record">
      <h4 id="steps-record">7. Record</h4>
    </a>
  </div>
</div>

If calibration is successful, start capturing data.

This means that Pupil Capture will save the world video stream and all corresponding gaze data in a folder.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture-v07-world-recording.png" width="80%">
</p>

Steps

  * Start recording: Press the `r` key on your keyboard or press the circular 'R' button in the left hand side of the world window.
  * The elapsed recording time will appear next to the 'R' button.
  * Stop recording: Press the `r` key on your keyboard or press the circular 'R' button in the left hand side of the world window.

See a video demonstration of how to set recordings path, session name, and start recording -- [here](http://youtu.be/VzIXFUqv99s).

##### Where is the recording saved?
By default, each recording will live in its own unique data folder contained in the `recordings` folder.

You can make as many recordings as you like. 

<p align="center">
    <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/recording-directory/recording_folder_v07.png" width="100%">
</p>

The default `recordings` directory will have the following hierarchy.

* `recordings`
  * 2016-04-05
    * 001
    * 002
    * 003
    * ####

##### How recordings are saved?
Pupil capture saves the video frames in a fixed frame rate container. This means that the raw output video (world.mp4) does not show the correct duration and the correct frame rate of the recording. This information can be found in `world_timestamps.npy`, which tells you exactly where each frame belongs in time.

However, if you export using Pupil Player, the video will be made such that the frames will show at the exact right time. The output video will not miss any frame of the raw video, instead, output frames are spaced out exactly as they where initially captured.

<aside class="notice">
Note - The real FPS during recordings may fluctuate due variations on light intensity (LUX, lumens) and other issues; it cannot be forced to be constant.
</aside>

<div class="content-container">
  <div class="header-link">
    <a href="#steps-player">
      <h4 id="steps-player">8. Open Pupil Player</h4>
    </a>
  </div>
</div>

Now that you have recorded some data, you can play back the video and visualize gaze data, marker data, and more.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/icon/pupil-player-pointer.png" width="20%">
</p>

##### Player Window
Let's get familiar with the Player window.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-player/pupil-player-callout.png" width="80%">
</p>

The Player window is the main control center for `Pupil Player`. It displays the recorded video feed from pupil capture file.

1. **Graphs** - this area contains performance graphs. You can monitor `CPU` and `FPS` and pupil algorithm detection confidence. These graphs are the same as in the `World` window..
1. **Settings GUI Menu** - This is the main GUI for Pupil Player. You can use this menu primarily to launch plugins and control global settings.  
1. **Plugin GUIs** - Each Plugin spawns its own GUI window. You can control settings of each Plugin in the GUI window. For details on all plugins see documentation on [Pupil-player]() in the user guide.  
1. **Seek Bar and Trim Marks** - You can drag the playhead (large circle) to scrub through the video or `space` bar to play/pause. You can use the arrow keys to advance one frame at a time. Drag the small green circles at the end of the seek bar to set trim marks. Trim marks directly inform the section of video/data to export.
1. **Hot keys** - this area contains clickable buttons for plugins.

##### Where are Pupil Player exports saved?
Exports are saved within a dedicated folder named `exports` within the original recording folder.

Each export is contained within a folder within the `exports` folder. The numbers of the export correlate to the trim marks (frame start and frame end) for the export.  

Below is an example of an export.

<img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-player/recording-directory/recording_folder_exports_v07.png" width="100%">

<div class="content-container">
  <div class="header-link">
    <a href="#walkthrough-videos">
      <h3 id="walkthrough-videos">Walkthrough Videos</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

If after following the getting started steps you require a walkthrough, these can be found below.
Click the screenshots to see a **video walkthrough** of Pupil Capture and Pupil Player.
Turn on closed captions `CC` to read annotations in the video.

<div class="content-container">
  <div class="header-link">
    <a href="#walkthrough-capture">
      <h4 id="walkthrough-capture">Pupil Capture</h4>
    </a>
  </div>
</div>

<div class="content-container">
  <div class='video-container' >
      <iframe class=feature-video src="https://www.youtube.com/embed/Fxll-vPFa90?rel=0" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#walkthrough-player">
      <h4 id="walkthrough-player">Pupil Player</h4>
    </a>
  </div>
</div>

<div class="content-container">
  <div class='video-container' >
    <iframe class=feature-video src="https://www.youtube.com/embed/7vQuL29P9ow?rel=0" frameborder="0" allowfullscreen></iframe>
  </div>
</div>