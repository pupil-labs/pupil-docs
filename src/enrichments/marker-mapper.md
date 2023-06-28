---
description: Map your gaze to a surface using fiducial markers
permalink: /enrichments/marker-mapper
---
# Marker Mapper

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require('../media/enrichments/marker_mapper_header.png')"
  width="80%" 
  alt="A screenshot of the Marker Mapper enrichment on Pupil Cloud."
  title="A screenshot of the Marker Mapper enrichment on Pupil Cloud" />
</div>
The Marker Mapper enrichment enables tracking of where an individual is looking on a particular area or "surface" by positioning markers in the surrounding environment. This allows for the generation of a heatmap of gaze data directly within the Pupil Cloud enrichment, or for downloading the remapped gaze data in CSV format for further analysis.

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
Note that the markers require a white border around them to be robustly detected. In our experience, this border should be at least equal to the width of the smallest white square or rectangle shown in the marker. Therefore, please make sure to include a sufficient border when displaying or printing them.
:::

## Selecting Markers in the Cloud
By default, all visible markers are used for surface definition when creating a surface. You can add or remove markers by clicking on them. Markers that are part of the definition are shown in green, while others are shown in red.

Note that when adding a new marker to the surface definition, another marker that is already part of the definition has to be visible within the same video frame.

A surface definition always needs to contain at least 2 markers. Thus, at least 2 markers have to be visible in the video frame when initially creating the surface, and you cannot remove further markers from the surface definition when the marker count is down to 2.

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require('../media/enrichments/marker_mapper_additional.png')"
  width="80%" 
  alt="A screenshot of the Marker Mapper enrichment on Pupil Cloud."
  title="A screenshot of the Marker Mapper enrichment on Pupil Cloud" />
</div>

## Surface Coordinates
The Marker Mapper maps gaze points to a 2D surface and returns them in surface coordinates. The top left corner of the surface is defined as `(0, 0)`, and the bottom right corner is defined as `(1, 1)`. The orientation of the surface can be set in the enrichment settings.

The mapper may return values outside of the surface, which yields values smaller than 0 or larger than 1, indicating that the corresponding gaze was not on the surface at that time.

::: danger
<b>Orientation:</b>
<br>
The red border marks the top edge of the surface. You can rotate the surface by clicking on the "Rotate Surface" button.
:::