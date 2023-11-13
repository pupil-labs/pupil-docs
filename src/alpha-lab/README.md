---
description: Welcome to Alpha Lab!
permalink: /alpha-lab/
---

# Welcome to Alpha Lab!

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="banner.img_name" 
  width="100%" 
  :alt="banner.alt_text"
  :title="banner.alt_text" />
</div>

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
  methods:{
    loadRandomImage() {
      // Set the banner text from a JSON file
      var bannerText = require("../media/alpha-lab/banners/banners.json");
      // Get the current month
      const month = new Date().getMonth();
      // If it's December, change the banner to one with a Christmas theme
      if (month === 11) {
        return {
          img_name: require("../media/alpha-lab/banners/xmas.png"),
          alt_text: bannerText.xmas,
        };
      } else {
        // If it's not December, pick a random banner from the 7 available banners
        const numberOfImages = 7;
        const randomImageNumber = [Math.trunc(Math.random() * numberOfImages)+1];
        const randomImage = `img${randomImageNumber.toString()}.png`;
        const randomImageAltText = "img"+randomImageNumber.toString();
        return {
          img_name: require("../media/alpha-lab/banners/"+randomImage),
          alt_text: bannerText[randomImageAltText],
        };
      }
    },
  },
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
          text: "Here we show you how you can use Pupil Cloud’s Reference Image Mapper to map gaze onto dynamic on-screen content - like a video.",
          to: "/alpha-lab/map-your-gaze-to-a-2d-screen/",
          img: "netflix-fixation.png",
          position: "38%"
        },
        {
          title: "RIM Room",
          text: "We pushed the limits of markerless mapping with Pupil Cloud’s Reference Image Mapper - scanning an entire apartment.",
          to: "/alpha-lab/multiple-rim/",
          img: "desk-heatmap.jpeg",
        },
        {
          title: "Look at my hand!",
          text: "Use detectron's densepose AI to segment and know at which part of a body a person is looking.",
          to: "/alpha-lab/dense-pose/",
          img: "densepose.png",
        },
        {
          title: "Follow my path",
          text: "Discover how to generate static and dynamic scanpaths with Pupil Cloud's Reference Image Mapper.",
          to: "/alpha-lab/scanpath-rim/",
          img: "Steven_scanpath.jpeg",
        },
        {
          title: "NeRFing out",
          text: "Create 3D Models of your environment using the reference image mapper and NerfStudio",
          to: "/alpha-lab/nerfs",
          img: "nerf.png",
        },
        {
          title: "Neon and mobile apps!",
          text: "Use Neon and existing Alpha Lab content to capture and characterise viewing behaviour on mobile phone screens.",
          to: "/alpha-lab/phone-screens",
          img: "phone.png",
        },
        {
          title: "Gaze-contingent assistant",
          text: "Build gaze-contingent assistive applications with Neon!",
          to: "/alpha-lab/gaze-contingency-assistive",
          img: "gaze-cont-main-page.png",
        },
        {
          title: "Blink and you'll miss it!",
          text: "Run our blink detection pipeline offline and/or in real-time with Neon",
          to: "/alpha-lab/blink-detection",
          img: "eye_blinks_anim.gif",
        },
      ],
      banner: this.loadRandomImage(),
    };
  },
}
</script>
