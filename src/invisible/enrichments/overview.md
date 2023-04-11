---
description: Explanation of all available enrichments including setup instructions.
permalink: /invisible/enrichments
---

# What are Enrichments? 
Enrichments are tools that allow you to explore and visualize your data in new ways. These tools require complex algorithms and significant computational resources. Now, we put them at your fingertips, as you can run them with just a few clicks in Pupil Cloud. With enrichments, you can add new dimensions and derive new insights from your data. We can't wait to see how you use them!

## What can I do with Enrichments?
From mapping your gaze to real-world features of the environment, like surfaces, 3d objects, and faces, to aggregating and visualizing your data, enrichments can help you get the most out of your recordings. See below for a list of all available enrichments and their use cases.

<div>
    <div class="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-2 xl-grid-cols-3 gap-8">
      <div v-for="(item, index) in enrichments">
        <router-link
          :key="index"
          :to="item.to"
        >
          <v-img
            class="rounded"
            aspect-ratio="1.4"
            style="margin-bottom:32px;"
            :position="item.position"
            :src="require(`../../media/invisible/explainers/${item.img}`)"
          />
          <p class="caption--1 font-weight-bold pb-3">{{ item.title }}</p>
        </router-link>
        <p class="caption--1">
          {{ item.text }}
        </p>
      </div>
    </div>
</div>

## Enrichment Sections
Before you continue, note that all enrichments are defined based on a **start** and **end [event](/invisible/basic-concepts/events)**. Those events are used to specify which sections of a recording an enrichment should be calculated on. The enrichment will be calculated on any recording in your project that contains the respective start and end events in the recording section between those two events.

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
          to: "/invisible/enrichments/reference-image-mapper",
          text: "Our markerless solution to map gaze data from the real world onto a reference image.",
          img: "reference_image_mapper_header.jpg",
        },
        {
          title: "Marker mapper",
          to: "/invisible/enrichments/marker-mapper",
          text: "Use apriltags to get your gaze onto a surface.",
          img: "marker_mapper_header.png",
        },
        {
          title: "Face mapper",
          to: "/invisible/enrichments/face-mapper",
          text: "Map gaze data to faces in the scene video.",
          img: "face_mapper_header.png",
        },
        {
          title: "Gaze overlay",
          to: "/invisible/enrichments/gaze-overlay",
          text: "Visualise your gaze on top of the scene video and undistort the scene video.",
          img: "gaze_overlay_header1.jpg",
        },
      ],
    };
  },
}
</script>






