+++
date = "2017-01-19T15:58:51+07:00"
title = "dev overview"
weight = 10
+++

# Developer Docs

<div class="content-container">
  <div class="header-link">
    <a href="#dev-overview">
      <h2 id="dev-overview">Development Overview</h2>
    </a>
  </div>
</div>

Overview of language, code structure, and general conventions

<div class="content-container">
  <div class="header-link">
    <a href="#language">
      <h3 id="language">Language</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

Pupil is written in `Python`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though cython. Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's *quick and easy* to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimisation and performance enhancement can happen in iterations of code.

<div class="content-container">
  <div class="header-link">
    <a href="#process-structure">
      <h3 id="process-structure">Process Structure</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

When [Pupil Capture][capture] starts, in default settings two processes are spawned:

**Eye** and **World**. Both processes grab image frames from a video capture stream but they have very different tasks.  

<div class="content-container">
  <div class="header-link">
    <a href="#eye-process">
      <h4 id="eye-process">Eye Process</h4>
    </a>
  </div>
</div>

The eye process only has one purpose - to detect the pupil and broadcast its's position.  The process breakdown looks like this:

* Grabs eye camera images from eye camera video stream
* Find the pupil position in the image
* Broadcast/stream the detected pupil position.

<aside class="notice">
Note - Pupil position refers to the position of the pupil in the eye camera space. This is different from gaze position which is what we call the mapped pupil positions in the world camera space.
</aside>

<div class="content-container">
  <div class="header-link">
    <a href="#world-process">
      <h4 id="world-process">World Process</h4>
    </a>
  </div>
</div>

This is the workhorse.

* Grabs the world camera images from the world camera video stream
* Receives pupil positions from the eye process
* Performs calibration mapping from pupil positions to gaze positions
* Loads plugins - to detect markers, broadcast pupil positions over the network, and more...
* Records video and data.
Most, and preferably all coordination and control happens within the World process.

TBA

##### Pupil Datum format

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

This dictionary is sent on the IPC and read by gaze mapping plugins in the world process. Mapping from pupil position to gaze position happens here. The mapping plugin is initilized by a calibration plugin.

##### Control: World -> Eye
Happens via notifications on the IPC.

<div class="content-container">
  <div class="header-link">
    <a href="#time-data-conventions">
      <h3 id="time-data-conventions">Timing & Data Conventions</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

Pupil Capture is designed to work with multiple captures that free-run at different frame rates that may not be in sync. World and eye images are timestamped and any resulting artefacts (detected pupil, markers, etc) inherit the source timestamp. Any correlation of these data streams is the responsibility of the functional part that needs the data to be correlated (e.g. calibration, visualisation, analyses).

For example: The pupil capture data format records the world video frames with their respective timestamps. Independent of this, the recorder also saves the detected gaze and pupil positions at their frame rate and with their timestamps. For more detail see [Data Format](#data-format).

<div class="content-container">
  <div class="header-link">
    <a href="#git-conventions">
      <h3 id="git-conventions">Git Conventions</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

We make changes almost daily and sometimes features will be temporarily broken in some development branches.  However, we try to keep the `master` branch as stable as possible and use other branches for feature development and experiments. Here's a breakdown of conventions we try to follow.

* `tags` - We make a tag following the [semantic versioning][semver] protocol.  Check out the [releases][releases]. 
* `master` - this branch tries to be as stable as possible - incremental and tested features will be merged into the master.  Check out the [master branch][master-branch].  
* `branches` - branches are named after features that are being developed. These branches are experimental and what could be called 'bleeding edge.'  This means features in these branches may not be fully functional, broken, or really cool... You're certainly welcome to check them out and improve on the work!  

<div class="content-container">
  <div class="header-link">
    <a href="#pull-requests">
      <h4 id="pull-requests">Pull requests</h4>
    </a>
  </div>
</div>

If you've done something -- even if work-in-progress -- make a [pull request][pull] and write a short update to the [Pupil community](#google-group).

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