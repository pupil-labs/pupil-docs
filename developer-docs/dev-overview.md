+++
date = "2017-01-19T15:58:51+07:00"
title = "dev overview"
section_weight = 4
page_weight = 0
+++

# Developer Docs

## Development Overview
Overview of language, code structure, and general conventions

### Language
Pupil is written in `Python`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though cython. Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's *quick and easy* to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

### Process Structure
When [Pupil Capture][capture] starts, in default settings two processes are spawned:

**Eye** and **World**. Both processes grab image frames from a video capture stream but they have very different tasks.  

#### Eye Process
The eye process only has one purpose - to detect the pupil and broadcast its position. The process breakdown looks like this:

* Grabs eye camera images from eye camera video stream
* Find the pupil position in the image
* Broadcast/stream the detected pupil position.

<aside class="notice">
Note - Pupil position refers to the position of the pupil in the eye camera space. This is different from gaze position which is what we call the mapped pupil positions in the world camera space.
</aside>

#### World Process
This is the workhorse.

* Grabs the world camera images from the world camera video stream
* Receives pupil positions from the eye process
* Performs calibration mapping from pupil positions to gaze positions
* Loads plugins - to detect markers, broadcast pupil positions over the network, and more...
* Records video and data.
Most, and preferably all coordination and control happens within the World process.

<!-- TBA -->

#### Pupil Datum format

The pupil detector, run by the Eye process are required to return a result in the form of a Python dictionary with *at least* the following content:

```python
    result = {}
    result['timestamp'] = frame.timestamp
    result['norm_pos'] = (x,y) # pupil center in normalized coordinates
    result['confidence'] = # a value between 1 (very certain) and 0 (not certain, nothing found)
    result['whatever_else_you_want'] = # you can add other things to this dict

    # if no pupil was detected
    result = {}
    result['timestamp'] = frame.timestamp
    result['confidence'] = 0
```

This dictionary is sent on the IPC and read by gaze mapping plugins in the world process. Mapping from pupil position to gaze position happens here. The mapping plugin is initialized by a calibration plugin. The [3D pupil detector](LINKREQUIRED) extends the 2D pupil datum with additional information. Below you can see the Python representation of a pupil and a gaze datum.

```python
{  # pupil datum
    'topic': 'pupil',
    'method': '3d c++',
    'norm_pos': [0.5, 0.5],  # norm space, [0, 1]
    'diameter': 0.0,  # 2D image space, unit: pixel
    'timestamp': 535741.715303987,  # time, unit: seconds
    'confidence': 0.0,  # [0, 1]

    # 2D ellipse of the pupil in image coordinates
    'ellipse': {  # image space, unit: pixel
        'angle': 90.0,  # unit: degrees
        'center': [320.0, 240.0],
        'axes': [0.0, 0.0]},
    'id': 0,  # eye id, 0 or 1

    # 3D model data
    'model_birth_timestamp': -1.0,  # -1 means that the model is building up and has not finished fitting
    'model_confidence': 0.0,
    'model_id': 1

    # pupil polar coordinates on 3D eye model. The model assumes a fixed
    # eye ball size. Therefore there is no `radius` key
    'theta': 0,
    'phi': 0,

    # 3D pupil ellipse
    'circle_3d': {  # 3D space, unit: mm
        'normal': [0.0, -0.0, 0.0],
        'radius': 0.0,
        'center': [0.0, -0.0, 0.0]},
    'diameter_3d': 0.0,  # 3D space, unit: mm

    # 3D eye ball sphere
    'sphere': {  # 3D space, unit: mm
        'radius': 0.0,
        'center': [0.0, -0.0, 0.0]},
    'projected_sphere': {  # image space, unit: pixel
        'angle': 90.0,
        'center': [0, 0],
        'axes': [0, 0]},
    }
```

```python
 {  # gaze datum
    'topic': 'gaze',
    'confidence': 1.0,  # [0, 1]
    'norm_pos': [0.5238293689178297, 0.5811187961748036],  # norm space, [0, 1]
    'timestamp': 536522.568094512,  # time, unit: seconds

    # 3D space, unit: mm
    'gaze_normal_3d': [-0.03966349641933964, 0.007685562866422135, 0.9991835362811073],
    'eye_center_3d': [20.713998951917564, -22.466222119962115, 11.201474469783548],
    'gaze_point_3d': [0.8822507422478054, -18.62344068675104, 510.7932426103372],
    'base_data': [<pupil datum>]}  # list of pupil data that was used to calculate the gaze
```

#### Control: World > Eye
Happens via notifications on the IPC.

### Timing & Data Conventions
Pupil Capture is designed to work with multiple captures that free-run at different frame rates that may not be in sync. World and eye images are timestamped and any resulting artifacts (detected pupil, markers, etc) inherit the source timestamp. Any correlation of these data streams is the responsibility of the functional part that needs the data to be correlated (e.g. calibration, visualization, analyses).

For example: The pupil capture data format records the world video frames with their respective timestamps. Independent of this, the recorder also saves the detected gaze and pupil positions at their frame rate and with their timestamps. For more detail see [Data Format](#data-format).

### Git Conventions
We make changes almost daily and sometimes features will be temporarily broken in some development branches.  However, we try to keep the `master` branch as stable as possible and use other branches for feature development and experiments. Here's a breakdown of conventions we try to follow.

* `tags` - We make a tag following the [semantic versioning][semver] protocol.  Check out the [releases][releases]. 
* `master` - this branch tries to be as stable as possible - incremental and tested features will be merged into the master.  Check out the [master branch][master-branch].  
* `branches` - branches are named after features that are being developed. These branches are experimental and what could be called 'bleeding edge.'  This means features in these branches may not be fully functional, broken, or really cool... You're certainly welcome to check them out and improve on the work!  

### Pull requests
If you've done something -- even if work-in-progress -- make a [pull request][pull] and write a short update to the Pupil Community.

[git-remote]: https://help.github.com/articles/configuring-a-remote-for-a-fork/
[semver]: http://semver.org/
[releases]: http://github.com/pupil-labs/pupil/releases
[master-branch]: https://github.com/pupil-labs/pupil/tree/master
[ctypes-pydoc]: http://docs.python.org/2/library/ctypes.html
[cmethods]: https://github.com/pupil-labs/pupil/tree/master/pupil_src/shared_modules/c_methods
[methods-c]: https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/c_methods/methods.c
[capture]: https://github.com/pupil-labs/pupil/tree/master/pupil_src/capture 
[g-pool]: https://github.com/pupil-labs/pupil/blob/master/pupil_src/capture/main.py#L117-L119
[0mq]: http://zeromq.org/
[issue]: https://github.com/pupil-labs/pupil/issues
[fork]: https://github.com/pupil-labs/pupil/fork
[pull]: https://github.com/pupil-labs/pupil/pulls