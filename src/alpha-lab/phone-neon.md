---
title: Uncover gaze behaviour on phone screens with Neon
description: "Evaluate Neon's accuracy on phone screens"
permalink: /alpha-lab/phone-screens
tags: [Neon, Cloud]
---
# Uncover gaze behaviour on phone screens with Neon


<TagLinks />
<Youtube src="gp5O1uskDME"/>

::: tip
What catches your attention and how do you visually navigate through the interface/page of a mobile app? This guide shows you the tools you can use to address these questions. 
:::

## Gaze behaviour during mobile app engagement
Researchers in fields such as UI/UX and neuromarketing frequently investigate user visual engagement with mobile applications. Wearable eye tracking is sometimes used for this purpose as it can provide valuable insights into user experience during mobile browsing. In this article, we tested the effectiveness of our latest wearable eye tracker, Neon, in capturing and analysing users' viewing behaviour when focusing on small icons and features of mobile applications.

## Overcoming usability challenges with Neon
In the past, wearable eye tracking faced challenges in usability primarily due to calibration limitations, which may have made mobile browsing measurements difficult and time-consuming in practice. However, we believe that Neon overcomes these obstacles by offering calibration-free gaze estimation with very good accuracy. For this reason, we wanted to test Neon’s performance for tracking gaze during mobile browsing.

## Leveraging Pupil Cloud and Alpha Lab Tutorials to explore user gaze dynamics
In order to assess how Neon characterises viewing behaviour on mobile phones, we first needed to make some eye tracking recordings whilst a user was engaging with a phone. We then leveraged Pupil Cloud and Alpha Lab tutorials to interpret the data and compute further metrics. 

Firstly, we placed the phone in a static position on a desk, allowing us to interact with the app. 

Then, we used Pupil Cloud's [Reference Image Mapper](/enrichments/reference-image-mapper/) to map gaze onto a 2D reference image of the environment that contained our test phone, like in the videos and snapshots you will see next. 

Subsequently, we exported the data to analyse offline for in-depth exploration. For the offline analysis, we used existing Alpha Lab tutorials that allowed us to [generate scanpaths](/alpha-lab/scanpath-rim/), [define areas of interest (AOIs) and calculate gaze metrics](/alpha-lab/gaze-metrics-in-aois/), and [map gaze onto dynamic content](/alpha-lab/map-your-gaze-to-a-2d-screen/). 

The following section presents the results of our analyses, each accompanied by a brief description for clarity.

### Heatmaps and scanpaths
Two valuable visualisations for understanding gaze behaviour on mobile screens are heatmaps and scanpaths (illustrated in the left and right panels below). 

Heatmaps visually represent the app areas that receive the most attention, with warmer colours denoting higher fixation rates. These heatmaps can be easily generated within Pupil Cloud using the Reference Image Mapper.

Meanwhile, scanpaths depict the sequence of eye movements and fixations during visual exploration. The circle size in the scanpath corresponds to fixation duration; larger circles indicate longer user focus on specific screen areas. For those interested in generating these visualisations, our [scanpath tutorial](/alpha-lab/scanpath-rim/) provides a step-by-step guide.

<div class="mcontainer">
  <div class="col-mcontainer">
      <v-img class="rounded" :src="require(`../media/alpha-lab/1.phone-heatmap.jpeg`)" title="Saliency map over a phone screen" alt="Saliency map over a phone screen" cover/>
    </div>
  <div class="col-mcontainer">
      <v-img class="rounded" :src="require(`../media/alpha-lab/2.phone-nadia_scanpath.jpeg`)" title="Scanpath over a phone screen" alt="Scanpath over a phone screen" cover/>
  </div>
</div>

### Calculation of gaze metrics on AOIs
Examining eye tracking data provides valuable insights into user behaviour, but relying solely on visualisations like heatmaps and scanpaths might not always reveal the complete picture. To gain a more comprehensive understanding, we conducted a quantitative analysis of our data. This involved calculating gaze metrics such as [dwell time](/alpha-lab/gaze-metrics-in-aois/#dwell-time) and [time to first contact](/alpha-lab/gaze-metrics-in-aois/#time-to-first-contact). These metrics offer tangible and quantitative outcomes about the salience of each AOI. 

Dwell time signifies the total duration of fixation on a specific AOI, serving as an indicator of attentional allocation. Longer dwell times suggest prolonged focus on an AOI. On the other hand, the time to first contact measures how quickly an AOI captures a user's attention, indicating its prominence.

For a detailed explanation and visual representation of these metrics, you can refer to our [AOI tutorial](/alpha-lab/gaze-metrics-in-aois/), which provides step-by-step instructions and charts for your analysis.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/3.phone-dwell-time.png`)" title="Graph showing dwell time on defined AOIs over the phone screen" alt="Graph showing dwell time on defined AOIs over the phone screen" cover/>
  </v-img>
</div>

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/4.phone-first-contact.png`)" title="Graph showing time to first contact on defined AOIs over the phone screen" alt="Graph showing time to first contact on defined AOIs over the phone screen" cover/>
  </v-img>
</div>


### Map your gaze onto dynamic phone screen content
Until now, the tools that we have used have been limited to mapping gaze onto static images. However, the dynamic realm of mobile phones makes it important to study gaze behaviour in a more natural context, particularly during scrolling. We, therefore, used the [dynamic screen mapping tutorial](/alpha-lab/map-your-gaze-to-a-2d-screen/) for this purpose. This approach will provide a comprehensive understanding of gaze behaviour in dynamic interfaces.

Upon reviewing the recording, Neon demonstrates good accuracy in capturing gaze behaviour, offering a comprehensive high-level overview of the wearer's focal points.

While visualisations are valuable, a very useful facet of this tool is its ability to generate a CSV file containing gaze data mapped onto the screen, represented in 2D x, y coordinates. This feature opens avenues for extensive customisation and in-depth analysis.

<Youtube src="RKrf3YQjzao"/>

## Let's wrap it up!

Overall, we were impressed by Neon's capability to effectively characterise viewing behaviour on mobile apps, both in controlled environments and real-world scenarios, especially considering its calibration-free nature. The techniques outlined in this tutorial are not confined to our specific application; they hold significant value for various UI/UX and neuromarketing research endeavours. By integrating Neon with the methodologies discussed here, researchers can acquire invaluable insights into user engagement.

Curious about how Neon can fit into your work? Need assistance in implementing your own analysis pipelines? Reach out to us [by email](mailto:info@pupil-labs.com) or visit our [Support Page](https://pupil-labs.com/products/support/)! 

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