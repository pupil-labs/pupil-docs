# Gaze Mode

In the Neon Companion App, you can select between Binocular (default) or Monocular (left or right) gaze modes. Binocular mode captures gaze data from both eyes, and is recommended for most users. Monocular mode generates gaze data from a single eye (left or right, as chosen by the user), and is advisable only for those who specifically need it.

## Changing Gaze Modes

You can switch between gaze modes in the Companion App settings. After selecting a new gaze mode, be sure to unplug and re-plug the Neon device.

## Considerations When Switching to Monocular Gaze

- Switching to Monocular gaze mode alters the existing gaze stream without creating an additional one. This means that all downstream processes, including fixations and enrichments, will utilise this monocular gaze data.

- [Eye State](/data-collection/data-streams/#_3d-eye-states) and [Pupillometry](/data-collection/data-streams/#pupil-diameters) are unaffected by changes to the gaze mode and will continue to measure data for both eyes as usual.

- Pupil Cloud will **not** re-process recordings at 200 Hz as with default binocular recordings. Only real-time recorded monocular gaze will be saved for processing with enrichments.
