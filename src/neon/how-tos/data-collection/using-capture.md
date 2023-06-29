---
description: This article explains how to use the Neon with Pupil Capture and its caveats.
permalink: /neon/how-tos/data-collection/using-capture
---
# Can I use the Neon module with the Pupil Capture Software?

Yes you can! We made sure to add support in Pupil Capture for the Neon scene and eye cameras under MacOS and Linux. You can use the Neon module as if it was a Pupil Core headset by plugging it into your Computer and running Pupil Capture from [source](https://github.com/pupil-labs/pupil/tree/master). 

Note, that in this case gaze estimation will **NOT** be done using **NeonNet**, but using Pupil Core's gaze estimation pipeline. This means you will have to do a calibration and experience a lack of robustness compared to NeonNet.

::: warning
Recordings made with the Neon Companion app (rather than Pupil Capture) are **NOT** compatible with Pupil Player.
:::

<h3>I am running Pupil Capture from source. </br> How do I use the Neon module?</h3>

To get started with Neon in Capture, follow these steps:

1. Connect **Neon** to your computer.
2. Open **Pupil Capture**.
3. Under Video Source, click **"Activate Device"** and choose **Neon** to activate the scene and eye cameras.
4. In the eye camera's window, you can adjust the absolute exposure time and gain. Keep in mind that the Neon eye cameras do not have individual controls, so changes will affect both cameras. 
Additionally, you may want to switch to ROI mode in the general settings to define a specific area for pupil detection. For more guidance, check out this [video](https://drive.google.com/file/d/1tr1KQ7QFmFUZQjN9aYtSzpMcaybRnuqi/view?usp=sharing).
5. You're all set!

::: tip
Please be aware that during calibration mode, there is an additional option for gaze mapping called **"Neon 3D"**.
</br>
This matches the potential ranges for Neon in [pye3D detector](https://github.com/pupil-labs/pye3d-detector), and you may want to use that one instead of 3D. </br>
In the other hand, the 2D gaze mapping is also available and provides great results.
:::