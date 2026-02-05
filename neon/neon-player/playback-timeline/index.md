# Playback & Timeline

![Timeline vew](./timeline1.webp)

- **Export window**: Control the playback of the video with the play/pause button (or spacebar on your keyboard). Drag the playhead (vertical line) to the desired point in time.
- **Trimming**: Drag the rounded rectangles at either end of the `Export window` timeline to set beginning and ending trim markers. The trim section markers specify the section of the video/data to export.
- **Frame Stepping**: With the arrow keys on your keyboard, you can jump through the recording in steps of 5 seconds. Alternatively, if you hold Shift while pressing the arrow keys, you advance one frame at a time.
- **Playback Speed**: To change the playback speed, use the dropdown menu on the right side of the timeline to change playback from `-2x` to `2x`.

## Data Tracks

![Timeline view with more tracks](./timeline2.webp)

You can add data tracks to the timeline from plugins that support this feature, they will show under the `Export window` and they are alphabetically ordered. For example, the `Eyestate` plugin allows you to add tracks for pupil diameter, eyelid aperture or optical axis data. You can hover over the track to see the value at a given time, or click on it to add a marker with the current value to the timeline. This allows you to visualize how the data changes over time and in relation to other events in the recording.

These can display the data as a line plot, dots or broken lines, depending on the plugin's implementation.

::: danger NOTE
The timeline does not currently support tooltips to show data at that time.
:::
