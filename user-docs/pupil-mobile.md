+++
date = "2017-05-24T15:45:05+07:00"
title = "data format"
section_weight = 3
page_weight = 3
+++

## Pupil Mobile

Pupil Mobile is a companion app to Pupil Capture and Pupil Service. It is currently in public beta.

### Introducing Pupil Mobile

> {{< video-youtube embed-url="https://www.youtube.com/embed/atxUvyM0Sf8" >}}

Pupil Mobile enables you to connect your Pupil eye tracking headset to your Android device via USBC. You can preview video and other sensor streams on the Android device and stream video data over a WiFi network to other computers (clients) running Pupil Capture. Seamlessly integrated with Pupil Capture and Pupil Service.

### Home Screen {#pupil-mobile-home-screen}

> {{< webp-img src="/images/pupil-mobile/home.webp" alt="Pupil Mobile home call-out" >}}

Home screen is the main control center for `Pupil Mobile`. It displays a list of available sensors. Click any sensor for a preview.

1. **Sensors** - This area contains available sensors. Pupil headset cameras along with other sensors connected to or built into the Android device like audio and IMU.
1. **Record** - Click the Record button to save video and other sensor data locally on the Android device.
1. **General Settings** - Main settings menu for `Pupil Mobile` app.

### Sensor Preview {#pupil-mobile-sensor-preview}

> {{< webp-img src="/images/pupil-mobile/sensor.webp" alt="Pupil Mobile sensor call-out" >}}

Preview live video feed from your Pupil headset and other available sensors. Sensor preview windows will automically close and take you back to the Home screen in order to conserve battery.

1. **Sensor settings** - Settings for the sensor. For cameras you can set frame rate, exposure, white balance, and many more parameters.
1. **Sensor name and recording status** - This displays the sensor name and a dot displaying the recording status of this sensor.
1. **Preview stream** - A preview of sensor data.

### General Settings {#pupil-mobile-general-settings}

> {{< webp-img src="/images/pupil-mobile/general-settings.webp" alt="Pupil Mobile settings call-out" >}}

Main settings menu for `Pupil Mobile` app and information about the Android Device. 

1. **Device name** - Text input field to name your device. This is the device name that will appear in Pupil Capture.
1. **Close/Quit app** - Press this button to close the app. Pupil Mobile runs a service in the background. This enables the app to continue running even when your screen is off. Therefore, just swiping away the app view will not close the app.
1. **Save directory** - Select the location where recordings should be saved. By default recordings are saved on Android's built in storage. You can also save to an SD card, if available.

### Recordings Screen {#pupil-mobile-recordings-screen}

> {{< webp-img src="/images/pupil-mobile/recording.webp" alt="Pupil Mobile recording call-out" >}}

View all the datasets that were recorded on your Android device.

1. **Recording folder** - A directory containing all of your recordings.
1. **Delete** - Permanently delete recording files from the device.

### Switch views {#pupil-mobile-switch-views}

> {{< webp-img src="/images/pupil-mobile/swipe.webp" alt="Pupil Mobile swipe call-out" >}}

`Pupil Mobile` is designed to for efficient navigation. Swipe left or right for quick access to other views.

1. **Swipe** - Swipe left or right to switch between views. Swipe right from the home screen to go to the recording view. Swipe left from the home screen to the sensor preview views. 

### Streaming To Subscribers

> {{< video-webm src="/videos/backend-manager/backend-manager.webm" >}}

Pupil Mobile devices on the same local WiFi network are automatically detected by Pupil Capture. To subscribe to a Pupil Mobile device in Pupil Capture, go to `Capture Selection` and select Pupil Mobile as the capture source.

#### WiFi Bandwidth & Network

Make sure you have a good WiFi newtork connection and that it's not saturated. The quality of your WiFi connection will affect the sensor streams to your subscribers.

<aside class="notice">
Note - For streaming to work your network needs to allow <code>UDP</code> transport. If the nodes do not find each other, create a local wifi network and use that instead.
</aside>

<aside class="warning">
Make sure that your firewall is not blocking the connection.
</aside>

### NDSI Communication protocol

The communication protocol is named [NDSI](https://github.com/pupil-labs/pyndsi/blob/master/ndsi-commspec.md), it is completely open. A reference client for Python exsits [here](https://github.com/pupil-labs/pyndsi).

<aside class="warning">
The communication protocol does not implement any access control. This means that everyone running Pupil Capture in your local network will be able to access, i.e. stream and record, sensors connected to the phone running Pupil Mobile!

Make sure to hit "Stop background service and terminate app" in the general Pupil Mobile settings after you are done.
</aside>

### Download App

The app is free. You can download it in the [Google Play Store](https://play.google.com/store/apps/details?id=com.pupillabs.pupilmobile).

### Supported Hardware

- MotoZ2 Play
- Google Nexus 6p, Nexus 5x
- OnePlus 3, 3T, 5, 5T
- potentially other USB-C phones (untested)

<aside class="notice">
Note - You may need to <strong>enable</strong> USB OTG on some devices in order to allow data transfer and power to your Pupil Headset from your Android device.
</aside>

### Bug & Feature

#### I found a bug or need a feature!

Please check out existing issues or open a new issue at [Pupil Mobile repository](https://github.com/pupil-labs/pupil-mobile-app). This app is in Alpha state, help us make it better.

### Experiments

#### I want to use this for my experiments in the field

Feel free to do so, but do not rely on the app to work all the time! Many features and environments are still untested. If you have trouble, please open an issue. 

