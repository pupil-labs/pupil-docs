# Fixation & Blink Detectors

TODO: This content need to be largely reworked as Neon Player uses very different fixation and blink detectors.

## Fixation Detector
The post-hoc fixation detector calculates fixations for the whole recording. The menu gives feedback about the progress of the detection, how many fixations were found, and shows detailed information about the current fixation. Press `f` or click the `f` hot key button on the left hand side of the window to seek forward to the next fixation.

![Fixations](./pg-fixation.jpg)

Toggle `Show fixations` to show a visualization of fixations. The blue number is the number of the fixation (0 being the first fixation). You can export fixation reports for your current trim section by pressing `e` on your keyboard or the `e` hot key button on the left hand side of the window.


## Blink Detector
Pupil Core's Blink Detector leverages the fact that 2D pupil confidence drops rapidly 
in both eyes during a blink as the pupil becomes obscured by the eyelid, followed by a rapid 
rise in confidence as the pupil becomes visible again.

The Blink Detector processes 2D pupil confidencevalues by convolving them with a 
[filter](https://github.com/pupil-labs/pupil/blob/eb8c2324f3fd558858ce33f3816972d93e02fcc6/pupil_src/shared_modules/blink_detection.py#L360). 
The filter response – called 'activity' – spikes the sharper the confidence drop is and *vice versa* for confidence 
increases. 

Blinks are subsequently detected based on onset and offset confidence thresholds and a filter length in seconds.

- **Onset Confidence Threshold:** The threshold that the filter response ('Activity') must rise above to classify the
  onset of a blink, corresponding to a sudden **drop** in 2D pupil detection confidence
- **Offset Confidence Threshold:** The threshold that the filter response ('Activity') must fall below to classify the 
  end of a blink, corresponding to a **rise** in 2D pupil detection confidence
- **Filter Length:** The time window's length in which the detector tries to find confidence drops and gains

In Pupil Player, the green data series labelled 'Activity' is the filter response, and the yellow bars that denote 
onset and offset confidence are above and below this, respectively. The blink detection result is shown by the red 
line, characterised by a step function where blinks have been classified.

![Blinks](./pp-blinks.jpg)

:::tip
See our Best Practices] for tips on choosing 
appropriate Blink Detector thresholds
:::

Results are exported in `blinks.csv` with the following columns:
| Key                 | Description                                                |
|:--------------------|:-----------------------------------------------------------|
| `id`                | Numerical ID of blink                                      |
| `start_timestamp`   | Blink end timestamp (s)                                    |
| `duration`          | Blink duration (s)                                         |
| `end_timestamp`     | Blink start timestamp (s)                                  |
| `start_frame_index` | Blink start world frame index                              |
| `index`             | Blink median world frame index                             |
| `end_frame_index`   | Blink end world frame index                                |
| `confidence`        | Mean of absolute filter response during blink clamped at 1 | 
| `filter_response`   | Filter response ('Activity') during blink                  |
| `base_data`         | Timestamps of data associated with blink                   |

:::tip
Blink count is included in the `blink_detection_report.csv`
:::