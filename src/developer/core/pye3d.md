---
permalink: /developer/core/pye3d
description: A model-based 3d pupil detector with corneal refraction correction
---

# pye3d Pupil Detection

### pye3d uses a model-based approach

[`pye3d`][repo] implements a published mathematical 3D eye model capturing ocular kinematics and optics [1,2,3]. More specifically, frame-by-frame measurements of gaze direction and pupil size rely on eyeball-position estimates in the 3D coordinate system defined by the recording eye camera. Eyeball position itself is derived from geometric properties of past high-confidence 2D pupil observations by means of a least-squares intersection of lines [3]. 

### pye3d estimates eyeball position on different time scales

Due to potential slippage of any eye-tracking headset,  eyeball position cannot be assumed stationary over time. [`pye3d`][repo] therefore needs to strike a balance between taking into account pupil observations that are sufficiently recent in time, while at the same time collecting enough pupil observations for assuring eyeball-position estimates have the desired accuracy. To achieve this, [`pye3d`][repo] provides estimates of eyeball position on three different timescales, ranging from less than a second up to several minutes, and making appropriate downstream use of these potentially differing estimates. We refer to the three estimates of eyeball position as the ultra-long-term, long-term, and short-term model. 

### Support-building reflects model-specific ways of integrating past pupil observations

Spatial binning and temporal forgetting are employed for maintaining three independent sets of high-confidence pupil contours, one set for each time scale. Each eye model is thus fit to a tailored support of past pupil observations. Furthermore, to ensure robustness of model-fitting results in the face of sparse pupil observations, estimates from longer time scales are used as weak priors informing model fitting on shorter timescales.

Designed to reflect a longtime average eyeball position, the ultra-long-term model implements the most conservative support-building strategy. More specifically, supporting pupil observations are retained unless equivalent newer ones become available and older ones are deleted only when not reducing the total amount of observations below a pre-defined threshold. Parameters governing the support-building strategy are tuned such that the support of the ultra-long-term model is expected to contain pupil observations obtained over the most recent 1 - 5 minutes of recording. 

While the long-term model follows a similar support-building strategy, its parameters are adjusted to retain pupil observations predominantly from the last 5 - 25 seconds, thus being able to capture changes of eyeball position occurring on this time scale.

Finally, the short-term model is always fit based on the last 10 pupil observations of sufficient confidence only, with its support constantly being updated as new observations become available. The short-term model thus reflects the most recent changes in the user’s eye state, occurring on a sub-second time scale. 


### Each eye model serves a specific downstream purpose

While the ultra-long-term model is employed to enhance robustness when fitting eyeball position on shorter time scales, the long-term and short-term model are instrumental in deriving pupil-radius and gaze-direction measurements, respectively. Estimation of these quantities proceeds in two stages:
1. Raw estimates are derived based on the appropriate eye model
2. Raw estimates are then corrected for refraction effects occurring at corneal interfaces [2,3]

Since pupil-radius estimates scale with the distance of the estimated eyeball position to the recording camera [2], it is desirable to prevent excessive fluctuations in eyeball-position estimates due to measurement error. At the same time, for many use cases errors in absolute scale (changed by fluctuations in eyeball-position estimates) are less detrimental than errors in relative pupil sizes (less sensitive to the eyeball-position estimate). The long-term model therefore constitutes a deliberate compromise between stability and recentness.

The short-term model, which integrates only the most recent pupil observations, is used for calculating raw gaze-direction estimates and can be conceptualized as a gaze-direction aware filter reducing unavoidable detection noise affecting individual pupil observations. Note, shifts in eyeball position due to slippage lead to systematic errors in derived gaze directions. Recentness of the short-tem model is thus highly desirable, informing the employed support-building strategy. 

### Refraction correction is applied to account for non-linear ocular optics

[`pye3d`][repo] explicitly corrects for errors in raw pupil-size and gaze-direction estimates, which are incurred by the first stage not accounting for refraction (i.e. bending of light rays) occurring at corneal interfaces. To this end, raw measurements for each frame are run through a refraction-correction function [3], which takes the current raw gaze-direction and pupil-size estimates as input, as well as the eyeball-position estimate provided by the long-term model. Corrected values for all three quantities are provided. 

### Academic references

`[1]` [L. Świrski and N. A. Dodgson. A Fully-Automatic, Temporal Approach to Single Camera, Glint-Free 3D Eye Model Fitting. In Proceedings of ECEM 2013.](https://www.researchgate.net/publication/264658852_A_fully-automatic_temporal_approach_to_single_camera_glint-free_3D_eye_model_fitting "L. Świrski and N. A. Dodgson. A Fully-Automatic, Temporal Approach to Single Camera, Glint-Free 3D Eye Model Fitting. In Proceedings of ECEM 2013.")

`[2]` [K. Dierkes, M. Kassner, A. Bullling, A novel approach to single camera, glint-free 3D eye model fitting including corneal refraction. In ETRA ’18: Symposium on Eye Tracking Research and Applications, 2018.](https://www.researchgate.net/publication/325634500_A_novel_approach_to_single_camera_glint-free_3D_eye_model_fitting_including_corneal_refraction "K. Dierkes, M. Kassner, A. Bullling, A novel approach to single camera, glint-free 3D eye model fitting including corneal refraction. In ETRA ’18: Symposium on Eye Tracking Research and Applications, 2018.")

`[3]` [K. Dierkes, M. Kassner, A. Bulling. A fast approach to refraction-aware eye-model fitting and gaze prediction. In ETRA ’19: Symposium on Eye Tracking Research and Applications, 2019.](https://www.researchgate.net/publication/333490770_A_fast_approach_to_refraction-aware_eye-model_fitting_and_gaze_prediction "K. Dierkes, M. Kassner, A. Bulling. A fast approach to refraction-aware eye-model fitting and gaze prediction. In ETRA ’19: Symposium on Eye Tracking Research and Applications, 2019.")

[repo]: https://github.com/pupil-labs/pye3d-detector/
