# Plugins

Plugins are distributed as Python files that are loaded and executed at runtime. To be recognized as such, they need to be installed in the [correct place](#adding-a-plugin) and implement the [Plugin API](#development).

The usage of plugins has multiple advantages:

- For the user, they make it easy to turn features on and off as required, or implement additional functionality to Neon Player.
- For the developer, they facilitate maintainability through separation.

Besides the built-in plugins that come with Neon Player, users can install 3rd party plugins to extend its functionality.

## Adding a Plugin

To add a plugin, simply place the Python file implementing the plugin into the `plugins` folder located in your Neon Player [Settings](../settings/) directory.

Once placed there, the plugin will be automatically recognised and became available the next time Neon Player is started.

If the plugin requires any additional dependencies, you will be prompted, and they will be automatically installed into the `site-packages` folder located inside the `plugins` folder once Neon Player is started.

### PEP 723 - Dependencies for Plugins

Neon Player bundles [Astral's UV Python package manager](https://docs.astral.sh/uv/) which makes installation of dependencies not only faster and safer, but also a lot simpler for 3rd party plugins, as they can now declare their dependencies as inline script metadata using [PEP 723](https://packaging.python.org/en/latest/specifications/inline-script-metadata/#inline-script-metadata).

Which is automatically picked up by Neon Player and installed into the `site-packages` folder located inside the `plugins` folder once Neon Player is started and the user has accepted the installation of said dependencies.
