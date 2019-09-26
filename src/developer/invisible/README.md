# Invisible

Welcome to Pupil Invisible developer docs!

<v-divider></v-divider>

## Recording Format

Similar to [Pupil Capture](/developer/core/recording-format/), the Pupil Invisible Companion
stores its data files in pairs: Each data file has a corresponding timestamp file. This
is required to correlate the different data source after-the-effect in Pupil Cloud or
Pupil Player.

You can find details to the specification of the Pupil Invisible Companion app recording
format in this [document](https://docs.google.com/spreadsheets/d/1e1Xc1FoQiyf_ZHkSUnVdkVjdIanOdzP0dgJdJgt0QZg/edit?usp=sharing).

<v-divider></v-divider>

## Network API

The [Pupil Invisible Companion](/invisible/user-guide/invisible-companion-app/) app uses
the [NDSI v4](https://github.com/pupil-labs/pyndsi/blob/v1.0/ndsi-commspec.md) protocol
to publish its scene video and gaze data via the local network.

The [Pupil Invisible Monitor](#pupil-invisible-monitor) app makes use of this API to
list the local devices, receive their scene video, and overlay the most recent gaze onto
it.

Below you can find a minimal example to receive gaze from Pupil Invisible Companion app:

TODO: ADD EXAMPLE

<v-divider></v-divider>

## Pupil Invisible Monitor

This is a stand alone desktop app that connects to Pupil Invisible using the Network API
over WiFi. You can use it to live stream scene video and gaze data from all connected
Pupil Invisible(s) on the network. 

Check out Pupil Invisible Monitor on [Github](https://github.com/pupil-labs/pupil-invisible-monitor "Pupil Invisible Monitor").