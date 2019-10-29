---
permalink: /core/software/pupil-player
---

# Pupil Player
Pupil Player is the second tool you will use after Pupil Capture. It is a media and data visualizer at its core. You will use it to look at Pupil Capture recordings. Visualize your data and export it.

<div class="pb-4">
  <img src="../../media/core/icons/pp.png" style="display:flex;margin:0 auto;width:100px;">
</div>

## Load a recording
Drag the recording folder (the triple digit one) directly onto the app icon **or** launch the application and drag + drop the recording folder into the Pupil Player window.

<div class="pb-4">
  <img src="../../media/core/imgs/pp-start.jpg" style="display:flex;margin:0 auto;">
</div>

Don't have a recording yet? [Download a sample recording](https://drive.google.com/file/d/1nLbsrD0p5pEqQqa3V5J_lCmrGC1z4dsx/view?usp=sharing "Download sample recording to use in Pupil Player").

## Player Window
The Player window is the main control center for `Pupil Player`. It displays video and data recorded by [Pupil Capture](/core/software/pupil-capture), [Pupil Mobile](/core/software/pupil-mobile/), or [Pupil Invisible](/invisible/).

<div class="pb-4">
  <img src="../../media/core/imgs/pp-callout.jpg" style="display:flex;margin:0 auto;">
</div>

1. **Graphs**: This area contains performance graphs. By default the graphs `CPU`, `FPS`, and pupil algorithm detection confidence will be displayed. You can control graph settings with the `System Graphs` plugin.
1. **Hot keys**: This area contains clickable buttons for plugins.
1. **Timeline Events**: Plugins can add temporal events to this expandable panel.
1. **Timeline**: Control the playback of the video with the play/pause button (or spacebar on your keyboard). Drag the playhead (vertical line) to the desired point in time.
    - **Trimming**: Drag either end of the timeline to set a trim beginning and ending trim marks. The trim section marks directly inform the section of video/data to export.
    - **Frame Stepping**: You can use the arrow keys on your keyboard or the `<<` `>>` buttons to advance one frame at a time.
1. **Menu**: This area contains settings and contextual information for each plugin.
1. **Sidebar**: This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below the horizontal separator.

## Workflow

Pupil Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

- Start Pupil Player
- Open a Plugin - From the `Plugin Manager` GUI menu load the `Vis Circle` plugin.
- Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
- Set trim marks - you can drag the green rounded rectangle at the beginning and end of the seekbar to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
- Export Video & Raw Data - From the `Plugin Manager` view, load the `Video Export Launcher` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the `e` button in the left hand side of the window to start the export.
- Check out exported data in the `exports` directory within your recording directory

::: tip
<v-icon large color="info">info_outline</v-icon>
Pupil Player will <strong>never</strong> remove or overwrite any of your raw data gathered during capture. All exports are isolated within a sub-directory named <code>exports</code>. Exports will never be overwritten.
:::

## Plugins
Pupil Player uses the same Plugin framework found in Pupil Capture to add functionality.

Visualizations, marker tracking, and the exporter are all implemented using this structure. Very little work (often no work) needs to be done to make a Capture Plugin work for the Pupil Player and vice versa.

There are two general types of plugins:

- **Unique**: You can only launch one instance of this plugin.
- **Not unique**: You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixel thickness. You can think of these types of plugins as _additive_.

In the following sections we provide a summary of plugins currently available and in Pupil Player.

### Visualization Plugins
We will call plugins with the `Vis` prefix **visualization** plugins. These plugins are simple plugins, are mostly additive (or *not unique*), and directly operate on the gaze positions to produce visualizations. Other plugins like `Offline Surface Tracker` also produces visualizations, but will be discussed elsewhere due to the extent of its features.

#### Vis Circle
Visualize the gaze positions with a circle for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization.

<div class="pb-4">
  <img src="../../media/core/imgs/vis-circle.jpg" style="display:flex;margin:0 auto;">
</div>

