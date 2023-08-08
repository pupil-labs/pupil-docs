---
title: A practical guide to implementing gaze contingency in assistive technology
description: "Gaze contingent systems for assistive technology"
permalink: /alpha-lab/gaze-contingency-assistive
tags: [Neon]
---
# A practical guide to implementing gaze contingency in assistive technology

<TagLinks />
<Youtube src="cuvWqVOAc5M"/>

:::tip
Imagine a world where you can browse the internet with a mere glance or write an email using only your eyes. This is not science fiction; it is the realm of gaze-contingent systems - an immensely helpful technology for those seeking transformative assistive solutions. 
:::

## Hacking the eyes with gaze contingency

“Gaze contingent" refers to a type of human-computer interaction that allows a computer screen display to change depending on where the user is looking. Gaze-contingent technology is commonly used in the field of eye-tracking and enables users to control input devices with their eyes, as shown in the video above, where the user's gaze controls a mouse. 

One notable application of gaze-contingent technology is gaze-controlled interfaces. These enable users to interact with a computer or device through eye movements instead of traditional input methods like a mouse or keyboard, which can be especially useful for individuals with physical disabilities. In the video above a mouse cursor is moved using the eyes alone. This technology unlocks new possibilities for communication, education, and overall digital empowerment.

## Limitations and current prospects 

Using such technologies has become much easier recently thanks to the advancements in the field of eye tracking. Traditional assistive systems require frequent calibration, which can be problematic in practice, as highlighted in the story of [Gary Godfrey](https://pupil-labs.com/blog/community/cycling-for-als/). Modern calibration-free approaches like [Neon](https://pupil-labs.com/products/neon/), overcome this issue and provide a more robust and user-friendly input modality for producing gaze data.

We have, therefore, prepared a guide to aid you in creating your very own gaze-contingent controller using [Neon](https://pupil-labs.com/products/neon/).

## How to use a head-mounted eye tracker for screen-based interaction (context)

To implement a gaze-contingent application, one needs to overcome two challenges: 

**Mapping gaze to screen**

For head-mounted eye trackers, the first challenge is to transform the gaze from scene-camera coordinates to screen-based coordinates. Neon is a wearable eye tracker, that is it gives gaze data in scene camera coordinates. To interact with a screen, we need to locate the screen, send gaze data from Neon to the computer, and finally map gaze into the coordinate system of the screen. To overcome this problem, we used [AprilTags](https://april.eecs.umich.edu/software/apriltag) to identify the image of the display as it appears in the scene camera and define it as our area of interest. Following this approach, we can transform the gaze from the scene camera space to screen-based coordinates, similar to the [Marker Mapper](/enrichments/marker-mapper/) enrichment that we offer on Pupil Cloud as a posthoc analysis solution.

**Gaze-controlled mouse in real time**

The second challenge is interpreting the gaze on-screen and updating the control input (e.g., a mouse) in real time. To tackle this challenge, we used Neon's [Real-time API](https://docs.pupil-labs.com/neon/real-time-api/introduction/), along with our [Real-time Screen Gaze](https://github.com/pupil-labs/realtime-screen-gaze/) package that allows users to acquire screen-based gaze coordinates in real time. 

Follow the steps in the next section and in no time you will be able to use your gaze to navigate a website and fixate on different parts to trigger a mouse click with your eyes.

## Steps

1. Follow the instructions in the [Gaze-controlled cursor demo repository](https://github.com/pupil-labs/gaze-controlled-cursor-demo) to download and run it locally on your computer.
2. Start up [Neon](/neon/getting-started/first-recording.html). 
3. Once your Neon device is detected, the Settings window will appear. 
    - Adjust the `Tag Size` and `Tag Brightness` settings as necessary until all four AprilTag markers are successfully tracked (markers that are not tracked will display a red border as shown in the image below).
    - Modify the `Dwell Radius` and `Dwell Time` values to customize the size of the gaze circle and the time required for a fixation to trigger a mouse action.
    - Click on `Mouse Control` and embark on your journey into the realm of gaze contingency.
    - Right-click anywhere in the window or on any of the tags to show or hide the Settings window.

    <img src="../media/alpha-lab/Settings-gaze-controlled-cursor-demo.png"/> 

## What's next? 

After executing the code, you will be able to use your eyes to control your computer's mouse. The repository we created contains code that you can build on to fashion your own custom implementations, opening up possibilities for navigation, typing on a virtual keyboard, and much more.

Dig in and hack away. The potential is boundless. Let us know what you build!

Need assistance in implementing your gaze-contingent task? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com) or on our [Discord server](https://pupil-labs.com/chat/) or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.