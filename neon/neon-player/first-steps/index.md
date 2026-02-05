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
Starting with version `v2.9.0-prod` of the Neon Companion app, blinks, and fixations & saccades, can be computed at recording time. These data can be loaded in Neon Player `v5.0.0` or later. The current version you can download below is `v6.0.0`

To load blinks or fixations & saccades in recordings made prior to `v2.9.0-prod` of the Neon Companion app, use [Neon Player `v4.x`](https://github.com/pupil-labs/neon-player/releases) instead.
:::

## Load a Recording

To load a recording, you first need to download or export it to your computer:

1. Direct transfer from Neon Companion Device – For detailed instructions, refer to [this guide](/data-collection/transfer-recordings-via-usb/).

2. Download from [Pupil Cloud](/pupil-cloud/) – Right-click on a recording in Pupil Cloud, select **Download**, and ensure you choose the **"Native Recording Data"** format.

Once you have the recording, open Neon Player, and drag-and-drop the folder into the application window, or click on "_Choose a recording folder_", navigate to the desired folder and "Open" it.

::: tip
**You don't have Neon yet?** [Download a sample recording here](https://drive.google.com/file/d/1bicOLzmJLzDegNq7qByctsFjmTJgCWPZ/view?usp=sharing "Download sample recording to use in Neon Player").
:::

Neon Player will **never** remove or overwrite any of your raw data gathered at the time of recording. Instead, necessary cache files will be placed on a new hidden sub-folder, `neon_player`.

![Drag and drop recording folder](./pp-start.webp)

::: info

Recordings extracted from the phone may not contain certain streams if you disable them in the Settings, e.g. [eye state](../../data-collection/data-streams/#_3d-eye-states) or [pupillometry](../../data-collection/data-streams/#pupil-diameters). Furthermore, the sampling rate matches that at the time of recording.

Recordings downloaded from [Pupil Cloud](./../pupil-cloud/) will be reprocessed at 200Hz to guarantee that all data streams are present and at a consistent sampling rate, if your Companion Device can't keep up with the processing demands of the recording.
:::

## Workflow

Neon Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

- Start **Neon Player** and load a recording.
- Add required plugins - From the **Plugins** secction, which can be found in the Sidebar, click `Add/Remove` to add any plugin of your choice. A number of plugins are activated by default, but if you are for example interested in pupil size, you would activate the `Eyestate` plugin now.
- Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
- Set trim marks - drag the rounded rectangle at the beginning and end of the `Export window` to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
- Export Video & Raw Data - From the `Export All` view, click the export symbol, and select a location to create the export folder.
- View the exported data in .csv format in the newly created directory.
