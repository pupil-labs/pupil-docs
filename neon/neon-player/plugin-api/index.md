# Settings & Plugins

Upon installation, Neon Player creates a dedicated folder for user settings and plugins. This lives under your $HOME$ directory > Pupil Labs > Neon Player.

Inside this folder, you will find:

```
├── logs
├── plugins
│   ├── __pycache__
│   ├── ...
│   └── site-packages
└── settings.json
```

## Logs

This folder contains a log file (`neon_player.log`) created by Neon Player. These can be useful for debugging purposes and are overwritten on each start of Neon Player.

If reporting an issue, please attach the latest log file.

## Settings

This file (`settings.json`) contains user settings for Neon Player and which plugins are enabled or disabled by default. Rather than editing this file directly, it is recommended to use the Global Settings dialog in Neon Player to change these values.

## Plugins

Plugins are distributed as Python files that are loaded and executed at runtime. To be recognized as such, they need to be installed in the [correct place](#adding-a-plugin) and implement the [Plugin API](#development).

The usage of plugins has multiple advantages:

- For the user, they make it easy to turn features on and off as required, or implement additional functionality to Neon Player.
- For the developer, it increases maintainability through separation.

Besides the built-in plugins that come with Neon Player, users can install 3rd party plugins to extend its functionality.

## Adding a Plugin

To add a plugin, simply place the Python file implementing the plugin into the `plugins` folder located in your Neon Player settings directory (see above).

Once placed there, the plugin will be automatically recognised and became available the next time Neon Player is started.

If the plugin requires any additional dependencies, you will be prompted and they will be automatically installed into the `site-packages` folder located inside the `plugins` folder once Neon Player is started.

### PEP 723 - Dependencies for Plugins

Neon Player bundles [Astral's UV Python package manager](https://docs.astral.sh/uv/) which makes installation of dependencies not only faster and safer, but also a lot simpler for 3rd party plugins, as they can now declare their dependencies as inline script metadata using [PEP 723](https://packaging.python.org/en/latest/specifications/inline-script-metadata/#inline-script-metadata).

Which is automatically picked up by Neon Player and installed into the `site-packages` folder located inside the `plugins` folder once Neon Player is started and the user has accepted the installation of said dependencies.

## Development

For the plugin development process, we recommend to [run from source](https://github.com/pupil-labs/neon-player).

### Language

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

Have a look at Neon Player's API documentation for more details on the available callbacks and how to use them: https://github.com/pupil-labs/neon-player-beta?tab=readme-ov-file

- Jobs
- Actions
- Getters / setters
- Typing annotations
