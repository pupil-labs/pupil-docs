# Neon Player

Neon Player is a cross-platform desktop application for playing back and exporting Neon recordings offline.

<script setup>
import DownloadLinks from '@components/DownloadLinks.vue'
</script>

<download-links
  src="https://api.github.com/repos/pupil-labs/neon-player/releases/latest"
  text="Download Neon Player"
  icon="./neon-player.svg"
/>

## Why Neon Player?

There could be times when using Pupil Cloud is not an option (e.g. no internet conection), but you may still need to visualize, explore and export your data in an easy way. Hence, Neon Player!

## First Steps

After you download it from the button above and install it, if you have used Pupil Player you will find the interface quite familiar.

A gray screen will welcome you indicating how to [load a recording](#loading-a-recording).

## Loading a Recording

To load a recording into Neon Player, you first need to download or export it to your computer. This can be done in two ways:

1. Directly transferring it from the Neon Companion Device. For detailed instructions on this method, refer to our [guide](/data-collection/transfer-recordings-via-usb/).
2. Downloading it from the [Pupil Cloud](/pupil-cloud/). To do this, right-click on a recording in Pupil Cloud, select **Download**, and ensure you choose the **"Native Recording Data"** format. This option is distinct from the **"Time Series + Video"** format and becomes available only after activation in your workspace settings.

Once you have the recording, simply drag the recording folder onto the Neon Player app icon, or open Neon Player and drag-and-drop the folder into the application window.

![Drag and drop recording folder](./pp-start.jpg)

::: info

Recordings extracted from the phone do not contain [eye state](../data-collection/data-streams/#_3d-eye-states) or [pupillometry](../data-collection/data-streams/#pupil-diameters) yet, and the sampling rate matches the one chosen at the time of recording.

Recordings downloaded from [Pupil Cloud](./../pupil-cloud/) would be at 200Hz.
:::

## Neon Player Window

![Neon Player Callout](./pp-callout.jpg)

1. **Graphs**: This area contains performance graphs. The graphs display `CPU` and `FPS` (Video playback speed).
1. **Hot Keys**: This area contains clickable buttons for plugins.
1. **Timeline Events**: Plugins can add temporal events to this expandable panel.
1. **Timeline**: Control the playback of the video with the play/pause button (or spacebar on your keyboard). Drag the playhead (vertical line) to the desired point in time.

   - **Trimming**: Drag the green rounded rectangles at either end of the timeline to set beginning and ending trim markers. The trim section markers specify the section of the video/data to export.
   - **Frame Stepping**: You can use the arrow keys on your keyboard or the `<<` `>>` buttons to advance one frame at a time while the playback is paused.
   - **Playback Speed**: To change the playback speed, use the arrow keys on your keyboard or the `<<` `>>` buttons during playback. There are 5 available playback speeds: `0.25x`, `0.5x`, `1x` (default), `2x`, `4x`.

1. **Menu**: This area contains settings and contextual information for each plugin.
1. **Sidebar**: This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below the horizontal separator.

### Keyboard Shortcuts

| Keyboard Shortcut | Description                                                                |
| :---------------- | :------------------------------------------------------------------------- |
| `<space>`         | Play and pause video                                                       |
| `<arrow left>`    | Step to previous frame <sup>1</sup> / Decrease playback speed <sup>2</sup> |
| `<arrow right>`   | Step to next frame <sup>1</sup> / Increase playback speed <sup>2</sup>     |
| `e`               | Start export                                                               |
| `a`               | Surface tracker: Add new surface                                           |
| `x`               | Add annotation (default keyboard shortcut)                                 |
| `f`               | Fixation: Show next                                                        |
| `F`               | Fixation: Show previous                                                    |

<sup>1</sup> While paused
<sup>2</sup> During playback

## Plugins

Neon Player uses a plugin framework to add functionality. Visualizations, marker tracking, and the exporter are all implemented using this structure.

There are two general types of plugins:

- **Unique**: You can only launch one instance of this plugin.
- **Not unique**: You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixel thickness. You can think of these types of plugins as _additive_.

## Workflow

Neon Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

- Start **Neon Player** and load a recording.
- Open a Plugin - From the `Plugin Manager` GUI menu (which can be found in the Sidebar), toggle any Plugin of your choice. The `Vis Circle` plugin is activated by default.
- Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
- Set trim marks - you can drag the green rounded rectangle at the beginning and end of the seekbar to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
- Export Video & Raw Data - From the `Plugin Manager` view, load the `World Video Exporter` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the ⬇ `download icon` button in the left hand side of the window to start the export.
- Check out exported data in the `exports` directory within your recording directory.

::: info
Neon Player will **never** remove or overwrite any of your raw data gathered during capture. Instead, it will create a new folder, `neon_player`, which contains the Neon Player compatible files.
All exports are isolated within a sub-directory named `exports` and will never be overwritten.
:::

::: tip
Looking for a command line interface that allow you to export recordings as CSV files programmatically? `pl-rec-export` is available [here](https://github.com/pupil-labs/pl-rec-export).
:::
