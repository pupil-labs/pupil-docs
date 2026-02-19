# What Are Enrichments?

Enrichments are tools that allow you to explore and visualize your data in new ways. These tools require complex algorithms and significant computational resources. Now, we put them at your fingertips, as you can run them with just a few clicks in Pupil Cloud. With enrichments, you can add new dimensions and derive new insights from your data. We can't wait to see how you use them!

<video width="100%" controls>
  <source src="./create_enrichment.mp4" type="video/mp4">
</video>

## What Can I Do With Enrichments?

From mapping your gaze to real-world features of the environment, like surfaces, 3d objects, and faces, to aggregating and visualizing your data, enrichments can help you get the most out of your recordings. See below for a list of all available enrichments and their use cases.

## Enrichment Sections

Before you continue, note that all enrichments are defined based on a **start** and **end [event](/data-collection/events/)**. Those events are used to specify which sections of a recording an enrichment should be calculated on. The enrichment will be calculated on any recording in your project that contains the respective start and end events in the recording section between those two events.

You can preview the results of most enrichments in the project editor by clicking on an enrichment section and playing the corresponding section of the recording. Every enrichment section has a unique ID, which is referenced in all enrichment exports.

If a recording contains multiple instances of the start and end event, it will contribute multiple sections accordingly. You can use the auto-generated `recording.begin` and `recording.end` events to calculate enrichments on entire recordings.

All enrichments downloads would contain a `sections.csv` file that contains the start and end timestamps of all sections that were used for the enrichment calculation, along with the corresponding section and recording IDs.
