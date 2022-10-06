---
description: Explanation of all available enrichments including setup instructions.
permalink: /invisible/explainers/enrichments
---

# What are Enrichments? 
Enrichments are tools that allow you to explore and visualize your data in new ways. These tools require complex algorithms and significant computational resources. Now, we put them at your fingertips, as you can run them with just a few clicks in Pupil Cloud. With enrichments, you can add new dimensions and derive new insights from your data. We can't wait to see how you use them!

## What can I do with Enrichments?
From mapping your gaze from the scene to a reference image, a surface or faces, to aggregating and visualizing your data, enrichments can help you get the most out of your recordings. See below for a list of all available enrichments and their use cases.

<div class="pb-4">
  <v-btn
    v-for="(item,index) in enrichments"
    :key="index"
    outline
    round
    color="primary"
    :to="item.link"
    style="font-weight:normal;border-color"
  >
    {{ item.title }}
  </v-btn>
</div>

## Enrichment Sections
Before you go, note that all enrichments are defined based on a **start** and **end [event](/invisible/explainers/basic-concepts/#events)**. Those events are used to specify which sections of a recording an enrichment should be calculated on. The enrichment will be calculated on any recording in your project that contains the respective start and end event in the recording section between those two events.

You can preview the results of most enrichments in the project editor by clicking on an enrichment section and playing the corresponding section of the recording. Every enrichment section has a unique ID, which is referenced in all enrichment exports.

If a recording contains multiple instances of the start and end event, it will contribute multiple sections accordingly. You can use the auto-generated `recording.begin` and `recording.end` events to calculate enrichments on entire recordings.

<script>
export default {
  data() {
    return {
      panel: null,
      enrichments: [
        {
          title: "Reference image mapper",
          link: "/invisible/explainers/enrichments/reference-image-mapper",
        },
        {
          title: "Marker mapper",
          link: "/invisible/explainers/enrichments/marker-mapper",
        },
        {
          title: "Face mapper",
          link: "/invisible/explainers/enrichments/face-mapper",
        },
        {
          title: "Gaze overlay",
          link: "/invisible/explainers/enrichments/gaze-overlay",
        },
        {
          title: "Raw Data",
          link: "/invisible/explainers/enrichments/raw-data",
        },
      ]
    };
  },
}
</script>






