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

The Pupil Invisible glasses connect to the Companion device (Android Phone) with a USB-C cable. The Companion device supplies the glasses with power and receives the raw sensor data for storage and further processing. Use the Pupil Invisible Companion App to make recordings, preview real-time gaze and world video, stream data over the network, set up wearers, select templates, and preview and upload recordings to Pupil Cloud.


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

- **Indicator LED**: An RGB LED is located in the front-right of the glasses to notify the wearer in case of issues. For example, if the Companion device is running out of battery or storage space, the indicator light will start blinking (the Companion device will also start vibrating!).

- **Lenses**: A pair of exchangeable lenses sits in the front of the glasses. The glasses ship with clear plano lenses, as well as a pair of shaded lenses. Lenses with prescription values can be obtained from any optician or via our [lens kit](https://pupil-labs.com/products/invisible/accessories/). See our how-to guide on [exchanging lenses](/invisible/how-tos/pupil-invisible-glasses/exchange-lenses) for more information.

- **USB-C Connector**: The connector is used to connect the glasses to the Companion device. Always use the cable that was provided with your Pupil Invisible system to guarantee a stable connection!

- **Serial Plaque**: The glasses serial number can be found on a plaque at the tip of the left arm.

:::danger
The electronics and sensors are sensitive! Please follow our how-to guide when [cleaning and disinfecting](/invisible/how-tos/pupil-invisible-glasses/cleaning-and-disinfecting)  your glasses.
:::

## Pupil Invisible Companion Device
The Companion device is a flagship Android smartphone. It is a regular phone that is not customized or modified in any way. We support a small number of models, carefully selected and tested for maximum stability and performance. The Pupil Invisible Companion app is tuned to work with these particular models as we require full control over various low-level functions of the hardware. 

The models we currently support are OnePlus 6, OnePlus 8, and OnePlus 8T.

If you want to replace or add an extra Companion device you can purchase it [directly from us](https://pupil-labs.com/products/invisible/accessories/) or from any other distributor. The companion app is free and can be downloaded from the [Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp).

Using a fully charged OnePlus 8 device you get around 150 minutes of continuous recording time. You can extend this duration by simultaneously charging the phone during a recording using a powered USB-C hub. With this setup you connect the hub to the phone, and the Pupil Invisible device and a power source to the hub.

Note that not every USB-C hub is compatible with Android! One hub we have tested successfully is available [here](https://www.amazon.de/dp/B08CKXNJZS/ref=pe_27091401_487027711_TE_SCE_dp_1). Also, note that the original OnePlus charger is not compatible with regular hubs (including the linked one) because it uses non-standard power delivery. Other regular USB chargers should work though.

## Companion Device Updates
### Companion App
Make sure to update the Companion app on a regular basis. The latest version will always be available on the 
[Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp).

### Android OS
We ship each Companion Device with a specific Android Version, carefully tested to ensure robustness and stability.

:::danger
We recommend that you don't allow Android system updates on your device. Some Android versions have issues with accessing 
USB devices, rendering them incompatible with Pupil Invisible.
:::

If you purchased your device from a third-party distributor, you'll need to ensure that the correct Android version is installed. The currently 
supported Android versions are as follows:
- On **OnePlus 6**: Android 8 and 9
- On **OnePlus 8** and **8T**: Android 11
