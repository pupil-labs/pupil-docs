---
date = "2017-01-18T11:51:10+07:00"
section_weight = 2
page_weight = 5
---

## DIY

<img src="/images/pupil-hardware/diy_explosion.webp" alt="DIY Pupil headset" >

If you are an individual planning on using **Pupil** [exclusively for noncommercial purposes](#license), and are not afraid of SMD soldering and hacking -- then, buy the parts, modify the cameras, and assemble a Pupil DIY headset. We have made a guide to help you and a [shopping list](https://docs.google.com/spreadsheet/pub?key=0Al-zbr5hUFxPdEdJY1Z0dGRXU18yU0JxTVQ3THBOZFE&single=true&gid=0&output=html).

<aside class="notice">Note - The Pupil DIY Kit is not for commercial use or commercial clients.</aside>

### Getting all the parts
The 3d-printed headset is the centerpiece of the Pupil mobile eye tracker. You can buy it from the Pupil Labs team through the [Pupil shapeways store](http://www.shapeways.com/shops/pupil_store). The price for the headset is part production cost and part support to the pupil development team.  This enables us to give you support and continue to work on the project.

All other parts of the Pupil DIY kit have been specifically selected with availability and affordability in mind. See the [Bill of Materials][bom] to learn what else you will need to get.

### Tools
You will need access to these tools:

* Solder station, wick, flux (for SMD solder work)
* Tweezers
* Small philips screwdriver
* Prying tool to help un-case the webcams

### Prepare Webcams
The first step is to modify the cameras so we can use them for eye-tracking.

#### De-case Cameras
Take both webcams out of their casings. Follow the video guides.

1. [decase Logitech C525/C512](https://vimeo.com/59844059)
2. [decase Microsoft HD-6000](https://vimeo.com/53005603)

#### Solder Work on Eye Camera PCB

<img src="/images/pupil-hardware/hd-6000_pcb_text.webp" alt="Microsoft HD-6000 PCB" >

This is by far the trickiest part. You will need some soldering experience, or work with someone that can help you for this step. In the video and photo the lens holder is removed, but you will do it with the *lens holder attached*.

1. Cut off the microphone
2. De-solder or break off the push button (Note: Some cameras don't have this button.)
3. De-solder the blue LED's
4. solder on the IR-LED's. Please take note of LED polarity! [video](http://youtu.be/O-FAXldfq94)

#### Replace IR-blocking Filter on the Eye Camera

1. Unscrew the lens from the mount.
2. Carefully remove the IR filter. Be very careful! The IR filter is a thin piece of coated glass and right behind it is a lens element that must stay intact and unharmed! It is necessary to remove the IR filter, so that the image sensor will be able to "see" the IR light.
3. Using a hole punch, cut out 1 round piece of exposed film and put it where the older filter was.
4. Use plastic glue to fix the piece. Don't let the glue touch the center!
5. Put the lens back inside. You will have to manually focus the lens when you run the software for the first time by hand. Later you can use the focus control in software to fine tune.

[Video](https://vimeo.com/59844058)

#### Camera Assembly
1. Attach the world camera onto the mount using 4 small screws, leftover from disassembly.
2. Clip the world camera clip onto the headset
3. Slide the eye-cam into the mount [video guide](http://www.youtube.com/watch?v=wkV9Ye7psP4)
4. Slide the arm onto the headset
5. Route the cables
6. Attach USB extension cable(s)

### Customization
The camera mounts can be replaced by custom build parts that suit your specific camera setup or other sensors.

### Windows Driver Installation
If you are using Windows, you will need to install drivers for your cameras. Please refer to the instructions [here](https://docs.pupil-labs.com/#manual-installation-of-diy-camera-drivers).

[bom]: https://docs.google.com/spreadsheet/pub?key=0Al-zbr5hUFxPdEdJY1Z0dGRXU18yU0JxTVQ3THBOZFE&single=true&gid=0&output=html
