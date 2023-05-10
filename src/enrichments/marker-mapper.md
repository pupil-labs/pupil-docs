---
description: Map your gaze to a surface using fiducial markers
permalink: /enrichments/marker-mapper
---
# Marker Mapper
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../media/invisible/explainers/marker_mapper_header.png')"
    max-width=100%
  >
  </v-img>
</div>
The Marker Mapper enrichment enables you to map gaze to an area of interest or "surface". A surface is based on markers placed in the physical environment. A heatmap of gaze data mapped onto the surface can be generated within the enrichment in Pupil Cloud. Mapped gaze can further be downloaded as CSV files.

## Setup
For robust detection, you should place enough markers on your surface such that at least 3 of them are visible whenever the surface is visible. You may also place markers inside the surface or outside the surface in close proximity to it.

You can use these images as a template for printing markers:

<div class="pb-4" style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
  <a download="apriltags_tag36h11_0-23.jpg" href="../media/shared/imgs/apriltags_tag36h11_0-23.jpg" title="AprilTags 0-23">
    <img src="../media/shared/imgs/apriltags_tag36h11_0-23.jpg">
  </a>
  <a download="apriltags_tag36h11_24-47.jpg" href="../../media/shared/imgs/apriltags_tag36h11_24-47.jpg" title="AprilTags 0-23">
    <img src="../media/shared/imgs/apriltags_tag36h11_24-47.jpg">
  </a>
</div>


If you need more markers or higher resolution please see [here](https://github.com/pupil-labs/pupil-helpers/blob/master/markers_stickersheet/tag36h11_full.pdf?raw=True "PDF file with high-resolution markers.").

::: warning
<v-icon large color="warning">error_outline</v-icon>
Note that the markers require a white border around them for robust detection. In our experience, this should be at least equal to the width of the smallest white square/rectangle shown in the Marker. Please ensure you include a sufficient border when displaying or printing them!
:::

## Surface Coordinates
The Marker Mapper maps gaze points to a 2d surface and returns them in surface coordinates. The top left corner of the surface is defined as `(0, 0)` and the bottom right corner as `(1, 1)`. The orientation of the surface can be set in the enrichment settings.

The mapper may return values outside of the surface, which yields values smaller than 0 or larger than 1 and indicates that the corresponding gaze was not on the surface at that time.
