---
description: How-To guide on transferring recordings off of the Companion phone via USB.
---

# Transfer Recordings via USB


::: tip
<v-icon large color="info">info_outline</v-icon>
The recommended way for transferring recordings off of the phone is to upload them to Pupil Cloud. For some use-cases, however, this may not be possible, and users may want to transfer the recordings via USB.
:::

To transfer recordings directly to a computer you first need to export the recordings to the Android filesystem. Then you need to access the filesystem to copy the data over to your computer. 

Recordings downloaded directly from the phone will be in a raw binary format that is difficult to handle. Finally, you should thus export the recordings using Pupil Player to more convenient formats.

#### Export from Neon App
1. Open the recordings view in the Neon app
2. Select desired recording/s
3. Export:
   - For single recordings, the export button is found by clicking on the 3 vertical dots to 
     the right of the cloud symbol
   - For multiple recordings, click the download symbol at the bottom of the screen    
4. The app via show you a dialog indicating to which folder the recordings will be exported too. Confirm this by clicking `Yes`.
    

[TODO: Double-check correctness of instructions]

#### Transfer Exported Recordings to a Computer
1. Connect your OnePlus device to a PC via USB (using the USB cable supplied)
2. Slide down from the top of the device's home-screen and click on 'Android System - USB charging this device'
3. Click on 'Tap for more options'
4. Select 'Transfer Files'
5. Open File Browser on your PC and access the Internal shared storage of your OnePlus device
6. Locate the export folder on the phone. Usually, it is in `Documents/Neon Export`.
7. Copy the recordings to your computer.
8. Export the recordings using [Pupil Player](/core/software/pupil-player/#export) (part of Pupil Core Software).

<DownloadLinks/>

Note that the export process does not delete the recordings from the Neon app, and you can still upload 
to Pupil Cloud at a later date if required. 

Recordings that are deleted from the Neon app, e.g. to free up storage space, cannot be transferred back 
to the Neon app from your backup location (including Pupil Cloud, a laptop/desktop PC, or external HD). 

This means that if you delete the recordings prior to uploading them to Pupil Cloud, they cannot be uploaded at a later date.

::: tip
<v-icon large color="info">info_outline</v-icon>
On **macOS**, you need the <a href="https://www.android.com/filetransfer/" alt="Android File Transfer website">Android File Transfer</a> to browse and transfer files between your Mac computer and your Android device.
:::

:::tip
<v-icon large color="info">info_outline</v-icon>
Recordings transferred locally will contain gaze data at **~120 Hz** (estimated in real-time on the Companion Device). Only 
recordings uploaded to Pupil Cloud are densified to 200 Hz.
:::
