# Fixation Detector

<!-- TODO: Add tunable parameters in the fixation as table -->

Neon Player runs the same [Fixation Detector](./../../data-collection/data-streams/#fixations-saccades) employed in Pupil Cloud.
It calculates fixations for the whole recording. The menu gives feedback about the progress of the detection, how many
fixations were found, and shows detailed information about the current fixation.

With this plugin enabled, Neon Player also extracts [saccades from detected fixations](./../../data-collection/data-streams/#fixations-saccades) across the whole recording, again in the same way as Pupil Cloud.

![Fixations](./np-fixation.webp)

The `Show fixations` toggle enables or disables visualization of fixations. You can modify the appearance of the fixations
in the menu. The blue number next to the fixation circle corresponds to the fixation ID.

Press `f` or click the arrow buttons on the left-hand side of the window to seek forward or backward through fixations.

## Export Format

### Fixations

Fixation results exported to `fixations.csv` with the following fields:
| Field | Description |
| -------- | -------- |
| **fixation id** | Identifier of the fixation. The counter starts at the beginning of the recording. |
| **start&nbsp;timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the start of the fixation. |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the fixation. |
| **duration [ms]** | Duration of the fixation in milliseconds. |
| **fixation x [px]** | Float value representing the x-coordinate of the fixation in world camera pixel coordinates. This position is the average of all gaze samples within the fixation. |
| **fixation y [px]** | Same as "fixation x [px]" but for the y-coordinate. |

### Saccades

Saccade results exported to `saccades.csv` with the following fields:
| Field | Description |
| -------- | -------- |
| **saccade id** | Identifier of the saccade. The counter starts at the beginning of the recording. |
| **start&nbsp;timestamp&nbsp;[ns]** | UTC timestamp in nanoseconds of the start of the saccade. |
| **end timestamp [ns]** | UTC timestamp in nanoseconds of the end of the saccade. |
| **duration [ms]** | Duration of the saccade in milliseconds. |
| **amplitude [px]** | The saccade's amplitude in the scene camera coordinate system (pixels). |
| **amplitude [deg]** | The saccade's amplitude in the scene camera coordinate system (degrees). |
| **mean velocity [px/s]** | The mean (average) velocity over the saccade's trajectory. |
| **peak velocity [px/s]** | The peak (maximum) velocity over the saccade's trajectory. |
