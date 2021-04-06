---
description: Description
---
# Overview 
<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../media/cloud/imgs/cloud-capture-store-analyze.jpg')"
    max-width=80%
  >
  </v-img>
</div>
Pupil Cloud makes it easy for you to collect, securely store, and analyze your eye tracking data. 

Pupil Invisible Companion App integrates seamlessly with [Pupil Cloud](https://cloud.pupil-labs.com "Pupil Cloud - Eye tracking data storage, visualzation, and analysis - Pupil Labs") - facilitating data logistics with robust uploads from Pupil Invisible Companion app to Pupil Cloud's secure cloud storage. 

## Drive
The Drive section of Pupil Cloud focuses on raw data and tooling for data collection. It is where all of your raw recording data is uploaded. It is where Templates and Wearers can be created for later use during your data collection in the Pupil Invisible Companion app. 

### Recordings
This is where all your raw recording data lives. You can track the upload progress of incoming recordings from Pupil Invisible devices in the field and playback recordings with gaze overlay for quick qualatitive review.

You can create new [project](#) from selected recordings and view the responses to [template](##templates). Using the [search](#) you can easily filter the recordings to those of interest.

Last, but not least, you can always download raw recording data. Raw recordings have a [binary format]. For a more convenient download format see [Raw Data Exporter](#). 

Note: 200Hz gaze data is only available when you upload your recordings to Pupil Cloud. If you download recordings from Pupil Cloud it will be automatically included. 

### Wearers
We use the term wearer to signify the person wearing Pupil Invisible Glasses. In your research you might refer to a wearer as a: subject, participant, or respondent. A Pupil Invisible recording will always have one wearer associated with the recording. 

You can create wearers directly in Pupil Cloud to prepare for your study. When Pupil Invisible Companion Devices are connected to the internet and sync with Cloud the wearers will be updated on your Companion Device. 

We give each wearer a unique ID in Pupil Cloud. This makes it so that you can change the name of a wearer and other details (e.g. picture) at any time. 

Warning: You can not change wearers for a recording post-hoc. Be mindful to select the correct wearer when making a recording. 

### Templates
Templates are used to add meta-data to a recording. They are forms that can be pre-defined in Pupil Cloud. Template data will be saved with each recording. 

Create a new template. The only required field in a template is the `Recording Name`. You can type directly in this field and all recordings using this template will have the same name. Or generate a name for each recording that uses this template by making a pattern with pre-defined elements:
- template_name: The name of this template. 
- wearer_name: The name of the current wearer. 
- date: The date when you press record. Format `YYYY-MM-DD`. 
- time: The time when you press record. Format `HH:mm:ss`.
- uuid: The unique ID of the recording. Format uuidv4. 
- answer from X: You can also populate the recording name with answers from template fields. Example use case: you want to include age, gender, and response to a rating in the recording title. 

**Publish** a template and it will become available to Pupil Invisible Companion Devices. Once published you can no longer edit the template. 

Templates are powerful and flexible. Here are some [example use cases](/invisible/user-guide/intro/#recordings).


### Search
Use advanced search in the recordings view to explore and filter your recordings. The advanced search user interface makes it easy to search by recording names, template names, label names, wearer names, recording duration, and recording date. You can save searches so that you can quickly filter data or easily return a search in the future. 

==Does it really follow Lucene syntax? Add link to Lucene syntax==
**Advanced users**: make own queries directly in the search bar using Lucene syntax. Example query:
```
recording:(test OR stairs) label:bkk wearer:will template:"named recording" duration:<=10m recorded:>now-1y
```

## Projects & Enrichments

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../media/cloud/imgs/cloud-enrichments-illustration.jpg')"
    max-width=80%
  >
  </v-img>
</div>

A project is made up of a group of recordings. You create projects from the Recordings view in Drive by selecting one or more recordings and clicking "create project from recording". You can also add projects to existing recordings.

Projects are used for annotation and analysis. Within a project you can calculate enrichments to process your recordings. Enrichments leverage the power of cloud computing and advanced algorithms to calculate high-level features enabling data aggregation, visualization, and download.

Read more about [Enrichments here](/cloud/enrichments/).

### Project Editor

> [name=Will] TODO: Add low-fi image of project editor and name areas of the interface for easy reference. 

The project editor has 3 main sections. Left hand sidebar shows all of the recordings that are in the project. The center is a video player that shows the currently selected recording and it's events and sections visualized below the playback controls. The right hand sidebar is a list of all events and sections for the currently selected recording. 

### Events
Within the project editor you can annotate your recordings with events, which mark points in time that are of interest to you. This could for example be when a subject encounters a stimulus for the first time, or when it leaves the subject's vision again. 

Events are also used in the definition of enrichments to indicate which sections of a recording to calculate an enrichment on. All event data can further be downloaded in CSV format using the [Raw Data Exporter](#). 

**Advanced Users**: Events can also be generated in real-time while making a recording. See [here](developer/invisible/#recording-events)!

### Sections
Sections will appear in the sections and events sidebar when you create an enrichment. Read more about [enrichments](#). 
