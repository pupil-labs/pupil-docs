+++
date = "2017-05-24T15:45:05+07:00"
title = "data format"
section_weight = 3
page_weight = 3
+++

## Pupil Mobile

Pupil Mobile is a companion app to Pupil Capture and Pupil Service. It is currently in public alpha!

### Introducing Pupil Mobile

> {{< video-youtube embed-url="https://www.youtube.com/embed/atxUvyM0Sf8" >}}

Pupil Mobile enables you to connect your Pupil eye tracking headset to your Android device via USBC. You can preview video and other sensor streams on the Android device and stream video data over a WiFi network to other computers (clients) running Pupil Capture. Seamlessly integrated with Pupil Capture and Pupil Service.


### Streaming To Subscribers

> {{< video-webm src="/videos/backend-manager/backend-manager.webm" >}}

> <h4 align='center'>placeholder media</h4>

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

- Google Nexus 6p
- Goolge Nexus 5x
- potentially other USB-C phones (untested)

### Bug & Feature

#### I found a bug or need a feature!

Please check out existing issues or open a new issue at [Pupil Mobile repository](https://github.com/pupil-labs/pupil-mobile-app). This app is in Alpha state, help us make it better.

### Experiments

#### I want to use this for my experiments in the field

Feel free to do so, but do not rely on the app to work all the time! Many features and environments are still untested. If you have trouble, please open an issue. The Pupil Labs development team will not be able to provide support via video or email for issues related to the Pupil Mobile Android App.


