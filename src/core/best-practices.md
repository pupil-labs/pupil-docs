---
permalink: /core/best-practices
description: Tips for conducting eye tracking experiments with the Pupil Core eye tracking platform.
---

# Best Practices

_Tips for conducting eye tracking experiments with the Pupil Core eye tracking platform._

## Calibrating

### Calibrate with Points That Resemble the Experimental Condition

If your stimuli are at a fixed distance to the participant, make sure to place calibration points only at this distance. If the distance of your stimuli varies, place calibration points at varying distances. Make sure that your calibration points cover the outermost bounds of your gaze. Choose a calibration background color and brightness that matches your stimuli.

### Validate Your Calibration

Perform a validation after the calibration to check the accuracy. If the validation reports a high accuracy error, you need to perform another calibration. Make sure to use different points for validation than you used for calibration.

## Avoiding Slippage

Slippage is the effect of the headset slipping on the participant’s head. Slippage is almost inevitable if the participant moves their head or facial muscles. Slippage will lead to reduced accuracy and can accumulate over time.

### Split Your Experiment into Blocks

If your experiment allows for small breaks in between tasks, then you should consider splitting your experiment it into blocks. For every block you should re-calibrate (and validate) at the beginning to reset any accumulated slippage errors.

### Choose the Right Gaze Mapping Pipeline

In the calibration menu you can select a gaze mapping pipeline. By default Pupil offers a 2D and a 3D pipeline, which have different tradeoffs.

The 2D pipeline offers the best accuracy under _ideal_ conditions (< 1° visual error). However, it is very sensitive to slippage. Choose the 2D pipeline if:

- Your participants do not need to move their heads.
- You can have very short blocks.
- You want the best possible accuracy.

The 3D pipeline will adapt over time to compensate for slippage errors. The tradeoff is that the best accuracy in perfect conditions is slightly below the accuracy of the 2D pipeline (~1.0°–2.0° visual error). Note that slippage will still have an effect on very long recordings. Chose the 3D pipeline if:

- Your participants need to move their heads.
- You cannot split your experiment into small blocks.

## Record Everything

We recommend starting to record prior to calibration. This is valuable because it enables you to capture all the data needed for pupil detection and calibration so that you can make parameter adjustments, and even recalibrate post-hoc in Pupil Player. Below is a recommended protocol:

1. Start recording in Pupil Capture.
2. Ask the participant to slowly look around while keeping the head stable for a couple of seconds to sample different gaze angles. This will allow the eye model to stabilize at the start.
3. Perform a calibration.
4. Perform a validation. If the error is too high, restart the block.
5. Perform your experiment.
6. Perform another validation. This can give you an estimate of how much slippage error you accumulated during the experiment. If you are recording multiple blocks with a non-fixed calibration setup, you can also re-use the calibration session of the following block as post-validation for the previous block.
7. Stop recording.

## Participants

The less movement your participants will exhibit during an experiment, the more accurate your results will be. This includes movements of head, but also of facial muscles. In order to minimize unnecessary movement, you should:

- Make sure the participant is in a comfortable position that they can maintain during the experiment.
- Make sure the participant can comfortably read all instructions and does not need to squint.
- Note: If the participant can keep a relaxed face during the experiment this will minimize slippage.
- Ask your participant to not touch the headset (e.g. by scratching their head). If they need to interrupt the block, they should ask and you will need to restart the block and recalibrate.

## Fixation Filter Thresholds

Choosing appropriate thresholds depends on the nature of the viewing task. It is worth noting that 
there is no 'gold standard' approach to choosing which thresholds to use. Often a decision is 
reached based on previous literature and/or professional judgment following inspection of gaze data
and classified fixations. As an example, we refer the reader to [this paper](https://link.springer.com/content/pdf/10.3758%2FAPP.71.4.881.pdf)
which provides a quantitative analysis of dispersion thresholds for chess players.

### Errors

Depending on the parameter configuration, the fixation detector can make three types of errors:

**A.** False negatives - Actual fixations are not being detected, e.g. due to maximum dispersion too 
low; minimum duration too high  
**B.** False positives - Multiple actual fixations including their connecting eye movement
(e.g. saccades) are being detected as a single fixation, e.g. due to maximum dispersion too high  
**C.** Too many consecutive true positives that could be grouped to a single fixation, e.g. due to 
maximum duration too low, or maximum dispersion too low

### Typical Scenarios

Here we consider three scenarios and how the choice of filter thresholds might influence 
classified fixations.

1. A seated person fixates a static target. Their head is mostly stationary. Only small compensatory 
eye rotations are needed to keep the target stabilised on the fovea. Fixations are long.

	In this task, setting maximum duration too low could lead to type C errors. If a fixation lasts 400ms, 
	filtering with a maximum duration of 200ms will classify two fixations instead of one. Ensure the maximum 
	duration accommodates your expected fixation durations. 

2. A seated person scans for appearing targets which disappear suddenly. They initiate many short rapid shifts of gaze from one region to another, interspersed by short fixations. 

	Setting minimum duration too high in this task could lead to missed classifications (type A errors). If 
	fixations are around 120ms, but the minimum duration is 400ms, fixations go undetected. Setting the 
	minimum duration too low can lead to very short detections that one would not consider a fixation 
	(type B error). Ensure the minimum duration is appropriate for the viewing task.

3. A dynamic environment where a walking person gazes at a sign. Their head is moving considerably when 
compared to the previous tasks. Larger compensatory eye rotations are needed to stabilise the region of 
interest on the fovea due to cyclic movements of the head and forward progression. The recorded gaze points 
are dispersed over a greater area (this is an inherent issue with detecting fixations in scene camera space 
instead of the real world). 

	Setting the maximum dispersion too low could lead to false negatives (type A error) or a series of 
	consecutive detections that should have been grouped to a single fixation (type C error). For example, 
	if the gaze points are dispersed over 2 degrees due to bigger eye rotations, filtering with a maximum 
	dispersion of 1 degree could classify two separate fixations instead of one. Setting the maximum 
	dispersion too high might group fixations together that should have been considered separate fixations. 
	Ensure the maximum dispersion accommodates your viewing task. 

