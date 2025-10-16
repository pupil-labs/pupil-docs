# Video Renderer

<Youtube src="MknNurPSX5Q"/>

The Video Renderer allows you to download scene videos with customizable overlays of eye tracking data.

The following configuration options are currently available:

- **Gaze Visualisation**: When enabled, a gaze marker will be overlayed on the video. You can customize the type (cross/ circle), size, stroke width, color and transparency of the overlay in the "Edit" menu.

- **Fixation Visualisation**: When enabled, the fixation scanpath will be overlayed on the video, similarly you can modify the appearance of the fixation, show active one only, the history and modify it appearance (circles and line color and alpha values) or toggle the number of fixations.

- **Eye Video Overlay**: When enabled, the eye video will be overlayed on the scene video. You can customize the size and position of the overlay in the video canvas, drag and drop it or resize from the corner, you can also change it's alpha value on the "Edit" menu.

- **Undistort Video**: When enabled, the generated video will be "undistorted". This means that the slight fish-eye effect that is visible in the scene video will be removed.

In the advanced settings, you can limit the rendering to subsections of your recordings by specifying start and end [events](../../events/index.md).

## Export Format

The export will have one folder per recording using the following naming scheme:
`<recording name>-<start of recording ID>`

Each folder contains the rendered video sections of the respective recording. The video files are named
`<beginning of section ID>_<start time>-<end time>.mp4`
where the times are in seconds relative to the recording start.
