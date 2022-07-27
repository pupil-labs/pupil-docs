---
permalink: /invisible/troubleshooting
description: Troubleshooting section listing common issues and their solution.
---

# Troubleshooting
Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If the instructions do not solve the problem for you, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.


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

#### I accidentally updated my Companion device to an incompatible Android version!
You need to rollback the Android version to be compatible again. Please note that all data on the phone will be lost during the rollback, so make backups accordingly.

::: tip
<v-icon large color="info">info_outline</v-icon>
The instructions below require you to copy files to your phone. If you are not familiar
with this procedure, see steps 1-5 from [these instructions](/invisible/how-tos/data-collection-with-the-companion-app/transfer-recordings-via-usb.html#transfer-exported-recordings-to-a-computer).
:::

**OnePus 6**

If you upgraded to Android 10 or newer and want to roll back, follow these steps:
1. Download the ROM package [here](https://drive.google.com/file/d/1X8SVUH7UU7g0dcf-iWWXTPtMWzGguhUA/view?usp=sharing).
1. Copy the ROM package to the mobile phone storage root directory.
1. Go to Settings -> system updates -> top right corner icon -> local upgrade -> click on the installation package -> immediately upgrade -> system upgrade to 100%.
1. Select Reboot system now.

**OnePlus 8/8T**

If you upgraded to Android 12 or newer and want to roll back, follow these steps:
1. Download the ROM package for your corresponding phone model to your computer

   - [OnePlus 8](https://drive.google.com/file/d/1WtZ7bVwWPwYIGq4aWadeG-7MLu-KXhIS/view?usp=sharing)
   - [OnePlus 8T](https://drive.google.com/file/d/1K2VI-R4gGN8mdS6FxLiRo48ICF_UBB7A/view?usp=sharing)

1. Download the [official Rollback APK](https://oxygenos.oneplus.net/OPLocalUpdate_For_Android12.apk) to your computer
1. Copy the downloaded ROM and APK to the top level of the device's Internal Storage (do not put it inside of any folders)
1. On the phone,
   1. open the pre-installed `Files` or `File Manager` application,
   1. navigate to the device's Internal Storage, and
   1. select the `OPLocalUpdate_For_Android12.apk`.

   This should start the install process for the application.
   (You might need to grant install permissions to the `Files` application. A corresponding dialogue will guide
   you if this is the case.)
1. Open the newly installed `System Update` app
1. Tap the ⚙️ icon in the top right
1. Select the downgrade ROM from step 4
1. Read and confirm the warning
1. Enter the phone's pin
1. Wait until the system update has been installed successfully
1. Tap `Reboot`

#### The scene camera and eye cameras are not being recorded or recognized in the companion app!
1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure **OTG** is enabled. If it is not enabled you should see a red USB sign in the top-left of the companion app's home screen. Check out the video for a demonstration of how to add OTG to quick settings and enable OTG.

<div style="display:flex;flex-direction:row;justify-content:center;" class="pb-4">
    <video style="max-height: 700px;" controls muted>
      <source src="../media/invisible/invisible-companion-app/videos/usb_otg_oneplus6.mp4" type="video/mp4">
    </video>
</div>


#### The scene video or gaze data cuts off at some point in a recording!
1. Make sure that permissions to access the USB devices are given and **"Use by default for this device" is enabled**. If those permissions are not given or not set to be used by default, you should get prompts asking you for permissions every time you reconnect the glasses to the companion device. To fix this, reconnect your glasses and for every prompt that shows up give permission and check the "Use by default for this device" checkbox.
1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure the **Companion app is locked** to the Android app overview. If it is not locked, you should see a red lock symbol in the top-left of the companion app's home screen. You can find instructions on how to lock the app [here](/invisible/user-guide/invisible-companion-app/#enable-application-lock "Pupil Invisible Companion OnePlus App Lock").
   Check out the video to see how to lock the app.

<div style="display:flex;flex-direction:row;justify-content:center;" class="pb-4">
   <video style="max-height: 700px;" controls muted>
     <source src="../media/invisible/invisible-companion-app/videos/app_lock_oneplus6.mp4" type="video/mp4">
   </video>
</div>

#### 'Always open Invisible Companion when...' dialog keeps opening when I plug in the Glasses!
This is an Android OS bug. Fix it by resetting Pupil Invisible Companion App to default settings:
1. Long press on the Pupil Invisible Companion App icon in the home screen.
1. Click `App Info` then `Advanced` followed by `Open by default`. 
1. Click `Clear defaults`. (No recordings will be lost.)
1. Open the App and connect your Pupil Invisible device. Tick the "Always open Invisible Companion when..." checkboxes and accept the permission requests. Now they will be saved properly.

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
      from pupil_labs.realtime_api.simple import Device

      # This address is just an example. Find out the actual IP address of your device!
      ip = "192.168.1.169"

      device = Device(address=ip, port="8080")
      ```
   - Alternatively, you can circumvent this by running a separate WiFi using the phone's hotspot functionality or a dedicated WiFi router.
