---
description: Welcome to the Forge
permalink: /invisible/the-forge/overview/
---
<div class="mcontainer">
    <div class="col-mcontainer-1">
    <iframe style="border: none" width="250" height="250" src="https://rive.app/s/e3WH_1eZ30_7NFAR29QQjw/embed" allowfullscreen></iframe>
    </div>
    <div class="col-mcontainer-2">
    <h1>The Forge 🔨</h1> <b>Hi apprentice! Welcome to the Forge!</b><br><br>
    Ready to get the most out of your eye-tracker? This is the place where we share some of our more advanced tools, explainers, tutorials and projects that go beyond the basic use case.
    <br>
    <br>
    You can peek at them, but more importantly, you can also play with what our smiths have been working on. 
    </div>
</div>
<br>

### What do you have to offer? 
From remapping gaze to objects, getting more juice out of the reference image mapper, and combining them, to use upcoming technologies together with your eye tracker. Check out the latest tools and tutorials while they are tempering:

<div class="text-center">
  <v-btn
    v-for="(item,index) in enrichments"
    :key="index"
    color="flat"
    round
    outline
    style="font-weight:normal;"
    :to="item.link"
  >
  <v-icon left :color="item.color">whatshot</v-icon> {{  item.title }}
  </v-btn>
</div>

### Will these tools ever become available directly in your applications (Cloud, Companion app, device)?
Some of these features may end up in production in the future, some others may not. 

The Forge is not meant to be a replacement for the tools we offer in the Cloud or our app, but rather a place where some of our more edge case tools and projects can live. It will also be a place to test some new features and get feedback from the community.

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

*You wish to do what I do?* 
*Very well. I will teach you the ways of the Forge.*

::: tip
We offer a variety of training workshops and custom support, in case you need a hand with your project, check out our packages [here](https://pupil-labs.com/products/support/)!
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
    counter: 0,
    acounter:null,
    panel: null,
    enrichments: [
        {
        title: "Map your gaze onto screen content (like a web or a video)",
        link: "/invisible/the-forge/map-your-gaze-to-a-2d-screen",
        color: "warning",
        },
        {
        title: "Running multiple RIMs in parallel",
        link:"/invisible/the-forge/multiple-rim",
        color:"warning",
        },
        {
        title: "Define areas of interest and compute gaze metrics",
        link: "/invisible/the-forge/gaze-metrics-in-aois/",
        color: "warning",
        },
    ]
  }),
}
</script>

