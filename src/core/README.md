# Getting Started
Welcome to Pupil Core! The first thing you need to do is download the latest Pupil Core software.

<v-btn
large
round
color="primary"
href="https://github.com/pupil-labs/pupil/releases/latest"
class="mb-4"
>Download Pupil Core Software
</v-btn>

Follow the steps below to get up and running and become familiar with the workflow.

<v-divider></v-divider>

## 1. Put on Pupil Core
Put on Pupil Core headset and plug it in to your computer.

Make sure there is space between the headset frame and your forehead. Headsets are adjustable and shipped with additional parts. For more information head over to the [Hardware](/core/hardware/ "Pupil Core hardware documentation") section of the docs.

## 2. Launch Pupil Capture

<div class="pb-4">
  <img src="../media/core/icons/pc.png" style="display:flex;margin:0 auto;width:100px;">
</div>

Start Pupil Capture on your computer. Once the program has initalized, a world video and eye video window will appear.

## 3. Check Pupil Detection
Everything depends on capturing good raw videos of the eyes. 

You will need to [physically adjust](core/hardware/#headset-adjustments "Pupil Core headset adjustments") the eye cameras on your Pupil Core headset to get good images of the eyes. 

Take a look at the eye window(s).

If the pupil is detected you will see a red circle around the edge of your pupil and a red dot at the center of your pupil.

<div class="pb-4">
  <img src="../media/core/imgs/good_bad_eye.jpg" style="display:flex;margin:0 auto;width:60%;">
</div>

1. :heavy_check_mark:  Do - All range of the eye movements are visible.
2. :x: Don't - The camera arm here is too far away from the eye.
3. :x: Don't - The eye is not centered in the frame and eyebrow in the frame.
4. :x: Don't - The eye is out of focus.


Check the world window. 

You will see confidence graphs in the top for each eye. 1.0 = high confidence pupil detection. 0.0 = no confidence. 

::: tip
Tip - move your head around while looking at a fixed position. This enables you to check that your pupil is visible in the video even at extreme angles.
:::

<video width="100%" controls class="mb-5">
  <source src="../media/core/videos/pd.mp4" type="video/mp4">
</video>


## 4. Calibration
In order to know what someone is looking at, we must establish a mapping between pupil and gaze positions. This is what we call calibration. The calibration process establishes a mapping from pupil to gaze coordinates.

<video width="100%" controls class="mb-5">
  <source src="../media/core/videos/clb-hd.mp4" type="video/mp4">
</video>

#### Screen Marker Calibration Method
Click `c` on the world screen or press `c` on the keyboard to start calibrate.
Follow the marker on the screen with your eyes and try to keep your head stationary.

<video width="100%" controls class="mb-5">
  <source src="../media/core/videos/clb-s.mp4" type="video/mp4">
</video>

## 5. Start Recording

**Start capturing data!**

Pupil Capture will save the world video stream and all the corresponding gaze data in a folder in your main user directory named `recordings`.

**Start/Stop recording**: Press the `r` key on your keyboard or press the circular `R` button on the left hand side of the world window. The elapsed recording time will appear next to the `R` button.

<video width="100%" controls class="mb-5">
  <source src="../media/core/videos/rec.mp4" type="video/mp4">
</video>


## 6. Locate Saved Recording

By default, each recording will live in its own unique data folder contained in the recordings folder.

The default recordings directory will organize all recordings by date. Each time you press record a new folder will be created. Below we show an example of 3 recordings that have been made on the same date `001`, `002`, and `003`:

```
recordings/
  2019-09-30/
    001/
    002/
    003/
```

## 7. Visualize in Pupil Player
Launch Pupil Player. Then drag and drop the recording folder (e.g `001`) onto the Pupil Player window.

<div class="pb-4">
  <img src="../media/core/icons/pp.png" style="display:flex;margin:0 auto;width:100px;">
</div>

Player comes with a number of plugins. Plugins are classified by their use-case. Visualization plugins can be additive. This means that you can add multiple instances of a plugin to build up a visualization.

## 8. Export Data
You can export videos and data by pressing `e` on your keyboard or the down arrow button in the Pupil Player window.

Exports are saved within a dedicated folder named exports within the original recording folder.

Read more about the [data format](/user-guide/data-format)