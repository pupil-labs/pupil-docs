+++
date = "2017-01-20T11:04:13+07:00"
section_weight = 4
page_weight = 4
+++

## Fixation Detector

In [`[1]`](SalvucciGoldberg), Salvucci and Goldberg define different categories of fixation detectors. One of them describes dispersion-based algorithms:

I-DT identifies fixations as groups of consecutive points within a particular dispersion, or maximum separation. Because fixations typically have a duration of at least 100 ms, dispersion-based identification techniques often incorporate a minimum duration threshold of 100-200 ms to help alleviate equipment variability.

Pupils fixation detectors implement such dispersion-based algorithms.

[`[1]`](SalvucciGoldberg) Salvucci, D. D., & Goldberg, J. H. (2000, November). Identifying fixations and saccades in eye-tracking protocols. In Proceedings of the 2000 symposium on Eye tracking research & applications (pp. 71-78). ACM.

### Usage {#fd-usage}

#### Online Fixation Detector

This plugin detects fixations based on a dispersion threshold in terms of
degrees of visual angle with a minimal duration. It publishes the fixation
as soon as it complies with the constraints (dispersion and duration). This
might result in a series of overlapping fixations.

1. Maximum Dispersion (spatial, degree): Maximal distance between all gaze locations during a fixation.
2. Minimum Duration (temporal, milliseconds): The minimal duration in which the dispersion threshold must not be exceeded.
3. Confidence Threshold: Data with a lower confidence than this threshold is not considered during fixation detection.

#### Offline Fixation Detector

This plugin detects fixations based on a dispersion threshold in terms of
degrees of visual angle within a given duration window. It tries to maximize
the length of classified fixations within the duration window, e.g. instead
of creating two consecutive fixations of length 300 ms it creates a single
fixation with length 600 ms. Fixations do not overlap.

1. Maximum Dispersion (spatial, degree): Maximal distance between all gaze locations during a fixation.
2. Minimum Duration (temporal, milliseconds): The minimal duration in which the dispersion threshold must not be exceeded.
2. Maximum Duration (temporal, milliseconds): The maximum duration in which the dispersion threshold must not be exceeded.


### Fixation Format

If 3d pupil data is available the fixation dispersion will be calculated
based on the positional angle of the eye. These fixations have their method
field set to "pupil". If no 3d pupil data is available the plugin will
assume that the gaze data is calibrated and calculate the dispersion in
visual angle within the coordinate system of the world camera. These
fixations will have their method field set to "gaze".

#### Capture
Fixations are represented as dictionaries consisting of the following keys:

- `topic`: Static field set to `fixation`
- `norm_pos`: Normalized position of the fixation's centroid
- `base_data`: Gaze data that the fixation is based on
- `duration`: Exact fixation duration, in milliseconds
- `dispersion`: Dispersion, in degrees
- `timestamp`: Timestamp of the first related gaze datum
- `confidence`: Average pupil confidence
- `method`: `pupil` or `gaze`

- `gaze_point_3d`: Mean 3d gaze point, only available if `pupil` method was used

#### Player
Player detected fixations also include:

- `start_frame_index`: Index of the first related frame
- `mid_frame_index`: Index of the median related frame
- `end_frame_index`: Index of the last related frame

[SalvucciGoldberg]: http://www.gruberpeplab.com/teaching/psych231_fall2013/documents/231_SalvucciGoldberg2000.pdf
