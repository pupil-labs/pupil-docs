# Track your Experiment Progress using Events
Running a data collection for an experiment can be an organizational challenge. Many experiments are running through different phases and keeping track of what data belongs to what phase can be one of the difficulties.

Using [events](/invisible/explainers/basic-concepts/#events), tracking the progress of an experiment becomes very easy and can often be fully automated though.

In this guide we will demonstrate how to save events at recording time and how to utilize them later during analysis to easily keep track of what phase a certain section of data was recorded in.

To this end we are assuming a minimalistic experiment setup: we want to record subjects while they observe a series of images of animals and analyse how the average fixation duration differs for each image.

## How to use Events to keep track?
Events are essentially timestamps within a recording that have been marked with a name. We need to keep track of when a specific image is shown during a recording, so we can associate the according fixation data with that image. Thus, we will create an event at the start and end of each image presentation to mark this section.

Events can either be created post hoc in the project editor, or at recording time using either the [real-time API]() or [Pupil Invisible Monitor](). In this example we are interested in fully automating the event creation and will thus use the real-time API to save events, but depending on your use-case you could use either of those methods.

You can download the example data used in this guide [here](https://drive.google.com/file/d/1O-HJJbJWRBgcZS1sowCX2srmME5hTub0/view?usp=sharing) and find the code [here](https://github.com/pupil-labs/pupil-docs/src/invisible/how-tos/integrate-with-the-real-time-api/track-your-experiment-progress-using-events/track-your-experiment-progress-using-events.md).

## Implementation
The implementation for stimulus presentation is minimal. The images are loaded using OpenCV and are displayed in a full-screen window for fixed amount of time.


```python
import time
import cv2

image_names = ["owl", "fox", "deer"]

def prepare_stimulus_presentation():
    cv2.namedWindow("Stimulus", cv2.WINDOW_NORMAL)
    cv2.setWindowProperty("Stimulus", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

def present_stimulus(img):
    presentation_time = 5
    start_time = time.perf_counter()
    while time.perf_counter() - start_time < presentation_time:
        cv2.imshow("Stimulus", img)
        cv2.waitKey(1)

def cleanup_stimulus_presentation():
    cv2.destroyAllWindows()
    
```

Using the real-time API, we now have to connect to a Pupil Invisible device for recording. We can remotely start the recording and save events before and after stimulus presentation. The names of the events are chosen as `<animal name>_start` and `<animal name>_end` depending on the animal that is shown.

Once all images have been shown, the recording is stopped remotely.


```python
# The 2 lines below are only needed when accessing 
# the real-time API from a Jupyter notebook
import nest_asyncio
nest_asyncio.apply()

from pupil_labs.realtime_api.simple import discover_one_device

device = discover_one_device()
device.recording_start()

# Wait for a couple seconds before starting
# to give all sensors enough time to initialize
time.sleep(3)

prepare_stimulus_presentation()

for name in image_names:
    img = cv2.imread(name + ".jpg")

    device.send_event(name + "_start")
    present_stimulus(img)    
    device.send_event(name + "_end")

cleanup_stimulus_presentation()
device.recording_stop_and_save()
```

That is all we have to do during data collection. Once all recordings have uploaded to Pupil Cloud, we create a project with them in order to export them using the [Raw Data Exporter](/invisible/explainer/enrichments/raw-data-exporter). In the project editor we can already see the events in every recording.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../../../media/invisible/how-tos/project-editor-screenshot.png')"
    max-width=100%
  >
  </v-img>
</div>

Let's look at at example event and fixation data from the raw data export.


```python
import pandas as pd
events = pd.read_csv("raw-data-export/george-49e4a972/events.csv")
events
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>recording id</th>
      <th>timestamp [ns]</th>
      <th>name</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417853032000000</td>
      <td>recording.begin</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>1</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417856195000000</td>
      <td>owl_start</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>2</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417861273000000</td>
      <td>owl_end</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>3</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417861399000000</td>
      <td>fox_start</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>4</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417866475000000</td>
      <td>fox_end</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>5</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417866613000000</td>
      <td>deer_start</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>6</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417872348000000</td>
      <td>deer_end</td>
      <td>recording</td>
    </tr>
    <tr>
      <th>7</th>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1644417872441000000</td>
      <td>recording.end</td>
      <td>recording</td>
    </tr>
  </tbody>
</table>
</div>




```python
fixations = pd.read_csv("raw-data-export/george-49e4a972/fixations.csv")
fixations.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>section id</th>
      <th>recording id</th>
      <th>fixation id</th>
      <th>start timestamp [ns]</th>
      <th>end timestamp [ns]</th>
      <th>duration [ms]</th>
      <th>fixation x [px]</th>
      <th>fixation y [px]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5b682999-fb7d-42c3-9da0-2253ece6299b</td>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>1</td>
      <td>1644417853698031394</td>
      <td>1644417853910023394</td>
      <td>211</td>
      <td>651.751</td>
      <td>731.750</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5b682999-fb7d-42c3-9da0-2253ece6299b</td>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>2</td>
      <td>1644417853978009394</td>
      <td>1644417854338008394</td>
      <td>359</td>
      <td>528.268</td>
      <td>881.095</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5b682999-fb7d-42c3-9da0-2253ece6299b</td>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>3</td>
      <td>1644417854410160394</td>
      <td>1644417856542104394</td>
      <td>2131</td>
      <td>655.423</td>
      <td>668.033</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5b682999-fb7d-42c3-9da0-2253ece6299b</td>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>4</td>
      <td>1644417856590003394</td>
      <td>1644417857238017394</td>
      <td>648</td>
      <td>523.187</td>
      <td>677.434</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5b682999-fb7d-42c3-9da0-2253ece6299b</td>
      <td>49e4a972-7d6b-4b42-b931-bf64b91f952b</td>
      <td>5</td>
      <td>1644417857298000394</td>
      <td>1644417858693973394</td>
      <td>1395</td>
      <td>772.743</td>
      <td>640.843</td>
    </tr>
  </tbody>
</table>
</div>



We can now simply iterate through the recordings and filter the fixation data using the start and end timestamps, to calculate the average fixation duration of every image and subject.


```python
import os
import json

export_folder = "raw-data-export/"

results = pd.DataFrame(columns=image_names)

for f in os.listdir(export_folder):
    rec_folder = os.path.join(export_folder, f)
    if not os.path.isdir(rec_folder):
        continue
    
    # Read all relevant files
    info_path = os.path.join(rec_folder, "info.json")
    with open(info_path) as info:
        rec_name = json.load(info)["template_data"]["recording_name"]

    events_path = os.path.join(rec_folder, "events.csv")
    events = pd.read_csv(events_path)

    fixations_path = os.path.join(rec_folder, "fixations.csv")
    fixations = pd.read_csv(fixations_path)

    # Calculate average fixation duration per recording and image
    for name in image_names:
        start_event = events[events["name"] == name + "_start"]
        start_timestamp = start_event["timestamp [ns]"].values[0]
        
        end_event = events[events["name"] == name + "_end"]
        end_timestamp = end_event["timestamp [ns]"].values[0]

        condition = (fixations["start timestamp [ns]"] >= start_timestamp) & (fixations["end timestamp [ns]"] <= end_timestamp)
        image_fixations = fixations[condition]

        results.loc[rec_name, name] = image_fixations["duration [ms]"].mean()

results.loc["Mean"] = results.mean()

results
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>owl</th>
      <th>fox</th>
      <th>deer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>George</th>
      <td>597.714286</td>
      <td>426.1</td>
      <td>590.111111</td>
    </tr>
    <tr>
      <th>Jane</th>
      <td>667.142857</td>
      <td>772.4</td>
      <td>512.2</td>
    </tr>
    <tr>
      <th>John</th>
      <td>387.9</td>
      <td>640.571429</td>
      <td>664.857143</td>
    </tr>
    <tr>
      <th>Lisa</th>
      <td>829.8</td>
      <td>653.714286</td>
      <td>478.666667</td>
    </tr>
    <tr>
      <th>Steve</th>
      <td>583.285714</td>
      <td>539.125</td>
      <td>406.090909</td>
    </tr>
    <tr>
      <th>Mean</th>
      <td>613.168571</td>
      <td>606.382143</td>
      <td>530.385166</td>
    </tr>
  </tbody>
</table>
</div>



Visualized as a bar chart it looks as follows:


```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 5))

for idx, name in enumerate(image_names):
    plt.bar(idx, results.loc["Mean", name])

plt.xticks(range(len(image_names)), image_names)
plt.xlabel("Image")
plt.ylabel("Average fixation duration [ms]")
```




    Text(0, 0.5, 'Average fixation duration [ms]')




    
![png](./output_10_1.png)
    


## Conclusion
In this guide you saw how to use events to track the progress of an experiment. Note that this approach can be generalized to much more complex setups.
