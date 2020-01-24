---
permalink: /invisible/user-guide/invisible-companion-app
---

# Invisible Companion App
Get familiar with Pupil Invisible Companion app!

## Home View
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
  :src="require('../../media/invisible/invisible-companion-app/invisible-companion-intro.jpg')"
  max-width=80%
  >
  </v-img>
</div>

1. **Scene camera icon**: This icon shows when the scene camera is connected. The color dot will appear only when the scene camera is connected. A color trail will appear along the gray ring during recording. Gaps in the trail signify a disconnect of this camera.
2. **Eye camera icon**: This icon shows when the eye cameras are connected. The color dot will appear only when the eye cameras are connected. A color trail will appear along the inner gray ring during recording. Gaps in the trail signify a disconnect of these cameras.
3. **Recording time**: Display of the elapsed recording time.
4. **Active wearer**: The currently selected wearer.
5. **Active template**: Click this button to fill out the fields of the active template.
6. **Menu**: Main app naviagation. Access recordings, wearers, templates, settings.
7. **Info**: Press this button to see information about remaining recording time, glasses and scene camera info, and the name of your Companion Device.
8. **Record**: Press this button to start or stop a recording.
9. **Preview**: Press this button to see a real-time preview of your scene video with gaze overlay.


## Pupil Cloud Sign Up

First time users need to Sign Up for a Pupil Cloud account. You can
Sign Up by using your Google account, or by creating an account with
email address and password.

### Automatic uploads to Pupil Cloud

Your purchase of Pupil Invisible includes a free membership to [Pupil Cloud](/cloud). Pupil Cloud enables you to privately and securely upload your recordings from your Companion Device to cloud storage. The usage of this feature is **optional**. You can turn this feature on/off during setup, or at any later time in the app settings. Learn more about [Pupil Cloud](/cloud).

<v-divider></v-divider>

## OnePlus 6 Companion Device Setup

::: warning
The information in this section is only required for OnePlus Companion Devices.
:::

### Enable OTG
USB On-The-Go (OTG) must be enabled for Invisible Glasses to connect to your Companion Device.

Check out the video for a demonstration of how to add OTG to quick settings and enable OTG.

<div style="display:flex;justify-content:center;" class="pb-4">
   <video width="50%" controls muted>
     <source src="../../media/invisible/invisible-companion-app/videos/usb_otg_oneplus6.mp4" type="video/mp4">
   </video>
</div>

### Enable Application Lock

Lock Pupil Invisible Companion App to the overview to ensure the app keeps running even when your screen is off.

Check out the video to see how to lock the app.

<div style="display:flex;justify-content:center;" class="pb-4">
   <video width="50%" controls muted>
     <source src="../../media/invisible/invisible-companion-app/videos/app_lock_oneplus6.mp4" type="video/mp4">
   </video>
</div>

### Time synchronization

The Pupil Invisible Companion App runs its own clock as the source for all data timestamps it generates. To start this clock the App samples the phone’s NTP (Network Time Protocol) synchronized UTC clock.

If more that one device is used and the data is required to be synchronised, make sure all devices have recently been connected to the internet and automatic time setting is active in the operating system settings.

Pupil Monitor will warn you if a device is not in sync.

More info in the technical implementation and quality of NTP synchronisation can be found in the developer docs.
