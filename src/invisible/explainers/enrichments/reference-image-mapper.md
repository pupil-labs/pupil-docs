---
description: Powerful tool to map gaze data from the scene camera onto a reference image 
permalink: /invisible/explainers/enrichments/reference-image-mapper
---

# Reference Image Mapper

Reference Image Mapper is a powerful tool to automatically map gaze onto to features/objects in the environment.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    class="rounded" 
    style="margin-bottom:32px;"
    :src="require('../../../media/invisible/rim/reference_image_mapper_header.png')"
    max-width=100%
  >
  </v-img>
</div>


A heatmap of gaze data mapped onto the reference image can be generated within Pupil Cloud. Mapped gaze and fixation data can further be downloaded as [CSV files](/invisible/reference/export-formats.html#reference-image-mapper). 

## Setup

To produce a Reference Image Mapper enrichment, you will need two things in addition to your eye tracking recording(s):
1. A reference image
2. A scanning video of the object/feature(s) taken with Pupil Invisible’s scene camera

In this guide, we will show you how the Reference Image Mapper can be used in a few different situations. This should help you get set up using the enrichment in your own testing environment!

Below, gaze is mapped in four very different environments: to a **magazine cover**, a **basketball** backboard, a **supermarket shelf**, and even a **whole building**! Let's take a look at what the Reference Image and Scanning Recording look like to produce the below heatmaps.

<div>
  <div class="grid grid-cols-2 sm-grid-cols-2 md-grid-cols-4 lg-grid-cols-4 xl-grid-cols-4 gap-4">
    <div v-for="index in 4">
      <v-img 
        contain
        class="rounded" 
        style="margin-bottom:32px;"
        :src="require(`../../../media/invisible/rim/heatmap-${index}.jpg`)"
        aspect-ratio="1"
        max-height="300px"
        max-width="300px"
      >
      </v-img>
    </div>
  </div>
</div>


### 1. Magazine reading


<div class="grid grid-cols-2 sm-grid-cols-2 md-grid-cols-2 lg-grid-cols-2 xl-grid-cols-2 gap-4">
  <div>
    <h4>Reference image</h4>
    <iframe src="https://drive.google.com/file/d/1iWlU99D9SB9AVreQ4FH-X1iMMnbLfD6T/preview" width="100%" height="300px" allow="autoplay"></iframe>
    First, we need a high-resolution .jpeg of the page.
  </div>
  <div>
    <h4>Scanning video</h4>
    <iframe src="https://drive.google.com/file/d/12AZR34Ygp_0mHkF9-ry9HS_4Q93DtRWz/preview" width="100%" height="300px" allow="autoplay"></iframe>
    Then, we need a scanning recording, about <i>15 s</i> long, taken on a blank background and in good lighting (natural light works well). Note that the magazine page is clear with good contrast
  </div>
</div>


### 2. Basketball

<div class="grid grid-cols-2 sm-grid-cols-2 md-grid-cols-2 lg-grid-cols-2 xl-grid-cols-2 gap-4">
  <div>
    <h4>Reference image</h4>
    <iframe src="https://drive.google.com/file/d/1XNAjhvCZMaoOlYaWk5e0uK_EyQXfz9KT/preview" width="100%" height="300px" allow="autoplay"></iframe>
    Here we can take a photo of the basketball hoop and court background.
  </div>
  <div>
    <h4>Scanning video</h4>
    <iframe src="https://drive.google.com/file/d/1oDVLdMRXOLzJf-bdP3SxdavV3nLck-jV/preview" width="100%" height="300px" allow="autoplay"></iframe>
    The scanning recording, in this case, is about 45 s long – note that the angles and distances cover what a player might see when dribbling towards the basket or taking a shot
  </div>
</div>

### 3. Supermarket shelf

<div class="grid grid-cols-2 sm-grid-cols-2 md-grid-cols-2 lg-grid-cols-2 xl-grid-cols-2 gap-4">
  <div>
    <h4>Reference image</h4>
    <iframe src="https://drive.google.com/file/d/1psb9N4_d5xn51jyiP4N664kTyq75FPZ2/preview" width="100%" height="300px" allow="autoplay"></iframe>
    This photo captures the assortment of packagíng in the coffee aisle of a supermarket.
  </div>
  <div>
    <h4>Scanning video</h4>
    <iframe src="https://drive.google.com/file/d/1JMV-4g53yKTae5BMDsXlaMsxxun8-gCU/preview" width="100%" height="300px" allow="autoplay"></iframe>
    Notice that the scanning recording is fairly slow to reduce motion blur for this feature rich shelf.
  </div>
</div>

### 4. An entire building

<div class="grid grid-cols-2 sm-grid-cols-2 md-grid-cols-2 lg-grid-cols-2 xl-grid-cols-2 gap-4">
  <div>
    <h4>Reference image</h4>
    <iframe src="https://drive.google.com/file/d/1GujEsgeup67oTeOEAeLQ_nPIeZvn_ymG/preview" width="100%" height="300px" allow="autoplay"></iframe>
    This is a photo of the <i>entire</i> building
  </div>
  <div>
    <h4>Scanning video</h4>
    <iframe src="https://drive.google.com/file/d/1S_BeAh4WvsoUXXA-y82MahMfOFLmP4z8/preview" width="100%" height="300px" allow="autoplay"></iframe>
    We take a longer scanning recording, about 2 min. The angles and distances cover what a person might see whilst walking past or standing in front of the building.
  </div>
</div>

## Scanning best practices

- Make the recording while holding the Pupil Invisible glasses in your hand rather than wearing it on your head.
- Record the object of interest from all possible angles and from all distances a subject may look at it. More diversity is better. Collecting sufficiently diverse viewpoints or a large object, like a building, may take longer than capturing a small object like a magazine.
- Move the glasses slowly while recording to avoid motion blur.
- Make sure to have good contrast and that your scene lighting during scanning is similar to that during mapping.

What works and what doesn’t?
- These examples are **feature rich**. Reference Image Mapper needs enough salient visual content to produce a successful mapping.
- The scenes are relatively **static** features in the environment. If there is a lot of movement or the objects change in appearance, the mapping *can* fail.

::: tip
**Ready to go?**
Why not try replicating the above examples? Or even try it with your own use-cases! If you haven’t already, we recommend you check out the [Cloud Getting Started Guide](/invisible/getting-started/analyse-recordings-in-pupil-cloud/#analyse-recordings-in-pupil-cloud), which covers the basics of working with enrichments.
:::

## Validate gaze mapping

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    class="rounded" 
    style="margin-bottom:32px;"
    :src="require('../../../media/invisible/rim/rim-in-cloud.png')"
    max-width=90%
  >
  </v-img>
</div>

To check if gaze has been mapped successfully, use the side-by-side view:
1. Select a recording
2. Select the Reference Image Mapper Enrichment
3. Select the Scene Reference Image View
4. If you want to visualize and evaluate the 3D model generated (white dots), just turn on the Point Cloud toggle!

Now when you play back the recording you can see where gaze is mapped to on your reference image for validation

## Oclusions

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    class="rounded" 
    style="margin-bottom:32px;"
    :src="require('../../../media/invisible/rim/basketball-occlusion.png')"
    max-width=40%
  >
  </v-img>
</div>


Sometimes an object will occlude the feature/object of interest. The reference image mapper may not know this, so a false positive mapping could occur. 

If you need to remove the falsely mapped data points, there are a few workarounds.

1. Use Events and Sections to trim out false positive sections as in the above tip.
2. Manually remove the affected data points in the reference image mapper export, by finding the timestamp and deleting the row in the .csv export.

## Repetitions

**Use Sections to map portions of your recordings**

In cases such as supermarket shopping, where features of the environment like freezers and aisles are repetitive and overlapping, it can be useful to divide recordings into shorter [Sections](/invisible/explainers/enrichments/overview#enrichment-sections) for enrichment. This way you can ensure gaze is only mapped to portions of the recording when you know the user is looking at a particular part of the store.


::: tip

**Want to know more?**

Under the hood, the Reference Image Mapper uses a method called SLAM, which builds a model of the environment. You can see this by enabling the ‘point cloud’ in your Cloud Project.
:::
