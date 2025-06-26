---
title: "Invisible Effort: What Pupil Size Reveals About Cognitive Load"
description: "Track real-time cognitive effort during surgical training using Neon’s pupil size data and a novel algorithm from SOMAREALITY"
permalink: /alpha-lab/cognitive-load-monitoring/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/lWTMZpOrLuY/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/lWTMZpOrLuY"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/lWTMZpOrLuY/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Invisible Effort: What Pupil Size Reveals About Cognitive Load

<TagLinks :tags="$frontmatter.tags" />

<video width="100%" controls>
  <source src="./somarealities-surgery_training-shortened.mp4" type="video/mp4">
</video>

## Motivation

Assessing expertise in high-stakes environments like surgery is complex. While traditional metrics such as accuracy and task completion time provide some information, they do not fully capture the underlying cognitive processes. Cognitive load, which can be reflected in moment-to-moment changes in pupil size, offers an additional perspective on the mental effort involved during complex procedures.

In this Alpha Lab, we explore how [Neon](https://pupil-labs.com/products/neon), combined with a novel continuous modeling algorithm developed by our partner [SOMAREALITY](https://somareality.com/), can be used to infer and visualize cognitive load during surgical training. Although raw pupil diameter is linked to cognitive load, it is also influenced by external factors such as ambient lighting through the pupillary light reflex. SOMAREALITY's algorithm aims to explicitly account for these confounding effects, producing a signal that more accurately reflects cognitive load. Additionally, the algorithm automatically normalizes the signal against a baseline, enabling more consistent and comparable measurements across different individuals.

## Setup

Researchers from the [Centre for Biomedical Research and Translational Surgery at the University of Vienna](https://biomed-forschung.meduniwien.ac.at/en/) used Neon to record eye data during the implantation of a cochlear implant. The eye tracker captured both pupil size and scene video from the surgeon’s perspective. Cognitive load was modeled continuously using SOMAREALITY’s algorithm.

### Hardware:

- Neon eye tracker with two eye cameras to track pupil dilation at 200 Hz, and a scene camera for the surgeon’s perspective

### Software:

- Neon Companion app
- SOMAREALITY cognitive load algorithm

## Insights

Twenty surgeries were recorded: one performed by an expert, the others by an inexperienced surgeon. The cognitive load patterns appeared to differ between the expert and the inexperienced surgeons.

The expert showed relatively low and stable cognitive load during most of the procedure, with occasional increases at key moments. In contrast, the inexperienced surgeon’s cognitive load fluctuated more frequently and at higher amplitudes, which may suggest increased mental effort or less automation.

While not statistically significant at this scale, these results demonstrate the types of insights that can be gained from combining Neon with SOMAREALITY’s algorithm.

### Expert during demonstration:

- Low baseline cognitive load
- Sharp increases at key transitions

### Inexperienced surgeon:

- Higher baseline cognitive load
- Frequent peaks throughout the procedure, suggesting increased mental effort

## Applications

This approach offers additional information for competency modeling in medical education. Instead of relying solely on performance outcomes, educators could explore using cognitive load traces to better understand mental effort and learning progression.

Potential applications include:

- Real-time feedback for trainees
- Additional metrics for assessing expertise
- Informing curriculum design based on cognitive demands

## Try it Yourself

If you are interested in exploring this approach:

- Use Neon to record eye and scene video
- Apply SOMAREALITY’s algorithm to your data (licenses are available for purchase from [SOMAREALITY](https://somareality.com/)).
- Visualize and compare cognitive load traces across tasks, conditions, or user groups

## References

 <div class="info custom-block" style="padding-top: 8px">

- Stolte, M., Gollan, B., & Ansorge, U. (2020). [Tracking visual search demands and memory load through pupil dilation. Journal of Vision, 20(6), 1–19.](https://jov.arvojournals.org/article.aspx?articleid=2768436)

- Gollan, B., & Ferscha, A. (2016). [Modeling cognitive load from pupil dilation: A continuous and marker-free approach.](https://dl.acm.org/doi/10.1145/2858036.2858528)

</div>
