+++
date = "2019-06-11T11:00:00+01:00"
section_weight = 4
page_weight = 5
+++

## Eye Movement Detector {#eye-movement-detector-main}

Eye movement classification detector based on segmented linear regression.

Event identification is based on segmentation that simultaneously denoises the signal and determines event boundaries. The full gaze position time-series is segmented into an approximately optimal piecewise linear function in O(n) time. Gaze feature parameters for classification into fixations, saccades, smooth pursuits and post-saccadic oscillations are derived from human labeling in a data-driven manner.[`[1]`](#nslr-hmm-paper)

More details about this approach can be found [here][nslr-hmm-paper].

The open source implementation can be found [here][nslr-hmm-repo].

### Usage {#em-usage}

#### Online Eye Movement Detector

This plugin detects eye movement from the last `max_sample_count` frames (defaults to `1000`). For every new frame, the frame buffer is re-classified and the last eye movement segment detection is published. This might result in a series of updates to an already published segment.

To see how to receive real-time eye movement classification notifications, please see [this script][eye-movement-helper-py].

#### Offline Eye Movement Detector

This plugin detects eye movement within a given duration window. Since the detector is able to process the entire frame buffer, the classified eye movement segments do not overlap.

### Eye Movement Format {#eye-movement-detector-format}

If 3d pupil data is available the eye movement will be classified based on the positional angle of the eye. These eye movement segments have their `base_type` field set to `"pupil"`. If no 3d pupil data is available the plugin will assume that the gaze data is calibrated and classify the eye movement in visual angle within the coordinate system of the world camera. These eye movement segments will have their `base_type` field set to `"gaze"`.

#### Capture

Real-time eye movement detection publishes notifications with the following structure:

- `id`: Identifier uniquely identifying the segment within a detection session
- `topic`: `eye_movement.fixation`, `eye_movement.saccade`, `eye_movement.pso` or `eye_movement.smooth_pursuit`
- `base_type`: `pupil` or `gaze`
- `segment_class`: `fixation`, `saccade`, `pso` or `smooth_pursuit`
- `timestamp`: Timestamp of the eye movement segment.
- `start_frame_index`: Index of the first segment frame, in the frame buffer.
- `end_frame_index`: Index **after** the last segment frame, in the frame buffer.
- `start_frame_timestamp`: Timestamp of the first frame, in the frame buffer.
- `end_frame_timestamp`: Timestamp of the last frame, in the frame buffer.

#### Player

Offline eye movement detection results are exported to `eye_movement_by_segment.csv`, with the following format:

- `id`: Identifier uniquely identifying the segment within a detection session
- `base_type`: `pupil` or `gaze`
- `segment_class`: `fixation`, `saccade`, `pso` or `smooth_pursuit`
- `start_frame_index`: Index of the first segment frame, in the frame buffer.
- `end_frame_index`: Index **after** the last segment frame, in the frame buffer.
- `start_timestamp`: Timestamp of the first frame, in the frame buffer.
- `end_timestamp`: Timestamp of the last frame, in the frame buffer.
- `duration`: Eye movement segment duration, in milliseconds.
- `confidence`: Average pupil confidence.
- `norm_pos_x`: Mean normalized position's `x` coordinate.
- `norm_pos_y`: Mean normalized position's `x` coordinate.
- `gaze_point_3d_x`: Mean 3d gaze point's `x` coordinate, only available if `"pupil"` `base_type` was used
- `gaze_point_3d_y`: Mean 3d gaze point's `y` coordinate, only available if `"pupil"` `base_type` was used
- `gaze_point_3d_z`: Mean 3d gaze point's `z` coordinate, only available if `"pupil"` `base_type` was used



[nslr-hmm-paper]: https://www.nature.com/articles/s41598-017-17983-x
[nslr-hmm-repo]: https://gitlab.com/nslr/nslr-hmm
[eye-movement-helper-py]: https://github.com/pupil-labs/pupil-helpers/blob/master/python/filter_eye_movement.py
