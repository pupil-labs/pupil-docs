+++
date = "2017-01-19T12:24:57+07:00"
title = "player workflow"
section_weight = 1
page_weight = 2
+++

## Player Workflow
Use Pupil Player to visualize data recorded with Pupil Capture and export videos of visualization and datasets for further analysis. 

### 1. Open Pupil Player

> {{< figure-img src="/images/icons/svg/pp.svg" img-class="feature-center" width="20%" >}}

Now that you have recorded some data, you can play back the video and visualize gaze data, marker data, and more.

#### Player Window
Let's get familiar with the Player window.

> {{< lqip-img div-class="ratio-box lazy-img ratio--100-65" src="/images/pupil-player/pupil-player-callout-preview.jpg" small-class="img-small lazyload" data-src="/images/pupil-player/pupil-player-callout.jpg" large-class="img-large lazyload" >}}

The Player window is the main control center for `Pupil Player`. It displays the recorded video feed from pupil capture file.

1. **Graphs** - this area contains performance graphs. You can monitor `CPU` and `FPS` and pupil algorithm detection confidence. These graphs are the same as in the `World` window..
1. **Settings GUI Menu** - This is the main GUI for Pupil Player. You can use this menu primarily to launch plugins and control global settings.  
1. **Plugin GUIs** - Each Plugin spawns its own GUI window. You can control settings of each Plugin in the GUI window. For details on all plugins see documentation on [Pupil-player]() in the user guide.  
1. **Seek Bar and Trim Marks** - You can drag the playhead (large circle) to scrub through the video or `space` bar to play/pause. You can use the arrow keys to advance one frame at a time. Drag the small green circles at the end of the seek bar to set trim marks. Trim marks directly inform the section of video/data to export.
1. **Hot keys** - this area contains clickable buttons for plugins.

#### Where are Pupil Player exports saved?

> {{< lqip-img div-class="ratio-box lazy-img ratio--100-36" src="/images/pupil-player/recording/recording_folder_exports_v07-preview.jpg" small-class="img-small lazyload" data-src="/images/pupil-player/recording/recording_folder_exports_v07.jpg" large-class="img-large lazyload" >}}

Exports are saved within a dedicated folder named `exports` within the original recording folder.

Each export is contained within a folder within the `exports` folder. The numbers of the export correlate to the trim marks (frame start and frame end) for the export.  

<!-- Below is an example of an export.-->


