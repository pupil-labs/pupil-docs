---
title: Uncovering gaze behavior on phone screens with Neon
description: "Evaluating Neon's accuracy on phone screens"
permalink: /alpha-lab/phone-screens
tags: [Neon, Cloud]
---
# Uncovering gaze behavior on phone screens with Neon


<TagLinks />
<Youtube src="-Cb8gYPmpUs"/>

:::tip 
Have you ever wondered what your eyes focus on when you scroll through your favorite mobile radio app? 
:::

**Introducing Neon!**

We tested whether Neon, our latest eye-tracker, would accurately capture gaze behaviour while scanning small icons on mobile applications. 

We also go further by using some of Alpha Lab's existing tutorials to evaluate Neon's performance and characterise gaze behaviour while scrolling a mobile app - including how to define areas of interest (AOIs) and calculate basic metrics, map gaze onto dynamic content, and generate scanpaths. Shall we start?

## What you'll need
Below you can find the tools we used for this project. Using these tools, you can replicate the content of this article with your own applications: 

- Reference Image Mapper enrichment: [Read more about that here](../enrichments/reference-image-mapper/)
- Tutorial on defining areas of interest (AOIs) and calculating basic metrics: [here](../gaze-metrics-in-aois/)
- Tutorial on generating scanpaths: [here](../scanpath-rim/)
- Tutorial on mapping and visualizing gaze onto dynamic screen content: [here](../map-your-gaze-to-a-2d-screen/)

:::tip
:bulb: Make sure your phone is stable on a phone mount or stand. The techniques used here rely on the Reference Image Mapper enrichment. The scanning video needed for this tool requires relatively static features in the environment. If there is a lot of movement or the objects change in appearance or shape, the mapping can fail.
:::

## Gaze behaviour on mobile apps: Insights from Neon

### Heatmaps and scanpaths
What catches your attention and how do you navigate through the interface of a mobile app? 

Two visualizations that help to illustrate these patterns are heatmaps and scanpaths (left and right panel below). Heatmaps show the areas of the app that receive the most attention, with warmer colors indicating more fixations. Meanwhile, scanpaths trace the path of the eye movements, showing the sequence of fixations and eye movements that occur during the visual exploration. The circle cize of the scanpath below shows fixation duration: The bigger the circle, the longer the user glanced at this area of the screen. 


<style scoped>
  img {
    display: block;
    margin: 0;
    padding: 0;
    max-width: 100%;
  }
    figcaption {
    font-style: italic;
    margin-left: 10px;
  }
</style>

<table>
  <tr>
    <td style="width:50%;">
      <figure>
        <img src="https://i.imgur.com/fWJolUl.jpg" alt="Image 1">
        <figcaption></figcaption>
      </figure>
    </td>
    <td style="width:50%;">
      <figure>
        <img src="https://hackmd.io/_uploads/B1GjDU9Vn.jpg" alt="Image 2">
        <figcaption></figcaption>
      </figure>
    </td>
  </tr>
</table>

### Calculation of gaze metrics on AOIs

Analyzing eye-tracking data can provide valuable insights into user behavior, but simply looking at visualizations like heatmaps and scanpaths may not always reveal the full story. This is why we opted for a quantitative analysis of our data as well by calculating gaze metrics, such as [dwell time](../gaze-metrics-in-aois/#dwell-time) and [time to first contact](../gaze-metrics-in-aois/#time-to-first-contact). These metrics offer tangible and quantitative outcomes about the salience of each AOI: Longer dwell time implies longer total fixation on a specific AOI and could be considered as a proxy of attentional allocation. Conversely, the shorter the time to first contact, the faster this AOI captured the user's attention, pointing to increased salience of this area.


<style scoped>
  img {
    display: block;
    margin: 0;
    padding: 0;
    max-width: 100%;
  }
    figcaption {
    font-style: italic;
    margin-left: 10px;
  }
</style>

<table>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/HDLB54v.png
" alt="Image 1">
        <figcaption></figcaption>
      </figure>
    </td>
  </tr>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/7fUFFzD.png
" alt="Image 2">
        <figcaption></figcaption>
      </figure>
    </td>
  </tr>
</table>


### Map your gaze onto your phone's content
So far, we've only scratched the surface by examining static images. Now, it's time to dive into the dynamic world of our smartphones and explore gaze behavior in its natural habitat. 

One tool that's helping us do just that is our [tutorial](../map-your-gaze-to-a-2d-screen/) on how to map and visualize gaze onto a screen with dynamic content. Neon's accuracy ensures that even the minutest details aren't overlooked, as shown in the video below. But the benefits don't stop at visualizations alone. The tool also generates a CSV file containing mapped gaze data onto the screen, offering a world of possibilities for further customization and in-depth analysis. 

<Youtube src="TsZmf49GdgI"/>

## In the wild

That's all fine, but how does it look like to interact with phone screens in the real-world? Consider this scenario: Imagine searching for products on your mobile app while looking at the physical products on a supermarket shelf. We brought Neon into the wild to assess its performance beyond controlled environments. See an example of real-world user behavior below!
 
<Youtube src="QIaFGpzsRmI"/>

## Let's wrap it up!

In a nutshell, this project has unveiled the remarkable accuracy of Neon in tracking eye movements during mobile app scrolling. The findings are not limited to our specific use case and could be particularly useful for UX research. By combining Neon with the techniques we've highlighted here, you can gain invaluable insights into user engagement with apps. Curious about how Neon can fit into your work? Reach out! 