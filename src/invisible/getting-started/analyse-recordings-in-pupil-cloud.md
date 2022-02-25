---
permalink: /invisible/getting-started/analyse-recordings-in-pupil-cloud
description: Beginner guide to using Pupil Cloud to manage and analyse recordings.
---

# Analyse Recordings in Pupil Cloud
New to Pupil Cloud? You’re in the right place! 

This guide shows you how to store, playback and enrich Pupil Invisible recordings.

Let’s get oriented.

:::tip
<v-icon large color="info">info_outline</v-icon>
This guide assumes you’ve already uploaded at least one recording to Pupil Cloud. If you haven’t, we 
recommend following the [make your first recording guide](/invisible/getting-started/first-recording)
:::

<v-divider></v-divider>

## 1. Drive
After logging in to Pupil Cloud using the same account id + password created when setting up the Pupil Invisible 
Companion App, you’ll be presented with Drive.

[Insert Fig 1. Drive]

Drive is where your recordings live. 

You can track the upload progress of incoming recordings from Pupil Invisible devices, and playback recordings for quick 
review – just double-click on a recording or right-click for more options. 

Now that your recordings are safely backed up in Drive, let’s create a Project!

## 2. Projects
Projects are where you organize and enrich data; enrichment is just the term we use for analysis.

To create a project, select a recording from Drive and click on 'Create Project from Selection' in the icon menu.

[Insert Fig 2. Create project from selection]

Give the project a name.

[Insert Fig 3. Name project]

This takes you to Project Editor.

[Insert Fig 4. Project editor]

Project Editor has three main parts. The left-hand sidebar shows recordings that are in the project. The centre is a 
video player. The right sidebar shows events and sections.

Now let’s go ahead and create an enrichment!

## 3. Enrichments
Our example recording contains people, so let’s try out the Face Mapper enrichment. 

Why not make a similar recording and follow along? You can add the recording to your Project from within Drive!

### 3.1 Events and sections
Before creating the enrichment, we need to think about events and sections. These are an important part of how we work 
with recordings and enrichments. 

**Single** events can be useful to identify important points in a recording; **two** events can be used to define a 
**section** of the recording; **enrichments** are run on **sections**.

Currently, only the auto-generated events of recording.begin and recording.end exist. We could use these to run 
the Face Mapper enrichment on the entire recording. 

Instead, let’s add some events of our own.

Over in the right sidebar, you can type them manually (A). The events will appear in the right sidebar (B) and down in 
the timeline (C and D). 

[Insert Fig 5. Add events]

You can move forward and backward frame-by-frame using the < and >  keys.

Think carefully about defining events. They should correspond to something meaningful, in our case, we want to run the 
Face Mapper on a section of the recording where the people were visible to the wearer.

### 3.2 Creating the enrichment
Now that our events have been added, click on 'Enrichment', followed by '+ New Enrichment'.

[Insert Fig 6a. Enrichment]

[Insert Fig 6b. Enrichment]

Select 'Face Mapper' from the dropdown menu.

[Insert Fig 7. Face mapper]

Name the enrichment (A) and define its start and endpoint using our existing events (B)

[Insert Fig 8. Name and events]

Et Voila! The enrichment has been calculated and the results are ready to right-click and download. Check out the 
download format here.

[Insert Fig 9. Et Voila]

Now let’s navigate back to the Project Editor.

[Insert Fig 10. Result]

The section that the enrichment was calculated on is now visible in the right sidebar. Click on it to see it in 
the timeline and to show the detection result on the scene video.

## 4. Conclusion
In this getting started guide, we have covered how to store and playback recordings in Drive, create a Project from a 
recording, and subsequently, use events and sections to define an Enrichment. 

These are the basic skills you will need to work in the Pupil Cloud environment, and you can apply them to other 
enrichments.

Ready to go further and set up enrichments that require more in-depth knowledge? Dive into our How-tos!