You can set the following parameters:

  + `radius` - the radius of the circle around the gaze point.
  + `stroke width` - the thickness or width of the stoke in pixels.
  + `fill` - toggle on for a circle with solid fill. Toggle off for a circle with only stroke.
  + `color` - define the `red`, `green`, `blue` values for color. `Alpha` defines the opacity of the stroke and fill.

Here we show an example of how you could use **2** instances of the `Vis Circle` Plugin. The first instance renders the gaze position as a filled yellow circle. The second instance renders the same gaze position as an orange stroke circle.

#### Vis Cross
Visualize the gaze positions with a cross for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

<div class="pb-4">
  <img src="../../media/core/imgs/vis-cross.jpg" style="display:flex;margin:0 auto;">
</div>

  + `inner offset length` - the distance in pixels to offset the interior cross endpoints from the gaze position. A value of `0` will make the crosshairs intersect the gaze position.
  + `outer length` - The length of the cross lines in pixels from the gaze position. Note - equal values of `inner offset length` and `outer length` will result in a cross with no length, and therefore not rendered.
  + `stroke width` - the thickness or width of the stoke in pixels.
  + `color` - define the `red`, `green`, `blue` values for color.

Here we show an example of how you could use **2** instances of the `Vis Cross` Plugin. The first instance renders the gaze position as a red cross with that extends to the boundaries of the screen. The second instance renders the gaze position as a green cross, with a heavier stroke weight.

#### Vis Scan Path
This plugin enables past gaze positions to stay visible for the duration of time specified by the user. This plugin is **unique**, therefore you can only load one instance of this plugin.

<div class="pb-4">
  <img src="../../media/core/imgs/vis-scanpath.jpg" style="display:flex;margin:0 auto;">
</div>

On its own, `Scan Path` does not render anything to the screen. It is designed to be used with other plugins. In some cases, it is even required to be enabled in order for other plugins to properly function. When used with `Vis` plugins (like `Vis Circle`, `Vis Cross`, `Vis Polyline`, or `Vis Light Points`) `Scan Path` will enable you to see both the current gaze positions and the past gaze positions for the specified duration of time.

Here we show an example of `Scan Path` set with `0.4` seconds duration used with `Vis Circle`. Each green circle is a gaze position within the last `0.4` seconds of the recording.

#### Vis Polyline
Visualize the gaze positions with a polyline for each gaze position.

<div class="pb-4">
  <img src="../../media/core/imgs/vis-polyline.jpg" style="display:flex;margin:0 auto;">
</div>

This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

  + `line thickness` - the thickness or width of the polyline stroke in pixels.
  + `color` - define the `red`, `green`, `blue` values for color.

An example showing `Vis Polyline` used with `Vis Circle` and `Scan Path`. The polyline enables one to visualize the sequence of the gaze positions over the duration specified by `Scan Path`.

#### Vis Light Points
Visualize the gaze positions as a point of light for each gaze position. The `falloff` of the light from the gaze position is specified by the user.

<div class="pb-4">
  <img src="../../media/core/imgs/vis-lightpoints.jpg" style="display:flex;margin:0 auto;">
</div>

This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. You can set the following parameters:

  + `falloff` - The distance (in pixels) at which the light begins to fall off (fade to black). A very low number will result in a very dark visualization with tiny white light points. A very large number will result in a visualization of the world view with little or no emphasis on the gaze positions.

Here is an example demonstrating `Vis Light Points` with a falloff of 73.

#### Vis Eye Video Overlay
Here is an example of the `Eye Video Overlay` with binocular eye videos.

<div class="pb-4">
  <img src="../../media/core/imgs/vis-eyeoverlay.jpg" style="display:flex;margin:0 auto;">
</div>

This plugin can be used to overlay the eye video on top of the world video. Note that the eye video is not recorded by default in Pupil Capture so if you want to use this plugin, make sure to check `record eye video` in Pupil Capture.

This plugin is **unique**, therefore you can only load one instance of this plugin. You can set the following parameters:

  + `opacity` - the opacity of the overlay eye video image. `1.0` is opaque and `0.0` is transparent.
  + `video scale` - use the slider to increase or decrease the size of the eye videos.
  + `move overlay` - toggle `on` and then click and drag eye video to move around in the player window. Toggle `off` when done moving the video frames.
  + `show` - show or hide eye video overlays.
  + `horiz. and vert. flip` - flip eye videos vertically or horizontally


