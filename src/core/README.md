# Getting Started
Go through the following steps to get familiar with the Pupil workflow. You can also check out [video tutorials]() at the end of this guide.

<v-divider></v-divider>

<!-- ## Quick Start -->

## 1. Put on Pupil Core
Put on Pupil Core headset and plug it in to your computer.

 Make sure there is space between the headset frame and your forehead.
 Headsets are adjustable and shipped with additional parts. For more information head over to the Pupil Hardware guide.

## 2. Launch Pupil Capture

<pc-icon/>

Start Pupil Capture on your computer. Once the program has initalized, a world video and eye video window will appear.

## 3. Check Pupil Detection
To improve Pupil detection, move your head around while looking at a fixed position. Check the Pupil detection visualiztion and confidence levels.

<video width="100%" controls class="mb-5">
  <source src="../media/core/pd.mp4" type="video/mp4">
</video>

Take a look at the eye window.

If the pupil is detected you will see a red circle around the edge of your pupil and a red dot at the center of your pupil.
If the detection is good, the confidence levels will be high and the red circle will be opaque. If the detection is poor, then the confidence levels will be low and the red circle will be translucent.

<div class="pb-4">
  <img src="../media/core/good_bad_eye.jpg" width="60%" style="display:flex;margin:0 auto;">
</div>

1. Do - The eye is in focus and all range of the eye movements are visible. (Focus is only important for 120hz eye camera. 200hz camera has fixed focus.)
2. Don't - The camera arm here is too far away from the eye.
3. Don't - The eye is not centered in the frame and eyebrow in the frame.
4. Don't - The eye is out of focus.

## 4. Calibration
In order to know what someone is looking at, we must establish a mapping between pupil and gaze positions. This is what we call calibration. The calibration process establishes a mapping from pupil to gaze coordinates.

<video width="100%" controls class="mb-5">
  <source src="../media/core/clb-hd.mp4" type="video/mp4">
</video>

#### Screen Marker Calibration Method
Click `c` on the world screen or press `c` on the keyboard to start calibrate.
Follow the marker on the screen with your eyes and try to keep your head stationary.

<video width="100%" controls class="mb-5">
  <source src="../media/core/clb-s.mp4" type="video/mp4">
</video>

## 5. Start Recording

**Start capturing data!**

Pupil Capture will save the world video strea. and all the corresponding gaze data in a folder in our user directory named `recordings`.

**Start/Stop recording**: Press the `r` key o. your keyboard or press the circular `R` button on the left hand side of the world window. The elapsed recording time will appear next to the `R` button.

<video width="100%" controls class="mb-5">
  <source src="../media/core/rec.mp4" type="video/mp4">
</video>

See a video demo of how to set recordings path, session name and start recording [here]().

## 6 Locate Saved Recording

By default, each recording will live in its own unique data folder contained in the recordings folder.
You can make as many recordings as you like.

The default recordings directory will have the following hierarchy:

```
recordings
  2016-04-05
    001
    002.
    003
    ###
```

## 7. Visualize in Pupil Player
Launch Pupil Player.
Then drag and drop the recording folder (e.g 001) onto the Pupil Player window.

<div class="pb-4">
  <img src="../media/core/pp.svg" width="100px" style="display:flex;margin:0 auto;">
</div>

Player comes with a number of plugins. Plugins are classified by their use-case. Visualization plugins can be additive. This means that you can add multiple instances of a plugin to build up a visualization.

## 8. Export Video
You can export data and videos by pressing `e` on your keyboard or the `e` hot key button in the Pupil Player window.

Exports are saved within a dedicated folder named exports within the original recording folder.
Each export is contained within a folder within the exports folder. The numbers of the export correlate to the trim marks (frame start and frame end) for the export.