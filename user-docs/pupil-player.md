+++
date = "2017-01-19T13:08:13+07:00"
title = "pupil player"
section_weight = 3
page_weight = 1
+++

## Pupil Player

<!-- ### About -->

> {{< figure-img src="/images/icons/svg/pp.svg" img-class="feature-center logo" width="20%" alt="Pupil Player logo" >}}

Pupil Player is the second tool you will use after Pupil Capture. It is a media and data visualizer at its core. You will use it to look at Pupil Capture recordings. Visualize your data and export it.

Features like <a href="#surface-tracking">surface tracking</a> found in Pupil Capture are also available in Pupil Player.

### Starting Pupil Player

> {{< webp-img src="/images/pupil-player/pp_start.webp" alt="Starting Pupil Player" >}}

Drag the recording directory (the triple digit one) directly onto the app icon **or** launch the application and drag + drop the recording directory into Pupil Player window.

### Player Window
Let's get familiar with the Player window.

> {{< webp-img src="/images/pupil-player/player-callout.webp" alt="Pupil Player UI call-out" >}}

The Player window is the main control center for `Pupil Player`. It displays the recorded video feed from pupil capture file.

1. **Graphs** - This area contains performance graphs. By default the graphs `CPU`, `FPS`, and pupil algorithm detection confidence will be displayed. You can control graph settings with the `System Graphs` plugin.
1. **Hot keys** - This area contains clickable buttons for plugins.
1. **Timeline Events** - Plugins can add temporal events to this expandable panel.
1. **Timeline** - Control the playback of the video with the play/pause button (or spacebar on your keyboard). Drag the playhead (vertical line) to the desired point in time.
  - **Frame Stepping** - You can use the arrow keys on your keyboard or the `<<` `>>` buttons to advance one frame at a time.
  - **Trimming** - Drag either end of the timeline to set a trim beginning and ending trim marks. The trim section marks directly inform the section of video/data to export.
1. **Menu** - This area contains settings and contextual information for each plugin.
1. **Sidebar** - This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below the horizontal separator.


#### Workflow

Pupil Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

  + Start Pupil Player
  + Open a Plugin - From the `Plugin Manager` GUI menu load the `Vis Circle` plugin.
  + Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
  + Set trim marks - you can drag the green rounded rectangle at the beginning and end of the seekbar to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
  + Export Video & Raw Data - From the `Plugin Manager` view, load the `Video Export Launcher` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the `e` button in the left hand side of the window to start the export.
  + Check out exported data in the `exports` directory within your recording directory

<aside class="notice">
Note - Pupil Player will <strong>never</strong> remove or overwrite any of your raw data gathered during capture. All exports are isolated within a sub-directory named <code>exports</code>. Exports will never be overwritten.
</aside>

### Plugin Overview
Pupil Player uses the same Plugin framework found in Pupil Capture to add functionality.

We implement all visualizations, marker tracking, and the exporter using this structure. Very little work (often no work) needs to be done to make a Capture Plugin work for the Pupil Player and vice versa.

There are two general types of plugins:

  + **Unique** - You can only launch one instance of this plugin.
  + **Not unique** - You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixel thickness. You can think of these types of plugins as *additive*.

In the following sections we provide a summary of plugins currently available and in Pupil Player.

### Visualization Plugins
We will call plugins with the `Vis` prefix **visualization** plugins. These plugins are simple plugins, are mostly additive (or *not unique*), and directly operate on the gaze positions to produce visualizations. Other plugins like `Offline Surface Tracker` also produces visualizations, but will be discussed elsewhere due to the extent of its features.

#### Vis Circle

> {{< webp-img src="/images/pupil-player/plugin/vizcircle.webp" alt="Vis Circle plugin" >}}

Visualize the gaze positions with a circle for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization.

You can set the following parameters:

  + `radius` - the radius of the circle around the gaze point.
  + `stroke width` - the thickness or width of the stoke in pixels.
  + `fill` - toggle on for a circle with solid fill. Toggle off for a circle with only stroke.
  + `color` - define the `red`, `green`, `blue` values for color. `Alpha` defines the opacity of the stroke and fill.

