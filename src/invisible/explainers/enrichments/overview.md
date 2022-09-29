---
description: Explanation of all available enrichments including setup instructions.
permalink: /invisible/explainers/enrichments
---

# What are Enrichments? 
Enrichments allow you to perform various analyses on your recordings. They utilize cloud resources to run complex algorithms on your data. Use them to track objects of interest, and aggregate and visualize your data.

## Enrichment Sections
All enrichments are defined based on a **start** and **end [event](/invisible/explainers/basic-concepts/#events)**. Those events are used to specify which sections of a recording an enrichment should be calculated on. The enrichment will be calculated on any recording in your project that contains the respective start and end event in the recording section between those two events.

You can preview the results of most enrichments in the project editor by clicking on an enrichment section and playing the corresponding section of the recording. Every enrichment section has a unique ID, which is referenced in all enrichment exports.

If a recording contains multiple instances of the start and end event, it will contribute multiple sections accordingly. You can use the auto-generated `recording.begin` and `recording.end` events to calculate enrichments on entire recordings.







