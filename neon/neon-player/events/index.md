# Events

The Events plugin lets you add timestamped annotations to your recordings. This is useful for marking important moments such as condition start, user actions, or experimental events.

Events created during recording, either via the Neon Monitor app or the Real-Time API, are automatically loaded and displayed when you open the recording in Neon Player.

**Adding and using events:**

- Open Events in the right-hand panel and click `+ Add event type`
- Give the event a name and optionally assign a keyboard shortcut
- During playback, right-click over the timeline or press the shortcut to add an event at the current timestamp
- Events appear immediately on the timeline, aligned with the recording

You can create multiple event types, each with its own shortcut, to label recordings efficiently.

In the timeline, you can also right-click on an existing event to "seek" the video to that timestamp, making it easy to review specific moments in the recording or to delete events you no longer need.

<video width="100%" controls>
  <source src="./events.mp4" type="video/mp4">
</video>

You can also import existing events from a CSV file using the `Import CSV` option. This is useful for bringing in annotations generated externally, such as task logs or behavioral markers. Imported events are placed directly on the timeline and appear alongside any events added manually in Neon Player.
