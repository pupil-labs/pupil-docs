---
permalink: /invisible/explainers/glasses-and-companion-device
description: Introduction to the Pupil Invisible Hardware and Companion app.
---

# Glasses & Companion Device
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/pi_with_phone.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The Pupil Invisible glasses attach with a USB-C cable to the Companion Phone for operation. The Phone is used to supply the glasses with power and receive the raw sensor data for storage and further processing. Using the app you can make recordings, preview real-time gaze and world video, stream data over the network, set up wearers, select templates, and preview and upload recordings to Pupil Cloud.


## Pupil Invisible Glasses
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/pi_sensor_callout.jpg')"
    max-width=100%
  >
  </v-img>
</div>

While looking almost like normal glasses, the Pupil Invisible glasses are filled with sensors and electronics:

- **Eye Cameras**: A binocular pair of infrared cameras with matching 850nm infrared illuminator **LEDs** are used to capture [eye videos](/invisible/explainers/data-streams/#eye-videos). The raw data is saved with each recording and is used for real-time [gaze](/invisible/explainers/data-streams/#gaze) estimation.

- **Scene Camera**: A detachable scene camera is located on the right arm of the glasses capturing [scene video](/invisible/explainers/data-streams/#scene-video). A **microphone** is integrated into the camera module to capture [audio](/invisible/explainers/data-streams/#audio). You can detach and attach the camera at any time before, during, and after a recording. The app will capture scene video during a recording automatically whenever it is attached. Capturing audio is optional and settable in the Companion app settings.
 
- **IMU**: A 6-degrees-of-freedom IMU is integrated into the right arm of the glasses. It captures the [inertia](/invisible/explainers/data-streams/#inertial-measurements) of the glasses, including translational acceleration, rotational speed, pitch and roll.

- **Indicator LED**: An RGB LED is located in the front-right of the glasses to notify the wearer in case of issues. If for example, the phone is running out of battery or storage space, it will start blinking (the phone will also start vibrating!).

- **Lenses**: A pair of exchangeable lenses sits in the front of the glasses. The glasses ship with clear plano lenses, as well as a pair of shaded lenses. Lenses with prescription values can be obtained from any optician or via our [lens kit](https://pupil-labs.com/products/invisible/accessories/). See our how-to guide on [exchanging lenses](/invisible/how-tos/pupil-invisible-glasses/exchange-lenses) for more information.

- **USB-C Connector**: The connector is used to connect the glasses to the Companion phone. Always use the cable supplied with the phone to guarantee a stable connection!

- **Serial Plaque**: The glasses' serial number can be found on a plaque at the tip of the left arm.

:::danger
The electronics and sensors are sensitive! Please follow our how-to guide when [cleaning and disinfecting](/invisible/how-tos/pupil-invisible-glasses/cleaning-and-disinfecting)  your glasses.
:::

## Pupil Invisible Companion Device
The companion device is a flagship Android smartphone. It is a regular phone that is not customized or modified in any way. We support a small number of models, carefully selected and tested for maximum stability and performance. Our Companion app is tuned to work with these particular models as we require full control over various low-level functions of the hardware. 

The models we currently support are OnePlus 6, OnePlus 8, and OnePlus 8T.

If you want to replace or add an extra Companion device you purchase it [directly from us](https://pupil-labs.com/products/invisible/accessories/) or from any other distributor. The companion app is free and can be downloaded from the [Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp).

:::danger
Make sure to update the **Companion app** on a regular basis, however, be careful with updating the **Android** version. Some Android versions have issues with accessing USB devices, rendering them incompatible with Pupil Invisible.
:::

The currently supported Android versions are as follows:
- On **OnePlus 6**: Android 8 and 9
- On **OnePlus 8** and **8T**: Android 11
