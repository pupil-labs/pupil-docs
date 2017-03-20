+++
date = "2017-01-20T11:10:26+07:00"
section_weight = 2
page_weight = 2.1
+++

## HTC Vive Setup

This page will guide you through all steps needed to turn your HTC Vive into an eye tracking HMD using a Pupil Labs eye tracking add-on.

### Install the add-on

> <div class="content-container">
  <div class='video-container' >
		<iframe class=feature-video src="https://www.youtube.com/embed/HGMjJLnK2_4?list=PLi20Yl1k_57r4j0LXDfo6IYXAKTp_FIKf" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

### A detailed look

... at the engagement process between the eye tracking ring the the lens holding geometry. **Do not follow these steps.** Just have a look to get a feeling for the snap-in part to the guide above.

<div class="content-container">
  <div class='video-container' >
		<iframe class=feature-video src="https://www.youtube.com/embed/nIzuwHagIXQ?list=PLi20Yl1k_57q0YALGi-ybQ5-wMjrZ022i" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

### HTC Vive USB connection options

The HTC Vive has one free USB port hidden under the top cover that hides the cable tether connection. This gives us two options to connect the pupil eye tracking addon:


**Connect the add-on to the free htc-vive usb port.**

This means the cameras share the VIVEs usb tether bandwidth with other usb components inside the Vive. This works but only if the following rules are observed:

* Disable the HTC-Vive build-in camera in the VR settings pane to free up bandwidth for Pupil's dual VGA120 video streams.

or 

* Enable the HTC-Vive build-in camera and set it to 30hz. Then set the Pupil Cameras to 320x240 resolution to share the USB bus.

**Run a separate USB lane along the tether**
If you want full frame rate and resolution for both the Vive's camera and the addon you will have to connect the Pupil add-on to a separate usb port on the host PC. We recommend this approach.

### Connection and Camera

Once you plug the usb cables into your computer:
* the right eye camera will show up with the name: `Pupil Cam 1 ID0`
* the left eye camera will show up with the name: `Pupil Cam 1 ID1`

### Focus and Resolutions
After assembly and connection. Fire up Pupil Capture or Service and adjust the focus of the eye cameras by rotating the lens by a few degrees (not revolutions) in the lens housing.

Use `640x480` or `320x240` resolution to get `120fps` and a good view of the eye. Other resolutions will crop the eye images.

### Interfacing with other software or your own code

Both cameras are fully UVC compliant and will work with OpenCVs video backend, Pupil Capture, and libraries like `libucv` and `pyuvc`.
