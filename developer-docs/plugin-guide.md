+++
date = "2017-01-19T16:04:19+07:00"
title = "plugin guide"
section_weight = 4
page_weight = 3
+++

## Plugin Guide

### Plugins Basics

Plugins encapsulate functionality in a modular fashion. Most parts of the Pupil apps are implemented as plugins.
They are managed within the world process event-loop. This means that the world process can load and unload plugins during runtime.
Plugins are called regularly via callback functions (see the [Plugin API](#plugin-api) for details).

We recommend to use the network (see [the IPC backbone](#the-ipc-backbone)) if you only need access to the data.
You are only required to write a plugin if you want to interact with the Pupil apps directly, e.g. visualizations, manipulate data.
In the following sections, we assume that you [run the Pupil applications from source](https://docs.pupil-labs.com/#running-pupil-from-source). We will refer to the Pupil root source folder as `$pupil_root`.

#### Plugins in Pupil Capture
Pupil Capture's World process can load plugins for easy integration of new features. Plugins have full access to:

  + World image frame
  + Events
    + pupil positions
    + gaze positions
    + surface events
    + *note* other events can be added to the event queue by other plugins
  + User input
  + Globally declared variables in the `g_pool`

Plugins can create their own UI elements, and even spawn their own OpenGL windows.

#### Pupil Player Plugins
Pupil Player uses an identical plugin structure. Little (often no work) needs to be done to use a Player Plugin in Capture and vice versa. But, it is important to keep in mind that plugins run in Pupil Capture may require more speed for real-time workflows, as opposed to plugins in Pupil Player.

### Plugin API

Plugins are Python classes that inherit the [`Plugin` class](https://github.com/pupil-labs/pupil/blob/568604bd06a972eeac533f74079c22459b6e929e/pupil_src/shared_modules/plugin.py#L23). It provides default functionality as well as series of callback functions that are called by the world process. [The source](https://github.com/pupil-labs/pupil/blob/568604bd06a972eeac533f74079c22459b6e929e/pupil_src/shared_modules/plugin.py#L23) contains detailed information about the use-cases of the different callback functions.

<aside class="warning">
Plugin callbacks are called regularly within the main thread. If your custom plugin uses functions that block longer than ~0,02 seconds it will lead to unresponsive ui and the framerate will drop.
</aside>

#### Register your plugin automatically
Plugins are registered on application start. System plugins are [registered explicitly](https://github.com/pupil-labs/pupil/blob/618181d157bfc3e75415a305c6f89c90ac0e614f/pupil_src/launchables/world.py#L116-L139).
This is not required for your own plugin. The applications search in the following folders for custom plugins:
 + Pupil Capture: `$pupil_root/pupil_capture_settings/plugins/`
 + Pupil Service: `$pupil_root/pupil_service_settings/plugins/`
 + Pupil Player: `$pupil_root/pupil_player_settings/plugins/`

All of these folders are created automatically on the first time you start the
corresponding application.

*Note*: if your plugin is contained in a directory, make sure to include an `__init__.py` inside it. For example:

```python
from . my_custom_plugin_module import My_Custom_Plugin_Class
```

> This loads the `My_Custom_Plugin_Class` plugin from the `my_custom_plugin_module` directory.

 + Restart the application. From now on, Pupil will find your plugins on startup
 and will add all valid plugins to the `Plugin Manager`. If your plugin is a
 calibration plugin (i.e. it inherits from the Calibration_Plugin base class),
 then it will appear in the calibration drop down menu.

 + If you want your plugin to run in both Pupil Capture and Pupil Player, you can avoid making copies of your plugin by setting a relative path.


### Example plugin development walkthrough

#### Inheriting from existing plugin
If you want to add or extend the functionality of an existing plugin, you should be able to apply [standard inheritance principles](https://docs.python.org/3/library/functions.html#super) of Python 3.

Things to keep in mind:

- `g_pool` is an abbreviation for "global pool", a system wide container full of stuff passed to all plugins.
- if the base plugin is a system (always alive) plugin:
  - remember to close the base plugin at the `__init__` method of the inheriting plugin with `base_plugin.alive = False`. You should find the `base_plugin` inside `g_pool.plugins` ;
  - remember to dereference the base plugin at the end of the file with `del base_plugin` to avoid repetition in the user plugin list;

#### Hacking an existing plugin
Another way to start plugin development, is to use an existing plugin as a template. For example, you could copy the [`vis_circle.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/player/vis_circle.py) plugin as a starting point.

renaming it to, for example, `open_cv_threshold.py`.

> Now you could give a new name to the class name:

```python
class Open_Cv_Threshold(Plugin):
```

> Describe what your new plugin will do for yourself in the future and for future generations:

```python
class Open_Cv_Threshold(Plugin):
"""
  Apply cv2.threshold filter to the world image.
"""
```

> Rename its reference in the persistence method:

```python
def clone(self):
    return Open_Cv_Threshold(**self.get_init_dict())
```

> It is good to rename its menu caption as well:

```python
self.menu = ui.Scrolling_Menu('Threshold')
```

> Lets determine its execution order in relation to the other plugins:

```python
self.order = .8
```

> You can allow or disallow multiple instances of the Custom Plugin through the `uniqueness` attribute:

```python
self.uniqueness = "by_class"
```

See [the source](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/plugin.py#L31-L34) for a list of all available uniqueness options.
<!-- There is no reason to remove atributes (describe how to safely remove unneeded parameters/attributes)
 -->
Finally, lets implement what our new Plugin will do. Here we choose to apply an OpenCv threshold to the world image and give us proper feedback of the results, in real time. Good for OpenCv and related studies. It is possible by means of the `recent_events` method:

```python
def recent_events(self, events):
  if 'frame' in events:
    frame = events['frame']
    img = frame.img
    height = img.shape[0]
    width = img.shape[1]

    blur = cv2.GaussianBlur(img,(5,5),0)

    edges = []
    threshold = 177
    blue, green, red = 0, 1, 2

    # apply the threshold to each channel
    for channel in (blur[:,:,blue], blur[:,:,green], blur[:,:,red]):
      retval, edg = cv2.threshold(channel, threshold, 255, cv2.THRESH_TOZERO)
      edges.append(edg)

    # lets merge the channels again
    edges.append(np.zeros((height, width, 1), np.uint8))
    edges_edt = cv2.max(edges[blue], edges[green])
    edges_edt = cv2.max(edges_edt, edges[red])
    merge = [edges_edt, edges_edt, edges_edt]

    # lets check the result
    frame.img = cv2.merge(merge)
```

`recent_events` is called everytime a new world frame is available but latest
after a timeout of 0.05 seconds. The `events` dictionary will include the image
frame object if it was available. It is accessible through the `frame` key.

You can access the image buffer through the `img` and the `gray` attributes of the frame object. They return a BGR (`height x width x 3`) and gray scaled (`height x width`) uint8-numpy array respectively. Visualization plugins (e.g. [`vis_circle.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/player/vis_circle.py#L47)) modify the `img` buffer such that their visualizations are visible in the Pupil Player exported video. Use OpenGL (within the `Plugin.gl_display` method) to draw visualizations within Pupil Player that are not visible in the exported video (e.g. surface heatmaps in [`Offline_Surface_Tracker`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/offline_surface_tracker.py)). See [below](#Export-Custom-Video-Visualizations) for more information.

The `events` dictionary contains other recent data, e.g. `pupil_positions`, `gaze_positions`, `fixations`, etc. Modifications to the `events` dictionary are automatically accessible by all plugins with an higher `order` than the modifying plugin.

<aside class="notice">
A gaze mapper is just a plugin with a very low order that extends the `events` dictionary with the `gaze_positions` field.
</aside>

### Plugin Integration

#### pyglui UI Elements

['pyglui'](https://github.com/pupil-labs/pyglui) is an OpenGL-based UI framework that provides easy to use UI components for your plugin.
User plugins often have at least one menu to inform the user that they are running as well as providing the possibility to close single plugins.

```python
from plugin import Plugin
from pyglui import ui


class Custom_Plugin(Plugin):
    # Calling add_menu() will create an icon in the icon bar that represents
    # your plugin. You can customize this icon with a symbol of your choice.
    icon_chr = '@'  # custom menu icon symbol

    # The default icon font is Roboto: https://fonts.google.com/specimen/Roboto
    # Alternatively, you can use icons from the Pupil Icon font:
    # https://github.com/pupil-labs/pupil-icon-font
    icon_font = 'roboto'  # or `pupil_icons` when using the Pupil Icon font

    def __init__(self, g_pool, example_param=1.0):
        super().__init__(g_pool)
        # persistent attribute
        self.example_param = example_param

    def init_ui(self):
        # Create a floating menu
        self.add_menu()
        self.menu.label = '<title>'
        # Create a simple info text
        help_str = "Example info text."
        self.menu.append(ui.Info_Text(help_str))
        # Add a slider that represents the persistent value
        self.menu.append(ui.Slider('example_param', self, min=0.0, step=0.05, max=1.0, label='Example Param'))

    def deinit_ui(self):
        self.remove_menu()

    def get_init_dict(self):
        # all keys need to exists as keyword arguments in __init__ as well
        return {'example_param': self.example_param}
```

<aside class="notice">
See <a href="https://github.com/pupil-labs/pyglui/blob/master/pyglui/ui_elements.pxi">ui_elements.pxi</a> and <a href="https://github.com/pupil-labs/pyglui/blob/master/pyglui/menus.pxi">menus.pxi</a> for an overview over all existing UI elements and menu types.
</aside>

#### Export Custom Video Visualizations
As descrbed above, plugins are able to modify the image buffers to export their visualizations. The plugins `recent_events` method is automatically called for each frame once by the video exporter process. Plugins might overwrite changes made by plugins with a lower order than themselves. OpenGL visualizations are not exported. See [`vis_circle.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/player/vis_circle.py#L47) for an example visualization.

#### Export Custom Raw Data
Each Player plugin gets a notification with subject `should_export` thar includes the world frame indices range that will be exported and the directory where the recording will be exported to. Add the code to the right to your plugin and implement an `export_data` function. See [`fixation_detector.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/fixation_detector.py#L263-L297) for an example.

```python
def on_notify(self, notification):
    if notification['subject'] is "should_export":
        self.export_data(notification['range'], notification['export_dir'])
```

#### Background Tasks
All plugins run within the world process. Doing heavy calculations within any of the periodically called `Plugin` methods (e.g. `recent_events`) can result in poor performance of the application. It is recommended to do any heavy calculations within a separate subprocess - [multi-threading brings its own problems in Python](http://python-notes.curiousefficiency.org/en/latest/python3/multicore_python.html). We created the `Task_Proxy` to simplify this procedure. It is initialized with a generator which will be executed in a subprocess. The generator's results will automatically be piped to the main thread where the plugin can fetch them.

```python
from plugin import Plugin
from pyglui import ui
import logging
logger = logging.getLogger(__name__)


def example_generator(mu=0., sigma=1., steps=100):
    '''samples `N(\mu, \sigma^2)`'''
    import numpy as np
    from time import sleep
    for i in range(steps):
        # yield progress, datum
        progress = (i + 1) / steps
        value = sigma * np.random.randn() + mu
        yield progress, value
        sleep(np.random.rand() * .1)


class Custom_Plugin(Plugin):
    def __init__(self, g_pool):
        super().__init__(g_pool)
        self.proxy = Task_Proxy('Background', example_generator, args=(5., 3.), kwargs={'steps': 50})

    def recent_events(self, events):
        # fetch all available results
        for progress, random_number in task.fetch():
            logger.debug('[{:3.0f}%] {:0.2f}'.format(progress * 100, random_number))

        # test if task is completed
        if task.completed:
            logger.debug('Task done')

    def cleanup(self):
        if not self.proxy.completed:
            logger.debug('Cancelling task')
            self.proxy.cancel()
```

<aside class="warning">
Be aware that the generator should be defined outside of your plugin. If this requirement is not met the Python interpreter will try to serialize the `g_pool` attribute and this will raise an exception.
</aside>
