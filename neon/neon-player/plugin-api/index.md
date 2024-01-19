# Plugin API

Plugins are distributed as Python files that are loaded and executed at runtime. To be recognized as such, they need to be installed in the [correct place](#adding-a-plugin) and implement the [Plugin API](#development).

The usage of plugins has multiple advantages. For the user, they make it easy to turn features on and off as required. For the developer, it increases maintainability through separation.

Plugins can also be loaded at runtime, extending Pupil's functionality by sharing a
simple Python file. See below [on how to add them](#adding-a-plugin).

## Adding a Plugin

Neon Player's settings folder is placed in your user's home directory and is called`neon_player_settings`.

It contains a `plugins` subdirectory into which the plugin files need to be
placed. Neon Player will attempt to load the files during the next launch.

If the plugin was installed correctly, it should appear in the Plugin Manager. Check the log file (`~/neon_player_settings/<name>.log`) for errors if this is not the case.

::: warning
The bundled application uses its own isolated Python environment, i.e. the plugin will
not recognize your local `pip` installation! Any additional dependencies need to be
installed into the `plugins` folder, next to the plugin.
:::

## Development

For the plugin development process, we recommend to [run from source](https://github.com/pupil-labs/neon-player).

### Language

Neon Player is written in `Python 3.11`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though [cython](http://cython.org/). Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's _quick and easy_ to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

## API Reference

Plugins are the recommended way to extend Neon Player's functionality. They are
typically managed within the application's main process which communicates with the
plugins via callbacks (see below). These are defined in the root
[`Plugin` class](https://github.com/pupil-labs/neon-player/blob/master/pupil_src/shared_modules/plugin.py).
In order to create a new plugin, one has to inherit from this class and overwrite them
as desired.

```py
from plugin import Plugin

class MyCustomPlugin(Plugin):
    pass
```

Plugins are automatically listed in the Plugin Manager] unless they inherit from a set of special classes (`System_Plugin_Base`, `Base_Manager`, `Base_Source`, `CalibrationChoreographyPlugin`, `GazerBase`).

### Plugin Class Attributes

These class attributes define general plugin behavior. Overwriting them is optional but
recommended. `alive` is an exception and should only be set to `False` if you want the
plugin to close autonomously. Otherwise, this attribute is managed by the enclosing
application.

| Name         | Possible values                                                                                        | Default value | Meaning                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------------- |
| `uniqueness` | `"not_unique"`, `"by_class"`, `"by_base_class"`                                                        | `"by_class"`  | Plugin instance replacement behavior. See below.                     |
| `order`      | float in the range of [0.0, 1.0]                                                                       | `0.5`         | Defines the order in which plugins are loaded and called             |
| `icon_font`  | `"roboto"`, `"pupil_icons"`, `"opensans"`, any other font registered via `Plugin.g_pool.ui.add_font()` | `"roboto"`    | Menu icon font                                                       |
| `icon_chr`   | Any string whose letters are present in `icon_font`. Recommended to use a single letter string.        | `"?"`         | Menu icon                                                            |
| `alive`      | `True`, `False`                                                                                        | `True`        | Setting to `False` will shutdown the plugin in the next event cycle. |

#### Plugin Uniqueness

- _not unique_ - plugins can be instantiated multiple times, e.g. gaze visualization
  plugins
- _unique by class_ - only one plugin instance can exist at a time, e.g. blink
  detector
- _unique by base class_ - if two plugins share the same base class they are only
  allowed to be active one at a time. Calibration choreographies are examples of _unique by base class_ plugins.
  They each implement a separate _by-base-class_-unique plugin but since they all share the
  same base class (`CalibrationChoreographyPlugin`) only one can be active at a time.

If a new instance of a unique plugin is started the old instance will be cleaned up and
replaced.

### Plugin Callback Methods

Callback methods are triggered by the enclosing application. These can be divided into
three categories: Startup/cleanup, processing, and UI interactions.

#### Startup/Cleanup Callbacks

Callbacks of this kind are only called once in the life cycle of a plugin.

| Callback                           | Description                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

#### Processing Callbacks

Neon Player launches several processes. Each is driven by an infinite loop that processes
data in each iteration, the so called "application event cycle". Data is fetched,
generated, or processed by calling the plugin processing callbacks below in increasing
`Plugin.order`.

| Callback                      | Description                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `recent_events(self, events)` | Called once per application event cycle. `events` is a dictionary with string-keys and built-in python typed values, e.g. lists, dicts, etc. Plugins can add new entries to propagate data to plugins with higher `order`. |
| `gl_display(self)`            | Called once per application event cycle if the calling process has a user interface. Plugins should implement any custom OpenGL visualizations here.                                                                       |

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

| UI interaction callbacks                    | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_click(self, pos, button, action)`       | Gets called when the user clicks in the window screen and the event has not been consumed by the GUI. Return `True` if the event was consumed and should not be propagated to any other plugin.                                                                                                    |
| `on_pos(self, pos)`                         | Gets called when the user moves the mouse in the window screen.                                                                                                                                                                                                                                    |
| `on_key(self, key, scancode, action, mods)` | Gets called on key events that were not consumed by the GUI. Return `True` if the event was consumed and should not be propagated to any other plugin. See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#input_key) for more information on key events.                |
| `on_char(self, character)`                  | Gets called on char events that were not consumed by the GUI. Return True if the event was consumed and should not be propagated to any other plugin. See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#input_char) for more information on char events.               |
| `on_drop(self, paths)`                      | Gets called on dropped paths of files and/or directories on the window. Return True if the event was consumed and should not be propagated to any other plugin. See [the GLFW documentation](http://www.glfw.org/docs/latest/input_guide.html#path_drop) for more information on path drop events. |
| `on_window_resize(self, window, w, h)`      | Gets called when user resizes window                                                                                                                                                                                                                                                               |

### Plugin Utility Methods

In addition to the callbacks, the plugin implements a series of useful functions to
interact with the application.
| Utility methods | Description |
|-----------------|-------------|
| `self.add_menu()` | Creates a settings menu. Typically called within `self.init_ui()`. |
| `self.remove_menu()` | Removes `self.menu`. Typically called within `self.deinit_ui()` |
