+++
date = "2017-01-17T12:41:37+07:00"
section_weight = 2
page_weight = 2.1
+++

## HTC Vive PRO Add-On

Add eye tracking powers to your HTC Vive **PRO** with our 120hz binocular eye tracking add-on.

This section will guide you through all steps needed to turn your HTC Vive into an eye tracking HMD using a Pupil Labs eye tracking add-on.

### Install the add-on

> {{< video-youtube embed-url="https://www.youtube.com/embed/ZRdWlmxBH30" >}}

### HTC Vive USB connection options

The HTC Vive PRO has one free USBC port. This gives us two options to connect the pupil eye tracking add-on:


#### Connect the add-on to the free HTC Vive PRO USBC port.

This means the cameras share the VIVEs usb tether bandwidth with other usb components inside the Vive. 

#### Run a separate USB lane along the tether

If you want full frame rate and resolution for both the Vive's camera and the add-on you will have to connect the Pupil add-on to a separate usb port on the host PC. We recommend this approach.

### USB Connection and Camera IDs

Once you plug the usb cables into your computer:

* the right eye camera will show up with the name: `Pupil Cam 1 ID0`
* the left eye camera will show up with the name: `Pupil Cam 1 ID1`

### Focus and Resolutions
After assembly and connection. Fire up Pupil Capture or Service and adjust the focus of the eye cameras by rotating the lens by a few degrees (not revolutions) in the lens housing.

Use `640x480` or `320x240` resolution to get `120fps` and a good view of the eye. Other resolutions will crop the eye images.

### Interfacing with other software or your own code

Both cameras are fully UVC compliant and will work with OpenCVs video backend, Pupil Capture, and libraries like `libucv` and `pyuvc`.
