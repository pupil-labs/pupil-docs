---
permalink: /vr-ar/oculus-rift-dk2
---


# Oculus Rift DK2 Add-On <Badge text="Discontinued!" type="error"/>
Add eye tracking powers to your Oculus Rift DK2 with our 120hz eye tracking add-ons.
This page will guide you through all steps needed to turn your Oculus DK2 into an eye tracking HMD using the Pupil Oculus DK2 eye tracking add-on cups.

::: danger
Pupil Labs no longer sells Oculus Rift DK2 add-ons. This documentation is for archival purposes only. 
:::

<div class="pb-4" style="display:flex;justify-content:center;">
	<v-img 
	:src="require('../media/vr-ar/imgs/rift.jpg')"
	max-width=80%
	>
	</v-img>
</div>

## Install lens in cup
Take the lens out of an existing Oculus lens cup.
Remove the LED ring and insert the lens into the Pupil eye tracking cup.
Install the LED ring and connect the LED power supply.

<div style="display:flex;justify-content:center;" class="pb-4">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AVeUwAFKmAc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div style="display:flex;justify-content:center;" class="pb-4">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ztT9WkDhpow" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div style="display:flex;justify-content:center;" class="pb-4">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_Y0_4LDhphY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Install cup in DK2

<div style="display:flex;justify-content:center;" class="pb-4">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5LqjfgbDydM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Route cables
Route the USB cables through the vent holes in the top of the Oculus DK2.

<div style="display:flex;justify-content:center;" class="pb-4">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/bvdxMYtzVTE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Connect cameras
Connect the eye tracking cup to the USB cable. Remove the old cup and insert the eye tracking cup in the DK2.

#### USB and Camera IDs
Once you plug the usb cables into your computer:

- the right eye camera will show up with the name: `Pupil Cam 1 ID0`
- the left eye camera will show up with the name: `Pupil Cam 1 ID1`

Both cameras are fully UVC compliant and will work with OpenCVs video backend, Pupil Capture, and libraries like `libucv` and `pyuvc`.