# Settings

Upon installation, Neon Player creates a dedicated folder for user settings and plugins. This lives under your `$HOME directory > Pupil Labs > Neon Player.`

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
