# Development

For the plugin development process, we recommend to [run from source](https://github.com/pupil-labs/neon-player).

## Language

Neon Player is written in `Python 3.11`, but no "heavy lifting" is done in Python. High performance computer vision, media compression, display libraries, and custom functions are written in external libraries or c/c++ and accessed though [cython](http://cython.org/). Python plays the role of "glue" that sticks all the pieces together.

We also like writing code in Python because it's _quick and easy_ to move from initial idea to working proof-of-concept. If proof-of-concept code is slow, optimization and performance enhancement can happen in iterations of code.

## Plugin API

Plugins are the recommended way to extend Neon Player's functionality. They are typically managed within the application's main process which communicates with the plugins via callbacks (see below). These are defined in the root [`Plugin` class](https://github.com/pupil-labs/neon-player/blob/master/pupil_src/shared_modules/plugin.py).
In order to create a new plugin, one has to inherit from this class and overwrite them
as desired.

```py
from pupil_labs.neon_player import Plugin

class MyCustomPlugin(Plugin):
    pass
```

Have a look at [Neon Player's API documentation](https://github.com/pupil-labs/neon-player-beta?tab=readme-ov-file) for more details on the available callbacks and how to use them.

- Jobs
- Actions
- Getters / setters
- Typing annotations
