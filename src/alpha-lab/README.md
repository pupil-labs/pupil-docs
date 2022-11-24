---
description: Welcome to Alpha Lab!yar
permalink: /alpha-lab/
---

# Welcome to Alpha Lab!

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/alpha-lab-banner.jpg`)" width="100%" />
</div>

<div class="caption--1 pb-4">
  <span>caption</span>
</div>

[insert image that is generated with stable diffusion/similar or something from r&d with a bunch of eyeballs in a grid. If going the generated route, include a caption with the prompt. The image should look cool and a bit weird. It doesn’t need to be permanent. We could even have multiple images that cycle on each reload. It should signal signal a bit of playfulness (serious-play), technical chops, and openness]

Pupil Labs is made up of people who are curious by nature. We are researchers, designers, toolmakers, and professional tinkerers. We enjoy building quick prototypes and demos to explore our curiosities. We built Alpha Lab so that we can have a centralized place to collect the results of our explorations and to share it with the world.

Alpha Lab is not a place for official product documentation. Everything you find here should be considered a work in progress, and may even be a bit rough around the edges. That is the nature of exploration!

We encourage you to read through the results and go further - play around, build from the ideas here, hack away!

## Sharing is caring

Some of the prototypes and demos you see here came from our own home-grown curiosities. Others were inspired by questions from you - members of our community - via discussion on [discord](https://pupil-labs.com/chat/).

If you have an idea that you want us to explore [let us know](https://feedback.pupil-labs.com/). It could be a demo of using our existing tools, or an out of the box idea that combines some new state of the art deep learning pipeline with eye tracking.

## Show and tell

Enough talk; let’s dive in.

<div>
    <div class="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-2 xl-grid-cols-3 gap-8">
      <div v-for="(item, index) in showTell">
        <router-link
          :key="index"
          :to="item.to"
        >
          <v-img
            class="rounded"
            aspect-ratio="1.4"
            style="margin-bottom:32px;"
            :position="item.position"
            :src="require(`../media/alpha-lab/${item.img}`)"
          />
          <p class="caption--1 font-weight-bold pb-3">{{ item.title }}</p>
        </router-link>
        <p class="caption--1">
          {{ item.text }}
        </p>
      </div>
    </div>
</div>

<script>
export default {
  data() {
    return {
      showTell: [
        {
          title: "AOIs",
          text: "Here we demonstrate how to make areas of interest using data downloaded from Pupil Cloud’s Reference Image Mapper.",
          to: "/alpha-lab/gaze-metrics-in-aois/",
          img: "reference-aoi.jpg",
        },
        {
          title: "Netflix and fixate",
          text: "Here we show you how you can use Pupil Invisible + Pupil Cloud’s Reference Image Mapper to map gaze onto dynamic on screen content - like a video.",
          to: "/alpha-lab/map-your-gaze-to-a-2d-screen/",
          img: "netflix-fixation.png",
          position: "38%"
        },
        {
          title: "RIM Room",
          text: "We pushed the limits of markerless mapping with Pupil Cloud’s Reference Image Mapper - scanning an entire apartment.",
          to: "/alpha-lab/multiple-rim/",
          img: "desk-overlay.png",
        },
        {
          title: "RIM Room",
          text: "We pushed the limits of markerless mapping with Pupil Cloud’s Reference Image Mapper - scanning an entire apartment.",
          to: "/alpha-lab/multiple-rim/",
          img: "desk-overlay.png",
        },
      ],
    };
  },
}
</script>
