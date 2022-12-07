---
# permalink: /invisible/explainers/glasses-and-companion-device
# description: Introduction to the Pupil Invisible Hardware and Companion app.
---

# Companion Device
The Companion device is a flagship Android smartphone. It is a regular phone that is not customized or modified in any way. We support a small number of models, carefully selected and tested for maximum stability and performance. The Pupil Invisible Companion app is tuned to work with these particular models as we require full control over various low-level functions of the hardware. 

The models we currently support are OnePlus 6, OnePlus 8, and OnePlus 8T.

If you want to replace or add an extra Companion device you can purchase it [directly from us](https://pupil-labs.com/products/invisible/accessories/) or from any other distributor. The companion app is free and can be downloaded from the [Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp).

Using a fully charged OnePlus 8 device you get around 150 minutes of continuous recording time. You can extend this duration by simultaneously charging the phone during a recording using a powered USB-C hub. With this setup you connect the hub to the phone, and the Pupil Invisible device and a power source to the hub.

Note that not every USB-C hub is compatible with Android! One hub we have tested successfully is available [here](https://www.amazon.de/dp/B08CKXNJZS/). Also, note that the original OnePlus charger is not compatible with regular hubs (including the linked one) because it uses non-standard power delivery. Other regular USB chargers should work though.

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

:::tip
Should you have upgraded to an incompatible Android version by accident, you have the
option to rollback to a compatible version. You can find the instructions
[here](/invisible/troubleshooting/#i-accidentally-updated-my-companion-device-to-an-incompatible-android-version)
:::


## Using a USB-C Hub
The capabilities of the Companion device can be extended by connecting it to a USB-C hub. You can still connect a Pupil Invisible to the Companion device through the hub. For this to work the hub needs to provide a USB-C port that supports data transfer (some USB-C ports only support power delivery!). 

::: tip
Using a USB-C hub only works with **Android 11** and higher, which means that it is not compatible with the **OnePlus 6**.
:::

Most importantly using a hub allows you to:
- **charge the phone while recording**: if the hub supports power delivery, you can connect a power source to it to charge the Companion device even while it is recording. This allows to arbitrarily arbitrarily extend the recording duration.
- **connect an ethernet cable**: if the hub has an ethernet socket, you can connect the phone to the internet with it. This can be useful to increase the upload speed of recordings to Pupil Cloud or to transfer real-time data with very low latency.

::: tip
Not all USB-C hubs are compatible with Android and sometimes compatibility is difficult to check in advance! We have tested for example [this](https://www.amazon.de/dp/B08CKXNJZS/) hub successfully, which supports both power delivery and ethernet.
:::