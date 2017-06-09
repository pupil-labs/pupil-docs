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

### Player Window
Let's get familiar with the Player window.

> {{< webp-img src="/images/pupil-player/pp_cl_main.webp" alt="Pupil Player UI call-out" >}}

The Player window is the main control center for `Pupil Player`. It displays the recorded video feed from pupil capture file.

1. **Graphs** - This area contains performance graphs. You can monitor `CPU` and `FPS` and pupil algorithm detection confidence. These graphs are the same as in the `World` window..
1. **Settings GUI Menu** - This is the main GUI for Pupil Player. You can use this menu primarily to launch plugins and control global settings.
1. **Plugin GUIs** - Each Plugin spawns its own GUI window. You can control settings of each Plugin in the GUI window. For details on all plugins see documentation on [Pupil Player](#pupil-player) in the user guide.
1. **Hot keys** - This area contains clickable buttons for plugins.
1. **Seek Bar and Trim Marks** - You can drag the playhead (large circle) to scrub through the video or `space` bar to play/pause. You can use the arrow keys to advance one frame at a time. Drag the small green circles at the end of the seek bar to set trim marks. Trim marks directly inform the section of video/data to export.


### Starting Pupil Player

> {{< webp-img src="/images/pupil-player/pp_start.webp" alt="Starting Pupil Player" >}}

Drag the recording directory (the triple digit one) directly onto the app icon **or** launch the application and drag + drop the recording directory into Pupil Player window.

#### Workflow

```bash
# Running from source?

cd "path_to_pupil_dir/pupil_src/player"
python main.py "path/to/recording_directory"
```

Pupil Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

  + Start Pupil Player
  + Opening a Plugin - From the `Settings` GUI menu load the `Vis Circle` plugin.
  + Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
  + Set trim marks - you can drag the small circles on the ends of the seek bar. This will set the start and end frame for the exporter.
  + Export Video & Raw Data - Load the `Video Export Launcher` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the `e` button in the left hand side of the window to start the export.
  + Check out exported data in the `exports` directory within your recording directory

<aside class="notice">
Note - Pupil Player will <strongn>ever</strongn> remove or overwrite any of your raw data gathered during capture. All exports are isolated within a sub-directory named <code>exports</code>.
</aside>

### Plugin Overview
Pupil Player uses the same Plugin framework found in Pupil Capture to add functionality.

We implement all visualizations, marker tracking, and the exporter using this structure. Very little work (often no work) needs to be done to make a Capture Plugin work for the Pupil Player and vice versa.

There are two general types of plugins:

  + **Unique** - You can only launch one instance of this plugin.
  + **Not unique** - You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixels thickness. You can think of these types of plugins as *additive*.

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

  + `falloff` - The distance (in pixels) at which the light begins to fall off (fade to black). A very low number will result in a very dark visualization with tiny white light points. A very large number will result in a visualization of the world view with little or no emphasis of the gaze positions.

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

### Analysis Plugins

These plugins are simple unique plugins, that operate on the gaze data for analysis and visualizations.

#### Manual Gaze Correction
This plugin allows one to manually offset the gaze position. The offset values are between `-1` and `1`. This plugin is **unique**, therefore you can only load one instance of this plugin. You can set the following parameters:

  + `x_offset` - the amount to offset the gaze position horizontally
  + `y_offset` - the amount to offset the gaze position vertically

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

#### Fixation Detector - Dispersion Duration

> {{< webp-img src="/images/pupil-player/plugin/2d-fixation.webp" alt="2D Fixation Detector" >}}

> {{< webp-img src="/images/pupil-player/plugin/3d-fixation.webp" alt="3D Fixation Detector" >}}

There two offline fixation detectors that are **unique** but exclusive to each other, therefore you can only load one instance of these plugins.

* `Gaze Position 2D Fixation Detector`
* `Pupil Angle 3D Fixation Detector`

Both plugins detect fixations based on dispersion-duration. This means that if
the pupil does not move more than a given distance (dispersion) in a given time
period (duration) the plugin will classify the pupil positions during this time
range as a fixation.

The 2D fixation detector uses the distance to the mean gaze position as dispersion
measure. This is a fast method but only approximates the actual dispersion and
relies on a correct calibration.

The 3D fixation detector calculates the pairwise angle between all pupil
oberservations in the given duration and takes the maximum angle as dispersion
measure. This requires more computational resources than the 2D fixation detector
but calculates the correct dispersion instead of an approximation and does not
require a calibration to calculate it.

Toggle `Show fixations` to show a visualization of fixations. The blue number is the number of the fixation (0 being the first fixation). You can export fixation reports for your current trim section by pressing `e` on your keyboard or the `e` hot key button in the left hand side of the window.

### Export
You can export data and videos by pressing `e` on your keyboard or the `e` hot key button in the Pupil Player window.

All open plugins that have export capability will export when you press `e`. All exports are separated from your raw data and contained in the `exports` sub-directory. The exports directory lives within your recording directory.

#### Exports directory

> {{< webp-img src="/images/pupil-player/recording/recording_folder_exports_v07.webp" alt="Recording folder" >}}

All exports are saved within the `exports` sub-directory within your recording directory.
A new directory will be created within the `exports` directory named with the `start` frame and `end` frame that is specified by the trim marks.

#### Video Export Launcher

> {{< webp-img src="/images/pupil-player/plugin/export.webp" alt="Video Export Launcher plugin" >}}

To export a video, load the `Export Video` plugin. You can select the frame range to export by setting trim marks in the seek bar or directly in the plugin GUI.

You can specify the name of the export in the GUI. Click press the `e` button or click `e` on your keyboard to start the export.

The exporter will run in the background and you can see the progress bar of the export in the GUI. While exporting you can continue working with Pupil Player and even launch new exports.

#### Raw Data Exporter

> {{< webp-img src="/images/pupil-player/plugin/rawexport.webp" alt="Raw Data Exporter plugin" >}}

To export `.csv` files of your data, load the `Raw Data Exporter` plugin. You can select the frame range to export by setting trim marks in the seek bar or directly in the plugin GUI.

Click press the `e` button or click `e` on your keyboard to start the export.

#### Batch Exporter
You can use this plugin to apply visualizations to an entire directory (folder) of recordings in one batch. You need to specify the following:

  + `Recording source directory` - a directory (folder) that contains one or more Pupil recording folder.
  + `Recording destination directory` - an existing directory (folder) where you want to save the visualizations.

### Data Producers

Producer plugins provide data of a specific topic -- currently pupil or gaze
data -- to other plugins. There is exactly one active plugin for each topic.

* Topic: Pupil positions
    * `Pupil from recording`
    * `Offline pupil detection`

* Topic: gaze positions
    * `Gaze from recording`
    * `Offline calibration`

Interim results are cache in the `offline_results` directory within the recording folder.

#### Pupil from recording

Loads pupil positions that were calculated and saved during a Pupil Capture
recording.

#### Gaze from recording

Loads gaze positions that were mapped after a successful calibration in Pupil Capture.

#### Offline pupil detection

Runs the pupil detection algorithm in Pupil Player. This requires an existing
video recording of the eye(s). The plugin can run the `3d` as well as the `2d`
detection method. At the beginning, it checks if a video file is present for
each eye and opens eye windows accordingly (similar to Pupil Capture).

<aside class="notice">
This plugin is especially useful for local Pupil Mobile recordings since the
app does not run the pupil detection on its own.
</aside>

The pupil detection algorithm will only run as long as the eye window is open.
This means that you can run monocular detection by simply closing the eye window
in which you are not interested in. Reload the plugin to reinitiate all available
eye processes.

The `Redetect` button restarts the detection procedure. This is especially useful
when using the `3d` method, since the model that was built-up in the previous
run can be reused for the new run. This way, you can calculate `3d` pupil positions
at the beginning of the recording where the model usually needs to be built-up
first.

#### Offline calibration

This plugin executes three tasks:

1. Search calibration markers within the `world` video.
1. Run calibration given reference and pupil positions.
1. Map pupil to gaze positions given the calibration result.

The calibration marker detection runs initially once per recording. The resulting
reference positions are cached in the `offlne_calibration` file. `Redetect` reruns
the detection procedure.

The plugin allows you to create multiple calibration sections. Each calibration section contains two frame ranges -- the `calibration range` and the `mapping range`.
Each frame range is of the following format `a - b` where `a` and `b` are world
frame indices. Following the Python convention, indices are zero-based and frame `b`
is not included. The default section's ranges are set to the maximum width.

The calibration range tells the plugin which reference and pupil positions it
should consider to run the calibration. The mapping range denotes the pupil
positions that will be mapped after a successful calibration. The plugin will
choose the mapping mode (`3d` or `2d`) automatically depending on which data
it encounters.

<aside class="notice">
Note that you will have duplicated gaze positions if two mapping ranges intersect.
</aside>

Each section is represented by a colored bar above the seek bar. The thicker part
denotes the calibration range while the thin part denotes the mapping range.

<aside class="notice">
The colored bars might intersect with the progress indicators of the offline
surface tracker. This is only a visual bug and does not influence the functionality
of neither plugin. We hope to get this fixed in the near future.
</aside>

### Developing your own Plugin
To develop your own plugin see the <a href="#plugin-guide">developer guide</a>.


