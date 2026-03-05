# Development

For the plugin development process, we recommend to run [Neon Player from source](https://github.com/pupil-labs/neon-player).

## Language

Neon Player is written in `Python 3.11`. At its core, Neon Player is built on top of the [Neon Recording API](../../recording-api/) and features a user interface based on [PyQt](https://doc.qt.io/qtforpython-6/).

## Plugin API

Plugins are managed within the application's main process which communicates with plugins via callbacks (see below). These are defined in the root [`Plugin` class](https://github.com/pupil-labs/neon-player/blob/master/pupil_src/shared_modules/plugin.py).
In order to create a new plugin, one has to inherit from this class and overwrite them as desired.

```py
from pupil_labs.neon_player import Plugin

class MyCustomPlugin(Plugin):
    pass
```

Check out [Neon Player's API documentation](https://github.com/pupil-labs/neon-player-beta?tab=readme-ov-file) for more details on the available callbacks and how to use them.