### Analysis Plugins
These plugins are simple unique plugins, that operate on the gaze data for analysis and visualizations.

#### Offline Surface Tracker
This plugin is an offline version of the [Surface Tracking](/core/software/pupil-capture/#surface-tracking) plugin for Pupil Capture.
You can use this plugin to detect markers in the recording, define surfaces, edit surfaces, and create and export visualizations of gaze data within the defined surfaces.

<div class="pb-4">
  <img src="../../media/core/imgs/offline-srf-tracker.jpg" style="display:flex;margin:0 auto;">
</div>

Here is an example workflow for using the `Offline Surface Detector` plugin to generate heatmap visualizations and export surface data reports:

  + Load `Offline Surface Detector` plugin - if you already have surfaces defined, the load may take a few seconds because the plugin will look through the entire video and cache the detected surfaces.
  + Add surface - if you do not have any defined surfaces, you can click on the `Add surface` button when the markers you want to user are visible or just click the circular `A` button in the left hand side of the screen.
  + Surface name and size - In the `Marker Detector` GUI window, define the surface name and real world size.
  *Note* - defining size is important as it will affect how heatmaps are rendered.
  + Set trim marks - optional, but if you want to export data for a specific range, then you should set the trim marks.
  + Recalculate gaze distributions - click the `(Re)calculate gaze distributions` button after specifying surface sizes.
  You should now see heatmaps in the Player window (if gaze positions were within your defined surfaces).
  + Export gaze and surface data - click `e` and all surface metrics reports will be exported and saved for your trim section within your `export` folder.

All files generated by the `Offline Surface Detector` will be located in the subfolder `surfaces`.
The different reported metrics are:

  + `surface_visibility.csv` - Overview of how many world camera frames each surface was contained in.
  + `surface_gaze_distribution.csv` - Overview of how many gaze samples have been collected on each individual surface and outside of surfaces.
  + `surface_events.csv` - List of image-enter and image-exit events for all surfaces.

Further the following metrics are reported for every individual surface.
Each surface has a name, which can be manually set as described above.
This name is augmented by an automatically generated numerical identifier.

  + `heatmap_<surface_name>.png` - Heatmap of gaze positions on the surface aggregated over the entire export.
  + `gaze_positions_on_surface_<surface_name>.csv` - A list of gaze datums on the surface.
  The values include the gaze point in two different coordinates systems.
  `x_norm` and `y_norm` are coordinates between 0 and 1, where `(0,0)` is the bottom left corner of the surface and `(1,1)` is the top right corner.
  `x_scaled` and `y_scaled` contain the same coordinates but scaled with the size defined for the surface.
  + `surf_positions_<surface_name>` - List of surface positions in 3D.
  The position is given as the 3D pose of the surface in relation to the current position of the scene camera.
  `img_to_surf_trans` is a matrix transforming coordinates from the camera coordinate system to the surface coordinate system.
  `surf_to_img_trans` is the inverse of `img_to_surf_trans`.


#### Fixation Detector
The offline fixation detector calculates fixations for the whole recording. The menu gives feedback about the progress of the detection, how many fixations were found, shows and detailed information about the current fixation. Press `f` or click the `f` hot key button on the left hand side of the window to seek forward to the next fixation.

<div class="pb-4">
  <img src="../../media/core/imgs/pg-fixation.jpg" style="display:flex;margin:0 auto;">
</div>

Toggle `Show fixations` to show a visualization of fixations. The blue number is the number of the fixation (0 being the first fixation). You can export fixation reports for your current trim section by pressing `e` on your keyboard or the `e` hot key button on the left hand side of the window.

You can find more information in our [dedicated fixation detector section](/core/software/pupil-capture/#fixation-detector).

#### Head Pose Tracking
This plugin uses fiducial markers ([apriltag](https://april.eecs.umich.edu/software/apriltag.html)) to build a 3d model of the environment and track the headset's pose within it.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9x9h98tywFI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

See the [surface tracking section](/core/software/pupil-capture/#surface-tracking) for images of the markers to download.


### Pupil Data And Post-hoc Detection
By default, Player starts with the `Pupil From Recording` plugin that tries to load pupil positions that were detected and stored during a Pupil Capture recording.
Alternatively, one can run the pupil detection post-hoc.

**Offline (post-hoc) Pupil Detection and Gaze Mapping**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_Jnxi1OMMTc?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Offline (post-hoc) Gaze Mapping With Manual Reference Locations**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/mWyDQHhm7-w?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Use Offline (post-hoc) Calibration For Another Recording**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eEl3sswsTms?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Offline (post-hoc) Gaze Mapping Validation**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aPLnqu26tWI?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Offline Pupil Detector
The `Offline Pupil Detector` plugin can be used with any dataset where eye videos were recorded.
The plugin tries to load the eye videos, and runs the pupil detection algorithm in separate processes.
This plugin is especially relevant for recordings made with Pupil Mobile, because Pupil Mobile does not perform any pupil detection or gaze estimation on the Android device.
This plugin is available starting with Pupil Player `v0.9.13`.

The `Detection Method` selector sets the detection algorithm to either `2d` or `3d` detection (see [the section on Pupil Detection](/core/software/pupil-capture/#pupil-detector-2d-3d "Pupil Capture pupil detection 2d vs 3d mode") for details).
The `Redetect` button restarts the detection procedure.
You can use the `Offline Pupil Detector` plugin to debug, improve, and gain insight into the pupil detection process.

### Gaze Data And Post-hoc Calibration
By default, Player starts with the `Gaze From Recording` plugin that tries to load gaze positions that were detected and stored during a Pupil Capture recording.
Alternatively, one can run the gaze mapping process post-hoc.

#### Offline Calibration
The `Offline Calibration` plugin enables you to calibrate, map, and validate gaze post-hoc and is available starting with Pupil Player `v0.9.13`.
It can be used on any Pupil dataset.

The workflow is separated into three steps, each with its own submenu: Reference Locations, Calibrations, and Gaze Mappers.

Reference locations are points within the recorded world video that are known to have been fixated on by the participant/subject.
They can either be automatically detected or manually annotated:

1. `Detect Circle Markers in Recording`: This button starts the automatic detection of [circular calibration markers](/core/software/pupil-capture/#calibration-marker "Pupil circular calibration marker documentation") within the world video. The progress is visualized in the plugin's timeline.
2. `Manual Edit Mode`: When this option is enabled, you can add new locations as well as correct and delete existing ones. There can only be one location per world frame.

As in Capture, one can have more than one calibration per recording.
A calibration on its own does not result in gaze data.
Rather, it contains the required parameters to map pupil to gaze data.
Each has the following properties:

- `Name`: Used to correctly select a calibration for each gaze mapper (see below).
- `Mapping Method`: `2d` uses polynomial regression, or `3d` uses bundle adjustment calibration.
- `Reference Range`: Time range that indicates which reference locations to use.

Calibrations are stored as `plcal` files in the recording's `calibration` subfolder.
You can copy and apply them to recordings that do not include reference locations.
See the instructional video below for details.

In order to apply a calibration to pupil data, one needs a gaze mapper.
Each gaze mapper has the following properties:

- `Calibration`: One of the previously created or imported calibrations (see screencast)
- `Mapping Range`: Time range in which pupil data will be mapped to gaze data.
- `Manual Correction`: Apply a fixed offset to your gaze mapping.
- `Validation`: You can validate the accuracy and precision of the mapped gaze by comparing it to reference locations in the selected `Validation Range`. It uses the same methodology as the [`Accuracy Visualizer`](/core/software/pupil-capture/#notes-on-calibration-accuracy "Notes on calibration accuracy").

::: warning
<v-icon large color="warning">error_outline</v-icon>
Overlapping mapping ranges result in multiple gaze points per gaze datum.
This can be temporarly disabled by turning off the according gaze mapper's `Activate Gaze` option.
:::

::: tip
<v-icon large color="info">info_outline</v-icon>
You can compare `2d` and `3d` mapping results by creating two calibrations and gaze mappers with the same calibration and mapping ranges.
:::

### Developing your own Plugin
To develop your own plugin see the [developer guide](/developer/core/ "Pupil Core developer documentation").

## Export
You can export data and videos by pressing `e` on your keyboard or the `e` hot key button in the Pupil Player window.

All open plugins that have export capability will export when you press `e`.
Exports are separated from your raw data and contained in the `exports` sub-directory.
The exports directory lives within your recording directory.

Active video exporters will run in the background and you can see the progress bar of the export in the GUI. While exporting, you can continue working with Pupil Player and even launch new exports. Each video export creates at least one `mp4` and its respective file timestamp file. See the [Data Format](/developer/core/recording-format/ "Pupil Core recording format") section for details.

### Export Directory
Every export creates a new folder within the `exports` sub-directory of your recording. All data from the export is saved to this folder.


### Export Handling
You can select the frame range to export by setting trim marks in the seek bar or directly in the `General Settings` menu.

Longer running exports, e.g. video exports, go through three phases: Queued, Running, and Completed.
Export tasks can be cancelled while being queued or running.
Completed tasks are kept in the list for reference.

### World Video Exporter
The `World Video Exporter` is loaded by default.

<div class="pb-4">
  <img src="../../media/core/imgs/export.jpg" style="display:flex;margin:0 auto;">
</div>

The export saves the world video as shown in Player, including all currently active visualizations (see the [Visualization Plugins](#visualization-plugins "Pupil Player visualization plugins documentation") section).

### Eye Video Exporter
The `Eye Video Exporter` needs to be loaded explicitly through the Plugin Manager.
It includes the option to render the 2d pupil detection result into the exported video.

### iMotions Exporter
The iMotions Exporter creates data that can be used with [https://imotions.com/](https://imotions.com/ "iMotions website").

Specifically, it undistorts the world video images using the camera intrinsics. Gaze data is also undistorted and exported to the `gaze.tlv` file.

### Raw Data Exporter
The `Raw Data Exporter` exports pupil and gaze data to `.csv` files and is active by default.

<div class="pb-4">
  <img src="../../media/core/imgs/raw-export.jpg" style="display:flex;margin:0 auto;">
</div>

#### pupil_positions.csv
* `pupil_timestamp` - timestamp of the source image frame
* `world_index` - associated_frame: closest world video frame
* `eye_id` - 0 or 1 for left/right eye
* `confidence` - is an assessment by the pupil detector on how sure we can be on this measurement. A value of `0` indicates no confidence. `1` indicates perfect confidence. In our experience useful data carries a confidence value greater than ~0.6. A `confidence` of exactly `0` means that we don't know anything. So you should ignore the position data.
* `norm_pos_x` - x position in the eye image frame in normalized coordinates
* `norm_pos_y` - y position in the eye image frame in normalized coordinates
* `diameter` - diameter of the pupil in image pixels as observed in the eye image frame (is not corrected for perspective)
* `method` - string that indicates what detector was used to detect the pupil

Data made available by 2d pupil detection:

* `ellipse_center_x` - x center of the pupil in image pixels
* `ellipse_center_y` - y center of the pupil in image pixels
* `ellipse_axis_a` - first axis of the pupil ellipse in pixels
* `ellipse_axis_b` - second axis of the pupil ellipse in pixels
* `ellipse_angle` - angle of the ellipse in degrees

Data made available by 3d pupil detection:

* `diameter_3d` - diameter of the pupil scaled to mm based on anthropomorphic avg eye ball diameter and corrected for perspective.
* `model_confidence` - confidence of the current eye model (0-1)
* `model_id` - id of the current eye model. When a slippage is detected the model is replaced and the id changes.
* `sphere_center_x` - x pos of the eyeball sphere is eye pinhole camera 3d space units are scaled to mm.
* `sphere_center_y` - y pos of the eye ball sphere
* `sphere_center_z` - z pos of the eye ball sphere
* `sphere_radius` - radius of the eyeball. This is always 12mm (the anthropomorphic avg.) We need to make this assumption because of the `single camera scale ambiguity`.
* `circle_3d_center_x` - x center of the pupil as 3d circle in eye pinhole camera 3d space units are mm.
* `circle_3d_center_y` - y center of the pupil as 3d circle
* `circle_3d_center_z` - z center of the pupil as 3d circle
* `circle_3d_normal_x` - x normal of the pupil as 3d circle. Indicates the direction that the pupil points at in 3d space.
* `circle_3d_normal_y` - y normal of the pupil as 3d circle
* `circle_3d_normal_z` - z normal of the pupil as 3d circle
* `circle_3d_radius` - radius of the pupil as 3d circle. Same as `diameter_3d`
* `theta` - circle_3d_normal described in spherical coordinates
* `phi` - circle_3d_normal described in spherical coordinates
* `projected_sphere_center_x` - x center of the 3d sphere projected back onto the eye image frame. Units are in image pixels.
* `projected_sphere_center_y` - y center of the 3d sphere projected back onto the eye image frame
* `projected_sphere_axis_a` - first axis of the 3d sphere projection.
* `projected_sphere_axis_b` - second axis of the 3d sphere projection.
* `projected_sphere_angle` - angle of the 3d sphere projection. Units are degrees.

#### gaze_positions.csv
* `gaze_timestamp` - timestamp of the source image frame
* `world_index` - associated_frame: closest world video frame
* `confidence` - computed confidence between 0 (not confident) -1 (confident)
* `norm_pos_x` - x position in the world image frame in normalized coordinates
* `norm_pos_y` - y position in the world image frame in normalized coordinates

The fields below are _not_ available for Pupil Invisible recordings:

* `base_data` - "timestamp-id timestamp-id ..." of pupil data that this gaze position is computed from data made available by the 3d vector gaze mappers
* `gaze_point_3d_x` - x position of the 3d gaze point (the point the subject looks at) in the world camera coordinate system
* `gaze_point_3d_y` - y position of the 3d gaze point
* `gaze_point_3d_z` - z position of the 3d gaze point
* `eye_center0_3d_x` - x center of eye-ball 0 in the world camera coordinate system (of camera 0 for binocular systems or any eye camera for monocular system)
* `eye_center0_3d_y` - y center of eye-ball 0
* `eye_center0_3d_z` - z center of eye-ball 0
* `gaze_normal0_x` - x normal of the visual axis for eye 0 in the world camera coordinate system (of eye 0 for binocular systems or any eye for monocular system). The visual axis goes through the eye ball center and the object thats looked at.
* `gaze_normal0_y` - y normal of the visual axis for eye 0
* `gaze_normal0_z` - z normal of the visual axis for eye 0
* `eye_center1_3d_x` - x center of eye-ball 1 in the world camera coordinate system (not available for monocular setups.)
* `eye_center1_3d_y` - y center of eye-ball 1
* `eye_center1_3d_z` - z center of eye-ball 1
* `gaze_normal1_x` - x normal of the visual axis for eye 1 in the world camera coordinate system (not available for monocular setups.). The visual axis goes through the eye ball center and the object thats looked at.
* `gaze_normal1_y` - y normal of the visual axis for eye 1
* `gaze_normal1_z` - z normal of the visual axis for eye 1

### Annotation Export

The `Annotation Player` plugin loads any annotations generated during the recording, as
well as allows you to add annotations after the effect in Pupil Player. On export, the
plugin writes the annotation data to `annotations.csv`. It includes at least the
following keys:

- `index`: World frame index during which the annotation started or happened
- `timestamp`: Start time or timestamp of the annotation in Pupil time
- `label`: Annotation label
- `duration`: Duration of the annotation

::: tip
<v-icon large color="info">info_outline</v-icon>
Any custom field encountered in the annotations will be exported as an additional column.
Their values will be converted to strings using Python's string representation. Therefore,
it is recommended to use primitive types (strings, integers, floats) as value types for
custom fields.
:::