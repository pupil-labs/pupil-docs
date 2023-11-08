# Video Renderer

![Video Renderer header image](./video_renderer_header.png)

The Video Renderer allows you to download scene videos with customizable overlays of eye tracking data.

The following configuration options are currently available:

**Show Gaze**: When enabled, a gaze circle will be overlayed on the video. You can customize the size, stroke width, color and transparency of the overlay in the "Gaze Appearance" menu. 

**Show Fixations**: When enabled, the fixation scanpath will be overlayed on the video.

**Undistort Video**: When enabled, the generated video will be "undistorted". This means that the slight fish-eye effect that is visible in the scene video will be removed.

In the advanced settings, you can limit the rendering to subsections of your recordings by specifying start and end events.

## Export Format
The export will have one folder per recording using the following naming scheme:
```<recording name>-<start of recording ID>```

Each folder contains the rendered video sections of the respective recording. The video files are named
```<beginning of section ID>_<start time>-<end time>.mp4```
where the times are in seconds relative to the recording start.