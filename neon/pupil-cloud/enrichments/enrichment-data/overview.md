---
permalink: /export-formats/enrichment-data/
description: Documentation of the export formats of Pupil Cloud enrichments.
---
## Enrichment Exports

To export the results of an enrichment, navigate to the "Downloads" view of your project.

Select the enrichment type you are interested in to get detailed information about the export format.

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
