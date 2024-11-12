# Gaze Mode

You can configure Neon to generate binocular or monocular gaze data by changing the `Gaze Mode` in the Neon Companion app settings.

In `Binocular` mode, gaze data is generated based on images of both the left and right eye. This is the default mode and it is recommended for most users.

Some applications, e.g. some medical ones, require gaze data that is generated only based on data of one the eyes though. This can be achieved by switching to a `Monocular` gaze mode. `Monocular Left` will generate gaze data using only images of the left eye, and `Monocular Right` will only use images of the right eye.

## Changing Gaze Modes

You can switch between gaze modes in the Companion App settings. After selecting a new gaze mode, be sure to unplug and re-plug the Neon device.

## Considerations When Switching to Monocular Gaze

- If a monocular gaze mode is selected, no binocular gaze signal will be generated. This means all downstream data, including fixations and enrichment data, will be based on monocular gaze data.

- [Eye State](/data-collection/data-streams/#_3d-eye-states) and [Pupillometry](/data-collection/data-streams/#pupil-diameters) are unaffected by the gaze mode configuration and will always be generated using images from **both** eyes.

- If a monocular gaze mode is selected, Pupil Cloud will **not** re-process a recording to obtain a 200 Hz signal. Instead, Pupil Cloud will use the real-time signal, which may be lower than 200 Hz depending on which Companion device is used.
