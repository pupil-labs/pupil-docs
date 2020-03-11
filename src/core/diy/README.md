# DIY

If you are an individual planning on using Pupil exclusively for noncommercial purposes, and are not afraid of SMD soldering and hacking – then, buy the parts, modify the cameras, and assemble a Pupil DIY headset. We have made a guide to help you and a shopping list.

::: tip
<v-icon large color="info">info_outline</v-icon>
The Pupil DIY Kit is not for commercial use or commercial clients.
:::

## Getting all the parts

The 3d-printed headset is the centerpiece of the Pupil mobile eye tracker.
You can buy it from the Pupil Labs team through the [Pupil shapeways store](http://www.shapeways.com/shops/pupil_store).
The price for the headset is part production cost and part support to the pupil development team. This enables us to give you support and continue to work on the project.

All other parts of the Pupil DIY kit have been specifically selected with availability and affordability in mind.
See the [Bill of Materials](https://docs.google.com/a/pupil-labs.com/spreadsheets/d/1NRv2WixyXNINiq1WQQVs5upn20jakKyEl1R8NObrTgU/pub?single=true&gid=0&output=html "Pupil Core DIY - bill of materials spreadsheet") to learn what else you will need to get.

## Tools
You will need access to these tools:

- Solder station, wick, flux (for SMD solder work)
- Tweezers
- Small philips screwdriver
- Prying tool to help un-case the webcams

## Prepare Webcams
The first step is to modify the cameras so we can use them for eye-tracking.

## De-case Cameras
Take both webcams out of their casings. Follow the video guides.

- [Logitech C525/C512](https://vimeo.com/59844059)


- [Microsoft HD-6000](https://vimeo.com/53005603)


## Solder Work on Eye Camera PCB
This is by far the trickiest part. You will need some soldering experience,
or work with someone that can help you for this step.
In the video and photo the lens holder is removed,
but you will do it with the lens holder attached.

- Cut off the microphone
- De-solder or break off the push button (Note: Some cameras don’t have this button.)
- De-solder the blue LED’s
- Solder on the IR-LED’s. Please take note of LED polarity! [Video guide](https://youtu.be/O-FAXldfq94 "Solder IR LEDs Pupil DIY")


## Replace IR-blocking Filter on the Eye Camera
1. Unscrew the lens from the mount.
1. Carefully remove the IR filter. Be very careful! The IR filter is a thin piece of coated glass and right behind it is a lens element that must stay intact and unharmed! It is necessary to remove the IR filter, so that the image sensor will be able to “see” the IR light.
1. Using a hole punch, cut out 1 round piece of exposed film and put it where the older filter was.
1. Use plastic glue to fix the piece. Don’t let the glue touch the center!
1. Put the lens back inside. You will have to manually focus the lens when you run the software for the first time by hand. Later you can use the focus control in software to fine tune.

<iframe src="https://player.vimeo.com/video/59844058" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

## Camera Assembly
1. Attach the world camera onto the mount using 4 small screws, leftover from disassembly.
1. Clip the world camera clip onto the headset
1. Slide the eye-cam into the mount [video guide](https://youtu.be/wkV9Ye7psP4 "Pupil DIY: Attach eye camera")
1. Slide the arm onto the headset
1. Route the cables
1. Attach USB extension cable(s)

## Camera Mounts
The camera mounts can be replaced by custom build parts that suit your specific camera setup or other sensors.

We release the CAD files for the camera mounts for you to download, modify, in accordance with our license. CAD files for the frame are not open source; see explanation.

#### Interface Documentation
By releasing the mounts as example geometry we automatically document the interface. You can use the CAD files to take measurements and make your own mounts.

::: tip
<v-icon large color="info">info_outline</v-icon>
The tolerances may need to be changed for your material or fabrication process.
:::

#### Compatibility
The mounts were developed as part of the whole headset and carry the revision number of the headset they were designed for.

#### Download Camera Mount CAD Files
All files are hosted in the pupil-hardware-diy repo here

You can clone the latest revision
```bash
git clone https://github.com/pupil-labs/pupil-hardware-diy.git
```

Or, if you want an older version, just checkout an older version. In this example, we checkout rev006 rev006 with the git version id of 6ad49c6066d5

```bash
git clone https://github.com/pupil-labs/pupil-hardware-diy.git
git checkout 6ad49c6066d5
```
