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

If the plugin was installed correctly, it should appear in the [Plugin Manager](/software/pupil-capture/#plugins)
of the corresponding Pupil Core software. Check the log file (`~/pupil_<name>_settings/<name>.log`) for errors if this is not the case.

::: warning
The bundled applications use their own isolated Python environment, i.e. the plugin will
not recognize your local `pip` installation! Any additional dependencies need to be
installed into the `plugins` folder, next to the plugin.
:::

## Development

For the plugin development process, we recommend to [run from source](/developer/#running-from-source).

### Language
Pupil is written in `Python 3.6`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though [cython](http://cython.org/). Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's *quick and easy* to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

### Process Structure
When Pupil Capture starts, in default settings two processes are spawned:

**[Eye](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/eye.py)** and **[World](https://github.com/pupil-labs/pupil/blob/master/pupil_src/launchables/world.py)**. Both processes grab image frames from a video capture stream but they have very different tasks.

Pupil Player spawns with one main process that visualizes the recording but will spawn
more for background calculations, e.g. post-hoc pupil detection or video exports.

### Eye Process
The eye process only has one purpose - to detect the pupil and broadcast its position. The process breakdown looks like this:

* Grabs eye camera images from eye camera video stream
* Find the pupil position in the image
* Broadcast/stream the detected pupil position.

See the [terminology section](/terminology/ "Pupil Core - terminology") for the difference between pupil and gaze data.

### World Process
This is the workhorse in Pupil Capture.

* Grabs the world camera images from the world camera video stream
* Receives pupil positions from the eye process
* Performs calibration mapping from pupil positions to gaze positions
* Loads plugins - to detect fixations, track surfaces, and more...
* Records video and data.
Most, and preferably all coordination and control happens within the World process.

### Player Process
Main process within Pupil Player.

* Visualizes recorded data
* Performs post-hoc analyses
* Exports video and csv data

## API Reference

Plugins are the recommended way to extend Pupil Core software functionality. They are
typically managed within the application's main process which communicates with the
plugins via callbacks (see below). These are defined in the root
[`Plugin` class](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/plugin.py).
In order to create a new plugin, one has to inherit from this class and overwrite them
as desired.

```py
from plugin import Plugin

class MyCustomPlugin(Plugin):
    pass
```

Plugins are automatically listed in the [Plugin Manager](/software/pupil-capture/#plugins)
unless they inherit from a set of special classes (`System_Plugin_Base`, `Base_Manager`,
`Base_Source`, `CalibrationChoreographyPlugin`, `GazerBase`).

### Plugin class attributes

These class attributes define general plugin behavior. Overwriting them is optional but
recommended. `alive` is an exception and should only be set to `False` if you want the
plugin to close autonomously. Otherwise, this attribute is managed by the enclosing
application.

| Name         | Possible values                                                                                        | Default value | Meaning                                                              |
|--------------|--------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| `uniqueness` | `"not_unique"`, `"by_class"`, `"by_base_class"`                                                        | `"by_class"`  | Plugin instance replacement behavior. See below.                     |
| `order`      | float in the range of [0.0, 1.0]                                                                       | `0.5`         | Defines the order in which plugins are loaded and called             |
| `icon_font`  | `"roboto"`, `"pupil_icons"`, `"opensans"`, any other font registered via `Plugin.g_pool.ui.add_font()` | `"roboto"`    | Menu icon font                                                       |
| `icon_chr`   | Any string whose letters are present in `icon_font`. Recommended to use a single letter string.        | `"?"`         | Menu icon                                                            |
| `alive`      | `True`, `False`                                                                                        | `True`        | Setting to `False` will shutdown the plugin in the next event cycle. |


#### Plugin uniqueness
- *not unique* - plugins can be instantiated multiple times, e.g. gaze visualization
plugins
- *unique by class* - only one plugin instance can exist at a time, e.g. blink
detector
- *unique by base class* - if two  plugins share the same base class they are only
allowed to be active one at a time. Calibration choreographies are examples of *unique by base class* plugins.
They each implement a separate *by-base-class*-unique plugin but since they all share the
same base class (`CalibrationChoreographyPlugin`) only one can be active at a time.

If a new instance of a unique plugin is started the old instance will be cleaned up and
replaced.

### Plugin callback methods

Callback methods are triggered by the enclosing application. These can be divided into
three categories: Startup/cleanup, processing, and UI interactions.

#### Startup/cleanup callbacks

Callbacks of this kind are only called once in the life cycle of a plugin.

| Callback                           | Description                                                                                                                                                                                                                                                                                                                         |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `__init__(self, g_pool, **kwargs)` | Called when a plugin instance is started. `g_pool` provides access to the application. Calling `super().__init__(g_pool)` is strongly recommended. `kwargs` can be used for user preferences. See example below.                                                                                                                    |
| `init_ui(self)`                    | Called after `__init__` if the calling process provides a user interface. Allows the plugin to setup its settings menu, quick access buttons, etc.                                                                                                                                                                                  |
| `cleanup(self)`                    | Called when `Plugin.alive` is set to `True`, i.e. on application shutdown or if the plugin is being disabled                                                                                                                                                                                                                        |
| `deinit_ui(self)`                  | Called before `cleanup` and the calling process provides a user interface. The plugin is responsible for removing any UI elements added in `init_ui`.                                                                                                                                                                               |
| `get_init_dict(self)`              | Called on each active plugin instance on application shutdown. Returns a dictionary which is stored in the application's persistent session settings. On the next application launch, all previously active plugins will be restored by calling `__init__` and passing the dictionary as the `kwargs` arguments. See example below. |

A typical use case of the session settings is to persistently store plugin parameters,
e.g. the minimum duration parameter of the fixation detector.

The code below shows how to store a custom value (`my_custom_setting`) in the session
settings. `my_custom_setting=5` defines the default value in case no session settings
were found when the application was started or the plugin has just been enabled. If
session settings were loaded successfully the class will be instantiated with the
dictionary previously returned by `get_init_dict()`.

```python
from plugin import Plugin

class MyCustomPlugin(Plugin):
    def __init__(self, g_pool, my_custom_setting=5):
        self._my_custom_setting = my_custom_setting
    
    def get_init_dict(self):
        return {"my_custom_setting": self._my_custom_setting}
        # return {}  # on next launch, recover plugin with default settings
        # raise NotImplementedError  # on next launch, do not recover plugin
```

::: warning
The top-level keys of the `get_init_dict` dictionary must be of type `str` and its
values must be primitive Python types that can be encoded by [msgpack](https://msgpack.org/).
:::

#### Processing callbacks

As described in the [process structure](#process-structure) section above, Pupil Core
software launches several processes. Each is driven by an infinite loop that processes
data in each iteration, the so called "application event cycle". Data is fetched,
generated, or processed by calling the plugin processing callbacks below in increasing
`Plugin.order`. 

| Callback                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `recent_events(self, events)`   | Called once per application event cycle. `events` is a dictionary with string-keys and built-in python typed values, e.g. lists, dicts, etc. Plugins can add new entries to propagate data to plugins with higher `order`. Entries are stored to their corresponding [`.pldata`](/developer/recording-format/#pldata-files) files during recording and published on the [IPC backend](/developer/network-api/#ipc-backbone-message-forma). |
| `gl_display(self)`              | Called once per application event cycle if the calling process has a user interface. Plugins should implement any custom OpenGL visualizations here.                                                                                                                                                                                                                                                                                                 |
| `on_notify(self, notification)` | Called once for each [`notification`](/developer/network-api/#notification-message).                                                                                                                                                                                                                                                                                                                                                            |

Custom data example:
```python
from plugin import Plugin

CUSTOM_TOPIC = "custom_topic"


class CustomDataExample(Plugin):
    def recent_events(self, events):
        custom_datum = {
            "topic": CUSTOM_TOPIC,
            "timestamp": self.g_pool.get_timestamp(),  # Timestamp in pupil time
            "custom field": 42,
            # Further fields can be added here.
            # Their values should be serializable with msgpack.
        }
        events[CUSTOM_TOPIC] = [custom_datum]
```

| UI interaction callbacks                    | Description                                                                                                                                                                                                                                                                               |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `on_click(self, pos, button, action)`       | Gets called when the user clicks in the window screen and the event has not been consumed by the GUI. Return `True` if the event was consumed and should not be propagated to any other plugin.                                                                                           |
| `on_pos(self, pos)`                         | Gets called when the user moves the mouse in the window screen.                                                                                                                                                                                                                           |
| `on_key(self, key, scancode, action, mods)` | Gets called on key events that were not consumed by the GUI.  Return `True` if the event was consumed and should not be propagated to any other plugin.  See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#input_key) for more information on key events.       |
| `on_char(self, character)`                  | Gets called on char events that were not consumed by the GUI.          Return True if the event was consumed and should not be propagated         to any other plugin.          See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#input_char) for         more information on char events. |
| `on_drop(self, paths)`                      | Gets called on dropped paths of files and/or directories on the window.          Return True if the event was consumed and should not be propagated         to any other plugin.          See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#path_drop) for         more information on path drop events.    |
| `on_window_resize(self, window, w, h)`      | Gets called when user resizes window                                                                                                                                                                                                                                                      |

### Plugin utility methods

In addition to the callbacks, the plugin implements a series of useful functions to
interact with the application.
| Utility methods                 | Description                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------|
| `self.notify_all(notification)` | Sends a [`notification`](/developer/network-api/#notification-message) to the IPC backend. |
| `self.add_menu()`               | Creates a settings menu. Typically called within  `self.init_ui()`.                             |
| `self.remove_menu()`            | Removes `self.menu`. Typically called within `self.deinit_ui()`                                 |

### Pupil Detection Plugins

Starting with version v2.6, Pupil Core supports custom pupil detection plugins that run in the eye process. These plugins can be used to implement custom algorithms for extracting pupillometry data from the eye images and feeding it to the rest of the gaze mapping pipeline.

Pupil detection plugins are supported in Pupil Capture, Pupil Player, and Pupil Service. Similar to regular user plugins, custom pupil detection plugins should be placed inside `pupil_capture_settings/plugins` for Pupil Capture, `pupil_player_settings/plugins` for Pupil Player, and `pupil_service_settings/plugin` for Pupil Service, all of which are located in the user directory of your system. The plugins are automatically loaded when any of the applications are started.

Conceptually, pupil detection plugins are wrappers around pupil detectors to make them work within Pupil Core. Pupil detectors are objects that are responsible for extracting the raw pupillometry data from the eye images. Pupil detector plugins use pupil detectors for extracting the raw data, package that data into pupil datums compatible for the gaze mapping pipeline, and integrates the detector into the rest of the lifecycle of a plugin.

Custom pupil detectors must subclass the [DetectorBase class](https://github.com/pupil-labs/pupil-detectors/blob/master/src/pupil_detectors/detector_base.pyx), while custom pupil detection plugins must subclass the [PupilDetectorPlugin class](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/pupil_detector_plugins/detector_base_plugin.py).

::: tip
See [Pupil Datum Format](https://docs.pupil-labs.com/core/developer/#pupil-datum-format) for a list of required keys of the pupil datum dictionary returned by the `detect` method.
:::

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
        # https://docs.pupil-labs.com/core/developer/#pupil-datum-format
        pass
```

See examples of custom pupil detection plugins [here](https://github.com/pupil-labs/pupil-community/blob/master/README.md#pupil-detector-plugins).
