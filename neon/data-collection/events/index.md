# Events
You can annotate key points in time in your recordings using **Events**. This could for example be the start and end of a stimulus presentation in your experiment. Alternatively you could create an event to mark an anomaly that occured during data collection to later exclude this section from your analysis.

An event is essentially a timestamp in a recording with an assigned name. All events associated with a recording are saved as part of it and can be accessed afterwards.

In [Pupil Cloud](/pupil-cloud/), events can also be used in the definition of [enrichments](/pupil-cloud/enrichments/) to indicate what sections of your recordings should get processed. See [here](/pupil-cloud/enrichments/) for details.

## Creating Events
**At recording time**, you can use the [Monitor App](/data-collection/monitor-app/) to create events manually. Alternatively, you can use the [real-time API](/real-time-api/) to create events programmatically. See for example [this guide](https://pupil-labs.github.io/pl-realtime-api/dev/cookbook/track-your-experiment-progress-using-events/) on using the real-time API to automatically track progress of an experiment.

::: tip 
When sending events in real time via the real-time API or the Monitor App, Neon assigns the timestamp based on the time of arrival by default. If you are synchronizing Neon with external systems (e.g., EEG or stimulus software), it is recommended to use the API's manual clock offset correction for improved temporal alignment. See details [here](https://pupil-labs.github.io/pl-realtime-api/dev/methods/simple/remote-control/#with-manual-clock-offset-correction).
:::

**Post hoc** you can add events to recordings in [Pupil Cloud](/pupil-cloud/).

