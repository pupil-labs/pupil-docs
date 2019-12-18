---
permalink: /core/software/pupil-mobile
---

# Pupil Mobile
Pupil Mobile is a companion app to Pupil Capture and Pupil Service. It is currently in public beta.

<div class="pb-4">
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/atxUvyM0Sf8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Pupil Mobile enables you to connect your Pupil eye tracking headset to your Android device via USBC.
You can preview video and other sensor streams on the Android device and stream video data over a WiFi network to other computers (clients) running Pupil Capture.
Seamlessly integrated with Pupil Capture and Pupil Service.

## Home Screen
Home screen is the main control center for `Pupil Mobile`.
It displays a list of available sensors.
Click any sensor for a preview.

<div class="pb-4">
  <img src="../../media/core/imgs/pm-home.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

1. **Sensors** - This area contains available sensors. Pupil headset cameras along with other sensors connected to or built into the Android device like audio and IMU.
1. **Record** - Click the Record button to save video and other sensor data locally on the Android device.
1. **General Settings** - Main settings menu for `Pupil Mobile` app.

## Sensor Preview
Preview live video feed from your Pupil headset and other available sensors.
Sensor preview windows will automatically close and take you back to the Home screen in order to conserve battery.

<div class="pb-4">
  <img src="../../media/core/imgs/pm-sensor.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

1. **Sensor settings** - Settings for the sensor. For cameras you can set frame rate, exposure, white balance, and many more parameters.
1. **Sensor name and recording status** - This displays the sensor name and a dot displaying the recording status of this sensor.
1. **Preview stream** - A preview of sensor data.

## General Settings
Main settings menu for `Pupil Mobile` app and information about the Android Device.

<div class="pb-4">
  <img src="../../media/core/imgs/pm-settings.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

1. **Device name** - Text input field to name your device. This is the device name that will appear in Pupil Capture.
1. **Close/Quit app** - Press this button to close the app. Pupil Mobile runs a service in the background. This enables the app to continue running even when your screen is off. Therefore, just swiping away the app view will not close the app.
1. **Save directory** - Select the location where recordings should be saved. By default recordings are saved on Android's built in storage. You can also save to an SD card, if available.

## Recordings Screen
View all the datasets that were recorded on your Android device.

<div class="pb-4">
  <img src="../../media/core/imgs/pm-recording.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

1. **Recording folder** - A directory containing all of your recordings.
1. **Delete** - Permanently delete recording files from the device.

See the [`Transfer Recordings`](#transfer-recordings "Pupil Mobile transfer recordings from mobile device to pc") section below on how to transfer recordings from your phone to your computer.

## Switch Views
Pupil Mobile is designed to for efficient navigation.
Swipe left or right for quick access to other views.

<div class="pb-4">
  <img src="../../media/core/imgs/pm-swipe.jpg" style="display:flex;margin:0 auto;width:100%;">
</div>

1. **Swipe** - Swipe left or right to switch between views. Swipe right from the home screen to go to the recording view. Swipe left from the home screen to the sensor preview views.

## Streaming To Subscribers
Pupil Mobile devices on the same local WiFi network are automatically detected by Pupil Capture. To subscribe to a Pupil Mobile device in Pupil Capture, go to `Capture Selection` and select Pupil Mobile as the capture source.

<video width="100%" controls class="mb-5">
  <source src="../../media/core/videos/backend-manager.mp4" type="video/mp4">
</video>

#### WiFi Bandwidth & Network
Make sure you have a good WiFi newtork connection and that it's not saturated. The quality of your WiFi connection will affect the sensor streams to your subscribers.

::: tip
<v-icon large color="info">info_outline</v-icon>
For streaming to work your network needs to allow <code>UDP</code> transport.
If the nodes do not find each other, create a local wifi network and use that instead.
:::

::: warning
<v-icon large color="warning">error_outline</v-icon>
Make sure that your firewall is not blocking the connection.
:::

## NDSI Communication Protocol
The communication protocol is named [NDSI](https://github.com/pupil-labs/pyndsi/blob/master/ndsi-commspec.md), it is completely open. A reference client for Python exsits [here](https://github.com/pupil-labs/pyndsi).

::: warning
<v-icon large color="warning">error_outline</v-icon>
The communication protocol does not implement any access control.
This means that everyone running Pupil Capture in your local network will be able to access,
i.e. stream and record, sensors connected to the phone running Pupil Mobile!
Make sure to hit "Stop background service and terminate app" in the general Pupil Mobile settings after you are done.
:::

## Transfer Recordings
You will have to manually transfer recordings to your computer to open them in Player.
There are two different methods to archive that:

#### SD card File Transfer
This method requires

1. that you set the `Save directory` to `SD card` in the [main settings](#pupil-mobile-general-settings)
1. a SD card reader that can be connected to your computer

Once you finished the recording, remove the sd card from your phone,
insert it into the SD card reader, and connect it to your computer.
The SD card should show up on your computer as if it was a USB stick.

You can find all recodings in the `Pupil Mobile` folder on the SD card.
Copy the recording folders to a directory of your choice on your computer.
Afterwards, you can remove the SD card from the computer and open the copied recordings using Pupil Player.

#### Direct Phone Connection
1. Connect your phone via USB to your computer.
1. A notification on your phone should pop up: `Android System - USB charging this device`.
    1. Double tap the notification to open the options.
    1. Select `Use USB to transfer files`.
    1. Your phone should show up on your computer as if it was an USB stick.
1. The recordings are saved in two different locations depending on the `Save directory` settings chosen before the recording:
    1. Default: `Internal storage/Movies/Pupil Mobile`
    1. SD Card: `SD card/Pupil Mobile`
1. Copy the recording folders to a directory of your choice on your computer.
1. Disconnect the phone from your computer.
1. Open the copied recordings in Pupil Player.

::: tip
<v-icon large color="info">info_outline</v-icon>
Unfortunatly, step 2.3. does not work on macOS. Please use the [Android Filetransfer](https://www.android.com/filetransfer/) application instead.
:::

## Download App

The app is free. You can download it in the [Google Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.pupilmobile).

## Supported Hardware

- MotoZ2 Play
- Google Nexus 6p, Nexus 5x
- OnePlus 3, 3T, 5, 5T
- potentially other USB-C phones (untested)

::: tip
<v-icon large color="info">info_outline</v-icon>
You may need to <strong>enable</strong> USB OTG on some devices in order to allow data transfer and power to your Pupil Headset from your Android device.
:::

## Bugs & Features
#### I found a bug or need a feature!
Please check out existing issues or open a new issue at [Pupil Mobile repository](https://github.com/pupil-labs/pupil-mobile-app). This app is in Alpha state, help us make it better.

## Experiments
#### I want to use this for my experiments in the field
Feel free to do so, but do not rely on the app to work all the time! Many features and environments are still untested. If you have trouble, please open an issue.
