+++
date = "2017-01-19T12:24:57+07:00"
title = "player data"
section_weight = 1
page_weight = 2
+++

## Playaer Data

### 8. Open Pupil Player
Now that you have recorded some data, you can play back the video and visualize gaze data, marker data, and more.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-capture/icon/pupil-player-pointer.png" width="20%">
</p>

**Player Window**
Let's get familiar with the Player window.

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-player/pupil-player-callout.png" width="80%">
</p>

The Player window is the main control center for `Pupil Player`. It displays the recorded video feed from pupil capture file.

1. **Graphs** - this area contains performance graphs. You can monitor `CPU` and `FPS` and pupil algorithm detection confidence. These graphs are the same as in the `World` window..
1. **Settings GUI Menu** - This is the main GUI for Pupil Player. You can use this menu primarily to launch plugins and control global settings.  
1. **Plugin GUIs** - Each Plugin spawns its own GUI window. You can control settings of each Plugin in the GUI window. For details on all plugins see documentation on [Pupil-player]() in the user guide.  
1. **Seek Bar and Trim Marks** - You can drag the playhead (large circle) to scrub through the video or `space` bar to play/pause. You can use the arrow keys to advance one frame at a time. Drag the small green circles at the end of the seek bar to set trim marks. Trim marks directly inform the section of video/data to export.
1. **Hot keys** - this area contains clickable buttons for plugins.

**Where are Pupil Player exports saved?**
Exports are saved within a dedicated folder named `exports` within the original recording folder.

Each export is contained within a folder within the `exports` folder. The numbers of the export correlate to the trim marks (frame start and frame end) for the export.  

Below is an example of an export.

<img src="https://raw.githubusercontent.com/wiki/pupil-labs/pupil/media/basic-workflow/pupil-player/recording-directory/recording_folder_exports_v07.png" width="100%">