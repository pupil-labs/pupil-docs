# Plugins

Neon Player uses a plugin architecture to add functionality, all data streams are implemented using this structure and each can be activated or deactivated on demand in the sidebar.

Different plugins have different configurable options depending on their functionality.

## Installed Plugins

These are the plugins that are installed by default. Most of them load the corresponding data stream, add a track in the timeline, and export the data in .csv format. Some of them also provide visualizations in the video player.

| Plugin             | Description                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Audio**          | When loaded, it will display the audio waveform in the timeline.                                                                                                                                                                    |
|                    | NOTE It would be great to export audio timestamps, and add an an option to mute audio in the video export.                                                                                                                          |
| **Blinks**         | Adds blink events to the timeline, and exports them in .csv format. Blinks are detected based on the eye state stream, so they will only be present if the eye state stream is loaded in the recording.                             |
| **Events**         | See [Events](../events/).                                                                                                                                                                                                           |
| **Export All**     | Allows you to export all data from all enabled plugins together.                                                                                                                                                                    |
| **Eye Overlay**    | Adds an eyes overlay to the video player, it can be dragged around and resized in the video player. You can also modify it's opacity, or add a border around and change it's appearance.                                            |
| **Eye State**      | Allows you to add a track in the timeline with the different [eye state](../../data-collection/data-streams/#_3d-eye-poses) data, and also exports it in .csv format.                                                               |
| **Fixations**      | Adds fixation events to the timeline, and exports them in .csv format, it will also generate the saccades.csv file.                                                                                                                 |
| **Gaze Data**      | This plugin handles gaze offset correction, and exports gaze data. It is active by default and also provides a way to create visualizations of the gaze data in the video player.                                                   |
| **IMU**            | When loaded, it will display the IMU data in the timeline.                                                                                                                                                                          |
| **Scene Renderer** | This plugin loads the scene camera and allows you to modify the brightness and contrast of the world video, as well as allow you to show the frame index at the bottom left of the video. You can remove it to visualize gaze only. |
| **Video Exporter** | Allows you to export or copy a current frame with                                                                                                                                                                                   |

::: DANGER TODO
Rather than a table we can have a h3
:::
