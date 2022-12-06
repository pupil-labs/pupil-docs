---
description: Face mapper enrichment explainer
permalink: /invisible/enrichments/face-mapper
---

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

The face detection algorithm used under the hood for this enrichment is [RetinaFace](https://github.com/deepinsight/insightface/tree/master/detection/retinaface).
