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

Choosing appropriate thresholds for the [dispersion-based fixation filter](/core/terminology/#fixations) depends on the nature of the viewing task. It is worth noting that 
there is no 'gold standard' approach. Often a decision is reached based on previous literature and/or professional judgment following inspection of gaze data
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

## Sychronization
Pupil Core is often used concurrently with third-party devices and software (e.g. physiological sensors, 
motion capture, stimuli presentation). In order to correlate the data between these, temporal alignment is of great importance. 

How you go about synchronizing Pupil Core with other devices or software will depend on the setup, but there are three 
common approaches (steps 2–3 leverage our [Network API](core/network-api/#network-api)):

::: tip
<v-icon large color="info">info_outline</v-icon>
When using multiple Pupil Core devices (running on the same or multiple machines), simply turn-on 
the [Network Time Sync Plugin](https://docs.pupil-labs.com/core/software/pupil-capture/#pupil-time-sync) which takes 
care of Pupil Time synchronisation. The [Pupil Groups Plugin](core/software/pupil-capture/#pupil-groups) also helps when 
using more than one Pupil Core device simultaneously. 
:::

### 1. Lab Streaming Layer (LSL)
We maintain a [Plugin for LSL](https://github.com/labstreaminglayer/App-PupilLabs/tree/master/pupil_capture) that 
publishes gaze data in real-time using the [LSL framework](https://labstreaminglayer.readthedocs.io/info/intro.html). 
This enables unified and time-synchronised collection of measurements with other 
[LSL supported devices](https://labstreaminglayer.readthedocs.io/info/supported_devices.html).

The plugin synchronizes Capture's own clock, Pupil Time, with the pylsl.local_clock(). This allows the recording of 
native Capture timestamps and removes the necessity of manually synchronizing timestamps after the effect, which makes
for an accurate and easy to implement solution.

### 2. Custom Clocks
By default, most third-party devices and software come with their own clock to measure time consistently. These clocks 
rarely share a common starting point which would allow for automatic time alignment. However, they usually guarantee to 
be monotonicly increasing and are very accurate when it comes to measuring time differences (like Pupil Time).

[In this tutorial](https://github.com/pupil-labs/pupil-helpers/blob/master/python/simple_realtime_time_sync.py), we
demonstrate a simple real-time method to synchronize Pupil Time with a custom clock (e.g. used by third-party software). 
For an even more accurate and stable time sync, see our [Pupil Time Sync Protocol](/core/software/pupil-capture/#pupil-time-sync).

### 3. Annotations
You can use our [Annotation Plugin](/core/software/pupil-capture/#annotations) to make annotations with a timestamp in 
the recording on desired events, such as trigger events. Annotations can be sent via the keyboard or programmatically. 
[This script](https://github.com/pupil-labs/pupil-helpers/blob/master/python/remote_annotations.py) demonstrates how you 
can send remote annotations over the network. 

::: tip
<v-icon large color="info">info_outline</v-icon>
The accuracy of this method can be influenced by network latency. Consider accounting for network latency by combining 
the Custom Clock demo with your annotation script,
[like in this example](https://gist.github.com/N-M-T/fa8992b42e19fa3d5277d6b076776fc5).
:::

### What not to do
* Thinking about using System time? Read [this overview](/core/terminology/#_1-system-time) for limitations.
* Do not start a recording on a trigger event that corresponds to the beginning of a recording on your third-party
  device – not all Pupil Core processes are guaranteed to start at the same time.