---
description: A simple guide on how to build experiments in Matlab
---

# Track your Experiment in Matlab

Sometimes you may want to synchronise your MATLAB code with Pupil Invisible recordings. An easy way to separate your data 
is to annotate the recording using [events](/invisible/explainers/basic-concepts/#events). This can be done through the 
[real-time API](/invisible/how-tos/integrate-with-the-real-time-api/introduction).

While we do not officially support MATLAB, we have created a simple MATLAB wrapper so that you can call some functions of
the Pupil Invisible real-time API to send events and remote start/stop recordings.

This wrapper uses the [.net.http package from Matlab](https://mathworks.com/help/matlab/ref/matlab.net.http-package.html#), 
which was introduced in the 2016b release. Before starting, please ensure you use this or a newer version of the software 
and have the package installed.

This guide will show you how to use this wrapper in your experiments. To this end, we will have a minimal demo that 
displays a set of images and records events when these are shown.

::: tip
You can download the wrapper function and the demo code used [here](https://github.com/pupil-labs/realtime-matlab-experiment).
:::

::: tip
A similar guide for tracking an experiment in Python can be found [here](/invisible/how-tos/integrate-with-the-real-time-api/track-your-experiment-progress-using-events).
:::

## How to use Events to keep track of your experiment
Events are essentially timestamps within a recording that have been marked with a name. In this demo, we need to track 
when a specific image is shown during a recording to associate the fixation data with that image. Thus, we will create an 
event at the start and end of each image presentation to mark this section.

Events can either be created post-hoc in the project editor, or at recording time using either the 
[real-time API](/invisible/how-tos/integrate-with-the-real-time-api/introduction) or 
[Pupil Invisible Monitor](/invisible/how-tos/data-collection-with-the-companion-app/monitor-your-data-collection-in-real-time). 
In this example we are interested in fully automating the event creation within MATLAB. Still, depending on your use case, 
you could use either of those methods.

## Implementation
In this demo, we will choose [Psychtoolbox](https://www.psychtoolbox.org/) to display the images due to its widespread 
use within the community. However, you can use any library that suits you best.

All images displayed in the demo are from [Unsplash](https://unsplash.com/). We thank the respective authors for the images.

## How to run the demo
Download the wrapper and the demo code, either cloning the repository or downloading the .zip file from 
[here](https://github.com/pupil-labs/realtime-matlab-experiment).

```git
git clone 
```

Ensure Psychtoolbox is installed and that it runs properly. Confirm that your Pupil Invisible is connected to the same 
network as your computer, and then you can execute the demo code.

```matlab	
demo_pupil_labs();
```
## Running the demo
Besides all the required steps to display an image in Psychtoolbox (you can find that in the demo code), there are several 
calls to the Pupil Invisible real-time API.

First, we start with a call to check if the connection is working.

```matlab
r = pupil_labs_realtime_api();
```

A proper connection will return the code 200 on the `r.StatusCode` property.

Then the images are loaded, and several steps follow to prepare a Psychtoolbox call to the screen. After that, the 
recording is initialised.

```matlab
pupil_labs_realtime_api('Command', 'start');
```
It's good practice to start the recording before drawing anything on the screen, as the device might start the recording 
with a small delay.

In the demo, a logo is shown, and a keystroke is required to start displaying the images when the participant is ready. 
When an image is shown `(Screen('Flip'))`, a starting event call is made to annotate the beginning of the image presentation.

```matlab
pupil_labs_realtime_api('Command', 'event', 'EventName', ['Picture_',num2str(n, '%02.0f'),'_start']);
```
After 4 seconds, another event call is performed to mark the end of the section.

```matlab
pupil_labs_realtime_api('Command', 'event', 'EventName', ['Picture_',num2str(n, '%02.0f'),'_end']);
```
Finally, the recording is stopped and saved after iterating through all the images.

```matlab
pupil_labs_realtime_api('Command', 'save');
```
Additionally, a cancel command was included in our catch routine, so the recording is discarded if an error occur.

```matlab
pupil_labs_realtime_api('Command', 'cancel');
```

That is all we have to do during data collection. Once all recordings have been uploaded to Pupil Cloud, we create a 
project to export them using the [Raw Data Exporter](/invisible/reference/export-formats/#raw-data-exporter). Within the project 
editor we can already see the events in every recording.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../../media/invisible/how-tos/screenshot-matlab-pi-cloud.jpg')"
    max-width=100%
  >
  </v-img>
</div>

## Analysing the data
Having the .csv files means we can read them within MATLAB and start doing some magic!

Let's plot the amount of fixations per image using our demo data.

```matlab	
% Import events and fixations from the csv files as tables
events = readtable("events.csv");
fixations = readtable("fixations.csv");

% Take only those events with Picture in the name as this is what we used
% in demo_PI to target our events.
events = events(contains(events.name, "Picture"), :);
start_events = events(contains(events.name, "start"), :);
end_events = events(contains(events.name, "end"), :);

% New array matching events and fixations
for nImage = 1:height(start_events)
    imIndex(1,nImage) = nImage;
    fixperIm(1, nImage) = sum(fixations.startTimestamp_ns_ >= start_events.timestamp_ns_(nImage) &...
        fixations.endTimestamp_ns_ <= end_events.timestamp_ns_(nImage));
end

% Plot the data
bar(imIndex,fixperIm); 
axis square; grid minor;
ylim([0 max(fixperIm)+1]);
xlabel('Image'); ylabel(['Number of fixations', newline]);
title(['Fixations per image - PI', newline]);
```

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../../media/invisible/how-tos/barplot-matlab-pi-cloud.jpg')"
    max-width=100%
  >
  </v-img>
</div>


## Can I run the wrapper alone? 
Yes, if you are not planning on using Psychtoolbox, you can also use the wrapper alone. Download the 
`pupil_labs_realtime_api` function and add it to your path. Then, call it as you would normally call a function.

```matlab
r = pupil_labs_realtime_api('Command','status');
```
There are several arguments that can be used to control the wrapper:

- `Command`: followed by one of the following commands,  `status`, `start`, `stop`, `save`, `cancel`, or `event`. 
- The default is `status`.
 See the section [Running the demo](#running-the-demo) on how to use them.
- `EventName`: followed by a string with the annotation name for the event, default is `Test event`.
- `URLhost`: followed by a string containing the URL of Pupil Invisible, default is `http://pi.local:8080/`. It's 
- generally good practice to call directly to the URL. Nevertheless, Matlab does resolve the DNS and stores it in the 
- cache, so you will only notice a delay in the first call.   

## Notes
::: warning
The average response time for HTTP requests to Pupil Invisible in MATLAB is 0.33 +- 0.14 seconds (on a 1000 requests test). 
This time might vary depending on your connection and computer load. If you need better time accuracy, check out our 
[Python API](https://pupil-labs-realtime-api.readthedocs.io/en/stable/examples/index.html).
