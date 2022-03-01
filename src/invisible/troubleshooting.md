---
permalink: /invisible/troubleshooting
description: Troubleshooting section listing common issues and their solution.
---

# Troubleshooting
Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If the instructions do solve the problem for you, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.


## Pupil Invisible & Companion App

#### Recordings are not uploading to Pupil Cloud successfully
1. Make sure **Cloud upload** is enabled in the Companion app's settings.
1. Try logging out of the app and back in.

#### The Companion device is vibrating and a red LED is blinking on my Pupil Invisible glasses!
The vibrations and the blinking LED try to grab the wearer's attention to notify them of a problem that may critically hurt the ongoing recording. To get details on the problem, open the Pupil Invisible Companion app, which will show an error description.

Potential problems include:
- Low battery on the Companion Device.
- Low storage space remaining on the Companion Device.
- Unstable connection to the Pupil Invisible Glasses device during a recording.

#### The scene camera and eye cameras are not being recorded or recognized in the companion app!
1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure **OTG** is enabled. If it is not enabled you should see a red USB sign in the top-left of the companion app's home screen. You can find instructions on how to enable it [here](/invisible/user-guide/invisible-companion-app/#enable-otg "Pupil Invisible Companion OnePlus Enable OTG").

#### The scene video or gaze data cuts off at some point in a recording!
1. Make sure that permissions to access the USB devices are given and **"Use by default for this device" is enabled**. If those permissions are not given or not set to be used by default, you should get prompts asking you for permissions every time you reconnect the glasses to the companion device. To fix this, reconnect your glasses and for every prompt that shows up give permission and check the "Use by default for this device" checkbox.
1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure the **Companion app is locked** to the Android app overview. If it is not locked, you should see a red lock symbol in the top-left of the companion app's home screen. You can find instructions on how to lock the app [here](/invisible/user-guide/invisible-companion-app/#enable-application-lock "Pupil Invisible Companion OnePlus App Lock").

## Pupil Cloud

#### My enrichment download contains only an `info.json` file and nothing else!
Did you use **Safari browser** to make the download?
   - Enrichments downloads come as ZIP files. By default, Safari will automatically extract ZIP files when the download is finished. However, it will only extract file types that are considered "safe". Surprisingly, CSV and MP4 files are not considered safe and Safari will by default only extract the remaining JSON files.

      To fix this you can either use a different browser to make the download, or disable the **"Open 'safe' files after downloading"** setting in Safari.


## Real-Time API

#### I cannot connect to devices using the real-time API!
1. Make sure the Companion app and the device you are using to access the API are connected to the same local network.
1. For discovery the local network must allow MDNS and UDP traffic. In large public networks this may be prohibited for security reasons.
   
   - You may still be able to connect to the Pupil Invisible device using its IP address. You can find the IP address in the WiFi settings of the phone. Once you have it, you can connect like this:
      ```python
      from pupil_labs.realtime_api.basic import Device

      # This address is just an example. Find out the actual IP address of your device!
      ip = "192.168.1.169"

      device = Device(address=ip, port="8080")
      ```
   - Alternatively, you can circumvent this by running a separate WiFi using the phone's hot spot functionality or an extra router.