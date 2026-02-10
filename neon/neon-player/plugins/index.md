# Plugins

Neon Player uses a plugin architecture to add functionality. All data streams are implemented using this scheme, 
and each can be added or removed on demand in the sidebar.

Different plugins have different configurable options depending on their functionality.

## Installed Plugins

These plugins are installed by default. Most of them load the corresponding data stream, add a track in 
the timeline, and export data in .csv format. Some of them also generate visualizations in the video player.

---

| Plugins              | Description                                                                                                                                                                                             |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Audio                | Enables audio playback and displays a waveform in the timeline.                                                                                                                                         |
| Blinks               | Adds blink events to the timeline and exports them in `.csv` format. Requires the [eye state](../../data-collection/data-streams/#_3d-eye-poses) data stream to be present in the raw native recording. |
| Events               | Manages recording events. (See the [Events](../events/) section for details).                                                                                                                           |
| Export All           | Exports data from all enabled plugins simultaneously.                                                                                                                                                   |
| Eye Overlay          | Adds a draggable, resizable eye overlay to the video player. Includes options to customize opacity, borders, and appearance.                                                                            |
| Eye State            | Adds tracks to the timeline displaying [eye state](../../data-collection/data-streams/#_3d-eye-poses) data and exports them in `.csv` format.                                                           |
| Fixations & Saccades | Adds [fixation and saccade](../../data-collection/data-streams/#fixations-saccades) events to the timeline and exports them in `.csv` format.                                                           |
| Gaze Data            | Handles gaze offset correction and exports [gaze](../../data-collection/data-streams/#gaze) data. It also renders gaze visualizations in the video player.                                              |
| IMU                  | Displays IMU (Inertial Measurement Unit) data in the timeline and exports in `.csv` format.                                                                                                             |
| Scene Renderer       | Loads the scene video. Allows adjustments to brightness and contrast, displays the frame index, or can be disabled to visualize gaze only.                                                              |
| Video Exporter       | Exports or copies the current frame (as an image) or scene (as a video) with all active visualizations applied.                                                                                         |

---
