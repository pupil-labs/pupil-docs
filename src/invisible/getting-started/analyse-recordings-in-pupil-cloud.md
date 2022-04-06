---
permalink: /invisible/getting-started/analyse-recordings-in-pupil-cloud
description: Beginner guide to using Pupil Cloud to manage and analyze recordings.
---

# Analyse Recordings in Pupil Cloud
New to Pupil Cloud? You’re in the right place! 

This guide shows you how to go from newly uploaded Pupil Invisible recordings to enriched data ready for analysis and download.

Let’s get started.

:::tip
<v-icon large color="info">info_outline</v-icon>
This guide assumes you’ve already uploaded at least one recording to Pupil Cloud. If you haven’t, we 
recommend following the [make your first recording guide](/invisible/getting-started/first-recording)
:::

<v-divider></v-divider>

## 1. Drive
Log in to Pupil Cloud using the same account that you used to set up the Pupil Invisible 
Companion App.

Once logged in you will see the Drive view – this is where your recordings live.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_1.jpg')"
    max-width=100%
  >
  </v-img>
</div>

You can track the upload progress of incoming recordings from Pupil Invisible devices, and playback recordings for quick 
review. Just double-click on a recording to playback or right-click for more options. 

Now that your recordings are safely stored in Drive, let’s create a Project!

## 2. Projects
Projects are where you organize and enrich data. Enrichment is the term we use for analysis.

To create a project, select one or more recordings from Drive and click on 'Create Project from Selection' in the icon menu. 

This will jump you straight into a new project. Name your project and continue. 

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_2.jpg')"
    max-width=100%
  >
  </v-img>
</div>

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_3.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Project Editor has three main parts: 
1. Left sidebar shows recordings that are in the project.
2. Center canvas is a video player 
3. Right sidebar shows events and sections.

Now let’s go ahead and create an enrichment!

## 3. Enrichments
Our example recording contains people, so let’s try out the Face Mapper enrichment. 

Why not make a similar recording and follow along? You can add the recording to your Project from within Drive!

### 3.1 Events and sections
Before creating the enrichment, we should think about events and sections. These are an important part of how we work 
with recordings and enrichments. 

**Single** events can be useful to identify important points in a recording  
**Two** events can be used to define a **section** of the recording  
**Enrichments** run on **sections**  

Currently, only the auto-generated events of `recording.begin` and `recording.end` exist. We could use these to run 
the Face Mapper enrichment on the entire recording. But, we want to be more specific because we are only interested in part of the recording. So, let’s add some events of our own.

A. In the right sidebar, type in the name of the event.  
B. Events will appear in the right sidebar.  
C. Events will also appear in the timeline as small dots. 

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_4.jpg')"
    max-width=100%
  >
  </v-img>
</div>

You can move forward and backward frame-by-frame using the `<` and `>` keys.

Think carefully about defining events. They should correspond to something meaningful, in our case, we want to run the 
Face Mapper on a section of the recording where the people were visible to the wearer.

### 3.2 Creating the enrichment
Now that our events have been added, click on 'Enrichment', followed by '+ New Enrichment'.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_5.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Select 'Face Mapper' from the dropdown menu. Name the enrichment (A) and define its start and endpoint using our existing events (B).

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_6.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Now we can run the enrichment. To run the enrichment, click on the arrow icon in the right-side of the enrichment. 
Depending on how long your section is, this may take a few moments to complete.

Once the enrichment has finished, the results will be ready to right-click and download. Check out the download format
[here](/invisible/reference/export-formats).

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_7.jpg')"
    max-width=100%
  >
  </v-img>
</div>

Now let’s navigate back to the Project Editor.

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../../media/invisible/getting-started/PC-Getting_Started-Fig_8.jpg')"
    max-width=100%
  >
  </v-img>
</div>

The section that the enrichment was calculated on is now visible in the right sidebar. Click on it to see it in 
the timeline and to show the detection result on the scene video.

## 4. Conclusion
In this guide, we have covered how to playback your uploaded recordings in Drive, create a Project from a 
recording, and use events and sections to define an Enrichment. 

These are the basic skills you will need to work in the Pupil Cloud environment, and you can apply them to other 
enrichments!
