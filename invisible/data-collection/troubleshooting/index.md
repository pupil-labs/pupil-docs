# Troubleshooting

Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If the instructions do not solve the problem for you, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.

## The Companion device is vibrating and a red LED is blinking on my Pupil Invisible glasses!

The vibrations and the blinking LED try to grab the wearer's attention to notify them of a problem that may critically hurt the ongoing recording. To get details on the problem, open the Pupil Invisible Companion app, which will show an error description.

Potential problems include:

- Low battery on the Companion Device.
- Low storage space remaining on the Companion Device.
- Unstable connection to the Pupil Invisible Glasses device during a recording.

## I accidentally updated my Companion device to an incompatible Android version!

You need to rollback the Android version to be compatible again. Please note that all data on the phone will be lost during the rollback, so make backups accordingly.

::: tip
The instructions below require you to copy files to your phone. If you are not familiar
with this procedure, see steps 1-5 from [these instructions](/data-collection/transfer-recordings-via-usb/).
:::

**OnePlus 6**

If you upgraded to Android 10 or newer and want to roll back, follow these steps:

1. Download the ROM package [here](https://drive.google.com/file/d/1X8SVUH7UU7g0dcf-iWWXTPtMWzGguhUA/view?usp=sharing).
1. Copy the ROM package to the mobile phone storage root directory.
1. Go to Settings -> system updates -> top right corner icon -> local upgrade -> click on the installation package -> immediately upgrade -> system upgrade to 100%.
1. Select Reboot system now.

**OnePlus 8/8T**

::: tip
If you upgraded to Android 13 or newer and want to roll back, please reach out to info@pupil-labs.com
:::

If you upgraded to Android 12 and want to roll back, follow these steps:

1. Download the ROM package for your corresponding phone model to your computer

   - [OnePlus 8](https://drive.google.com/file/d/1sWZN8K7p64q9wzW06fDtMeyqOMukqk9M/view?usp=drive_link)
   - [OnePlus 8T](https://drive.google.com/file/d/1_Fbyk8nznjrJwVF6WgegjJj1xevgvn3R/view?usp=drive_link)

1. Download the [official Rollback APK](https://drive.google.com/file/d/1QY0J_h9Ds-A_zNp6Rmm9Li4DgRSizj7P/view?usp=drive_link) to your computer
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

## The scene camera and eye cameras are not being recorded or recognized in the Companion app!

1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure **OTG** is enabled. If it is not enabled you should see a red USB sign in the top-left of the companion app's home screen. Check out the video for a demonstration of how to add OTG to quick settings and enable OTG.

<video width="100%" controls>
  <source src="./usb_otg_oneplus6.mp4" type="video/mp4">
</video>

## The scene video or gaze data cuts off at some point in a recording!

1. Make sure that permissions to access the USB devices are given and **"Use by default for this device" is enabled**. If those permissions are not given or not set to be used by default, you should get prompts asking you for permissions every time you reconnect the glasses to the companion device. To fix this, reconnect your glasses and for every prompt that shows up give permission and check the "Use by default for this device" checkbox.
1. Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
1. Are you using a **OnePlus 6** device?
   - Make sure the **Companion app is locked** to the Android app overview. If it is not locked, you should see a red lock symbol in the top-left of the companion app's home screen.
     Check out the video to see how to lock the app.

<video width="100%" controls>
  <source src="./app_lock_oneplus6.mp4" type="video/mp4">
</video>

## 'Always open Invisible Companion when...' dialog keeps opening when I plug in the Glasses!

This is an Android OS bug. Fix it by resetting Pupil Invisible Companion App to default settings:

1. Long press on the Pupil Invisible Companion App icon in the home screen.
1. Click `App Info` then `Advanced` followed by `Open by default`.
1. Click `Clear defaults`. (No recordings will be lost.)
1. Open the App and connect your Pupil Invisible device. Tick the "Always open Invisible Companion when..." checkboxes and accept the permission requests. Now they will be saved properly.
