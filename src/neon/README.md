---
description: Neon and Pupil Cloud documentation ranging from getting started guides to explanations of advanced concepts, how-to guides, and references on export formats and APIs.
---

# Neon & Cloud Documentation

Welcome to the Neon & Pupil Cloud docs! In this section of the docs you will learn everything there is to learn about the Neon ecosystem. Start by making your first recording and proceed all the way to implementing advanced applications. Everything you need is here.

## Getting Started

This section is for new users who want to get to grips with the tools. Working through the tutorials will put you in a great position to follow along with the rest of the documentation and get started with your project.

[TODO: Update image]

<div>
  <div class="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-2 xl-grid-cols-3 gap-8">
    <div v-for="(item,index) in gettingStarted">
      <v-img class="rounded" style="margin-bottom:32px;" :src="require(`../media/invisible/overview-${index + 1}.jpg`)"></v-img>
      <p class="caption--1 font-weight-bold pb-3">{{ item.title }}</p>
      <p class="caption--1">
        {{ item.text }}
      </p>
    </div>
  </div>
</div>

<router-link class="underline" to="/neon/getting-started/first-recording.html">View more</router-link>

<v-divider />

## Basic Concepts

This section explains all relevant concepts in detail and provides background information on how everything works. If you want to understand a certain aspect in detail, check out the respective section here.

<div class="pb-4">
  <v-btn
    v-for="(item,index) in basicConcepts"
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

<router-link class="underline" to="/neon/basic-concepts/">View more</router-link>

<v-divider />

## Glasses & Companion

This section gives an overview of Neon, as well as of the Companion device and Neon app. It also contains guides on how to handle the hardware, e.g. how to swap frames.

<div class="pb-4">
  <v-btn
    v-for="(item,index) in glassesAndCompanion"
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

<router-link class="underline" to="/neon/glasses-and-companion/technical-overview/">View more</router-link>

<v-divider />

## Enrichments

This section explains all the enrichments available in Pupil Cloud and guides you through using them successfully.

<div class="pb-4">
  <v-btn
    v-for="(item,index) in enrichments"
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

<router-link class="underline" to="/neon/enrichments/">View more</router-link>

<v-divider />

## How-Tos

This section contains a range of how-tos that address specific topics and challenges.

Some highlights:

<div class="howto-container">
  <v-expansion-panel v-model="panelHowTo">
    <v-expansion-panel-content
      v-for="(item, idxHowTo) in panelContent"
      :key="index"
      hide-actions
    >
      <template v-slot:header>
        <div class="flex">
          <div style="width:16px;margin-right:8px">{{ panelHowTo === idxHowTo ? '-' : '+' }}</div>
          <span>{{ item.title }}</span>
        </div>
      </template>
      <v-card>
        <v-card-text class="pt-0 pl-5">
          <div class="pb-2">
            {{ item.text }}
          </div>
          <router-link class="underline" :to="item.link">Read more</router-link>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>

<v-divider />

## Real-Time API

The real-time API allows you to stream gaze data and scene video to any device connected to the same local network. Further, you can control all devices remotely to start and stop recordings or save events.

This section contains a range of guides introducing the real-time API and common use cases of it.

<div class="howto-container">
  <v-expansion-panel v-model="panelRealTimeApi">
    <v-expansion-panel-content
      v-for="(item, idxApi) in realTimeAPI"
      :key="idxApi"
      hide-actions
    >
      <template v-slot:header>
        <div class="flex">
          <div style="width:16px;margin-right:8px">{{ panelRealTimeApi === idxApi ? '-' : '+' }}</div>
          <span>{{ item.title }}</span>
        </div>
      </template>
      <v-card>
        <v-card-text class="pt-0 pl-5">
          <div class="pb-2">
            {{ item.text }}
          </div>
          <router-link class="underline" :to="item.link">Read more</router-link>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>

<v-divider />

## Export Formats

This section is where you will find references for [export formats](/neon/reference/export-formats), which you can consult when working with any data coming out of Pupil Cloud.

<router-link class="underline" to="/neon/reference/export-formats">Jump to section</router-link>

<v-divider />

## Troubleshooting

Having trouble with Neon or Pupil Cloud? We have collected the most common issues you may run into together with solutions in [this](/neon/troubleshooting) section.

<router-link class="underline" to="/neon/troubleshooting">Jump to section</router-link>

<script>
export default {
  data() {
    return {
      panelHowTo: null,
      panelRealTimeApi: null,
      gettingStarted: [
        {
          title: "Make Your First Recording",
          text: "Using your Neon eye tracking system for the first time? Follow these steps to make your first recording!",
        },
        {
          title: "Understand The Ecosystem",
          text: "The Neon ecosystem contains a range of tools that support you during data collection and data analysis. Learn more about all the tools available to power your eye tracking research!",
        },
        {
          title: "Analyse Recordings in Pupil Cloud",
          text: "This guide shows you how to go from newly uploaded Neon recordings to enriched data ready for analysis and download using Pupil Cloud.",
        }
      ],
      panelContent: [
        {
          title: "Monitor your Data Collection in Real-Time",
          text: "All data generated by Neon can be monitored in real-time using the Neon Monitor app. To access the app simply visit pi.local in your browser while being connected to the same WiFi network as your Companion Device.",
          link: "/neon/how-tos/data-collection-with-the-companion-app/monitor-your-data-collection-in-real-time.html",
        },
        {
          title: "Achieve super-precise Time Sync",
          text: "For some applications, it is critical to accurately synchronize your Neon with another clock. That could be from a second Neon device, an external sensor, or a computer you use for stimulus presentation. This guide shows you how to achieve this with.",
          link: "/neon/how-tos/data-collection-with-the-companion-app/achieve-super-precise-time-sync.html",
        },
      ],
      realTimeAPI: [
        {
          title: "Introduction",
          text: "Get started using the real-time API here! This guide shows you how to get things running and what the available API calls are.",
          link: "/neon/real-time-api/introduction/",
        },
        {
          title: "Track your Experiment Progress using Events",
          text: "Running a data collection for an experiment can be an organizational challenge. Using events, tracking the progress of an experiment becomes very easy and can often be fully automated though. Follow this guide to see how!",
          link: "/neon/real-time-api/track-your-experiment-progress-using-events/",
        },
      ],
      basicConcepts: [
        {
          title: "Gaze",
          link: "/neon/basic-concepts/data-streams/#gaze",
        },
        {
          title: "Fixations",
          link: "/neon/basic-concepts/data-streams/#fixations",
        },
        {
          title: "Wearers",
          link: "/neon/basic-concepts/recordings-wearers-and-templates/#wearers",
        },
        {
          title: "Templates",
          link: "/neon/basic-concepts/recordings-wearers-and-templates/#templates",
        },
      ],
      glassesAndCompanion: [
        {
          title: "Technical Overview",
          link: "/neon/glasses-and-companion/technical-overview/",
        },
        {
          title: "Companion Device",
          link: "/neon/glasses-and-companion/companion-device/",
        },
      ],
      enrichments: [
        {
          title: "Reference Image Mapper",
          link: "/neon/enrichments/reference-image-mapper/",
        },
        {
          title: "Marker Mapper",
          link: "/neon/enrichments/marker-mapper/",
        },
        {
          title: "Face Mapper",
          link: "/neon/enrichments/face-mapper/",
        },
        {
          title: "Gaze Overlay",
          link: "/neon/enrichments/gaze-overlay/",
        },
        {
          title: "Raw Data Exporter",
          link: "/neon/enrichments/raw-data/",
        },
      ],
    };
  },
}
</script>
