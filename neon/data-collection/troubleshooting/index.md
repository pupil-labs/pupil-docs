# Troubleshooting

Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If you can not find your issue in the list, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.

## The Companion Device Is Vibrating and a Red LED Is Blinking in the Neon Module!

The vibrations and the blinking LED try to grab the wearer's attention to notify them of a problem that may critically hurt the ongoing recording. To get details on the problem, open the Neon Companion App, which will show an error description.

Potential problems include:

- Low battery on the Companion Device.
- Low storage space remaining on the Companion Device.
- Unstable connection between Neon and the Companion device during a recording.

## I Accidentally Updated My Companion Device to an Incompatible Android Version!

You need to rollback the Android version to be compatible again. Please note that all data on the phone will be lost during the rollback, so make backups accordingly.

::: tip
The instructions below require you to copy files to your phone. If you are not familiar
with this procedure, see steps 1-5 from [these instructions](/data-collection/transfer-recordings-via-usb/).
:::

**OnePlus 8/8T**

If you upgraded to Android 12 or newer and want to roll back, follow these steps:

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

## The Scene Camera and Eye Cameras Are Not Being Recorded or Recognized in the Neon Companion App!

Make sure you use the included black USB-C to USB-C connector cable rather than a third-party cable. Third-party USB cables vary widely in their quality and can lead to loss of connection.
