# Troubleshooting
Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If you can not find your issue in the list, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.

## The Companion device is vibrating and a red LED is blinking in the Neon module!
The vibrations and the blinking LED try to grab the wearer's attention to notify them of a problem that may critically hurt the ongoing recording. To get details on the problem, open the Neon Companion app, which will show an error description.

Potential problems include:
- Low battery on the Companion Device.
- Low storage space remaining on the Companion Device.
- Unstable connection between Neon an the Companion device during a recording.

## I accidentally updated my Companion device to an incompatible Android version!
You need to rollback the Android version to be compatible again. Please note that all data on the phone will be lost during the rollback, so make backups accordingly.

::: tip
The instructions below require you to copy files to your phone. If you are not familiar
with this procedure, see steps 1-5 from [these instructions](/data-collection/transfer-recordings-via-usb/).
:::

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

## The scene camera and eye cameras are not being recorded or recognized in the Neon Companion app!
Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.

## 'Always open Invisible Companion when...' dialog keeps opening when I plug in the Glasses!
This is an Android OS bug. Fix it by resetting Pupil Invisible Companion App to default settings:
1. Long press on the Pupil Invisible Companion App icon in the home screen.
1. Click `App Info` then `Advanced` followed by `Open by default`. 
1. Click `Clear defaults`. (No recordings will be lost.)
1. Open the App and connect your Pupil Invisible device. Tick the "Always open Invisible Companion when..." checkboxes and accept the permission requests. Now they will be saved properly.
