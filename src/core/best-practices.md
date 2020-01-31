---
permalink: /core/best-practices
---

# Best Practices
*Tips for conducting eye-tracking experiments with Pupil Core.*


## Calibrating

### Calibrate with Points That Resemble the Experimental Condition
If your stimuli are at a fixed distance to the participant, make sure to place calibration points only at this distance. If the distance of your stimuli varies, place calibration points at varying distances. Make sure that your calibration points cover the outermost bounds of your gaze. Choose a calibration background color and brightness that matches your stimuli.

### Validate Your Calibration
Perform a validation after the calibration to check the accuracy. If the validation reports a high accuracy error, you need to perform another calibration. Make sure to use different points for validation than you used for calibration.


## Avoiding Slippage
Slippage is the effect of the headset slipping on the participant’s head. Slippage is almost inevitable if the participant moves their head or facial muscles. Slippage will lead to reduced accuracy and can accumulate over time.

### Split Your Experiment into Blocks
If your experiment allows for small breaks in between tasks, then you should consider splitting your experiment it into blocks. For every block you should re-calibrate (and validate) at the beginning to reset any accumulated slippage errors.

### Choose the Right Pipeline
The 2D detection and mapping pipeline has the best accuracy in perfect conditions (< 1° visual error). However, it is very sensitive to slippage. Chose the 2D pipeline if:
- Your participants do not need to move their heads.
- You can have very short blocks.
- You want the best possible accuracy.
- You don't need features from the 3D pipeline, like pupil diameter in millimeters. 

The 3D pipeline will adapt itself over time to compensate for slippage errors. The tradeoff is that the best accuracy in perfect conditions is slightly below the accuracy of the 2D pipeline (~1.0°–2.0° visual error). Note that slippage will still have an effect on very long recordings. Chose the 3D pipeline if:
- Your participants need to move their heads.
- You cannot split your experiment into small blocks.


## Record Everything
We recommend starting to record prior to calibration. This is valuable because it enables you to capture all the data needed for pupil detection and calibration so that you can make parameter adjustments, and even recalibrate post-hoc in Pupil Player. Below is a recommended protocol: 
1. Start recording in Pupil Capture.
1. Ask the participant to slowly look around while keeping the head stable for a couple of seconds to sample different gaze angles. This will allow the 3D model to stabilize at the start. Do this even if you are not using the 3D pipeline to allow for comparison in offline mode.
1. Perform a calibration.
1. Perform a validation. If the error is too high, restart the block.
1. Perform your experiment.
1. Perform another validation. This can give you an estimate of how much slippage error you accumulated during the experiment. If you are recording multiple blocks with a non-fixed calibration setup, you can also re-use the calibration session of the following block as post-validation for the previous block.
1. Stop recording.


## Participants
The less movement you participants will exhibit during an experiment, the more accurate your results will be. This includes movements of head, but also of facial muscles. In order to minimiza unnecessary movement, you should:
- Make sure the participant is in a comfortable position that they can maintain during the experiment.
- Make sure the participant can read all instructions comfortable and does not need to squint.
- Ask your participant to keep a relaxed facial expression during the experiment.
- Ask your participant to not touch the headset (e.g. by scratching their head). If they need to interrupt the block, they should ask and you will need to restart the block and recalibrate.
