---
description: Welcome to the Forge
permalink: /alpha-lab/
---

# Welcome to Alpha Lab!

<div>
  <div class="d-flex align-center">
    <iframe style="border: none" width="250" height="320" src="https://rive.app/s/g-ft4kxqiEirmEZP-1TzHQ/embed" allowfullscreen />
  </div>
  <p>
    Ready to get the most out of your eye tracker? If the answer is yes, you're in the right place! This is a space where we share some of our more advanced tools, explainers, tutorials and projects that go beyond the basic use cases.
  </p>
  <p>
    You can peek at them, but more importantly, you can also play with what our specialists have been working on.
  </p>
</div>

## What do you have to offer?

Take your gaze data to new levels – determine which areas of interest are gazed; obtain more out of the reference image mapper by combining multiple enrichments; merge cutting-edge technologies with your eye tracking data... Check out the latest tools and tutorials as they get out:

<div class="pb-4">
  <v-btn
    v-for="(item,index) in guides"
    :key="index"
    outline
    round
    color="primary"
    :to="item.link"
    style="font-weight:normal;"
  >
    {{ item.title }}
  </v-btn>
</div>

## Will these tools ever become available directly in your applications (Cloud, Companion app, device)?

Some of these features may end up in production in the future, others may not.

The Forge is not meant to be a replacement for the tools we offer in Cloud or the Companion App, but rather it is a place
where some of our more edge-case tools and projects live. It will also be a place to test new features and gather
feedback from the community.

## Can I suggest a feature?

Of course! We are happy to hear what would you like us to build next.

<div>
  <v-btn
    large
    color="primary"
    href="https://feedback.pupil-labs.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Request a feature!
  </v-btn>
</div>

## Do you need training?

### You wish to do what our robots do?

We offer a variety of training workshops and custom support packages, in case you need a hand with your project. Check them out [here](https://pupil-labs.com/products/support/)!

<script>
export default {
  data: () => ({
    panel: null,
    guides: [
      {
        title: "Map your gaze onto screen content",
        link: "/alpha-lab/map-your-gaze-to-a-2d-screen",
      },
      {
        title: "Run multiple Reference Image Mappers in parallel",
        link: "/alpha-lab/multiple-rim",
      },
      {
        title: "Define areas of interest and compute gaze metrics",
        link: "/alpha-lab/gaze-metrics-in-aois/",
      },
    ],
  }),
}
</script>
