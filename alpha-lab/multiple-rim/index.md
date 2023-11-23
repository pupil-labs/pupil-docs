---
description: A living space - working with multiple reference images
tags: [Pupil Invisible, Neon, Cloud]
refImages:
  [
    { url: "./desk.webp", alt: "Desk" },
    { url: "./tv1.webp", alt: "TV1" },
    { url: "./tv2.webp", alt: "TV2" },
    { url: "./table.webp", alt: "Table" },
    { url: "./kitchen.webp", alt: "Kitchen" },
    { url: "./cupboard.webp", alt: "Cupboard" },
  ]
refHeatmapImages:
  [
    { url: "./desk-heatmap.webp", alt: "Desk heatmap" },
    { url: "./tv1-heatmap.webp", alt: "TV1 heatmap" },
    { url: "./tv2-heatmap.webp", alt: "TV2 heatmap" },
    { url: "./table-heatmap.webp", alt: "Table heatmap" },
    { url: "./kitchen-heatmap.webp", alt: "Kitchen heatmap" },
    { url: "./cupboard-heatmap.webp", alt: "Cupboard heatmap" },
  ]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
import ImageGrid from '@components/ImageGrid.vue'
</script>

# Map and visualize gaze on multiple reference images taken from the same environment

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="CLNDE0VJVng" />

::: tip
Level-up your Reference Image Mapper workflow to extract insights from participants freely exploring their environment!
:::

## Exploring gaze patterns in multiple regions of an environment

Understanding where people focus their gaze while exploring their environment is a topic of interest for researchers in
diverse fields, ranging from Art and Architecture to Zoology. The [Reference Image Mapper](https://docs.pupil-labs.com/pupil-cloud/enrichments/reference-image-mapper/)
enrichment in Pupil Cloud makes it possible to map gaze onto 3D real-world environments and generate heatmaps. These provide
an informative overview of visual exploration patterns and also pave the way for further analysis, such as region of interest analysis.

In this guide, we will demonstrate how to use the [Reference Image Mapper](https://docs.pupil-labs.com/pupil-cloud/enrichments/reference-image-mapper/) to map a
participant's gaze onto various regions of a living environment as they freely navigate through it.

::: tip
Before continuing, ensure you are familiar with the [Reference Image Mapper](https://docs.pupil-labs.com/pupil-cloud/enrichments/reference-image-mapper/) enrichment.
Check out [this explainer video](https://www.youtube.com/watch?v=ygqzQEzUIS4&t=56s) for reference.
:::

## The tools at hand

The [Reference Image Mapper](https://docs.pupil-labs.com/pupil-cloud/enrichments/reference-image-mapper/) enables mapping of gaze onto a
_single_ reference image of an environment. However, there is often a need to analyze _multiple_ regions for a more in-depth
understanding of visual exploration. This guide demonstrates how to accomplish this by applying the enrichment multiple
times during the same recording to generate mappings and heatmaps for different regions.

## Steps

For the analysis, we will need the following:

- Multiple reference images of the environment
- Single or multiple scanning recordings. The choice of whether to use single or multiple scanning recordings depends on
  the dimensions of the space to be explored (see below for examples)
- An eye tracking recording taken as the participant(s) move freely within the environment
- User-inputted [events](https://docs.pupil-labs.com/neon/general/events/) to segment the recording(s) into [sections](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/#enrichment-sections) based on
  the areas the person was looking at

1. **Capture Reference Images:** Take pictures of the areas or objects within the environment you wish to investigate. Here are some example pictures of different areas and pieces of furniture in our environment (a living room, dining area, and kitchen):

<ImageGrid cols="3" :images="$frontmatter.refImages" />

<div style="margin-bottom: 50px;"></div>

2. **Record Scanning Videos:** For this guide, we used _five_ separate scanning recordings to cover the environment. If you have a bigger or more complex environment, it might be necessary to use more. On the other hand, it might be possible to use fewer if you have a smaller environment or if you can capture sufficient data. Remember, each scanning recording must be **under 3 minutes in duration**.

Check out these videos which show how we made the scans (also be sure to follow our [best practices](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/#scanning-best-practices) for optimal scanning):

::: tip
The Reference Image Mapper prefers feature-rich environments. If you have large plain surfaces, like empty tables or countertops,
consider placing some strategic items within the environment to increase the chances of successful mapping.
:::

<div class="grid grid-cols-2 gap-4">
  <div>
    <iframe
      class="w-full aspect-[4/3]" 
      src="https://www.youtube.com/embed/jeL8gs053lg?si=6wlx4fjxlfiqrbRq" frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div>
    <iframe
      class="w-full aspect-[4/3]"
      src="https://www.youtube.com/embed/zksTzVkGifk?si=3bxl0eKOgRbfoes-" frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div>
    <iframe
      class="w-full aspect-[4/3]"
      src="https://www.youtube.com/embed/Bg_SiFByceY?si=d2koC7-V7bbrYL3h" frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div>
    <iframe
      class="w-full aspect-[4/3]"
      src="https://www.youtube.com/embed/0r8oAn2AZMQ?si=SbSVHedGTJ4Zshfw" frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div>
    <iframe
      class="w-full aspect-[4/3]"
      src="https://www.youtube.com/embed/fmy9F8Q9eW0?si=F7q399iZHGW2kArv" frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</div>

3. **Eye Tracking Recordings:** Make an eye tracking recording while the participant(s) freely explore and visually interact with various elements within the environment. (You can of course make these prior to the reference images and scanning recordings).

<div style="margin-bottom: 5px;"></div>

4. **Add Custom Events:** During the eye tracking recording, users may focus on a specific region once or multiple times. I.e. they may revisit that region. By adding custom [event](https://docs.pupil-labs.com/neon/general/events/) annotations corresponding to these periods, you can create [sections](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/#enrichment-sections) for the enrichments to be computed. This enables you to run each enrichment only on the section(s) of recording where a certain region is being gazed at. For this guide, we used the following event annotations to run five Reference Image Mapper enrichments:

   - Desk: `desk.begin` and `desk.end`
   - TV area 1: `tv1.begin` and `tv1.end`
   - TV area 2: `tv2.begin` and `tv2.end`
   - Table: `table.begin` and `table.end`
   - Kitchen: `kitchen.begin` and `kitchen.end`
   - Cupboard: `cupboard.begin` and `cupboard.end`

5. **Create and run the enrichments:** You will need to create a separate enrichment for each reference image. A reasonable naming scheme _could_ correspond to each area of the environment, like ‘cupboard’, ‘desk’ etc. In the temporal selection of each enrichment, be sure to use the appropriate events labels. E.g. for ‘cupboard’, you would use `cupboard.begin` and `cupboard.end`. Now, run the enrichments to map the subject's gaze from the recording onto the multiple reference images you captured.

## Final results

Once the enrichments are completed, you can view the heatmaps which illustrate areas which attracted more gaze. Additionally, you'll have the option to download gaze and fixation data mapped within the bounds of the pictures, enabling you to conduct further in-depth analyses.

<ImageGrid cols="3" :images="$frontmatter.refHeatmapImages" />
