# Installation

You can download the latest version of Neon Player for Windows, macOS, and Linux from the [releases page](https://github.com/pupil-labs/neon-player/releases) or by clicking the button below.

<script setup>
import DownloadLinks from '@components/DownloadLinks.vue'
</script>

<download-links
  src="https://api.github.com/repos/pupil-labs/neon-player/releases/latest"
  text="Download Neon Player"
  icon="../neon-player.svg"
/>

::: info
Starting with version `v2.9.0-prod` of the Neon Companion app, blinks, and fixations & saccades, can be computed at recording time. These data can be loaded in Neon Player `v5.0.0` or later.

To load blinks or fixations & saccades in recordings made prior to `v2.9.0-prod` of the Neon Companion app, use [Neon Player `v4.x`](https://github.com/pupil-labs/neon-player/releases) instead.
:::

## Load a Recording

To load a recording, you first need to have it on your computer. You can obtain a recording in two ways:

1. Direct transfer from Neon Companion Device – For detailed instructions, refer to [this guide](/data-collection/transfer-recordings-via-usb/).

2. Download from [Pupil Cloud](/pupil-cloud/) – Right-click on a recording in Pupil Cloud, select **Download**, and ensure you choose the **"Native Recording Data"** format.

Once you have the recording, open Neon Player, and drag-and-drop the folder into the application window, or click on "_Choose a recording folder_", navigate to the desired folder and "Open" it.

::: tip
**You don't have Neon yet?** [Download a sample recording here](https://drive.google.com/file/d/1bicOLzmJLzDegNq7qByctsFjmTJgCWPZ/view?usp=sharing "Download sample recording to use in Neon Player").
:::

![Drag and drop recording folder](./pp-start.webp)

::: info
Recordings exported directly from the Companion Device will be in their native format and capture the raw recording 
environment. This means they will only include the data streams enabled and sampling rate at the time of recording.
Please refer to [the local transfer guide](/data-collection/transfer-recordings-via-usb/) for more details.
:::

## Workflow

Neon Player is similar to a video player. You can playback recordings and use plugins to load and visualize Neon's
datastreams.

Here is an example workflow:

- **Launch Neon Player:** Start **Neon Player** and load your recording.
- **Add required plugins:** In the **Plugins** section of the Sidebar, click `Add/Remove` to add any plugin of your choice. Whilst several plugins are activated by default, you must manually add the `Eyestate` plugin if you require pupil size, for example.
- **Playback:** Press the play button or `space` bar on your keyboard to view the video with visualization overlay. You can also drag the playhead in the seek bar to scrub through the dataset.
- **Set trim marks:** Drag the rounded handles at the beginning and end of the `Export window` to set trim marks. This defines start and end frames for the exporter and for other active plugins.
- **Export video & raw data:** From the `Export All` view, click the export symbol, and select a location to create the export folder.
- **Review data:** You can now view the exported data in .csv format within the newly created directory.
