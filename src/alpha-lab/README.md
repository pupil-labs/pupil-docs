---
description: Welcome to the Forge
permalink: /alpha-lab/
---
<div class="mcontainer">
    <div class="col-mcontainer-1">
    <iframe style="border: none" width="250" height="320" src="https://rive.app/s/zRsyQ_Q-OkmbfhIGGID-4Q/embed" allowfullscreen></iframe>
    </div>
    <div class="col-mcontainer-2">
    <h1>Alpha Lab</h1> <b>Hello humanoid! Welcome to the Alpha Lab!</b><br><br>
    Ready to get the most out of your eye tracker? If the answer is yes, you're in the right place! This is a space where we share some of our more advanced tools, explainers, tutorials and projects that go beyond the basic use cases.
    <br>
    <br>
    You can peek at them, but more importantly, you can also play with what our robots have been working on.
    </div>
</div>
<br>

### What do you have to offer? 
Take your gaze data to new levels – determine which areas of interest are gazed; obtain more out of the reference image mapper by combining multiple enrichments; merge cutting-edge technologies with your eye tracking data... Check out the latest tools and tutorials as they get tempered:

<div class="text-left">
  <v-btn
    color="flat"
    block
    round
    outline
    class="fixed"
    style="font-weight:normal; min-height:50px; min-width:85%;text-align:left;"
    to="/alpha-lab/map-your-gaze-to-a-2d-screen"
    > <v-icon left color="warning">whatshot</v-icon>Map your gaze onto screen content <br />(like web browsing or video playback)</v-btn>

  <v-btn
    v-for="(item,index) in enrichments"
    :key="index"
    color="flat"
    block
    round
    outline
    class="fixed"
    style="font-weight:normal;min-width:85%;text-align:left;"
    :to="item.link"
  >
  <v-icon left :color="item.color">whatshot</v-icon> {{item.title}}
  </v-btn>
</div>

### Will these tools ever become available directly in your applications (Cloud, Companion app, device)?
Some of these features may end up in production in the future, others may not. 

The Forge is not meant to be a replacement for the tools we offer in Cloud or the Companion App, but rather it is a place 
where some of our more edge-case tools and projects live. It will also be a place to test new features and gather 
feedback from the community.

### Can I suggest a feature?
Of course! We are happy to hear what would you like us to craft next.

<div class="button-center">
    <v-btn
        round
        color="primary"
        href="https://pupil-labs.canny.io/"
        > 
    <v-icon left dark>feedback</v-icon> Request a feature!
    </v-btn>
</div>

### Do you need training?

::: tip
<b>You wish to do what our robots do?</b><br> 
We offer a variety of training workshops and custom support packages, in case you need a hand with your project. Check them out [here](https://pupil-labs.com/products/support/)!
:::

<style>
    .button-center {
        text-align: center;
    }
    .mcontainer{
        display: flex;
        flex-wrap: wrap;
    }
    .col-mcontainer-1{
    flex: 20%;
    padding: 0 20px;
    }
    .col-mcontainer-2{
    flex: 60%;
    padding: 0 20px;
    }
</style>


<script>
export default {
  data: () => ({
    panel: null,
    enrichments: [
        // {
        //   title: "Map your gaze to body parts using DensePose",
        //   link: "/alpha-lab/dense-pose",
        //   color: "warning"
        // },
        // {
        //   title:"Map your gaze onto screen content (like web browsing or video playback)",
        //   link: "/alpha-lab/map-your-gaze-to-a-2d-screen",
        //   color: "warning"
        // },
        {
        title: "Run multiple Reference Image Mappers in parallel",
        link:"/alpha-lab/multiple-rim",
        color:"warning",
        },
        {
        title: "Define areas of interest and compute gaze metrics",
        link: "/alpha-lab/gaze-metrics-in-aois/",
        color: "warning",
        },
    ]
  }),
}
</script>

