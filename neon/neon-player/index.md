# Neon Player
Neon Player is a cross-platform desktop application for playing back and exporting Neon recordings.

<script setup>
import DownloadLinks from '../../components/DownloadLinks.vue/'
</script>

<download-links
  src="https://api.github.com/repos/pupil-labs/neon-player/releases/latest"
  text="Download Neon Player"
  icon="./../public/neon-player.svg"
/>

## Load a recording
To open a Neon recording in Neon Player, you first need to download it to your computer. You can either pull a recording directly [off of the Neon Companion Device](/data-collection/transfer-recordings-via-usb/), or download it from the [Pupil Cloud](/pupil-cloud/). When downloading from Pupil Cloud, make sure to download the "Native Recording Data" format and not the "Time Series + Video" format. 

Note, that this format will only become available after enabling it in your workspace settings.

Drag the recording folder directly onto the app icon **or** launch the application and drag + drop the recording folder into the Neon Player window.

![Drag and drop recording folder](./pp-start.jpg)

::: warning

Recordings extracted from the phone do not contain yet [eye state](../data-collection/data-streams/#_3d-eye-states) or [pupillometry](../data-collection/data-streams/#pupil-diameters) and the sampling rate would be the one chosen at the time of recording.

Recordings downloaded from [Pupil Cloud](./../pupil-cloud/) would be at 200Hz and contain pupil size and eye state.

:::

## Neon Player Window

![Neon Player Callout](./pp-callout.jpg)

1. **Graphs**: This area contains performance graphs. The graphs display `CPU` and `FPS`. TODO: is FPS actually correct?
1. **Hot keys**: This area contains clickable buttons for plugins.
1. **Timeline Events**: Plugins can add temporal events to this expandable panel.
1. **Timeline**: Control the playback of the video with the play/pause button (or spacebar on your keyboard). Drag the playhead (vertical line) to the desired point in time.
    - **Trimming**: Drag either end of the timeline to set a trim beginning and ending trim marks. The trim section marks directly inform the section of video/data to export.
    - **Frame Stepping**: You can use the arrow keys on your keyboard or the `<<` `>>` buttons to advance one frame at a time while the playback is paused.
    - **Playback Speed**: To change the playback speed, use the arrow keys on your keyboard or the `<<` `>>` buttons during playback. There are 5 available playback speeds: `0.25x`, `0.5x`, `1x` (default), `2x`, `4x`.

1. **Menu**: This area contains settings and contextual information for each plugin.
1. **Sidebar**: This area contains clickable buttons for each plugin. System plugins are loaded in the top and user added plugins are added below the horizontal separator.

### Keyboard Shortcuts

| Keyboard Shortcut   | Description                                            |
|:--------------------|:-------------------------------------------------------|
| `<space>`           | Play and pause video                                   |
| `<arrow left>`      | Step to previous frame\* / Decrease playback speed\*\* |
| `<arrow right>`     | Step to next frame\* / Increase playback speed\*\*     |
| `e`                 | Start export                                           |
| `a`                 | Surface tracker: Add new surface                       |
| `x`                 | Add annotation (default keyboard shortcut)             |
| `f`                 | Fixation: Show next                                    |
| `F`                 | Fixation: Show previous                                |

\* While paused
\*\* During playback

## Workflow

Neon Player is similar to a video player. You can playback recordings and can load plugins to build visualizations.

Here is an example workflow:

- Start Neon Player
- Open a Plugin - From the `Plugin Manager` GUI menu load the `Vis Circle` plugin.
- Playback - press the play button or `space` bar on your keyboard to view the video playback with visualization overlay, or drag the playhead in the seek bar to scrub through the dataset.
- Set trim marks - you can drag the green rounded rectangle at the beginning and end of the seekbar to set the trim marks. This will set the start and end frame for the exporter and for other plugins.
- Export Video & Raw Data - From the `Plugin Manager` view, load the `World Video Exporter` plugin and the `Raw Data Exporter` plugin. Press `e` on your keyboard or the `download icon` button in the left hand side of the window to start the export.
- Check out exported data in the `exports` directory within your recording directory

::: info
Neon Player will <strong>never</strong> remove or overwrite any of your raw data gathered during capture. All exports are isolated within a sub-directory named <code>exports</code>. Exports will never be overwritten.
:::

## Plugins
Neon Player uses a plugin framework to add functionality. Visualizations, marker tracking, and the exporter are all implemented using this structure. 

There are two general types of plugins:

- **Unique**: You can only launch one instance of this plugin.
- **Not unique**: You can launch multiple instances of this type of plugin. For example, you can load one `Vis Circle` plugin to render the gaze position with a translucent green circle, and another `Vis Circle` plugin to render the gaze circle with a green stroke of 3 pixel thickness. You can think of these types of plugins as _additive_.

::: tip
Looking for a command line interface that allow you to export recordings as CSV files programmatically? `pl-rec-export` is available [here](https://github.com/pupil-labs/pl-rec-export).
:::