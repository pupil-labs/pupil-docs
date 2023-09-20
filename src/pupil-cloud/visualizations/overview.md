---
description: Explanation of all available enrichments including setup instructions.
permalink: /pupil-cloud/visualizations
---

# Visualizations 
TBD

<div>
    <div class="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-2 xl-grid-cols-3 gap-8">
      <div v-for="(item, index) in visualizations">
        <router-link
          :key="index"
          :to="item.to"
        >
          <v-img
            class="rounded"
            aspect-ratio="1.4"
            style="margin-bottom:32px;"
            :position="item.position"
            :src="require(`../../media/enrichments/${item.img}`)"
          />
          <p class="caption--1 font-weight-bold pb-3">{{ item.title }}</p>
        </router-link>
        <p class="caption--1">
          {{ item.text }}
        </p>
      </div>
    </div>
</div>


<script>
export default {
  data() {
    return {
      panel: null,
      visualizations: [
        {
          title: "Video Renderer",
          to: "/pupil-cloud/visualizations/video-renderer",
          text: "TBD",
          img: "reference_image_mapper_header.png",
        },
        {
          title: "Heatmap",
          to: "/pupil-cloud/visualizations/Heatmap",
          text: "TBD",
          img: "reference_image_mapper_header.png",
        },
      ],
    };
  },
}
</script>






