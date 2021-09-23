---
description: Pupil Cloud makes it easy for you to collect, securely store, and analyze your eye tracking data.
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
This is where all your raw recording data lives. You can track the upload progress of incoming recordings from Pupil Invisible devices in the field and playback recordings with gaze overlay for quick qualitative review.

You can create new [project](#projects-enrichments "Projects and enrichments in Pupil Cloud") from selected recordings and view the responses to [template](#templates "Templates in Pupil Cloud"). Using the [search](#search "Search and advanced search in Pupil Cloud") you can easily filter the recordings to those of interest.

Last, but not least, you can always download raw recording data. Raw recordings have a [binary format]. For a more convenient download format see [Raw Data Exporter](enrichments/#raw-data-exporter "Raw Data Exporter enrichment documentation"). 

Note: 200Hz gaze data is only available when you upload your recordings to Pupil Cloud. If you download recordings from Pupil Cloud it will be automatically included. 

### Wearers
We use the term wearer to signify the person wearing Pupil Invisible Glasses. In your research, you might refer to a wearer as a: subject, participant, or respondent. A Pupil Invisible recording will always have one wearer associated with the recording. 

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

Templates are powerful and flexible. Here are some [example use cases](/invisible/user-guide/intro/#templates) "Example use cases for templates in Pupil Invisible documentation".


### Search
Use advanced search in the recordings view to explore and filter your recordings. The advanced search user interface makes it easy to search by recording names, template names, label names, wearer names, recording duration, and recording date. You can save searches so that you can quickly filter data or easily return a search in the future. 

**Advanced users**: make your own queries directly in the search bar using [Lucene syntax](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html "Lucene syntax documentation"). Example query:
```
recording:(test OR stairs) label:bkk wearer:will template:"named recording" duration:<=10m recorded:>now-1y
```

## Workspaces
Workspaces are containers for your data and enable you to share data in Pupil Cloud with your collaborators. All data in Pupil Cloud is part of a workspace and the workspace owner can control access to it. This includes recordings, wearers, templates, labels, projects, and enrichments, which are all isolated within a workspace. 

### Access Control
Only accounts that have been invited to become members of a workspace are granted access to the data in a workspace. For a more fine-grained control of what each member is allowed to do, they can be assign different roles:

- **Viewer**: This role can view all data, but they are not allowed to edit anything. For example: a viewer can download data, playback recordings and view heatmaps. A viewer can not delete any data, create projects, or start compute jobs.
- **Editor**: This role has full read and edit access to all data in the workspace, which includes the ability to create enrichments, start compute jobs and delete data.
- **Admin**: Has all permissions of an editor and additionally can invite and remove workspace members and change workspace members role.
- **Owner**: The owner of a workspace is the one who initially created the workspace. Owners have all permissions of an Admin. The owner of a workspace can not be changed.

Public sharing of data with people outside of a workspace is currently not possible.

### Frequently Asked Questions

**When should I use workspaces?**

Workspaces can have many uses. Typical ones are:
- **Projects or Studies**: Use a separate workspace for every project in order to keep data cleanly separated.
- **Teams**: If you are a member of multiple teams or organizations, you can use multiple workspaces to control what data you are sharing with whom.
- **Clients**: If you are working with clients, you can use multiple workspaces in order to keep data separated and to control which collaborator should have access to which client’s data.
 
**Is there a limit to the number of workspaces I can create?**

No, you can create as many workspaces as you want!

**Can I move recordings between workspaces?**

No, currently this is not possible. In case you really need this to happen please contact us at `info@pupil-labs.com`.

**Can ownership of a workspace be transferred?**

No, currently this is not possible. In case you really need this to happen please contact us at `info@pupil-labs.com`.


## Projects & Enrichments

<div class="pb-4" style="display:flex;justify-content:center;">
  <v-img
    :src="require('../media/cloud/imgs/cloud-enrichments-illustration.jpg')"
    max-width=80%
  >
  </v-img>
</div>

A project is made up of a group of recordings. You create projects from the Recordings view in Drive by selecting one or more recordings and clicking "create project from recording". You can also add projects to existing recordings.

Projects are used for annotation and analysis. Within a project, you can calculate enrichments to process your recordings. Enrichments leverage the power of cloud computing and advanced algorithms to calculate high-level features enabling data aggregation, visualization, and download.

Read more about [enrichments](/cloud/enrichments/ "Pupil Cloud enrichments for data analysis and visualization").

### Project Editor

<div class="pb-4" style="display:flex;justify-content:center;filter:drop-shadow(2px 4px 10px #000000);">
  <v-img
    :src="require('../media/cloud/imgs/project_editor.png')"
    max-width=80%
  >
  </v-img>
</div>

The project editor has 3 main sections. Left-hand sidebar shows all of the recordings that are in the project. The center is a video player that shows the currently selected recording and it's events and sections visualized below the playback controls. The right-hand sidebar is a list of all events and sections for the currently selected recording. 

### Events
Within the project editor, you can annotate your recordings with events, which mark points in time that are of interest to you. This could for example be when a subject encounters a stimulus for the first time, or when it leaves the subject's vision again. 

Events are also used in the definition of enrichments to indicate which sections of a recording to calculate an enrichment on. All event data can further be downloaded in CSV format using the [Raw Data Exporter](enrichments/#raw-data-exporter "Raw Data Exporter enrichment documentation"). 

**Advanced Users**: Events can also be generated in real-time while making a recording. See [here](/developer/invisible/#recording-events "Documentation on recordings events in real-time using recording events")!

### Sections
Sections will appear in the sections and events sidebar when you create an enrichment. Read more about [enrichments](enrichments/ "Pupil Cloud enrichments for data analysis and visualization"). 