Here we show an example of how you could use **2** instances of the `Vis Circle` Plugin. The first instance renders the gaze position as a filled yellow circle. The second instance renders the same gaze position as an orange stroke circle.

#### Vis Cross

> {{< webp-img src="/images/pupil-player/plugin/vizcross.webp" alt="Vis Cross plugin" >}}

Visualize the gaze positions with a cross for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

  + `inner offset length` - the distance in pixels to offset the interior cross endpoints from the gaze position. A value of `0` will make the crosshairs intersect the gaze position.
  + `outer length` - The length of the cross lines in pixels from the gaze position. Note - equal values of `inner offset length` and `outer length` will result in a cross with no length, and therefore not rendered.
  + `stroke width` - the thickness or width of the stoke in pixels.
  + `color` - define the `red`, `green`, `blue` values for color.

Here we show an example of how you could use **2** instances of the `Vis Cross` Plugin. The first instance renders the gaze position as a red cross with that extends to the boundaries of the screen. The second instance renders the gaze position as a green cross, with a heavier stroke weight.

#### Vis Scan Path

> {{< webp-img src="/images/pupil-player/plugin/scanpath.webp" alt="Vis Scan Path plugin" >}}

This plugin enables past gaze positions to stay visible for the duration of time specified by the user. This plugin is **unique**, therefore you can only load one instance of this plugin.

On its own, `Scan Path` does not render anything to the screen. It is designed to be used with other plugins. In some cases, it is even required to be enabled in order for other plugins to properly function. When used with `Vis` plugins (like `Vis Circle`, `Vis Cross`, `Vis Polyline`, or `Vis Light Points`) `Scan Path` will enable you to see both the current gaze positions and the past gaze positions for the specified duration of time.

Here we show an example of `Scan Path` set with `0.4` seconds duration used with `Vis Circle`. Each green circle is a gaze position within the last `0.4` seconds of the recording.

#### Vis Polyline

> {{< webp-img src="/images/pupil-player/plugin/vizpoly.webp" alt="Vis Polyline plugin" >}}

Visualize the gaze positions with a polyline for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

  + `line thickness` - the thickness or width of the polyline stroke in pixels.
  + `color` - define the `red`, `green`, `blue` values for color.

An example showing `Vis Polyline` used with `Vis Circle` and `Scan Path`. The polyline enables one to visualize the sequence of the gaze positions over the duration specified by `Scan Path`.

#### Vis Light Points

> {{< webp-img src="/images/pupil-player/plugin/vizlightpoints.webp" alt="Vis Light Points plugin" >}}

Visualize the gaze positions as a point of light for each gaze position. The `falloff` of the light from the gaze position is specified by the user. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

  + `falloff` - The distance (in pixels) at which the light begins to fall off (fade to black). A very low number will result in a very dark visualization with tiny white light points. A very large number will result in a visualization of the world view with little or no emphasis on the gaze positions.

Here is an example demonstrating `Vis Light Points` with a falloff of 73.

#### Vis Eye Video Overlay

> {{< webp-img src="/images/pupil-player/plugin/eyeoverlay.webp" alt="Vis Eye Video Overlay plugin" >}}

Here is an example of the `Eye Video Overlay` with binocular eye videos.

This plugin can be used to overlay the eye video on top of the world video. Note that the eye video is not recorded by default in Pupil Capture, so if you want to use this plugin, make sure to check `record eye video` in Pupil Capture. This plugin is **unique**, therefore you can only load one instance of this plugin.

 You can set the following parameters:

  + `opacity` - the opacity of the overlay eye video image. `1.0` is opaque and `0.0` is transparent.
  + `video scale` - use the slider to increase or decrease the size of the eye videos.
  + `move overlay` - toggle `on` and then click and drag eye video to move around in the player window. Toggle `off` when done moving the video frames.
  + `show` - show or hide eye video overlays.
  + `horiz. and vert. flip` - flip eye videos vertically or horizontally

