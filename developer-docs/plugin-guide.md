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

Plugins inherit the [`Plugin` class](https://github.com/pupil-labs/pupil/blob/v0.9.12/pupil_src/shared_modules/plugin.py#L23). It provides default functionality as well as series of callback functions that

#### Make your own plugin
These general steps are required if you want to make your own plugin and use it within Pupil:

  + Fork the pupil repository (if you haven't done this already) and create a branch for your plugin. Try to make commits granular so that it can be merged easily with the official branch if so desired.
  + Create a new file
    + In `/capture` if your plugin only interacts with Pupil Capture's World process.
    + In `/player` if your plugin only interacts with Pupil Player.
    + In `/shared_modules` if your plugin is used in both `Pupil Capture` and `Pupil Player`
  + Inherit from the `Plugin` class template. You can find the base class along with docs in [plugin.py](https://github.com/pupil-labs/pupil/tree/master/pupil_src/shared_modules/plugin.py). (A good example to reference while developing your plugin is [display_recent_gaze.py](https://github.com/pupil-labs/pupil/tree/master/pupil_src/shared_modules/display_recent_gaze.py))
  + Write your plugin

#### Load your Plugin automatically
If you're running Pupil from an app bundle, there is no need to modify source code. You can auto-load your plugin. Just follow these steps:

 + Start the application that should run your plugin either Pupil Capture or Pupil Player.
 + If you're creating a plugin for Pupil Capture, navigate to the `~/pupil_capture_settings/plugins/` directory. If you're creating a plugin for Pupil Player, navigate to `~/pupil_player_settings directory/plugins/` instead.
 + Move your plugin source code into the `plugins` folder. If your plugin is comprised of multiple files and/or dependencies, then move all files into the plugins folder. *Note*: if your plugin is contained in a directory, make sure to include an `__init__.py` inside it. For example:

```python
from . my_custom_plugin_module import My_Custom_Plugin_Class
```

> This loads the `My_Custom_Plugin_Class` plugin from the `my_custom_plugin_module` directory.

 + Restart the application. For now on, Pupil will find your plugins on startup and will add all valid plugins to the plugin dropdown menu. If your plugin is a calibration plugin (i.e. it inherits from the Calibration_Plugin base class), then it will appear in the calibration drop down menu.

 + If you want your plugin to run in both Pupil Capture and Pupil Player, you can avoid making copies of your plugin by setting a relative path.

```
~/
```
> base_directory

```
~/my_shared_pupil_plugins/
```
> Your plugin

```
~/pupil_player_settings/plugins/my_shared_plugin/__init__.py
```
> Player

```
~/pupil_player_settings/plugins/my_shared_plugin/__init__.py
```
> Capture

```python
# in both __init__.py
import os
import sys
from pathlib import Path

base_directory = Path(__file__).parents[3]
sys.path.append(os.path.join(base_dir,'my_shared_pupil_plugins'))
```
> This option avoids redundancy of shared plugin dependencies.

#### Load your Plugin manually
This is the "old" way of loading plugins. This method gives more flexibility but thats about it.

  + Pupil Player
    + Import your plugin in `player/main.py`
    + Add your plugin to the `user_launchable_plugins` list in [`player/main.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/player/main.py)
  + Pupil Capture - World Process
    + Import your plugin in `capture/world.py`
    + Add your plugin to the `user_launchable_plugins` list in [`capture/world.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/capture/world.py)
  + Select your plugin from the "Open plugin" in the main window to begin using it


<!-- **Text below this line is currently being revised. Feel encouraged to contribute.** -->

### Example plugin development walkthrough

#### Inheriting from existing plugin
If you want to add or extend the functionality of an existing plugin, you should be able to apply [standard inheritance principles](https://docs.python.org/2/library/functions.html#super) of Python 2.7.

Things to keep in mind:

- g_pool is an acronym to "global pool", a system wide container full of stuff passed to all plugins.
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

> Rename its `super` reference:

```python
super(Open_Cv_Threshold, self).__init__(g_pool)
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

(uniqueness available [options](https://github.com/pupil-labs/pupil/blob/master/pupil_src/shared_modules/plugin.py))
(describe how to safely remove unneeded parameters/attributes)

Finally, lets implement what our new Plugin will do. Here we choose to apply an OpenCv threshold to the world image and give us proper feedback of the results, in real time. Good for OpenCv and related studies. It is possible by means of the `update` method:

> (describe the world frame structure; maybe linking to trusted OpenCv docs)

```python
def update(self,frame,events):
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

(considering the update method, describe stuff inside the `events` dictionary)

### Plugin Integration
(describe PyGlui menu integration, for example, with a slider to the threshold value and illustrate how achieve persistence of the parameter)

(describe how to integrate the Custom Plugin visualization into the Video Exporter)

(describe how to integrate new data produced by the Custom Plugin into Pupil's data export work-flow)
