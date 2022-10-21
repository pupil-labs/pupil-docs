---
description: Welcome to the Forge
permalink: /invisible/the-forge/overview/
---
<div class="mcontainer">
    <div class="col-mcontainer-1">
    <iframe style="border: none" width="250" height="250" src="https://rive.app/s/e3WH_1eZ30_7NFAR29QQjw/embed" allowfullscreen></iframe>
    </div>
    <div class="col-mcontainer-2">
    <h1>The Forge 🔨</h1> <b>Ahoy apprentice! Welcome to the Forge!</b> 
    Here is where we share some of our more advanced tools, explainers, and projects that go beyond the basic use case.
    <br>
    <br>
    You can peek at them, but more important you can also play with what our smiths have been working on. 
    </div>
</div>
<br>

### What do you have to offer? 
Check out the latest tools and tutorials while they are tempering:

<div class="pb-4">
  <v-btn
    v-for="(item,index) in enrichments"
    :key="index"
    outline
    round
    color="primary"
    :to="item.link"
    style="font-weight:normal;border-color"
  >
    {{ item.title }}
  </v-btn>
</div>

### Will these tools become available in the Cloud?
Some of these features may end up in the Cloud in the future, some others may not. 

The Forge is not meant to be a replacement for the Cloud tools, but rather a place where some of our more advanced tools and projects that are really tight to some specific uses can live. It will also be a place to test new features and get feedback from the community.

### Can I suggest a feature?
Of course, we are happy to hear what would you like us to craft next.

<!-- Perhaps here a Notion list where they can upvote or add features req. Can notion do this?  -->

### Do you need training?

*You wish to do what I do?* 
*Very well. I will teach you the ways of the Forge.*


We offer a variety of training workshops and custom support, in case you need a hand with your project.
Check out our packages [here](https://pupil-labs.com/products/support/)!


<style>
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
    /* @media screen and (max-width: 800px) {
        .col-mcontainer{
        flex: 50%;
    }
    }
    @media screen and (max-width: 400px) {
    .col-mcontainer{
        flex: 100%;
    } 
    }*/
</style>
<script>
    export default {
        data() {
            return {
            panel: null,
            enrichments: [
                {
                title: "Define areas of interest and compute gaze metrics",
                link: "/invisible/the-forge/gaze-metrics-in-aois/",
                },
                {
                title: "Map your gaze onto screen content (like a web or a video)",
                link: "/invisible/the-forge/map-your-gaze-to-a-2d-screen",
                },
                {
                title: "Running multiple RIMs in parallel",
                link:"/invisible/the-forge/multiple-rim",
                },
            ]
            };
        },
    }
</script>