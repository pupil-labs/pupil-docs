# Plugins & Sidebar

<TextWrap src="./sidebar.webp" alt="Sidebar view" align="left" width="350px" class="rounded-sm">

Neon Player uses a plugin architecture to add functionality, all data streams are implemented using this structure and each can be activated or deactivated on demand in the sidebar. See the [Plugin API](../plugin-api/) for technical details.

The sidebar displays the recording's metadata at top, followed by a button to add/remove plugins, and then the list of activated plugins with their options in alphabetical order.

Different plugins have different options.
</TextWrap>

## Default Plugins / Streams

These are the plugins that are installed by default. Most of them load the corresponding data stream, add a track in the timeline, and export the data in .csv format. Some of them also provide visualizations in the video player.

## Exports

You can export data for every plugin individually, or you can use the `Export All` plugin to export all data together. Under the `Export All` plugin, you can press the export icon symbol, which prompts you to select a location to create a new folder with the title of the current timestamp. All loaded plugins with export capabilities will initiate the export process and save their data to this folder. During the export, you can continue to work with Neon Player.

::: info
The exported data follows [Data Format](../../data-collection/data-format/) with some minor adjustments.
:::
