# PsychoPy

[PsychoPy](https://psychopy.org/) is widely used open-source software for creating and running psychophysics experiments. It enables users to present stimuli, collect data, and interface with a variety of hardware and software applications.

We have created a dedicated plugin for PsychoPy that enables Neon to be used in PsychoPy experiments. PsychoPy users have two options for designing their experiments, both of which can be used alongside Neon:

- [Builder](https://www.psychopy.org/builder/) – Gives users a graphical interface with little or no need to write code - although it does support custom code when necessary.
- [Coder](https://psychopy.org/coder/index.html) – Gives users the option to generate experiments or do other things programmatically, [using Psychopy like any other Python package](https://psychopy.org/api/).

## Using PsychoPy with Neon

When using PsychoPy with Neon, you can save eyetracking data in PsychoPy's hdf5 format, by enabling the "Save hdf5 file" option within the experiment settings. But we also recommend recording in the Neon Companion app for the duration of the experiment for data redundancy. PsychoPy’s standard "Eyetracker Record" component can be used to start and stop recordings on the Companion Device accordingly. If desired, custom timestamped events can be triggered from PsychoPy and saved in the Neon recording.

- For experiments that only require pupillometry/eye state, make sure the "Compute Eye State" setting is enabled in the companion app. For experiments that do not require screen-based gaze coordinates, this is all that is required.

- To use Neon for screen-based work in PsychoPy, the screen needs to be robustly located within the scene camera’s field of view, and Neon’s gaze data subsequently transformed from scene camera-based coordinates to screen-based coordinates. The plugin for PsychoPy achieves this with the use of AprilTag Markers and the [real-time-screen-gaze](https://github.com/pupil-labs/real-time-screen-gaze) Python package (installed automatically with the plugin).

## Builder

### Installing the Plugin

- Open PsychoPy Builder
- Click on the "Tools" menu and select "Plugins/package Manager"
- Find "Pupil Labs" in the plugin list and click "Install"
- Close all PsychoPy windows and re-open Builder

### Experiment Settings

- Open your experiment and open the experiment settings (gear ⚙️ icon in the toolbar)
- Go to the "Eyetracking" tab and select "Pupil Labs (Neon)" as your eyetracking device
- Modify the IP address and port if necessary

### Components

The standard "Eyetracker Record" and "Region of Interest" components work with Neon. Because Neon is calibration-free, the Calibration and Validation components are unused.

Three new Builder components will be available in the components list under the Eyetracking section.

- April Tag Markers: for screen-based work, you will need to render AprilTag markers on your display. These components make it easy to do so. We recommend at least four markers, but more markers will improve gaze mapping.

  - **April Tag Frame**: this component is recommended for most users. Using it in your Builder experiment will display an array of AprilTag markers around the edge of the screen. You can configure the number of markers to display along the horizontal and vertical edges of the screen, the size and contrast of the markers, and (optionally) the marker IDs. A minimum of four markers (2 horizontally by 2 vertically) is recommended, but more markers will provide more robust detection and accurate mapping. Marker IDs are automatically chosen but can be manually specified if needed.
    ![AprilTag Frame](./apriltag-frame.png)

  - **April Tag**: this component will add a single AprilTag marker to your display. It is intended for use when the April Tag Frame component cannot be used (e.g., you need to display stimuli on the edges of the display where the April Tag Frame component would place markers in the way). Using this component will give you control over the size and position of each marker. You will need to ensure that a unique marker ID is assigned to each AprilTag marker.

- **Neon Event**: use this component to send a timestamped event annotation to the Neon Recording. You can mark the start and end of an experiment, the start and end of a trial, the timing of a stimulus presentation, etc. A timestamp can be manually specified or, if set to `0`, automatically assigned when the component start is triggered.

  Events can only be saved to an active recording. You can use PsychoPy's standard "Eyetracking Record" component to start/stop a recording or manually start a recording from the Companion App.

### Data Format

[PsychoPy saves eyetracking data in its own format](https://psychopy.org/hardware/eyeTracking.html#what-about-the-data). Screen gaze data will be saved as `MonocularEyeSampleEvent` records (even when using the binocular gaze mode). [Eye state data](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states), if enabled, will appear in `BinocularEyeSampleEvent` records.

For [eye state data](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) in `BinocularEyeSampleEvent` records:

- `[left|right]_gaze_[x|y|z]` will be the optical axis vectors
- `[left|right]_eye_cam_[x|y|z]` will be eye positions
- `[left|right]_pupil_measure1` will be pupil diameters in mm
- `[left|right]_pupil_measure1_type` will be `77`

### Example Builder Experiment

Check out our simple but complete [gaze contingent demo designed in PsychoPy Builder](https://github.com/pupil-labs/psychopy-gaze-contingent-demo) to see how it all works!

## Coder

The PsychoPy team doesn't recommend using Coder for eyetracking experiments and suggests that users employ Builder instead. Of course, Builder doesn't suit all needs, so please keep in mind that the [Realtime Python API](https://docs.pupil-labs.com/neon/real-time-api/) is fully usable within PsychoPy, as is the [real-time screen gaze package](https://github.com/pupil-labs/real-time-screen-gaze). Some users may find these APIs easier to work with than PsychoPy's common eyetracker interface, but using the Realtime API directly won't provide gaze to PsychoPy's data logging or eyetracking components (e.g., areas-of-interest). If you need gaze data fully integrated with PsychoPy's software stack and need to use Coder, then it will be necessary to configure ioHub, add AprilTag markers to the screen, and register the screen surface with the eyetracker. The example below shows how to collect and visualize real-time gaze position and pupil diameter in PsychoPy Coder.

### Example Coder Experiment

```python
from psychopy import visual, event
from psychopy.core import getTime
from psychopy.iohub import launchHubServer
from psychopy.tools.monitorunittools import convertToPix
from psychopy.iohub.devices.eyetracker.eye_events import BinocularEyeSampleEvent

import numpy as np

from psychopy_eyetracker_pupil_labs.pupil_labs.stimuli import AprilTagFrameStim


# Set up iohub
iohub_config = {
    'eyetracker.neon.EyeTracker': {
        'name': 'tracker',
        'runtime_settings': {
            'companion_address': 'neon.local',
            'companion_port': 8080,
        },
    }
}

win = visual.Window(fullscr=True, units='height', checkTiming=False, color='black')
io = launchHubServer(window=win, **iohub_config)
eyetracker = io.devices.tracker

# Add a frame of AprilTag markers to the screen
tag_frame = AprilTagFrameStim(
    win=win,
    name='tag_frame', units='norm',
    pos=(0, 0), size=[2, 2], anchor='center',
    h_count=4, v_count=3,
    marker_size=0.125, marker_units='height',
    contrast=1.0,
)

# Use a red circle to show the gaze location
gaze_circle = visual.Circle(win, radius=.02, color="red")

# Register the screen surface with the eyetracker
win_size_pix = convertToPix(np.array([2, 2]), [0, 0], 'norm', win)
eyetracker.register_surface(tag_frame.marker_verts, win_size_pix)

# Start a recording
eyetracker.setRecordingState(True)

# Run for 30 seconds
eyetracker.send_event('exp-start')
start_time = getTime()
while getTime() - start_time < 30:
    # exit on escape key
    if event.getKeys(keyList=['escape']):
        eyetracker.send_event('user-exit')
        break

    # Update gaze circle radius to reflect pupil diameter
    for eye_event in eyetracker.getEvents():
        if isinstance(eye_event, BinocularEyeSampleEvent) and  eye_event.left_pupil_measure1_type == 77:
            mean_pupil_diameter = (eye_event.left_pupil_measure1 + eye_event.right_pupil_measure1) / 2
            gaze_circle.radius = (mean_pupil_diameter**1.5) / 100

    # Update gaze circle position to reflect gaze position
    gaze_circle.pos = eyetracker.getLastGazePosition()

    # Update the screen
    gaze_circle.draw()
    tag_frame.draw()
    win.flip()

# Stop recording
eyetracker.setRecordingState(False)

win.close()
io.quit()

```
