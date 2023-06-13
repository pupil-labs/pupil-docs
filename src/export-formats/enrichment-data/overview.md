---
permalink: /export-formats/enrichment-data/
description: Documentation of the exact export formats of Pupil Cloud enrichments.
---
## Where can I find the results of my enrichments?

At the left side of the project's view you can see a list of the enrichments you created, below you will find a download button, which will open a view with both the raw downloads and the enrichments data.

For a detailed view of what each enrichment result contains, please refer to the respective enrichment export page:

<div class="pb-4">
  <v-btn
    v-for="(item,index) in enrichmentExports"
    :key="index"
    outline
    round
    color="primary"
    :to="item.link"
    style="font-weight:normal;"
  >
    {{ item.title }}
  </v-btn>
</div>

<script>
export default {
  data() {
        return {
            enrichmentExports: [
                {
                title: "Reference Image Mapper",
                link: "/export-formats/enrichment-data/reference-image-mapper/",
                },
                {
                title: "Marker Mapper",
                link: "/export-formats/enrichment-data/marker-mapper/",
                },
                {
                title: "Face Mapper",
                link: "/export-formats/enrichment-data/face-mapper/",
                },
                {
                title: "Gaze Overlay",
                link: "/export-formats/enrichment-data/gaze-overlay/",
                },
            ],
        };
    },
};
</script>
