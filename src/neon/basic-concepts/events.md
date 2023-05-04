---
permalink: /neon/basic-concepts/events
description: Introduction to events and their usage in Pupil Cloud.
---

# Events
You can annotate relevant points in time in your recordings using **Events**. An event is essentially a timestamp in a recording with an assigned name. You can use events to filter your data temporally to the sections that interest you. 

You may for example want to mark when a certain stimulus became visible and disappeared again with events called `stimulus_start` and `stimulus_end`. Using those, you can filter your data to only consider samples for which the stimulus was present.

Events can also be used for the definition of [enrichments](/enrichments) to indicate what sections of your recordings they should be calculated on.

You can add events to your recordings post hoc in Pupil Cloud, or you can create them at recording time using the [real-time API](/neon/real-time-api/introduction).

Existing events can be downloaded as part of the respective recording downloads.