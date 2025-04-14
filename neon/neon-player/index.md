# Neon Player

Neon Player is a cross-platform desktop application for playing back and exporting Neon recordings. It runs in an
offline context; no interaction with Pupil Cloud is required.

<script setup>
import DownloadLinks from '@components/DownloadLinks.vue'
</script>

<download-links
  src="https://api.github.com/repos/pupil-labs/neon-player/releases/latest"
  text="Download Neon Player"
  icon="./neon-player.svg"
/>

::: info
Starting with version `v2.9.0-prod` of the Neon Companion app, blinks, and fixations & saccades, can be computed at 
recording time. These data can be loaded in Neon Player `v5.0.0` or later.

To load blinks or fixations & saccades in recordings made prior to `v2.9.0-prod` of the Neon 
Companion app, use [Neon Player `v4.x`](https://github.com/pupil-labs/neon-player/releases) instead.
:::

## Loading a Recording
To load a recording, you first need to download or export it to your computer:

1. Direct transfer from Neon Companion Device – For detailed instructions, refer to [this guide](/data-collection/transfer-recordings-via-usb/).
2. Download from [Pupil Cloud](/pupil-cloud/) – Right-click on a recording in Pupil Cloud, select **Download**, and ensure you choose the **"Native Recording Data"** format.

Once you have the recording, open Neon Player and drag-and-drop the folder into the application window.

Don't have a recording yet? [Download a sample recording](https://api.cloud.pupil-labs.com/v2/workspaces/3d240903-cbf7-485a-84b1-3498f00e236c/recordings.zip?id=7c141c32-7a8d-411c-9428-70d16de9a9ea&share-key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmY2Q5NWJkYS1lZjVhLTRlN2YtOWZiYi01NTc1NWFhYWQzZTAiLCJtZXRob2QiOiJHRVQiLCJwYXRoIjoiL3YyL3dvcmtzcGFjZXMvM2QyNDA5MDMtY2JmNy00ODVhLTg0YjEtMzQ5OGYwMGUyMzZjL3JlY29yZGluZ3MuemlwIiwicXVlcnkiOiJpZD03YzE0MWMzMi03YThkLTQxMWMtOTQyOC03MGQxNmRlOWE5ZWEiLCJleHAiOjE4NjkyMjA3NzkuMjEzMDEzNn0.xfR9ZqOWmql1EmAkqc_mszL63hER_s8HziAzfn89-QI "Download sample recording to use in Neon Player").

::: info
Neon Player will **never** remove or overwrite any of your raw data gathered at the time of recording. Instead, it will create a new folder, `neon_player`, which contains the Neon Player compatible files.
:::

![Drag and drop recording folder](./pp-start.jpg)

::: info

Recordings extracted from the phone do not contain [eye state](../data-collection/data-streams/#_3d-eye-states) or [pupillometry](../data-collection/data-streams/#pupil-diameters), and the sampling rate matches that at the time of recording.

Recordings downloaded from [Pupil Cloud](./../pupil-cloud/) will be at 200Hz.
:::

## Neon Player Window

![Neon Player Callout](./pp-callout.jpg)

1. **Graphs**: This area contains performance graphs. The graphs display `CPU` and `FPS` (FPS = Video playback speed).
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

Neon Player uses a plugin framework to add functionality. Visualizations, fixations, blinks, and data exports are
all implemented using this structure.

There are two general types of plugins:

- **Unique**: You can only launch one instance of this plugin.
- **Not unique**: You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixel thickness. You can think of these types of plugins as _additive_.

## Exports
You can export data and videos by pressing `e` on your keyboard, or use the download button in the **Neon Player** window.

Upon activation, all loaded plugins with export capabilities will initiate the export process. Some exports operate in the background,
you can monitor their progress via a GUI progress bar. This allows you to continue working with Neon Player.

### Export Directory
Exports are separated from your raw data and contained in the `exports` subdirectory. Multiple exports will create a new
folders, which are auto-named according to their creation order, e.g. `000`, `001` etc.

### Export Handling
You can select the frame range to export by setting trim marks in the seek bar or directly in the `General Settings` menu.

Longer running exports, e.g. video exports, go through three phases: Queued, Running, and Completed.
Export tasks can be cancelled while being queued or running.
Completed tasks are kept in the list for reference.

## Workflow

Neon Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

- Start **Neon Player** and load a recording.
- Open a Plugin - From the `Plugin Manager` GUI menu (which can be found in the Sidebar), toggle any Plugin of your choice. The `Vis Circle` plugin is activated by default.
- Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
- Set trim marks - drag the green rounded rectangle at the beginning and end of the seekbar to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
- Export Video & Raw Data - From the `Plugin Manager` view, load the `World Video Exporter` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the ⬇ `download icon` button in the left hand side of the window to start the export.
- View the exported data in the `exports` directory.
