+++
date = "2017-01-19T12:24:57+07:00"
title = "capture workflow"
section_weight = 1
page_weight = 1
+++

## Capture Workflow


Go through the following steps to get familiar with the Pupil workflow. You can also check out [video tutorials](#pupil-capture-demo-video) at the end of the guide. 


### 1. Put on Pupil
Put on the Pupil headset and plug it in to your computer. Headsets are adjustable and shipped with additional parts. For more information head over to the [Pupil Hardware](#pupil-hardware) guide.

### 2. Start Pupil Capture

> {{< figure-img src="/images/icons/svg/pc.svg" img-class="feature-center logo" width="20%" >}}

### 3. Check pupil detection

> {{< video-webm src="/videos/calibration/pupil-detection/pd.webm" >}}

Take a look at the `Eye` window. If the pupil is detected you will see a red circle around the edge of your pupil and a red dot at the center of your pupil.

If the algorithm's detection confidence is high, the red circle will be opaque. If confidence diminishes the circle will become more transparent.

Try moving your head around a bit while looking at your eye to see that the pupil is robustly detected in various orientations.


### 4. Calibrate

> {{< video-webm src="/videos/calibration/calibration-headset/clb-hd.webm" >}}

In order to know what someone is looking at, we must to establish a mapping between pupil and gaze positions. This is what we call calibration.

The calibration process establishes a mapping from pupil to gaze coordinates. 

#### Screen Marker Calibration Method

> {{< video-webm src="/videos/calibration/calibration-screen/clb-s.webm" >}}


Click `c` on the world screen or press `c` on the keyboard to start calibrate.


Follow the marker on the screen with your eyes and try to keep your head stationary

There are other calibration methods and lots more information how calibration works in the [user guide](#calibration "calibration").

### 5. Record

> {{< video-webm src="/videos/recording/rec.webm" >}}

Start capturing data!


Pupil Capture will save the world video stream and all corresponding gaze data in a folder in your user directory named 
`recordings`.

* Start recording: Press the `r` key on your keyboard or press the circular 'R' button in the left hand side of the world window.
* The elapsed recording time will appear next to the 'R' button.
* Stop recording: Press the `r` key on your keyboard or press the circular 'R' button in the left hand side of the world window.

See a video demonstration of how to set recordings path, session name, and start recording -- [here](http://youtu.be/VzIXFUqv99s).

#### Where is the recording saved?

> {{< lqip-img src="/images/pupil-capture/recording/rec_folder.jpg" >}}

By default, each recording will live in its own unique data folder contained in the `recordings` folder.

You can make as many recordings as you like. 

The default `recordings` directory will have the following hierarchy.

* `recordings`
  * 2016-04-05
	    * 001
	    * 002
	    * 003
	    * ####

#### How recordings are saved?

Pupil capture saves the video frames in a fixed frame rate container. This means that the raw output video (world.mp4) does not show the correct duration and the correct frame rate of the recording. This information can be found in `world_timestamps.npy`, which tells you exactly where each frame belongs in time.

However, if you export using Pupil Player, the video will be made such that the frames will show at the exact right time. The output video will not miss any frame of the raw video, instead, output frames are spaced out exactly as they where initially captured.

<aside class="notice">
Note - The real FPS during recordings may fluctuate due variations on light intensity (LUX, lumens) and other issues; it cannot be forced to be constant.
</aside>