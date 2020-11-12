---
permalink: /developer/core/plugin-api
description: In Pupil Core, plugins are distributed as Python files that are loaded and executed at runtime.
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

### Pupil Detection Plugins

Pupil Core supports custom pupil detection plugins that run in the eye process. These plugins can be used to implement custom algorithms for extracting pupillometry data from the eye images and feeding it to the rest of the gaze mapping pipeline.

Pupil detection plugins are supported in Pupil Capture, Pupil Player, and Pupil Service. Similar to regular user plugins, custom pupil detection plugins should be placed inside `pupil_capture_settings/plugins` for Pupil Capture, `pupil_player_settings/plugins` for Pupil Player, and `pupil_service_settings/plugin` for Pupil Service, all of which are located in the user directory of your system. The plugins are automatically loaded when any of the applications are started.

Conceptually, pupil detection plugins are wrappers around pupil detectors to make them work within Pupil Core. Pupil detectors are objects that are responsible for extracting the raw pupillometry data from the eye images. Pupil detector plugins use pupil detectors for extracting the raw data, package that data into pupil datums compatible for the gaze mapping pipeline, and integrates the detector into the rest of the lifecycle of a plugin.

Custom pupil detectors must subclass the [DetectorBase class](https://github.com/pupil-labs/pupil-detectors/blob/master/src/pupil_detectors/detector_base.pyx), while custom pupil detection plugins must subclass the [PupilDetectorPlugin class](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/pupil_detector_plugins/detector_base_plugin.py).

```py
from pupil_detector_plugins import PupilDetectorPlugin

class MyCustomPupilDetectorPlugin(PupilDetectorPlugin):

    def __init__(self, g_pool):
        super().__init__(g_pool)
        # In some cases, it might be desirable to disable other pupil detectors running in the eye process
        # e.g. to increase performance on systems with limited computing resources.
        # In such cases, these pupil detection plugins can be disabled with the helper method:
        self._stop_other_pupil_detectors()

    def _stop_other_pupil_detectors(self):
        # Getting the Plugin_List instance from the g_pool object
        plugin_list = self.g_pool.plugins
        # Iterating over every plugin in the Plugin_List instance
        for plugin in plugin_list:
            # Deactivating every PupilDetectorPlugin instances except self
            if isinstance(plugin, PupilDetectorPlugin) and plugin is not self:
                plugin.alive = False
        # Forcing Plugin_List instance to remove deactivated plugins
        plugin_list.clean()

    @property
    def pupil_detector(self):
        # This read-only property must be implemented by the custom subclass.
        #
        # Returns an instance of pupil detector;
        # See: https://github.com/pupil-labs/pupil-detectors
        pass

    def detect(self, frame, **kwargs):
        # This method must be implemented by the custom subclass.
        #
        # Returns a pupil datum dictionary containing the pupil location and related metadata.
        # See Pupil Datum Format for a list of required keys:
        # https://docs.pupil-labs.com/developer/core/overview/#pupil-datum-format
        pass
```

See an example of a custom pupil detection plugin which returns artificial pupil locations [here](https://gist.github.com/pupil-labs/todo-provide-uid-of-published-custom-detector-plugin).
