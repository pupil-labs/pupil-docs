+++
date = "2017-01-19T16:04:19+07:00"
title = "plugin guide"
weight = 17
+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#plugin-guide">
      <h2 id="plugin-guide">Plugin Guide</h2>
    </a>
  </div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#plugin-basics">
      <h3 id="plugin-basics">Plugins Basics</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

<div class="content-container">
  <div class="header-link">
    <a href="#world-process-plugin">
      <h4 id="world-process-plugin">World Process Plugins in Pupil Capture</h4>
    </a>
  </div>
</div>

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

<div class="content-container">
  <div class="header-link">
    <a href="#pupil-player-plugin">
      <h4 id="pupil-player-plugin">Pupil Player Plugins</h4>
    </a>
  </div>
</div>

Pupil Player uses an identical plugin structure. Little (often no work) needs to be done to use a Player Plugin in Capture and vice versa. But, it is important to keep in mind that plugins run in Pupil Capture may require more speed for real-time workflows, as opposed to plugins in Pupil Player.

<div class="content-container">
  <div class="header-link">
    <a href="#make-plugin">
      <h4 id="make-plugin">Make your own plugin</h4>
    </a>
  </div>
</div>

These general steps are required if you want to make your own plugin and use it within Pupil:

  + Fork the pupil repository (if you haven't done this already) and create a branch for your plugin. Try to make commits granular so that it can be merged easily with the official branch if so desired.
  + Create a new file
    + In `/capture` if your plugin only interacts with Pupil Capture's World process.
    + In `/player` if your plugin only interacts with Pupil Player.
    + In `/shared_modules` if your plugin is used in both `Pupil Capture` and `Pupil Player`
  + Inherit from the `Plugin` class template. You can find the base class along with docs in [plugin.py](https://github.com/pupil-labs/pupil/tree/master/pupil_src/shared_modules/plugin.py). (A good example to reference while developing your plugin is [display_recent_gaze.py](https://github.com/pupil-labs/pupil/tree/master/pupil_src/shared_modules/display_recent_gaze.py))
  + Write your plugin

<div class="content-container">
  <div class="header-link">
    <a href="#load-plugin-automatic">
      <h4 id="load-plugin-automatic">Load your Plugin automatically</h4>
    </a>
  </div>
</div>

With Pupil v0.6 we introduce a plugin auto-loader. It works when running from either source or application bundle! There is no need to put your plugin into the directories mentioned above. Instead:

 + In `~/pupil_capture_settings` or `~/pupil_player_settings` (depending on the plugin application) create a folder called `plugins`
 + Move your plugin source code file into `plugins`
 + If your plugin is defined by multiple files inside a directory, move this directory into the `plugins` dir <sup>1</sup>
 + On start-up Pupil will search this folder, and import and add all user plugins into the plugin drop-down menu 

<sup>1</sup> If your plugin is contained in a directory, make sure to include an `__init__.py` file similar to this:

```python
from my_custom_plugin_code_module import My_Custom_Plugin_Class
```

<div class="content-container">
  <div class="header-link">
    <a href="#load-plugin-manually">
      <h4 id="load-plugin-manually">Load your Plugin manually</h4>
    </a>
  </div>
</div>

This is the "old" way of loading plugins. This method gives more flexibility but thats about it.

   + Pupil Player
     + Import your plugin in `player/main.py`
     + Add your plugin to the `user_launchable_plugins` list in [`player/main.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/player/main.py)
   + Pupil Capture - World Process
     + Import your plugin in `capture/world.py`
     + Add your plugin to the `user_launchable_plugins` list in [`capture/world.py`](https://github.com/pupil-labs/pupil/blob/master/pupil_src/capture/world.py)
 
   + Select your plugin from the "Open plugin" in the main window to begin using it


##### Text below this line is currently being revised. Feel encouraged to contribute.

<div class="content-container">
  <div class="header-link">
    <a href="#plugin-dev-walkthrough">
      <h3 id="plugin-dev-walkthrough">Example plugin development walkthrough</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

<div class="content-container">
  <div class="header-link">
    <a href="#inherit-plugin">
      <h4 id="inherit-plugin">Inheriting from existing plugin</h4>
    </a>
  </div>
</div>

If you want to add or extend the functionality of an existing plugin, you should be able to apply [standard inheritance principles](https://docs.python.org/2/library/functions.html#super) of Python 2.7.

Things to keep in mind:
- g_pool is an acronym to "global pool", a system wide container full of stuff passed to all plugins.
- if the base plugin is a system (always alive) plugin:
  - remember to close the base plugin at the `__init__` method of the inheriting plugin with `base_plugin.alive = False`. You should find the `base_plugin` inside `g_pool.plugins` ;
  - remember to dereference the base plugin at the end of the file with `del base_plugin` to avoid repetition in the user plugin list;

<div class="content-container">
  <div class="header-link">
    <a href="#hacking-plugin">
      <h4 id="hacking-plugin">Hacking an existing plugin</h4>
    </a>
  </div>
</div>

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

<div class="content-container">
  <div class="header-link">
    <a href="#plugin-integration">
      <h3 id="plugin-integration">Plugin Integration</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

(describe PyGlui menu integration, for example, with a slider to the threshold value and illustrate how achieve persistence of the parameter)

(describe how to integrate the Custom Plugin visualization into the Video Exporter)

(describe how to integrate new data produced by the Custom Plugin into Pupil's data export work-flow) 
