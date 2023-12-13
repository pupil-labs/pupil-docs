---
description: Welcome to Pupil Core! This section will guide you through setup (software and hardware) in order for you to make your first recording with Pupil Core.

sidebar: false 
---

# Getting Started
Welcome to Pupil Core! The first thing you need to do is download the latest Pupil Core software.

<!-- <DownloadLinks/> -->
[Download it here](https://github.com/pupil-labs/pupil/releases/tag/v3.5)

Follow the steps below to get up and running and become familiar with the workflow.


## 1. Put on Pupil Core
Put on the Pupil Core headset and plug it into your computer.

Make sure there is space between the headset frame and your forehead. Headsets are adjustable and shipped with additional parts. For more information head over to the [Hardware](/hardware/ "Pupil Core hardware documentation") section of the docs.

## 2. Launch Pupil Capture

![Pupil Capture Icon](./pc.png)

Start Pupil Capture on your computer. Once the program has initialized, a world video window and eye video windows will appear.

## 3. Check Pupil Detection

Capturing good raw videos of the eyes is essential for successful eye tracking with Pupil Core.

You will need to [physically adjust](/hardware/#headset-adjustments "Pupil Core headset adjustments") the eye cameras on your Pupil Core headset to get good images of the eyes.

Take a look at the eye window(s).

Slide the cameras along the headset frame and rotate them on the ball joint, until you get a clear image of both eyes. Make sure that your pupil is always visible, even when looking at extreme angles.


<Youtube src="kjjPL7gLy7s"/>


Pupil Core uses a 3D model of the eye to improve pupil detection. Slowly move your eyes around until the eye model (blue circle) is adjusted to fit your eyeball. If everything is set up properly, you should see a blue circle around the eyeball and a red circle around the pupil with a red dot in the center.


<Youtube src="_1ZRgfLJ3hc"/>


Next, check the world window.

You will see confidence graphs in the top for each eye. 1.0 = high confidence pupil detection. 0.0 = no confidence.

::: tip
Tip - There is another way to build the 3d model. You can also move your head around while looking at a fixed position. This enables you to check that your pupil is visible in the video even at extreme angles.
:::

## 4. Calibration
In order to know what someone is looking at, we must establish a mapping between pupil and gaze positions. This is what we call calibration. The calibration process establishes a mapping from pupil to gaze coordinates.

<video width="100%" controls>
  <source src="./clb-hd.mp4" type="video/mp4">
</video>


#### Screen Marker Calibration Method
Click `c` on the world screen or press `c` on the keyboard to start calibrating.
Follow the marker on the screen with your eyes and try to keep your head stationary.

<video width="100%" controls>
  <source src="./clb-s.mp4" type="video/mp4">
</video>

::: tip
Tip - Want to calibrate with a physical marker? Check out alternative calibration choreographies <a href="https://docs.pupil-labs.com/core/software/pupil-capture/#calibration">here</a>.
:::

## 5. Start Recording

**Start capturing data!**

Pupil Capture will save the world video stream and all the corresponding gaze data in a folder in your main user directory named `recordings`.

**Start/Stop recording**: Press the `r` key on your keyboard or press the circular `R` button on the left hand side of the world window. The elapsed recording time will appear next to the `R` button.

<video width="100%" controls>
  <source src="./rec.mp4" type="video/mp4">
</video>

## 6. Locate Saved Recording

By default, each recording will live in its own unique data folder contained in the recordings folder.

The default recordings directory will organize all recordings by date. Each time you press record a new folder will be created. Below we show an example of 3 recordings that have been made on the same date `000`, `001`, and `002`:

```
recordings/
  2019-09-30/
    000/
    001/
    002/
```

## 7. Visualize in Pupil Player
Launch Pupil Player. Then drag and drop the recording folder (e.g `001`) onto the Pupil Player window.

![Pupil Player Icon](./pp.png)

Player comes with a number of plugins. Plugins are classified by their use-case. Visualization plugins can be additive. This means that you can add multiple instances of a plugin to build up a visualization.

## 8. Export Data
You can export videos and data by pressing `e` on your keyboard or the down arrow button in the Pupil Player window.

Exports are saved within a dedicated folder named exports within the original recording folder.

Read more about the [recording format](/software/recording-format/#pupil-core "Pupil Core recording format")
