+++
date = "2017-01-20T11:04:13+07:00"
section_weight = 4
page_weight = 4
+++

## Fixation Detector

> I-DT identifies fixations as groups of consecutive points within a particular dispersion, or maximum separation. Because fixations typically have a duration of at least 100 ms, dispersion-based identification techniques often incorporate a minimum duration threshold of 100-200 ms to help alleviate equipment variability.

In [`[1]`](http://www.gruberpeplab.com/teaching/psych231_fall2013/documents/231_SalvucciGoldberg2000.pdf), Salvucci and Goldberg define different categories of fixation detectors. One of them describes dispersion-based algorithms:

The fixation detectors in Pupil Capture and Player implement such a dispersion-based algorithm. Player includes two different detector versions.

1. **Gaze Position 2D Fixation Detector** Legacy version, uses mean gaze positions as dispersion measure. Does not comply technically to the exact maximal dispersion, only approximates it.

2. **Pupil Angle 3D Fixation Detector** Uses the 3D model's pupil angle as dispersion measure. Therefore, it requires the 3D pupil detection to be active [[See below](#usage)]. Calculates the maximal pairwise angle for all corresponding pupil positions. This version includes a plugin for Pupil Capture that operates in an online fashion since it does not depend on a calibrated gaze mapper.

[`[1]`](http://www.gruberpeplab.com/teaching/psych231_fall2013/documents/231_SalvucciGoldberg2000.pdf) Salvucci, D. D., & Goldberg, J. H. (2000, November). Identifying fixations and saccades in eye-tracking protocols. In Proceedings of the 2000 symposium on Eye tracking research & applications (pp. 71-78). ACM.

### Parameters
As described above, Pupils fixation detectors implement dispersion-based algorithms. These have two parameters:

1. Dispersion Threshold (spatial, degree): Maximal distance between all gaze locations during a fixation. 
2. Duration Threshold (temporal, seconds): The minimal duration in which the dispersion threshold must not be exceeded.

### Usage

#### Activation
Any versions of the 3D fixation detector requires the 3D pupil data since it relies on the detected pupil angle for calculations. To activate 3D pupil detection, select `3D` in Capture's _General_ settings under _Detection & Mapping Mode_. In Player, it is currently not possible to generate the required 3D data from a recording that only includes 2D detected data.

In Capture, the _Fixation Detector 3D_ is loaded by default. In the future, it will be used to improve the calibration procedure.

In Player, the fixation detectors are not loaded by default. They are activated like every other plugin, too. See _area 2_ in [Getting Started — Player Window](#steps-player). Depending on the length of the recording, the Player window might freeze for a short time. This is due to the detector looking for fixations in the whole recording.

#### Data access
All fixation detectors augment the `events` object which is passed to each plugin's `update(frame,events)` method (see the [Plugin Guide](#hacking-plugin)). They add a list of fixation dictionaries under the key `'fixations'`. The exact format of these fixations is described [below](#fixation-format).

In Player, all fixations are known _a priori_ and can be referenced in all their related frames. In case of a long fixation, the detector will try to generate a single representation instead of multiple ones. In contrast, the detector in Capture will look for the shortest fixation that complies with the parameters above and add it once to `events` if it is found. The plugin will look for a new fixation afterwards. This means that a long fixation might be split into multiple fixation events. These difference in behavior is due to the different data availabilities in Capture and Player.

#### Visualisation
Use the _Vis Fixation_ Player plugin to visualise fixations. It will show a red dot during saccades and a green circle during fixations.

### Fixation Format

#### Capture
Fixations are represented as Python dictionaries consisting of the following keys:

- `norm_pos`: Normalized position of the fixation's centroid
- `base_data`: Pupil data during the fixation
- `duration`: Exact fixation duration,
- `dispersion`: Dispersion, in degree
- `timestamp`: Timestamp of the first related pupil datum
- `pupil_diameter`: Average pupil diameter
- `confidence`: Average pupil confidence
- `eye_id`: Eye id to which the fixation belongs

#### Player
Player detected fixations also include:

- `start_frame_index`: Index of the first related frame
- `mid_frame_index`: Index of the median related frame
- `end_frame_index`: Index of the last related frame
- `pix_dispersion`: Dispersion in pixels