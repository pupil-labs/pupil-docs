# Lab Streaming Layer

[Lab Streaming Layer](https://labstreaminglayer.org/) (LSL) is an open-source framework that connects, manages, and synchronizes data streams from multiple sources, such as EEG, GSK, and motion capture systems. Check out the [LSL documentation](https://labstreaminglayer.readthedocs.io/info/intro.html) for a full overview of supported devices.

The Neon Companion app has built-in support for LSL, streaming Neon’s real-time generated data over the LSL network. This allows you to easily synchronize Neon with other LSL-supported devices.

## **Usage**

LSL streaming can be initiated in the Companion App by enabling the "Stream over LSL" setting.

When enabled, data will be streamed over the LSL network, and subsequently, to any connected LSL inlet (such as the LSL LabRecorder App, or another third-party system with inlet functionality) which is listening. Like the [Real-Time API](https://docs.pupil-labs.com/neon/real-time-api/), the Companion App does not need to be actively recording to stream eye-tracking data (e.g., gaze, pupil diameter, eye state) over LSL. However, simultaneous recording and streaming is fully supported. That said, as with the Real-Time API, an active recording is required for Neon Events to be used and saved. If no recording is running, the Companion App will discard the events and they will not be streamed via LSL. You can find more info [here](https://pupil-labs.github.io/pl-realtime-api/dev/methods/simple/remote-control/#save-events). 

Note that you'll need to ensure the Neon Companion app is connected to the same network as the other devices streaming via LSL.

::: tip
While the Companion App doesn't need to be actively recording to stream eye-tracking data over LSL, we strongly recommend recording with the Neon Companion App whenever possible. Recording ensures you have a complete, reliable copy of all data for backup and post-processing.
:::

## **LSL Outlets**

When LSL streaming is enabled, two [outlets](https://labstreaminglayer.readthedocs.io/info/intro.html#term-stream-outlet) will be created. One streams [gaze data](https://docs.pupil-labs.com/neon/data-collection/data-streams/#gaze) and [eye-state data](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) (if enabled), while the other streams [event data](https://docs.pupil-labs.com/neon/data-collection/events/#events). The streams will be named as:

- `[Device Name]_Neon Gaze`
- `[Device Name]_Neon Events`

Where `[Device Name]` is the name of the device as configured in the Companion App settings. When synchronizing data from two or more Neon devices using LSL, a unique device name can be assigned to each Companion App so that their streams can be distinguished.

### **Gaze Data Outlet**

The gaze and eye-state stream follows the recommendations of the [xdf Gaze Meta Data format](https://github.com/sccn/xdf/wiki/Gaze-Meta-Data). Two channels labeled `x` and `y` carry the gaze coordinate in scene-camera space. With eye-state estimation enabled, additional channels for each eye will be available with the following labels:

- `PupilDiameter`: the diameter of the pupil in mm
- `EyeballCenterX`: the x-position of the center of the eyeball from the scene camera
- `EyeballCenterY`: the y-position of the center of the eyeball from the scene camera
- `EyeballCenterZ`: the z-position of the center of the eyeball from the scene camera

### **Event Data Outlet**

The event stream contains the name of each generated event as a string.

## Connection problems?

If your devices are on the same network but you have trouble connecting, it is likely due to a firewall or other network configuration issue. LSL requires the following network connections:

- UDP broadcasts to port `16571` and/or
- UDP multicast to port `16571` at
  - `FF02:113D:6FDD:2C17:A643:FFE2:1BD1:3CD2`
  - `FF05:113D:6FDD:2C17:A643:FFE2:1BD1:3CD2`
  - `FF08113D:6FDD:2C17:A643:FFE2:1BD1:3CD2`
  - `FF0E:113D:6FDD:2C17:A643:FFE2:1BD1:3CD2`
  - `224.0.0.1`, `224.0.0.183`, `239.255.172.215`
- TCP and UDP connections to the ports `16572`-`16604`

More troubleshooting tips can be found in the [Network Troubleshooting](https://labstreaminglayer.readthedocs.io/info/network-connectivity.html) page in LSL’s documentation.
