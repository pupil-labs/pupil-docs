+++
date = "2017-01-20T11:10:26+07:00"
title = "htc vive addon"
weight = 20

+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#assembly-guide">
      <h2 id="assembly-guide">Assembly Guide</h2>
    </a>
  </div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#assembly-vive-addon">
      <h3 id="assembly-vive-addon">HTC Vive Addon</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

This page will guide you through all steps needed to turn your HTC Vive into an eye tracking HMD using a Pupil Labs eye tracking add-on.

<div class="content-container">
  <div class="header-link">
    <a href="#install-addon">
      <h4 id="install-addon">Install the add-on. No tools required</h4>
    </a>
  </div>
</div>

<div class="content-container">
  <div class='video-container' >
		<iframe class=feature-video src="https://www.youtube.com/embed/HGMjJLnK2_4?list=PLi20Yl1k_57r4j0LXDfo6IYXAKTp_FIKf" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#detailed-look">
      <h4 id="detailed-look">A detailed look...</h4>
    </a>
  </div>
</div>

... at the engagement process between the eye tracking ring the the lens holding geometry. **Do not follow these steps.** Just have a look to get a feeling for the snap-in part to the guide above.

<div class="content-container">
  <div class='video-container' >
		<iframe class=feature-video src="https://www.youtube.com/embed/nIzuwHagIXQ?list=PLi20Yl1k_57q0YALGi-ybQ5-wMjrZ022i" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#usb-connection-options">
      <h4 id="usb-connection-options">USB connection options</h4>
    </a>
  </div>
</div>

The HTC Vive has one free USB port hidden under the top cover that hides the cable tether connection. This gives us two options to connect the pupil eye tracking addon:


##### Connect the add-on to the free htc-vive usb port. 

This means the cameras share the VIVEs usb tether bandwidth with other usb components inside the Vive. This works but only if the following rules are observed:

* Disable the HTC-Vive build-in camera in the VR settings pane to free up bandwidth for Pupil's dual VGA120 video streams.

or 

* Enable the HTC-Vive build-in camera and set it to 30hz. Then set the Pupil Cameras to 320x240 resolution to share the USB bus.

##### Run a separate USB lane along the tether

If you want full frame rate and resolution for both the Vive's camera and the addon you will have to connect the Pupil add-on to a separate usb port on the host PC. We recommend this approach.

<div class="content-container">
  <div class="header-link">
    <a href="#connection-camera-vive">
      <h4 id="connection-camera-vive">Connection and Camera</h4>
    </a>
  </div>
</div>

Once you plug the usb cables into your computer:

* the right eye camera will show up with the name: `Pupil Cam 1 ID0`
* the left eye camera will show up with the name: `Pupil Cam 1 ID1`

<div class="content-container">
  <div class="header-link">
    <a href="#focus-resolutions">
      <h4 id="focus-resolutions">Focus and Resolutions</h4>
    </a>
  </div>
</div>

After assembly and connection. Fire up Pupil Capture or Service and adjust the focus of the eye cameras by rotating the lens by a few degrees (not revolutions) in the lens housing.

Use `640x480` or `320x240` resolution to get `120fps` and a good view of the eye. Other resolutions will crop the eye images.

<div class="content-container">
  <div class="header-link">
    <a href="#interfacing-software-code">
      <h4 id="interfacing-software-code">Interfacing with other software or your own code</h4>
    </a>
  </div>
</div>

Both cameras are fully UVC compliant and will work with OpenCVs video backend, Pupil Capture, and libraries like `libucv` and `pyuvc`.
