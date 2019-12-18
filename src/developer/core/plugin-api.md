---
permalink: /developer/core/plugin-api
---

# Plugin API

In Pupil Core, plugins are distributed as Python files that are loaded and executed at
runtime. To be recognized as such, they need to be installed in the [correct place](#adding-a-plugin)
and implement the [Plugin API](#development).

The usage of plugins has multiple advantages. For the user, they make it
easy to turn features on and off as required. For the developer, it increases maintainability
through separation.

Plugins can also be loaded at runtime, extending Pupil's functionality by sharing a
simple Python file. See our [pupil-community](https://github.com/pupil-labs/pupil-community#plugins)
repository for a list of third-party plugins. See below [on how to add them](#adding-a-plugin).

## Adding A Plugin

Each Pupil Core software creates its own user directory. It is directly placed in your
user's home directory and follows this naming convention: `pupil_<name>_settings`, e.g.
`pupil_capture_settings`.

Each user directory has a `plugins` subdirectory into which the plugin files need to be
placed. The Pupil Core software will attempt to load the files during the next launch.

If the plugin was installed correctly, it should appear in the [Plugin Manager](/core/software/pupil-capture.html#plugins)
of the corresponding Pupil Core software. Check the log file (`~/pupil_<name>_settings/<name>.log`) for errors if this is not the case.

::: warning
<v-icon large color="warning">info_outline</v-icon>
The bundled applications use their own isolated Python environment, i.e. the plugin will
not recognize your local `pip` installation! Any additional dependencies need to be
installed into the `plugins` folder, next to the plugin.
:::

## Development

For the plugin development process, we recommend to [run from source](/developer/core/overview/#running-from-source).

### Language
Pupil is written in `Python 3.6`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though [cython](http://cython.org/). Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's *quick and easy* to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

### Process Structure
When Pupil Capture starts, in default settings two processes are spawned:

**[Eye](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/eye.py)** and **[World](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/world.py)**. Both processes grab image frames from a video capture stream but they have very different tasks.

### Eye Process
The eye process only has one purpose - to detect the pupil and broadcast its position. The process breakdown looks like this:

* Grabs eye camera images from eye camera video stream
* Find the pupil position in the image
* Broadcast/stream the detected pupil position.

See the [terminology section](/core/terminology "Pupil Core - terminology") for the difference between pupil and gaze data.

### World Process
This is the workhorse.

* Grabs the world camera images from the world camera video stream
* Receives pupil positions from the eye process
* Performs calibration mapping from pupil positions to gaze positions
* Loads plugins - to detect fixations, track surfaces, and more...
* Records video and data.
Most, and preferably all coordination and control happens within the World process.

## API Reference

All plugins are required to be subclasses from the root [Plugin class](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/plugin.py#L25-L167). It is available during runtime:
```py
from plugin import Plugin

class MyCustomPlugin(Plugin):
    pass
```
