---
title: Uncover gaze behaviour on phone screens with Neon
description: "Evaluate Neon's accuracy on phone screens"
permalink: /alpha-lab/phone-neon
meta:
  - name: twitter:card
    content: player
  - name: twitter:image
    content: "https://i.ytimg.com/vi/gp5O1uskDME/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/gp5O1uskDME"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/gp5O1uskDME/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Uncover gaze behaviour on phone screens with Neon

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="gp5O1uskDME"/>

What catches your attention and how do you visually navigate through the interface/page of a mobile app? This article shows you the tools you can use to address these questions. 

## Gaze behaviour during mobile app engagement

Researchers in fields such as UI/UX and neuromarketing frequently investigate user visual engagement with mobile applications. Wearable eye tracking is sometimes used for this purpose as it can provide valuable insights into user experience during mobile browsing. In this article, we used our latest wearable eye tracker, Neon, to capture and analyse users' viewing behaviour when focusing on small icons and features of mobile applications.

## Overcoming usability challenges with Neon

In the past, wearable eye tracking faced challenges in usability primarily due to calibration limitations, which may have made mobile browsing measurements difficult and/or time-consuming in practice. However, we believe that Neon overcomes these obstacles by offering calibration-free gaze estimation with very good accuracy. For this reason, we wanted to try out Neon when tracking gaze during mobile browsing, and put together an article so you can replicate what we did.

## Leveraging Pupil Cloud and Alpha Lab Tutorials to explore user gaze dynamics

In order to characterise viewing behaviour on mobile phones using Neon, we first needed to make some eye tracking recordings whilst a user was engaging with a phone. We then leveraged Pupil Cloud and Alpha Lab tutorials to interpret the data and compute further metrics.

Firstly, we placed the phone in a static position on a desk, allowing us to interact with the app.

Then, we used Pupil Cloud's [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) to map gaze onto a 2D reference image of the environment that contained our test phone, like in the videos and snapshots.

Subsequently, we exported the data to analyse offline for a more in-depth exploration. For the offline analysis, we used existing Alpha Lab tutorials that allowed us to [generate scanpaths](/scanpath-rim/), [define areas of interest (AOIs) and calculate gaze metrics](/gaze-metrics-in-aois/), and [map gaze onto dynamic content](/map-your-gaze-to-a-2d-screen/).

The following section presents the results of our analyses, each accompanied by a brief description for clarity.

### Heatmaps and scanpaths

<div style="margin-top: 20px;"></div>

<div class="grid grid-cols-2 gap-4">
    <div class="image-column">
        <img src="./1.phone-heatmap.jpeg" alt="Saliency map over a phone screen" class="image">
    </div>
    <div class="image-column">
        <img src="./2.phone-nadia_scanpath.jpeg" alt="Scanpath over a phone screen" class="image">
    </div>
</div>

<div style="margin-bottom: 20px;"></div>

Two valuable visualisations for understanding gaze behaviour on mobile screens are heatmaps and scanpaths (left and right images, respectively).

Heatmaps visually represent the app areas that receive the most attention, with warmer colours denoting higher fixation rates. These heatmaps can be easily generated within Pupil Cloud using the Reference Image Mapper.

Meanwhile, scanpaths depict the sequence of eye movements and fixations during visual exploration. The circle size in the scanpath corresponds to fixation duration; larger circles indicate longer user focus on specific screen areas. In the example provided, the focus was primarily on the top panel of the app, as indicated by the largest fixation circle among the three fixations used to generate this scanpath. For those interested in generating this visualisation, our [scanpath tutorial](/scanpath-rim/) provides a step-by-step guide.

### Calculation of gaze metrics on AOIs

![Graph showing dwell time on defined AOIs over the phone screen](./3.phone-dwell-time.png)

![Graph showing time to first contact on defined AOIs over the phone screen](./4.phone-first-contact.png)

Examining eye tracking data provides valuable insights into user behaviour, but relying solely on visualisations like heatmaps and scanpaths might not always reveal the complete picture. To gain a more comprehensive understanding, we conducted a quantitative analysis of our data. This involved calculating gaze metrics such as dwell time and time to first contact. These metrics offer tangible and quantitative outcomes about the salience of each AOI.

Dwell time signifies the total duration of fixation on a specific AOI, serving as an indicator of attentional allocation. Longer dwell times suggest prolonged focus on an AOI. On the other hand, the time to first contact measures how quickly an AOI captures a user's attention, indicating its prominence. 

As shown in this example, there are clear differences between the areas of interest in both attentional allocation and salience that became evident thanks to the quantitative analysis that focused on the measures mentioned earlier. In line with the heatmap and scanpath visualizations, it is evident that dwell time is higher in AOI-1 compared to the other two areas of interest. Additionally, the time to first contact metric revealed that users directed their attention more swiftly towards AOI-0.

For a detailed explanation and visual representation of these metrics, you can refer to our [AOI tutorial](/gaze-metrics-in-aois/), which provides step-by-step instructions and charts for your analysis.

### Map your gaze onto dynamic phone screen content

<Youtube src="RKrf3YQjzao"/>

Until now, the tools that we have used have been limited to mapping gaze onto static images. However, the dynamic realm of mobile phones makes it important to study gaze behaviour in a more natural context, particularly during scrolling. We, therefore, used the [dynamic screen mapping tutorial](/map-your-gaze-to-a-2d-screen/) for this purpose. This approach provided a more comprehensive understanding of gaze behaviour in dynamic interfaces.

Upon reviewing the recording, Neon demonstrated good accuracy in capturing gaze behaviour, offering a useful high-level overview of the wearer's focal points.

Another very useful facet of this tool is its ability to generate a CSV file containing gaze data mapped onto the screen, represented in 2D x, y coordinates. This feature opens avenues for extensive customisation and more in-depth analysis, which we don’t cover here.

## Let's wrap it up!

Overall, we were impressed by Neon's capability to effectively characterise viewing behaviour on mobile apps, especially considering its calibration-free nature. The techniques outlined in this tutorial are not confined to our specific application; they hold significant value for various UI/UX and neuromarketing research endeavours. By integrating Neon with the methodologies discussed here, researchers can acquire invaluable insights into user engagement.

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
