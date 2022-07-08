---
permalink: /invisible/explainers/basic-concepts
description: Introduction to a number of organizational constructs.
---

# Basic Concepts
There are a number of organizational constructs we use to make working with our tools flexible and reliable:

A [recording](/invisible/explainers/basic-concepts/#recordings) is made each time you press record in the Invisible Companion app. Each recording has a [wearer](/invisible/explainers/basic-concepts/#wearers) and a [template](/invisible/explainers/basic-concepts/#templates) associated with it. Once uploaded to Pupil Cloud you can add recordings to [projects](/invisible/explainers/basic-concepts/#projects), this creates a context for you to add [enrichments](/invisible/explainers/enrichments) to aggregate and analyse your data.

Finally, [workspaces](/invisible/explainers/basic-concepts/#workspaces) are used to keep recordings, wearers, templates, and projects organized and isolated so you can share them with clients and collaborators.


## Recordings
A recording starts and stops when you press the red record button in Pupil Invisible Companion App. While this should feel similar to recording a video, there is a lot more happening behind the scenes. When you are recording with Pupil Invisible Companion App, you are capturing not only video data but several more sensors (see [Data Streams](/invisible/explainers/data-streams)).

Recordings are designed to be as robust as possible. If at any point a sensor is disconnected during a recording, it will automatically start capturing again as soon as it is reconnected. You could start a recording with no Pupil Invisible glasses connected and plug them in at a later time. As soon as they are connected, data will be captured.

The Pupil Invisible Companion App has several more features to ensure a robust data collection and will e.g. warn you in case the Companion device's battery is running low or if you run out of storage space.

## Wearers
Wearers are the people wearing your Pupil Invisible glasses. In a typical study, each subject would be a wearer. Every recording you make is assigned to a wearer to help you organize your recordings. You can create new wearers on the fly in the Pupil Invisible Companion App or in advance in Pupil Cloud.

Every wearer is assigned a unique ID, such that you can edit the name and profile picture at any time without mixing up your recordings.

In some cases, it can make sense to use the offset correction feature to compensate for systematic offsets in the predictions of individual wearers (see [Apply offset correction](/invisible/how-tos/tools/apply-offset-correction)). The offset you set will be saved in the wearer profile and applied to future recordings of this subject automatically.


## Templates
Templates are used to add meta-data to a recording (e.g. age, gender, or location). They are forms that can be filled out at recording time to document important information for your study. The responses will be saved alongside the recording. Further, templates define a naming scheme for recordings. If, for example, you add a field for the `Experiment Name` to the form, you can set this value to be added to your recording names automatically. This is useful if you have a pre-defined structure for your study.

### Form for Meta-Data
You can create new templates in Pupil Cloud and customize them to your use case. You can add as many form fields as you want, including text fields and multiple-choice fields.

You can set individual fields of the template to be "required", such that a recording can not be stopped before filling out those fields.

Before your templates become available for selection in the Pupil Invisible Companion app, you need to **publish** them. After they are published, they can no longer be edited to ensure consistency between responses.

Some example use-cases for template forms include:

- **Questionnaire**: During the recording of a scientific study participating subjects are often asked to fill out a questionnaire to capture e.g. demographic data. You can simply create a template for your questionnaire so your subjects can fill out the questionnaire on the Companion Device. All questionnaire answers will be saved alongside the recording data associated with the according wearer.
- **Recording Structure**: If your recording schedule has a known structure, e.g. different recording phases or one recording per week, you can set up a template to note down the respective phase or week for each recording.
- **Documenting the unplanned**: Data collection does not always go as planned. Sometimes a subject did not quite understand the instructions and sometimes something went wrong in the experiment workflow. Using templates you can immediately note down what happened and flag recordings that will require further inspection. This will be saved as part of the recording, so you do not have to keep a separate list of notes.

### Naming Scheme for Recordings 
The only required field when creating a new template is the `Recording Name`, which determines the naming scheme of your recordings. Any text you type in this field will be included in the recording names. You can add form fields to the `Recording Name` as well, to include the corresponding values entered at recording time to the recording name. Additionally, you can add the following pre-defined elements to the name:

- **template_name**: The name of this template.
- **wearer_name**: The name of the current wearer.
- **date**: The date of recording. Format `YYYY-MM-DD`.
- **time**: The recording start time. Format `HH:mm:ss`.
- **uuid**: The unique ID of the recording. Format `uuidv4`.

#### Example
The below template definition is an example for a data collection called `Museum Study`. This collection is happening with several subjects in multiple sessions. We can track which subject a recording was made with using the associated wearer profile. To track what session a recording belongs to, we have a multiple-choice form field in the template.

In the `Recording Name` field of the template, we defined a naming scheme that conveniently summarizes the recording in the context of this study. It uses a mix of custom text (the gray "chips"), the wearer name, and the multiple-choice form field about the session (which has the form field ID `2255e141`). This scheme will create names like `Museum Study - Jane - Session 2`.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../media/invisible/explainers/template-naming-example.jpg')"
    max-width=100%
  >
  </v-img>
</div>

## Projects

A project is a group of recordings. You create projects from the Recordings view in Drive by selecting one or more recordings and clicking "create project from recording". You can also add projects to existing recordings.

Within a project, you can annotate recordings with events and create [enrichments](/invisible/explainers/enrichments) to power your analysis.

## Events
You can annotate relevant points in time in your recordings using **Events**. An event is essentially a timestamp in a recording with an assigned name. You can use events to filter your data temporally to the sections that interest you. 

You may for example want to mark when a certain stimulus became visible and disappeared again with events called `stimulus_start` and `stimulus_end`. Using those, you can filter your data to only consider samples for which the stimulus was present.

Events are also used for the definition of [enrichments](/invisible/explainers/enrichments) to indicate on what sections of your recordings they should be calculated.

You can add events to your recordings post hoc in the project editor, or you can create them at recording time using the [real-time API](/invisible/getting-started/real-time-api).

Existing events can be downloaded as part of the [Raw Data Export](/invisible/explainers/enrichments/#raw-data-exporter).

## Workspaces
Workspaces are containers for your data and enable you to share data in Pupil Cloud with your collaborators. All data in Pupil Cloud is part of a workspace and the workspace owner can control access to it. This includes recordings, wearers, templates, labels, projects, and enrichments, which are all isolated within a workspace. 

### Access Control
Only accounts that have been invited to become members of a workspace are granted access to the data in a workspace. For more fine-grained control of what each member is allowed to do, they can be assigned different roles:

- **Viewer**: This role can view all data, but they are not allowed to edit anything. For example, a viewer can download data, playback recordings, and view heatmaps. A viewer can not delete any data, create projects, or start compute jobs.
- **Editor**: This role has full read and edit access to all data in the workspace, which includes the ability to create enrichments, start compute jobs and delete data.
- **Admin**: Has all permissions of an editor and additionally can invite and remove workspace members and change workspace members' roles.
- **Owner**: The owner of a workspace is the one who initially created the workspace. Owners have all permissions of an Admin. The owner of a workspace can not be changed.

Public sharing of data with people outside of a workspace is **not** currently possible.

### Frequently Asked Questions

**When should I use workspaces?**

Workspaces can have many uses. Typical ones include:
- **Projects or Studies**: Use workspaces to collect projects with a similar theme, "Sport Training" for example. Then every project within the workspace can be used to catalog recordings of different sports, like "Golf Putting", "Archery", "Basketball Free Throw". This ensures data is cleanly separated.
- **Teams**: If you are a member of multiple teams or organizations, you can use multiple workspaces to control what data you are sharing with whom.
- **Clients**: If you are working with clients, you can use multiple workspaces to keep data separated and to control which collaborator should have access to which client’s data.
 
**Is there a limit to the number of workspaces I can create?**

No, you can create as many workspaces as you want!

**Can I move recordings between workspaces?**

No, currently this is not possible.

**Can the ownership of a workspace be transferred?**

This is not currently possible in the app. Please make a request if this is needed via email to `info@pupil-labs.com`.

### Demo Workspace

Every user of Pupil Cloud has access to the Demo Workspace. It contains example projects that can be explored to understand all the features of Pupil Cloud and see them in the context of actual projects. Over time, we will add more projects that illustrate additional features and use-cases.

The existing projects in the demo workspace can not be edited. However, you can create new projects using the existing recordings and within those you can create enrichments and events, and play around with all the features as you like. Things you create and edit in the demo workspace are only visible to you and nobody else.

You can not upload your own recordings to the demo workspace. You can delete all the things you have created, but non of the pre-existing projects or recordings.