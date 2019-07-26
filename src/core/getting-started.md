# Getting Started
Go through the following steps to get familiar with the Pupil workflow. You can also check out [video tutorials]() at the end of this guide.

<v-divider></v-divider>

<!-- ## Quick Start -->

## 1. Put on Pupil Core
Put on Pupil Core headset and plug it in to your computer

## 2. Start Pupil Capture
Start Pupil Capture aon your computer. Once the program has initalized, a world video and eye video window will appear.

## 3. Check Pupil Detection
Take a look at the eye window. If the pupil is detected you will see a red circle around the edge of your pupil and a red dot at the center of your pupil.
If the detection is good, the confidence levels will be high and the red circle will be opaque. If the detection is poor, then the confidence levels will be low and the red circle will be translucent.

To improve Pupil detection, move your head around while looking at afixed position. Check the Pupil detection visualiztion and confidence levels.

Headsets are adjustable and are shipped with additional parts. For more information, head over to the [Pupil Core Hardware guide] on how to adjust your headset.

## 4. Calibration
Before calibrating, be sure to check that your eys are well positioned for a robust eye tracking performance.

In order to know what someone is looking at, we must establish a mapping between pupil and gaze positions. This is what we call calibration.

## 5. Begin Recording

**Start capturing data!**

Pupil Capture will save the world video stream and all the corresponding gaze data in a folder in our user directory named `recordings`.

**Start/Stop recording**: Press the `r` key on your keyboard or press the circular `R` button on the left hand side of the world window. The elapsed recording time will appear next to the `R` button.

See a video demo of how to set recordings path, session name and start recording [here]().

## 6. Playback recording

Your default saved recording location will be located :

The default recordings directory will have the following hierarchy:

```
recordings
  2016-04-05
    001
    002
    003
    ###
```

By default, each recording will live in its own unique data folder contained in the recordings folder.

<v-divider></v-divider>