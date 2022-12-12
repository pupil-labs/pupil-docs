---
description: A living space - working with multiple reference images
permalink: /alpha-lab/multiple-rim/
tags: [Pupil Invisible, Cloud]
---

# Map and visualize gaze onto multiple reference images taken from the same environment

<TagLinks />

<div class="iframe-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dYcN0HVirDA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br>

In the [Reference Image Mapper](/invisible/enrichments/reference-image-mapper/) guide, we learnt how to properly set up a Reference Image Mapper enrichment, with a <i>single</i> reference image. However, there are some cases in which it would be useful to map gaze onto <i>multiple</i> reference images taken from the same environment - for example, moving in a room while interacting with certain parts of it.

::: tip
Before continuing, ensure you are familiar with the [Reference Image Mapper](/invisible/enrichments/#reference-image-mapper) enrichment. Check out [this explainer video](https://www.youtube.com/watch?v=ygqzQEzUIS4&t=56s) for reference.
:::

## Reference Images

First, we will take pictures of the areas and/or furniture of the room we are interested in.

| <img src="../media/alpha-lab/cupboard-img.png"/>       | <img src="../media/alpha-lab/desk-img.png"/> |
| ------------------------------------------------------ | -------------------------------------------- |
| <img src="../media/alpha-lab/kitchen-imgs.png"/>       | <img src="../media/alpha-lab/tv-img.png">    |
| <img src="../media/alpha-lab/kitchen+table-img.jpeg"/> |                                              |

## Scanning recordings

In this guide, we want to map gaze onto different parts of a living room, for this reason, we recorded **two** scanning videos. We chose to use more than one scanning recording because the environment is a bit too big to be effectively scanned just by a single one.

Based on the environment dimension/complexity, you might need to do the same and record separate scanning videos.

Please follow our [best practices](https://docs.pupil-labs.com/invisible/enrichments/reference-image-mapper/#scanning-best-practices) for optimal scanning.

::: tip
To ensure good scanning of big plain surfaces - like tables and kitchen countertops - enrich them with features. Use a printed tablecloth and/or place items to produce a successful mapping!
:::

<div class="iframe-container2">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/FQ2SdFcnqXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<div class="iframe-container2">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/aEOZZrUrEpE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

::: danger
**Scanning Recording Duration**
<br>
<br>
Please record a scanning video that is less than 3 minutes long!
<br>
<br>
The Reference Image Mapper enrichment does **not** accept longer recordings.
:::

## Run the enrichments

Here we recorded just one video where the wearer was asked to walk and freely explore the living room. Now it is time to map the subject's gaze from this video into the five pictures above.

<div class="iframe-container3">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XTIkB8Wct6M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

During the recording, the user looked at the same furniture and parts of the room multiple times. We suggest you focus on
specific [sections](/invisible/enrichments/#enrichment-sections) of the recording based on which part of the
room the user is exploring.

For this recording, we used the following [event annotations](/invisible/basic-concepts/events) to run five Reference Image Mapper enrichments:

- Cupboard: `cupboard.begin` and `cupboard.end`
- Desk: `desk.begin` and `desk.end`
- Kitchen: `kitchen.begin` and `kitchen.end`
- TV: `tv.begin` and `tv.end`
- Table: `table.begin` and `table.end`

## Final results

It may take several minutes to run these enrichments depending on how long your recordings are. Once everything is finished, you can visualize how gaze is simultaneously mapped both on the recording and the reference images from the Project Editor view (as shown in the video at the very beginning of this guide).

From the Enrichment view, you can visualize heatmaps of each reference image:

| <img src="../media/alpha-lab/cupboard-img.png"/>       | <img src="../media/alpha-lab/cupboard-overlay.png"/>      |
| ------------------------------------------------------ | --------------------------------------------------------- |
| <img src="../media/alpha-lab/desk-img.png"/>           | <img src="../media/alpha-lab/desk-overlay.png"/>          |
| <img src="../media/alpha-lab/kitchen-imgs.png"/>       | <img src="../media/alpha-lab/kitchen-overlay.png"/>       |
| <img src="../media/alpha-lab/kitchen+table-img.jpeg"/> | <img src="../media/alpha-lab/kitchen+table-overlay.png"/> |
| <img src="../media/alpha-lab/tv-img.png"/>             | <img src="../media/alpha-lab/tv-overlay.png"/>            |

That's it. We look forward to seeing your own mapped environments!

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
    border-radius: 10px;
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
  width: 80%;
  padding-bottom: 80%;
  margin-bottom: 50px;
  height: 0;
  margin-left:auto;
  margin-right:auto;
}

.iframe-container2 iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}

.iframe-container3{
  position: relative;
  width: 80%;
  padding-bottom: 80%;
  margin-bottom: 50px;
  height: 0;
  margin-left:auto;
  margin-right:auto;
}

.iframe-container3 iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  
}
 
</style>
