+++
date = "2017-01-20T11:37:57+07:00"
title = "win driver setup"
section_weight = 4
page_weight = 1.4
+++

## Windows Driver Setup

In order to support isochronous USB transfer on Windows, you will need to install drivers for the cameras in your Pupil headset. 

<aside class="notice">
  The driver installation is done automatically when you run the Pupil Capture or Service bundle. Do not manually install drivers if you dont run Pupil from source!
</aside>

### Download drivers and tools
1. Download and install [7zip](http://www.7-zip.org/download.html)
1. Download and extract [Pupil camera driver installer](https://drive.google.com/uc?export=download&id=0Byap58sXjMVfR0p4eW5KcXpfQjg)

### Install drivers for your Pupil headset

1. Navigate to `pupil_labs_camera_drivers_windows_x64` directory
1. Double click *`InstallDriver.exe`* - this will install drivers. Follow on screen prompts. 
1. Open `Windows Device Manager` from `System > Device Manager`. Verify the drivers are correctly installed in `Windows Device Manager`. Your Pupil headset cameras should be listed under a new category titled: `libusbK Usb Devices`. Note: In some cases `Pupil Cam1` may show three of the same `ID` as the camera name. Don't worry - just make sure that the number of devices are the same as the number of cameras on your Pupil headset.
1. Download the latest release of Pupil software and launch `pupil_capture.exe` to verify all cameras are accessible.

### Troubleshooting

If you had tried to install drivers with previous driver install instructions and failed, or are not able to access cameras in Pupil Capture. Please try the following:

1. In `Device Manager` (`System > Device Manager`)
1. `View > Show Hidden Devices` 
1. Expand `libUSBK Usb Devices`
1. For each device listed (even hidden devices) click `Uninstall` and check the box agreeing to `Delete the driver software for this device` and press `OK`
1. Repeat for each device in libUSBK Usb Devices
1. Unplug Pupil headset (if plugged in)
1. Restart your computer
1. Install drivers from step 2 in the `Install drivers for your Pupil headset` section

### Manual Installation of DIY Camera Drivers

If any issues arise when trying to install drivers for your DIY eye or world cameras, or if you are installing them for the first time, you can try following these instructions:

1. Unplug Pupil Headset from your computer and keep unplugged until the last step
1. Open Device Manager
    1. Click View > Show Hidden Devices
    1. Expand the `libUSBK devices` category and expand the `Imaging Devices` category within the Device Manager (sometimes a camera may be under the `Cameras` category)
    1. Uninstall and delete drivers for all Pupil Cam 1 ID0, Pupil Cam 1 ID1, and Pupil Cam 1 ID2 devices within both libUSBK and Imaging Devices Category
1. Restart Computer
1. Start the latest version of Pupil Capture (ensure that you have admin privileges on your machine)
    i. General Menu > Restart with default settings
1. Plug in Pupil Headset after Pupil Capture relaunches - Please wait, drivers should install automatically. You may need to close/cancel automatic Windows driver installation

If the above doesn't work, uninstall all drivers by following steps 1 to 3. You can then try install `libusbK` drivers with Zadig as outlined in steps 1-7 in the [pyuvc docs](https://github.com/pupil-labs/pyuvc/blob/master/WINDOWS_USER.md)
