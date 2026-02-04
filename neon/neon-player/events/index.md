# Events

The Events plugin lets you add timestamped annotations to your recordings directly in Neon Player. This is useful for marking important moments such as condition start, user actions, or experimental events.

Events created during recording, either via the Neon Monitor app or the Real-Time API, are automatically loaded and displayed when you open the recording in Neon Player.

Adding and using events
- Open Events in the right-hand panel and click `+Add event type`
- Give the event a name and assign a keyboard shortcut
- During playback, press the shortcut to add an event at the current timestamp
- Events appear immediately on the timeline, aligned with the recording

You can create multiple event types, each with its own shortcut, to label recordings efficiently.

You can also import existing events from a CSV file using the `Import CSV` option. This is useful for bringing in annotations generated externally, such as task logs or behavioral markers. Imported events are placed directly on the timeline and appear alongside any events added manually in Neon Player.

## Export Format
Results exported to `events.csv` with the following fields:
| Field              | Description                                               |
| ------------------ | --------------------------------------------------------- |
| **recording id**   | Unique identifier of the recording this event belongs to. |
| **timestamp [ns]** | UTC timestamp of the event.                               |
| **name**           | Name of the event.                                        |