### Data Source Plugins
Data source plugins provide data of a specific topic - currently `pupil` and `gaze` positions. Plugins that provide data for the same topic are exclusive. `Pupil Positions From Recording` and `Offline Pupil Detector` cannot be run at the same time.

#### Pupil Positions From Recording
This is the default Pupil detector plugin. This plugin tries to load pupil positions that were detected and stored during a Pupil Capture recording. This plugin can not be run in conjunction with `Offline Pupil Detector`.

#### Offline Pupil Detector
The `Offline Pupil Detector` plugin can be used with any dataset where eye videos were recorded. The plugin tries to load the `eye0.mp4` and `eye1.mp4` videos, and runs the pupil detection algorithm in separate processes. This plugin is especially relevant for recordings made with Pupil Mobile, because Pupil Mobile does not perform any pupil detection or gaze estimation on the Android device. This plugin is available starting with Pupil Player `v0.9.13`.

The `Detection Method` selector sets the detection algorithm to either `2d` or `3d` detection (see [the section on Pupil Detection](#pupil-detection) for details). The `Redetect` button restarts the detection procedure. You can use the `Offline Pupil Detector` plugin to debug, improve, and gain insight into the pupil detection process.

#### Gaze Positions From Recording
This is the default gaze mapping plugin. This plugin tries to load gaze positions that were created and stored during a Pupil Capture recording. This plugin can not be run in conjunction with  `Offline Calibration`.

#### Offline Calibration
This plugin is available starting with Pupil Player `v0.9.13`. The `Offline Calibration` plugin can be used on any Pupil dataset. This plugin enables you to (re)calibrate, set calibration sections, and (re)map pupil to gaze positions. To calibrate with the `Offline Calibration` plugin, you must supply a set of reference positions in the world. There two methods to acquire these positions:

1. `Circle Marker`: This method tries to automatically detect [circular calibration markers](#calibration-methods) within the world video.
2. `Natural Features`: This method enables you to select reference points by marking (clicking on) known features that correspond to gaze positions within the world video.

Data is calibrated and mapped in sections. Each section has following properties:

1. `Calibration Method`: `Circle Marker` or `Natural Features`, see above
2. `Calibration Mode`: `2d` uses polynomial regression, or `3d` uses bundle adjustment calibration
3. `Calibration Range`: Slice of world frame indices that indicates which reference and pupil positions to use for calibration. For example, the calibration range `[500, 701]` will use all reference and pupil positions for calibration that correlate to the world timestamps with indices 500 - 700
4. `Mapping Range`: Slice of world frame indices that indicates which pupil positions will be mapped to gaze positions.

<aside class="warning">
Sections that have overlapping mapping ranges will produce duplicated gaze positions in the overlapping regions. This is intended behaviour.
</aside>

<aside class="notice">
You can compare `2d` and `3d` mapping results by creating two sections with the same calibration and mapping ranges.
</aside>

To add reference points manually, you need to enable the `Natural feature edit mode`. Afterwards you can add markers by clicking on the corresponding location in the world video. To delete single natural features, simply click on them again while the edit mode is enabled. You can delete all natural features at once by clicking the button `Clear natural features`.

Sections are visualized as horizontal lines above the seek bar. The thick lines denote calibration ranges and thin lines denote mapping ranges. The reference points that are used for each section are visualized as points behind the corresponding lines.

> <h5 align='center'>Offline pupil detection and gaze mapping<h5>
> {{< video-youtube embed-url="https://www.youtube.com/embed/lPtwAkjNT2Q" >}}

> <h5 align='center'>Offline gaze mapping with natural features<h5>
> {{< video-youtube embed-url="https://www.youtube.com/embed/wVOqJWel0K0" >}}

### Analysis Plugins

These plugins are simple unique plugins, that operate on the gaze data for analysis and visualizations.

#### Offline Surface Tracker

> {{< webp-img src="/images/pupil-player/plugin/offline-surface-tracker.webp" alt="Offline Surface Tracker" >}}

This plugin is an offline version of the [Surface Tracking](#surface-tracking) plugin for Pupil Capture. You can use this plugin to detect markers in the recording, define surfaces, edit surfaces, and create and export visualizations of gaze data within the defined surfaces.

Here is an example workflow for using the `Offline Surface Detector` plugin to generate heatmap visualizations and export surface data reports:

  + Load `Offline Surface Detector` plugin - if you already have surfaces defined, the load may take a few seconds because the plugin will look through the entire video and cache the detected surfaces.
  + Add surface - if you do not have any defined surfaces, you can click on the `Add surface` button when the markers you want to user are visible or just click the circular `A` button in the left hand side of the screen.
  + Surface name and size - In the `Marker Detector` GUI window, define the surface name and real world size. *Note* - defining size is important as it will affect how heatmaps are rendered.
  + Set trim marks - optional, but if you want to export data for a specific range, then you should set the trim marks.
  + Recalculate gaze distributions - click the `(Re)calculate gaze distributions` button after specifying surface sizes. You should now see heatmaps in the Player window (if gaze positions were within your defined surfaces).
  + Export gaze and surface data - click `e` and all surface metrics reports will be exported and saved for your trim section within your `export` folder.

#### Fixation Detector {#player-fixation-detector}

> {{< webp-img src="/images/pupil-player/plugin/fixation.webp" alt="Offline Fixation Detector" >}}

The offline fixation detector calculates fixations for the whole recording. The menu gives feedback about the progress of the detection, how many fixations were found, shows and detailed information about the current fixation. Press `f` or click the `f` hot key button on the left hand side of the window to seek forward to the next fixation.

Toggle `Show fixations` to show a visualization of fixations. The blue number is the number of the fixation (0 being the first fixation). You can export fixation reports for your current trim section by pressing `e` on your keyboard or the `e` hot key button on the left hand side of the window.

You can find more information in our [dedicated fixation detector section](#fixation-detector).

### Export
You can export data and videos by pressing `e` on your keyboard or the `e` hot key button in the Pupil Player window.

All open plugins that have export capability will export when you press `e`. All exports are separated from your raw data and contained in the `exports` sub-directory. The exports directory lives within your recording directory.

#### Exports directory

> {{< webp-img src="/images/pupil-player/recording/recording_folder_exports_v07.webp" alt="Recording folder" >}}

All exports are saved within the `exports` sub-directory within your recording directory.
A new directory will be created within the `exports` directory for each export. Export directories are never overwritten and have a counter for the export. Example: the first export will be `000` and the second `001` and the third `002`.

#### Video Export Launcher

> {{< webp-img src="/images/pupil-player/plugin/export.webp" alt="Video Export Launcher plugin" >}}

To export a video, load the `Export Video` plugin. You can select the frame range to export by setting trim marks in the seek bar or directly in the plugin GUI.

You can specify the name of the export in the GUI. Click press the `e` button or click `e` on your keyboard to start the export.

The exporter will run in the background and you can see the progress bar of the export in the GUI. While exporting, you can continue working with Pupil Player and even launch new exports.

#### Raw Data Exporter

> {{< webp-img src="/images/pupil-player/plugin/rawexport.webp" alt="Raw Data Exporter plugin" >}}

To export `.csv` files of your data, load the `Raw Data Exporter` plugin. You can select the frame range to export by setting trim marks in the seek bar or directly in the plugin GUI.

Click press the `e` button or click `e` on your keyboard to start the export.

#### Batch Exporter
You can use this plugin to apply visualizations to an entire directory (folder) of recordings in one batch. You need to specify the following:

  + `Recording source directory` - a directory (folder) that contains one or more Pupil recording folder.
  + `Recording destination directory` - an existing directory (folder) where you want to save the visualizations.

### Developing your own Plugin
To develop your own plugin see the <a href="#plugin-guide">developer guide</a>.


