# XDF Stream

The XDF Stream plugin lets you import external data recorded in the [Extensible Data Format (XDF)](https://github.com/sccn/xdf/wiki/Specifications) into Neon Player. You can align XDF data with a Neon recording using shared event markers, visualize selected channels in the timeline, and export the aligned data as a CSV file.

<video width="100%" controls>
  <source src="./np-xdf.mp4" type="video/mp4">
</video>

## Setup

Before using the plugin, ensure that:

- Neon Player 6.1.0 or higher is installed.
- You have an `.xdf` file containing at least one numeric data stream.
- The XDF file contains a marker stream with an event shared with the Neon recording.
- The same event is present in the Neon recording’s Events data.

The shared event is used to synchronize the XDF timestamps with Neon timestamps. For reliable synchronization, use an event that occurs once, or ensure that the first occurrence is the intended synchronization point.

## Supported XDF Fields

Neon Player uses the following XDF stream metadata:

- Streams with `channel_format` set to `string` are treated as marker streams. Other stream formats are treated as data streams.
- The stream name and type shown in Neon Player are read from the stream header’s `name` and `type` fields, respectively.
- Channel names are read from `desc > channels > channel > label`. If channel labels are unavailable, Neon Player assigns fallback names such as `Ch1`, `Ch2`, and `Ch3`.

## Workflow

1. **Load the XDF Stream Plugin:** Open your recording in Neon Player and navigate to the Plugins section in the right-hand panel. Click `Add/Remove` and enable `XDF Stream`.
2. **Select an XDF File:** In the `XDF Stream` panel, select an `.xdf` file using the `File Path (.xdf)` field.
    
    Neon Player loads the streams contained in the file and separates them into marker streams and data streams based on their `channel_format` metadata.
    
3. **Select a Data Stream:** Choose the numeric stream to visualize and export using the `Data Stream` selector.
4. **Select a Marker Stream:** Choose the marker stream containing the synchronization event using the `Marker Stream` selector.
5. **Select a Sync Event:** Choose an event that appears in both the XDF marker stream and the Neon recording using the `Sync Event` selector.
    
    Neon Player uses the first occurrence of this event in each source to calculate the time offset between the XDF data and the Neon recording.
    
6. **Review the Alignment:** Once the streams are aligned, the XDF data and markers are displayed on the Neon Player timeline. Scrub through the recording to verify that the imported data appears at the expected times.

### Channel Selection

Use `Channel Selection` to choose which data channels are displayed in the timeline. By default, the first channel is selected.

The `Enable All Channels` and `Disable All Channels` actions can be used to select or clear all channels at once.

### Bandpass Filtering

Enable `Apply Bandpass 1-30 Hz` to apply a 1–30 Hz bandpass filter to the data displayed in the timeline.

:::tip
💡 This filter is optional because it can make EEG-like signals easier to inspect by reducing slow baseline drift and high-frequency noise, but it may be inappropriate for other data types or analyses that depend on the original signal.
:::

This option only affects timeline visualization. The exported CSV contains the original, unfiltered XDF data.

## Timeline View

The XDF Stream plugin adds the following tracks to the timeline:

- `XDF Markers - <marker name>` shows the locations of markers from the selected marker stream.
- `XDF - Data Stream` indicates the portion of the Neon recording covered by the selected XDF data stream.
- `XDF - <stream type> - <channel name>` displays the selected data channels.

The XDF data is shown only when it falls within the time range of the Neon recording. Data are converted to Neon timestamps using the selected synchronization event.

## Export Format

Once the XDF data have been aligned, click `Export` in the XDF Stream panel to export the data within the current export window.

The plugin creates the following file:

### `xdf_stream.csv`

The CSV file contains the aligned samples from the selected XDF data stream.


| Field                                       | Description                                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **recording id**                          | Identifier of the Neon recording.                                   |
| **timestamp [ns]**                          | Sample timestamp converted to the Neon clock, in nanoseconds.                                   |
| **<channel_name>**                | Value of the corresponding XDF channel. One column is included for every channel in the selected data stream.                    |                                                                        

The export contains all channels from the selected data stream, regardless of the current channel selection in the timeline. The optional bandpass filter is not applied to exported data.

## Limitations

- Only numeric XDF streams can be visualized and exported as data streams.
- Marker streams must contain event names that match events in the Neon recording.
- If an event occurs multiple times, the first occurrence in each source is used for alignment.
- The XDF file must be selected again if its path changes or the file is no longer available.