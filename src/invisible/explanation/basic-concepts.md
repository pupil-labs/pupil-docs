---
description: TODO
---

# Basic Concepts

## Recordings
A recording starts and stops when you press the red record button in Pupil Invisible Companion App. While this should feel similar to recording a video, there is a lot more happening behind the scenes. When you are recording with Pupil Invisible Companion App, you are capturing not only video data, but several more sensors (see [Data Streams]()).

Recordings are designed to be as robust as possible. If at any point a sensor is disconnected during a recording, it will automatically start capturing again as soon as it is reconnected. You could start a recording with no Pupil Invisible glasses connected and plug them in at a later time. As soon as they are connected, data will be captured.

The Pupil Invisible Companion App has several more features to ensure a robust data collection and will e.g. warn you in case the Companion devices battery is running low or if you run out of storage space.

## Wearers
Wearers are the people wearing your Pupil Invisible glasses. In a typical study, each subject would be a wearer. Every recording you make is assigned to a wearer to help you organize your recordings. You can create new wearers on the fly in the Pupil Invisible Companion App or in advance in Pupil Cloud.

Every wearer is assigned a unique ID, such that you can edit the name and profile picture at any time without mixing up your recordings.

In some cases it can make sense to use the offset correction feature to compensate systematic offsets in the predictions of individual wearers (see [How to apply offset corrections?]()). The offset you set will be saved in the wearer profile and applied to future recordings of this subject automatically.


## Templates
Templates are used to add meta-data to a recording. They are forms that can be pre-defined in [Pupil Cloud](/cloud). Template responses entered during a recording will be saved alongside the recording. You can even set individual fields of the template as required, such that a recording can not be stopped before filling out those fields. This way you can ensure that no important information is forgotten during data collection.

You can customize templates to fit your use case. In Pupil Cloud you can create new templates with your own questions. Before your templates become available for selection in the Pupil Invisible Companion app, you need to publish them. After they are published, they can no longer be edited to ensure consistency between responses.

Some example use-cases for templates include the following:

- **Questionnaire**: During the recording of a scientific study participating subjects are often asked to fill out a questionnaire to capture e.g. demographic data. You can simply create a template for your questionnaire so your subjects can fill out the questionnaire on the Companion Device. All questionnaire answers will be saved alongside the recording data associated to the according wearer.
- **Recording Structure**: If your recording schedule has a known structure, e.g. different recording phases or one recording per week, you can set up a template to note down the according phase or week for each recording.
- **Documenting the unplanned**: Data collection does not always go as planned. Sometimes a subject did not quite understand the instructions and sometimes something went wrong in the experiment workflow. Using templates you can immediately note down what happened and flag recordings that will require further inspection. This will be saved as part of the recording, so you do not have to keep a separate list of notes.


## Events
You can annotate relevant points in time in your recordings using **Events**. An event is essentially a timestamp in a recording with an assigned name. You can use events to filter your data temporally to the sections that interest you. 

You may for example want to mark when a certain stimulus became visible and disappeared again with events called `stimulus_start` and `stimulus_end`. Using those, you can filter your data to only consider samples for which the stimulus was present.

Events are also used for the definition of [enrichments]() to indicate on what sections of your recordings they should be calculated.

You can add events to your recordings post-hoc in the project editor, or you can create them at recording time using the real-time API. See "[How to save events using the real-time API?]()" for an example of the latter.

Existing events can be downloaded as part of the [Raw Data Export]().