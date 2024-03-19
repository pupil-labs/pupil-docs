---
title: "Automate AOI Masking in the Cloud"
description: "Discover how to get the most from our AOI tool by automatically segmenting and drawing masks using natural language."
permalink: /alpha-lab/gaze-metrics-in-aois/
meta:
  - name: twitter:card
    content: player
  - name: twitter:image
    content: "https://i.ytimg.com/vi/UgB0fk5fgpE/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/UgB0fk5fgpE"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/UgB0fk5fgpE/maxresdefault.jpg"
tags: [Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Automate AOI Masking in the Cloud

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="UgB0fk5fgpE"/>

::: tip
Are you tired of manually drawing masks? Give your wrist a break and effortlessly automate segmenting the areas of interest in the Cloud.
:::

## AOI Mask Drawing

Pupil Cloud's new [Areas Of Interest tool](https://docs.pupil-labs.com/neon/pupil-cloud/visualizations/areas-of-interest/) allows you to collide information about the number, average duration or total time an object has been fixated and gain insights about participant engagement with specific objects.

Traditionally, after employing the [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) or [Marker Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/marker-mapper/), the process of drawing AOI masks remained manual. This manual drawing, essential for data analysis, poses challenges in terms of time and precision, especially with numerous or complex objects in the image.

In this article, we introduce a way to automate your mask creation, streamlining the workflow and improving accuracy in defining areas for analysis.

## What Tools Enable This?

Recent developments in AI have made automating such image segmentation easier. Not only are new models fast and accurate at masking different objects, but now, you can also prompt them using natural language.

So you can simply type _“bottle,”_ and you will get a mask for every bottle in the image, or you can type _“flag . car”_ and get these complex shapes automatically segmented. Today, we bring you the power of [Grounded Segment Anything](https://arc.net/l/quote/okiwpscx), which, combined with our [Cloud API](https://api.cloud.pupil-labs.com/v2), allows you to get metrics over finely segmented objects.

## Steps

To utilise this tool, you will need:

1. A successful **Reference Image Mapper** or **Marker Mapper** enrichment and the corresponding reference image.
2. You will also need a **developer token** from Cloud. Simply click on the upper right profile picture to go to the Profile Settings and be able to generate a token.

Then, follow these steps:

1. Access our **[Google Colab Notebook](https://colab.research.google.com/drive/1SJQS6-P56wpDxJTNfZeuzwZADKK9h6ri?usp=sharing)** and carefully follow the instructions.

<div class="mb-4" style="display:flex;justify-content:center;">
 <a
  href="https://colab.research.google.com/drive/1SJQS6-P56wpDxJTNfZeuzwZADKK9h6ri?usp=sharing"
>
  <img
    src="https://img.shields.io/static/v1?label=&message=Open in Google Colab&color=blue&labelColor=grey&logo=Google Colab&logoColor=#F9AB00"
    alt="Open in Google Colab"
  />
</a>
</div>

2. Upload your reference image, type the objects, you would like to segment, separated by a dot (e.g. car . flag) and press on the segment button.
3. After previewing the results, you can write your enrichment URL and your token, then click on submit to Cloud.

## Results

Upon completing the automated AOI mask creation process, you'll achieve pixel-perfect masks for your enrichments. These precision-crafted masks are then ready for use in Cloud. See below some examples:

![An AOI heatmap showing time to first fixation over 150 bottles in a supermarket.](./bottles.webp)
![Perfectly segmented Areas Of Interest over cars and a flag.](./cars.webp)

## Running Locally

You can also run everything on your local machine. We have made a Docker container and Python package bundle with a web interface to make it easier to interact with. Detailed instructions on running locally can be found in the Github repository.

::: tip
Need assistance implementing your automatic segmentation in your application? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
