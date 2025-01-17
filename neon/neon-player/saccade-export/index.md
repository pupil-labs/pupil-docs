# Saccade Export

Neon Player extracts [saccades from detected fixations](./../../data-collection/data-streams/#fixations-saccades) in the same way as Pupil Cloud. The [Fixation Detector](../fixation-detector/) needs to be enabled for saccades to be computed.
Saccades are extracted across the whole recording. The progress is shown on Neon Player's Fixation Detector menu button.

## Export Format

Results exported to `saccades.csv` with the following fields:
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
