---
description: A living space - working with multiple reference images
permalink: /alpha-lab/multiple-rim/
tags: [Pupil Invisible, Neon, Cloud]
---

# Map and visualize gaze on multiple reference images taken from the same environment

<TagLinks />

<div class="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/CLNDE0VJVng?si=Hsp2C3JYRCIOtKyY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br>

::: tip
Level-up your Reference Image Mapper workflow to extract insights from participants freely exploring their environment!
:::

## Exploring gaze patterns in multiple regions of an environment
Understanding where people focus their gaze while exploring their environment is a topic of interest for researchers across various fields, including art, architecture, and medical training. With the Reference Image Mapper enrichment in Pupil Cloud, we can map gaze in 3D real-world environments and generate heatmap visualizations. These offer an informative overview of visual exploration patterns and also pave the way  for further analysis, such as region of interest analysis.

In this guide, we will show you how to use the [Reference Image Mapper](/enrichments/reference-image-mapper/) to map a 
participant's gaze onto _multiple_ areas of a living environment as they freely navigate around it.

::: tip
Before continuing, ensure you are familiar with the [Reference Image Mapper](/enrichments/reference-image-mapper) enrichment. 
Check out [this explainer video](https://www.youtube.com/watch?v=ygqzQEzUIS4&t=56s) for reference.
:::

## The tools at hand
The [Reference Image Mapper](/enrichments/reference-image-mapper/) in Pupil Cloud allows mapping gaze onto a _single_ reference image of an environment, but there's often a need to analyze *multiple* regions for a deeper understanding of visual exploration patterns. This guide demonstrates how to utilize the Reference Image Mapper for this purpose.

## Steps
Since the [Reference Image Mapper](/enrichments/reference-image-mapper/) is designed to map gaze onto a *single* reference image, our tutorial involves applying the Reference Image Mapper *multiple* times over the same recording to generate mappings for separate regions. To achieve this, we need:

- Multiple reference images of the environment
- Single or multiple scanning recordings. The choice of whether to use single or multiple scanning recordings depends on 
the dimensions of the space to be explored (see below for examples)
- An eye tracking recording taken as the participant(s) move freely within the environment
- User-inputted [events](/neon/basic-concepts/events) to segment the recording(s) into [sections](/enrichments/#enrichment-sections) based on 
the areas the person was looking at


1. **Capture Reference Images:** Take pictures of the areas or objects within the environment you wish to investigate. Here are some example pictures of different areas and pieces of furniture in our environment (a living room, dining area, and kitchen):

<div class="image-row">
    <div class="image-column">
        <img src="../media/alpha-lab/desk.jpeg" alt="Desk" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/tv1.jpeg" alt="TV1" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/tv2.jpeg" alt="TV2" class="image">
    </div>
</div>
<div class="image-row">
    <div class="image-column">
        <img src="../media/alpha-lab/table.jpeg" alt="Table" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/kitchen.jpeg" alt="Kitchen" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/cupboard.jpeg" alt="Cupboard" class="image">
    </div>
</div>

<div style="margin-bottom: 50px;"></div>

2. **Record Scanning Videos:** For this guide, we used *five* separate scanning recordings to cover the environment. If you have an even bigger or more complex environment, it might be necessary to use more scanning recordings, which is fine. On the other hand, it might be possible to use just one scanning recording if you can capture sufficient data, or where you have a smaller environment. Remember, each scanning recording must be **under 3 minutes in duration**. 
    
Check out these videos which show how we made the scans (also be sure to follow our [best practices](/enrichments/reference-image-mapper/#scanning-best-practices) for optimal scanning):

::: tip
The Reference Image Mapper prefers feature-rich environments. If you have large plain surfaces, like empty tables or countertops, 
consider placing some strategic items within the environment to increase the chances of successful mapping. 
:::

<div style="display: flex;">
  <div style="flex: 50%; padding: 5px;">
    <div style="position: relative; padding-bottom: 75%; height: 0;">
      <iframe style="position: absolute; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/jeL8gs053lg?si=6wlx4fjxlfiqrbRq"></iframe>
    </div>
  </div>
  <div style="flex: 50%; padding: 5px;">
    <div style="position: relative; padding-bottom: 75%; height: 0;">
      <iframe style="position: absolute; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/zksTzVkGifk?si=3bxl0eKOgRbfoes-"></iframe>
    </div>
  </div>
</div>

<div style="display: flex;">
  <div style="flex: 50%; padding: 5px;">
    <div style="position: relative; padding-bottom: 75%; height: 0;">
      <iframe style="position: absolute; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/Bg_SiFByceY?si=d2koC7-V7bbrYL3h"></iframe>
    </div>
  </div>
  <div style="flex: 50%; padding: 5px;">
    <div style="position: relative; padding-bottom: 75%; height: 0;">
      <iframe style="position: absolute; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/0r8oAn2AZMQ?si=SbSVHedGTJ4Zshfw"></iframe>
    </div>
  </div>
</div>

<div class="iframe-container2">
  <iframe src="https://www.youtube.com/embed/fmy9F8Q9eW0?si=F7q399iZHGW2kArv" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

3. **Eye Tracking Recordings:** Make an eye tracking recording while the participant(s) freely explore and visually interact with various elements within the environment. (You can of course make these prior to the reference images and scanning recordings).

<div style="margin-bottom: 5px;"></div>

4. **Add Custom Events:** During the eye tracking recording, users may focus on specific furniture or parts of the room multiple times. By adding custom [event](/neon/basic-concepts/events) annotations corresponding to these areas or objects, you can create [sections](/enrichments/#enrichment-sections) for the enrichments to be performed. This approach allows you to run each enrichment only on the portion of the recording where a certain object is present. For this guide, we used the following event annotations to run five Reference Image Mapper enrichments:
    - Desk: `desk.begin` and `desk.end`
    - TV area 1: `tv1.begin` and `tv1.end`
    - TV area 2: `tv2.begin` and `tv2.end`
    - Table: `table.begin` and `table.end`
    - Kitchen: `kitchen.begin` and `kitchen.end`
    - Cupboard: `cupboard.begin` and `cupboard.end`

5. **Create and run the enrichments:** You will need to create a separate enrichment for each reference image. A reasonable naming scheme *could* correspond to each area of the environment, like ‘cupboard’, ‘desk’ etc. In the temporal selection of each enrichment, be sure to use the appropriate events labels. E.g. for ‘cupboard’, you would use `cupboard.begin` and `cupboard.end`. Now, run the enrichments to map the subject's gaze from the recording onto the multiple reference images you captured.

## Final results

Once the enrichments are completed, you can view the heatmaps which illustrate areas which attracted more gaze. Additionally, you'll have the option to download gaze and fixation data mapped within the bounds of the pictures, enabling you to conduct further in-depth analyses.

<div class="image-row">
    <div class="image-column">
        <img src="../media/alpha-lab/desk-heatmap.jpeg" alt="Desk" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/tv1-heatmap.jpeg" alt="TV1" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/tv2-heatmap.jpeg" alt="TV2" class="image">
    </div>
</div>
<div class="image-row">
    <div class="image-column">
        <img src="../media/alpha-lab/table-heatmap.jpeg" alt="Table" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/kitchen-heatmap.jpeg" alt="Kitchen" class="image">
    </div>
    <div class="image-column">
        <img src="../media/alpha-lab/cupboard-heatmap.jpeg" alt="Cupboard" class="image">
    </div>
</div>

<div style="margin-bottom: 50px;"></div>

<style scoped>

table, tr, td, th {
    overflow: hidden;
    background: none!important;
    border: none!important;
    table-layout: fixed;
    box-sizing: border-box;
    padding: 5px;
}

img {
    max-width: 100%;
    height: auto;
    box-sizing: border-box;
}

 .iframe-container{
  position: relative;
  width: 100%;
  padding-bottom: 56.1%; 
  height: 0;
  margin-left:auto;
  margin-right:auto;
}
.iframe-container iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}

.iframe-container2{
  position: relative;
  width: 50%;
  height: 50%;
  padding-bottom: 37.5%;
  height: auto;
  margin-left:auto;
  margin-right:auto;
  margin-bottom: 50px;
}

.iframe-container2 iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  
}

.image-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px; /* Add spacing between rows */
}

.image-column {
    flex: 1;
    margin-right: 10px; /* Add spacing between images */
}

/* Style for the images */
.image {
    width: 100%;
    height: auto;
    display: block; /* Remove extra space below images */
}

.video-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
}

.test-container {
  justify-content: center;
  align-items: center;
  height: 100%; /* Adjust the height as needed */
}

.test {
  width: 50%;
  height: 50%;
  position: relative;
}

.test iframe {
  position: absolute;
  width: 80%;
  height: 80%;
}
 
</style>
