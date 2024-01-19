# Surface Tracker
<!-- TODO: Coordinates differ from marker mapper, top-left/ botom-left origin -->

You can use this plugin to detect markers in the recording, define surfaces, edit surfaces, and create and export visualizations of gaze data within the defined surfaces.

![Offline surface tracker](./offline-srf-tracker.jpg)

## Setup

Ensure that your recording contains AprilTag Markers, like the ones you would use with the [Marker Mapper](./../../pupil-cloud/enrichments/marker-mapper/#setup).

## Workflow

Here is an example workflow for using the `Surface Tracker` plugin to generate heatmap visualizations and export surface data reports:

  + Load the `Surface Tracker` plugin - if you already have surfaces defined, the load may take a few seconds because the plugin will look through the entire video and cache the detected surfaces.
  + Add surface - if you do not have any defined surfaces, you can click on the `Add surface` button when the markers you want to user are visible or just click the circular `A` button in the left hand side of the screen.
  + Surface name and size - in the `Surface Tracker` menu GUI, define the surface name and real world size.


## Export Format
Results exported to the subfolder `surfaces`. The different reported metrics are:

  + `surface_visibility.csv` - Overview of how many world camera frames each surface was contained in.
  + `surface_gaze_distribution.csv` - Overview of how many gaze samples have been collected on each individual surface and outside of surfaces.
  + `surface_events.csv` - List of image-enter and image-exit events for all surfaces.

Further the following metrics are reported for every individual surface.
Each surface has a name, which can be manually set as described above.
This name is augmented by an automatically generated numerical identifier.

  + `heatmap_<surface_name>.png` - Heatmap of gaze positions on the surface aggregated over the entire export.
  + `gaze_positions_on_surface_<surface_name>.csv` - A list of gaze datums on the surface.
  The values include the gaze point in two different coordinates systems.
  `x_norm` and `y_norm` are coordinates between 0 and 1, where `(0,0)` is the top left corner of the surface and `(1,1)` is the bottom right corner.
  `x_scaled` and `y_scaled` contain the same coordinates but scaled with the size defined for the surface.
  + `surf_positions_<surface_name>` - List of surface positions in 3D.
  The position is given as the 3D pose of the surface in relation to the current position of the scene camera.
  `img_to_surf_trans` is a matrix transforming coordinates from the camera coordinate system to the surface coordinate system.
  `surf_to_img_trans` is the inverse of `img_to_surf_trans`.

Additionally, the `Surface Tracker` exports the detected markers to the `marker_detections.csv` file. The `world_index` column represents the scene video frame index, `marker_uid` is the label used for identifying a single marker, and `corner_<0|1|2|3>_<x|y>` is the corner coordinate in pixel space.