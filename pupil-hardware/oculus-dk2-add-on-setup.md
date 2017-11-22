+++
date = "2017-01-20T11:23:25+07:00"
title = "oculus dk2 addon"
section_weight = 2
page_weight = 3.1
+++

## Oculus DK2 Setup
This page will guide you through all steps needed to turn your Oculus DK2 into an eye tracking HMD using the Pupil Oculus DK2 eye tracking add-on cups.

### Install lens in cup

> {{< video-youtube embed-url="https://www.youtube.com/embed/AVeUwAFKmAc" >}}

Take the lens out of an existing Oculus lens cup.

> {{< video-youtube embed-url="https://www.youtube.com/embed/ztT9WkDhpow" >}}

Remove the LED ring and insert the lens into the Pupil eye tracking cup.

> {{< video-youtube embed-url="https://www.youtube.com/embed/_Y0_4LDhphY" >}}

Install the LED ring and connect the LED power supply.

### Install cup in DK2

> {{< video-youtube embed-url="https://www.youtube.com/embed/5LqjfgbDydM" >}}

### Route cables {#dk2-route-cables}

> {{< video-youtube embed-url="https://www.youtube.com/embed/bvdxMYtzVTE" >}}

Route the USB cables through the vent holes in the top of the Oculus DK2.

### Connect cameras

Connect the eye tracking cup to the USB cable. Remove the old cup and insert the eye tracking cup in the DK2.

#### USB and Camera IDs
Once you plug the usb cables into your computer: 

* the right eye camera will show up with the name: `Pupil Cam 1 ID0`
* the left eye camera will show up with the name: `Pupil Cam 1 ID1`

Both cameras are fully UVC compliant and will work with OpenCVs video backend, Pupil Capture, and libraries like `libucv` and `pyuvc`.
