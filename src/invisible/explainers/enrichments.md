---
permalink: /invisible/explainers/enrichments
description: Explanation of all available enrichments including setup instructions.
---

# Enrichments
Enrichments allow you to perform various analyses on your recordings. They utilize cloud resources to run complex algorithms on your data. Use them to track objects of interest, aggregate and visualize your data.

## Enrichment Sections
All enrichments are defined based on a **start** and **end [event](/invisible/explainers/basic-concepts/#events)**. Those events are used to specify which sections of a recording an enrichment should be calculated on. The enrichment will be calculated on any recording in your project that contains the according start and end event in the recording section between those two events.

You can preview the results of most enrichments in the project editor by clicking on an enrichment section and playing the corresponding section of the recording. Every enrichment section has a unique ID, which is referenced in all enrichment exports.

If a recording contains multiple instances of the start and end event, it will contribute multiple sections accordingly. You can use the auto-generated `recording.begin` and `recording.end` events to calculate enrichments on entire recordings.


## Raw Data Exporter
Using the Raw Data Exporter you can get access to all your recording data in convenient CSV and MP4 format directly from Pupil Cloud. Easily export entire projects and extend your analysis with your own custom tools (R, Python, etc.) or third-party analysis platforms. In addition to the raw recording data, it also includes event annotations you have added post hoc.

Currently, the events used for defining this enrichment are fixed to `recording.begin` and `recording. end`. It is not possible to limit the export range using other events similar to other enrichments.


## Marker Mapper
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/marker_mapper_header.jpg')"
    max-width=100%
  >
  </v-img>
</div>
The Marker Mapper enrichment enables you to map gaze to an area of interest or "surface". A surface is based on markers placed in the physical environment. A heatmap of gaze data mapped onto the surface can be generated within the enrichment in Pupil Cloud. Mapped gaze can further be downloaded as CSV files.

### Setup
For robust detection, you should place enough markers on your surface such that at least 3 of them are visible whenever the surface is visible.

You may also place markers inside the surface or outside the surface in close proximity to it.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/shared/imgs/apriltags.jpg')"
    max-width=100%
  >
  </v-img>
</div>


If you need more markers or higher resolution please see [here](https://github.com/pupil-labs/pupil-helpers/blob/master/markers_stickersheet/tag36h11_full.pdf?raw=True "PDF file with high-resolution markers.").

::: warning
<v-icon large color="warning">error_outline</v-icon>
Note that the markers require a white border around them for robust detection. In our experience, this should be at least equal to the width of the smallest white square/rectangle shown in the Marker. Please ensure you include a sufficient border when displaying or printing them!
:::

### Surface Coordinates
The Marker Mapper maps gaze points to a 2d surface and returns them in surface coordinates. The top left corner of the surface is defined as `(0, 0)` and the bottom right corner as `(1, 1)`. The orientation of the surface can be set in the enrichment settings.

The mapper may return values outside of the surface, which yields values smaller than 0 or larger than 1 and indicates that the corresponding gaze was not on the surface at that time.


## Reference Image Mapper
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/reference_image_mapper_header.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The Reference Image Mapper enrichment enables you to map gaze to a reference image of an object of interest. A heatmap of gaze data mapped onto the reference image can be generated within the enrichment in Pupil Cloud. Mapped gaze can further be downloaded as CSV files (see below).

This enrichment is still a **beta feature**. Let us know if you have any [feedback](mailto:info+cloud@pupil-labs.com)!



### Setup
In addition to the reference image itself, calculating this enrichment also requires specifying a **scanning video**. In this video you must record your object(s) for 1-2 minutes fulfilling the following criteria:
- Make the recording while holding the Pupil Invisible glasses in your hand rather than wearing it on your head.
- Record the object of interest from all possible angles and from all distances a subject may look at it.
- Move the glasses slowly while recording to avoid motion blur.



A good scanning recording and reference image are shown below:

**Example Scanning Recording**

<Youtube src="-S5dOBqC0Uw"/>

**Example Reference Image**

<div class="pb-4" style="display:flex;justify-content:center;">
<v-img 
  :src="require('../../media/invisible/explainers/reference_image_sample.jpg')"
  max-width=100%
>
</v-img>
</div>


### Limitations
Please note that this enrichment only works for reference images showing objects that
- are static in their environment, i.e. they do not move while recording.
- are (mostly) static in their appearance, i.e. the object itself does not change while recording.

**Positive Examples**
- Image affixed to a wall/surface. This could be a painting, map, advertisement, poster, menu, etc.
- An exhibit in a museum. This could also be 3 dimensional, as long as it is static.
- Control Interface. Aircraft flight deck, automobile dashboard, machine controls. A vehicle (car, boat, airplane, excavator, etc) is usually moving in its environment. However, the interior is relatively static. We have found that this _should_ be enough to fulfill the criteria for the reference image mapper.

**Negative Examples**
- Mobile phone or tablet screens. Not suitable due to dynamic movement within the environment and dynamic content displayed on the screen.
- Computer monitors and TV screens. The contents displayed on the monitors/screens usually change dramatically. If the content remains static across recordings (e.g. single image) then the reference image mapper would work.

We always recommend making a quick test recording to check if your use-case is compatible.

### Mapped Gaze Coordinates
The Reference Image Mapper maps gaze points to a reference image. As such, the gaze coordinates are given in pixels referring to that image. The pixel at (0,0) is in the top left corner.


## Face Mapper

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/face_mapper_header.jpeg')"
    max-width=100%
  >
  </v-img>
</div>

The Face Mapper enrichment robustly detects faces in the scene video. Detections consist of the bounding box of the face. This provides you with insight into _when_ and _where_ faces are visible to a subject.

This enrichment automatically maps gaze data onto faces so that you can determine when a subject has been looking at them.

Additionally, this enrichment also calculates the location of the most important facial landmarks in the image for each face: left eye, right eye, nose, left mouth corner, and right mouth corner.


## Gaze Overlay
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/explainers/gaze_overlay_header1.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The Gaze Overlay enrichment allows you to download world videos with a gaze overlay rendering. You can easily filter out the sections of your recordings you are interested in and the visualization of the gaze circle can be customized (currently: size and color). 

