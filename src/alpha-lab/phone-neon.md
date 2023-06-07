---
title: Uncover gaze behaviour on phone screens with Neon
description: "Evaluate Neon's accuracy on phone screens"
permalink: /alpha-lab/phone-screens
tags: [Neon, Cloud]
---
# Uncover gaze behaviour on phone screens with Neon


<TagLinks />
<Youtube src="gp5O1uskDME"/>


Have you ever wondered what your eyes focus on when scrolling through your favourite app? 

In this article, we test whether Neon, our latest eye tracker, can accurately capture and characterise viewing behaviour 
while gazing at small icons on mobile applications. To achieve this, we used some of Alpha Lab's existing tutorials, including
how to generate scanpaths, define areas of interest (AOIs) and calculate outcome metrics, and map gaze onto dynamic content.

Shall we start?

## What you'll need
Below you can find the tools we used for this project. Using these, you can replicate the content of this article with 
your own applications.

### Cloud enrichment
- [Reference Image Mapper](/enrichments/reference-image-mapper/)

### Alpha Lab tutorials
- [How to generate scanpaths](/alpha-lab/scanpath-rim/)
- [How to define areas of interest (AOIs) and calculate basic metrics](/alpha-lab/gaze-metrics-in-aois/)
- [How to map and visualise gaze onto dynamic screen content](/alpha-lab/map-your-gaze-to-a-2d-screen/)

### How we used them
We first used the Reference Image Mapper enrichment to create a 3D model of a phone positioned on a desk and subsequently to map gaze onto a 2D image of the phone-on-desk. Then we used Alpha Lab tutorials to process the exported results, generate advanced visualisations, and compute outcome metrics.

:::tip
:bulb: 
When preparing the Reference Image Mapper Enrichment, make sure your phone is stable on a phone mount or stand. The 
scanning video needed for this tool requires relatively static features in the environment. If there is a lot of movement 
or the objects change in appearance or shape, the mapping can fail. More on this [in the docs](/enrichments/reference-image-mapper#setup/)! 
:::

## Gaze behaviour on mobile apps: Insights from Neon
### Heatmaps and scanpaths
What catches your attention and how do you visually navigate through the interface/page of a mobile app?

Two visualisations that help to illustrate these patterns are heatmaps and scanpaths (left and right panel below). Heatmaps show the areas of the app that receive the most attention, with warmer colours indicating more fixations, and can be generated natively in Pupil Cloud. Meanwhile, scanpaths trace the path of the eye movements, showing the sequence of fixations and eye movements that occur during the visual exploration. The circle size of the scanpath below reflects fixation duration: The bigger the circle, the longer the user fixated on this area of the screen. Use the scanpath tutorial linked above to generate this visualisation.

<div class="mcontainer">
  <div class="col-mcontainer">
      <v-img class="rounded" :src="require(`../media/alpha-lab/1.phone-heatmap.jpeg`)" title="Saliency map over a phone screen" alt="Saliency map over a phone screen" cover/>
    </div>
  <div class="col-mcontainer">
      <v-img class="rounded" :src="require(`../media/alpha-lab/2.phone-nadia_scanpath.jpeg`)" title="Scanpath over a phone screen" alt="Scanpath over a phone screen" cover/>
  </div>
</div>

### Calculation of gaze metrics on AOIs

Analysing eye tracking data can provide valuable insights into user behaviour, but simply looking at visualisations like 
heatmaps and scanpaths may not always reveal the full story. This is why we opted for a quantitative analysis of our data 
as well by calculating gaze metrics, such as [dwell time](/alpha-lab/gaze-metrics-in-aois/#dwell-time) and
[time to first contact](/alpha-lab/gaze-metrics-in-aois/#time-to-first-contact). These metrics offer tangible and 
quantitative outcomes about the salience of each AOI: Longer dwell time implies longer total fixation on a specific AOI 
and could be considered as a proxy of attentional allocation. Conversely, the shorter the time to first contact, the faster 
this AOI captured the user's attention, pointing to increased salience of this area. Follow along with the AOI tutorial
for these calculations and charts!

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/3.phone-dwell-time.png`)" title="Graph showing dwell time on defined AOIs over the phone screen" alt="Graph showing dwell time on defined AOIs over the phone screen" cover/>
  </v-img>
</div>

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/4.phone-first-contact.png`)" title="Graph showing time to first contact on defined AOIs over the phone screen" alt="Graph showing time to first contact on defined AOIs over the phone screen" cover/>
  </v-img>
</div>


### Map your gaze onto dynamic phone screen content
So far, we've only scratched the surface by examining static images. Now, it's time to dive into the dynamic world of 
our smartphones and explore gaze behaviour more naturally while scrolling. Use the dynamic screen mapping tutorial for this one!

Checking out the recording, Neon's accuracy richly captures gaze behaviour and provides a nice high-level overview of 
what the wearer was looking at. 

Visualisations are great, but the real power of this tool is that it generates a CSV file containing gaze data mapped 
onto the screen, in 2D x, y coordinates. This offers many possibilities for further customisation and in-depth analysis. 

<Youtube src="RKrf3YQjzao"/>

## In the wild

That's all fine, but what does it look like to interact with phone screens when out and about? Consider this scenario: 
Imagine searching for products on your mobile app while looking at the physical products on a supermarket shelf. We 
brought Neon into the wild to assess its performance beyond controlled environments. See an example of real-world user 
behaviour below!
 
<Youtube src="enkOC7_wf0U"/>

## Let's wrap it up!

This article has unveiled the remarkable capability of Neon's calibration-free eye tracking to capture 
viewing behaviour during mobile app interactions - both inside and out and about. This tutorial, and its outcomes, 
are not limited to our specific use case and could be particularly useful for other types of UI/UX research. By combining 
Neon with the techniques we've highlighted here, you can gain invaluable insights into user engagement. 

Curious about how Neon can fit into your work? Need assistance in implementing your own analysis pipelines? Reach out to 
us [by email](mailto:info@pupil-labs.com) or visit our [Support Page](https://pupil-labs.com/products/support/)! 

<style scoped>
.mcontainer{
  display: flex;
  flex-wrap: wrap;
}
.col-mcontainer{
  flex: 50%;
  padding: 0 4px;
}
@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .col-mcontainer{
    flex: 100%;
  }
}
@media screen and (max-width: 800px) {
    .col-mcontainer{
    flex: 50%;
  }
}
@media screen and (max-width: 400px) {
  .col-mcontainer{
    flex: 100%;
  }
}
</style>