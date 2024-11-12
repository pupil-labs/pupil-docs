# Use Neon with Pupil Capture

It's possible to make recordings using Neon in Pupil Capture under MacOS and Linux. You can use the Neon module as if it was a Pupil Core headset by plugging it into your Computer and running Pupil Capture from [source](https://github.com/pupil-labs/pupil/tree/master).

Note, that in this case gaze estimation will **NOT** be done using **NeonNet**, but using Pupil Core's gaze estimation pipeline. This means you will have to do a calibration and experience a lack of robustness compared to NeonNet.

### Setup

To get started with Neon in Capture, follow these steps:

1. Connect **Neon** to your computer.
2. Open **Pupil Capture**.
3. Under Video Source, click **"Activate Device"** and choose **Neon** to activate the scene and eye cameras.
4. In the eye camera's window, you can adjust the absolute exposure time and gain. Keep in mind that the Neon eye cameras do not have individual controls, so changes will affect both cameras.
   Additionally, you may want to switch to ROI mode in the general settings to define a specific area for pupil detection. For more guidance, check out this [video](https://drive.google.com/file/d/1tr1KQ7QFmFUZQjN9aYtSzpMcaybRnuqi/view?usp=sharing).
5. Select either `Neon 3D` or `2D` as the **Gaze Mapping** option in the **Calibration** tab.

::: warning
Recordings made with the Neon Companion app (rather than Pupil Capture) are **NOT** compatible with Pupil Player.
:::
