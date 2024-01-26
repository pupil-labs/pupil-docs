# Annotation Player

This plugin allows you to add annotations to your recording. With the Neon Player interface, you can assign hotkeys to 
your annotations to ensure efficient labelling of important events in your recordings. The Plugin also loads any events
that were created in real-time on the Companion Device using the Monitor app or real-time API.

::: tip
Any custom field encountered in the annotations will be exported as an additional column.
Their values will be converted to strings using Python's string representation. Therefore, it is recommended to use primitive types (strings, integers, floats) as value types for custom fields.
:::

Annotation hotkey definitions are stored in the recording directory: 
`<recording dir>/offline_data/annotation_definitions.json` with the format:
```json
{
    "version": 1,
    "definitions": {
        "<label>": "<hotkey>"
    }
}
```
When a new recording is loaded, Neon Player will attempt to load the annotation definitions from the recording-specific file. 
If it is not found or invalid, the last known set of annotation definitions will be loaded from Neon Player's session settings.

## Export Format
Results exported to `annotations.csv` with the following fields:
| Field | Description | 
| -------- | -------- | 
|**index**| World frame index during which the annotation started or happened|
|**timestamp**| Start time or timestamp of the annotation|
|**label**| Annotation label|
|**duration**| Duration of the annotation|