---
permalink: /core/software/pupil-service
description: Pupil Service is a GUI-less real-time eye tracking software used primarily with Pupil Labs VR/AR eye tracking add-ons. 
---

# Pupil Service
Pupil Service is like Pupil Capture except it does not have a world video feed, and comes with a slimmed down GUI. 
It is intended to be used with VR and AR eye tracking setups.

<div class="pb-4">
  <img src="../../media/core/icons/ps.png"style="display:flex;margin:0 auto;width:100px;">
</div>

:::tip
<v-icon large color="info">info_outline</v-icon>
The tools introduced in the [hmd-eyes project](https://github.com/pupil-labs/hmd-eyes) are made to work with Pupil Service and Pupil Capture alike.
:::

## Service Features
With the Pupil Service GUI you can define a [Pupil Remote Address](/developer/core/network-api/#pupil-remote),
and toggle to open and close the left and right eye windows.

<div class="pb-4">
  <img src="../../media/core/imgs/ps-gui.jpg" style="display:flex;margin:0 auto;width:400px">
</div>

Note that the eye windows do have the same functionality as with Pupil Capture, thus enabling [fine-tuning](/core/software/pupil-capture/#fine-tuning-pupil-detection) 
of pupil detection parameters.

The real power of Pupil Service comes from control with network commands and less system resources. 
Check out the [Network API documentation](/developer/core/network-api/#communicating-with-pupil-service) for examples of 
communicating with Pupil Service!

## Clients
An example client for Unity3d can be found [here](https://github.com/pupil-labs/hmd-eyes/releases/latest)
