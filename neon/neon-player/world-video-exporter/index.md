# World Video Exporter
The `World Video Exporter` Plugin is loaded by default.

The export saves the world video as shown in Neon Player, including all currently active visualizations 
(see [Visualization Plugins](/neon-player/visualization-plugins/)). 


![Export](./np-export.webp)

## Export Format
The World Video Exporter saves the world video file, together with [numpy](https://numpy.org/devdocs/reference/generated/numpy.lib.format.html) and csv files containing timestamps corresponding to each frame. 
The csv timestamp files include an additional `pts` column. `pts` is an abbreviation for _presentation timestamps_ and refers to the media file's internal time representation. It can be used to seek or identify specific frames within the media file. See this [tutorial on how to extract individual frame images from the world video](https://github.com/pupil-labs/pupil-tutorials/blob/master/09_frame_identification.ipynb). 