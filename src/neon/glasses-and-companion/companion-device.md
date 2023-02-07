---
permalink: /neon/glasses-and-companion/companion-device
description: Information on the Companion device and Neon app.
---

# Companion Device
The Companion device is a flagship Android smartphone. It is a regular phone that is not customized or modified in any way. To ensure maximum stability and performance we can only support a small number of carefully selected and tested models. The Neon app is tuned to work with these particular models as we require full control over various low-level functions of the hardware. 

The models we currently support are OnePlus 8, and OnePlus 8T.

If you want to replace or add an extra Companion device you can purchase it [directly from us](https://pupil-labs.com/products/neon/accessories/) or from any other distributor. The Neon app is free and can be downloaded from the [Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp).[TODO: fix link to app]

Using a fully charged OnePlus 8 device you get around 150 minutes of continuous recording time. You can extend this duration by simultaneously charging the phone during a recording [using a powered USB-C hub](/neon/glasses-and-companion/companion-device#using-a-usb-c-hub).

## Companion Device Updates

### Neon App
Make sure to update the Neon app on a regular basis. The latest version will always be available on the 
[Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.invisiblecomp). [TODO: fix link to app]

### Android OS
We ship each Companion Device with a specific Android Version, carefully tested to ensure robustness and stability.

:::danger
We recommend that you don't allow Android system updates on your device. Some Android versions have issues with accessing 
USB devices, rendering them incompatible with Neon.
:::

If you purchased your device from a third-party distributor, you'll need to ensure that the correct Android version is installed. The currently 
supported Android versions are as follows:
- On **OnePlus 8** and **8T**: Android 11

:::tip
Should you have upgraded to an incompatible Android version by accident, you have the
option to rollback to a compatible version. You can find the instructions
[here](/neon/troubleshooting/#i-accidentally-updated-my-companion-device-to-an-incompatible-android-version)
:::


## Using a USB-C Hub
The capabilities of the Companion device can be extended by connecting it to a USB-C hub. You can still connect Neon to the Companion device through the hub. For this to work, the hub needs to provide a USB-C port that supports data transfer (some USB-C ports only support power delivery!). 

::: tip
Using a USB-C hub only works with **Android 11** and higher, which means that it is not compatible with the **OnePlus 6**.
:::

Most importantly using a hub allows you to:
- **charge the phone while recording**: if the hub supports power delivery, you can connect a power source to it to charge the Companion device even while it is recording. This allows to arbitrarily extend the recording duration.
- **connect an ethernet cable**: if the hub has an ethernet socket, you can connect the phone to the internet with it. This can be useful to increase the upload speed of recordings to Pupil Cloud or to transfer real-time data with very low latency.

::: tip
Not all USB-C hubs are compatible with Android and sometimes compatibility is difficult to check in advance! We have tested for example [this](https://www.amazon.de/dp/B08CKXNJZS/) hub successfully, which supports both power delivery and ethernet.

Note that the original OnePlus charger is not compatible with regular hubs (including the linked one) because it uses non-standard power delivery. Other regular USB chargers should work though.
:::