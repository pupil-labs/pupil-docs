# Track Your Experiment Progress Using Events
Running a data collection for an experiment can be an organizational challenge. Many experiments are running through different phases and keeping track of what data belongs to what phase can be one of the difficulties.

Using [events](/data-collection/events/), tracking the progress of an experiment becomes very easy and can often be fully automated though.

In this guide, we will demonstrate how to save events at recording time and how to utilize them later during analysis to easily keep track of what phase a certain section of data was recorded in.

To this end we are assuming a minimal experiment setup: we want to record subjects while they observe a series of images of animals and analyze how the average fixation duration differs for each image.

::: tip
You can download the example data used in this guide [here](https://drive.google.com/file/d/1O-HJJbJWRBgcZS1sowCX2srmME5hTub0/view?usp=sharing).
:::

## How To Use Events To Keep Track?
Events are essentially timestamps within a recording that have been marked with a name. We need to keep track of when a specific image is shown during a recording, so we can associate the according fixation data with that image. Thus, we will create an event at the start and end of each image presentation to mark this section.

Events can either be created post hoc in the project editor, or at recording time using either the [real-time API](/real-time-api/) or [Neon Monitor](/data-collection/monitor-app/). In this example, we are interested in fully automating the event creation and will thus use the real-time API to save events, but depending on your use case you could use either of those methods.

## Implementation
The implementation of stimulus presentation is minimal. The images are loaded using OpenCV and are displayed in a full-screen window for a fixed amount of time.


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

Using the real-time API, we now have to connect to a Neon device for recording. We can remotely start the recording and save events before and after the stimulus presentation. The names of the events are chosen as `<animal name>_start` and `<animal name>_end` depending on the animal that is shown.

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

That is all we have to do during data collection. Once the recordings have been uploaded to Pupil Cloud we can already see the events in the timeline for every recording. Next, export the timeseries data of all recordings from Pupil Cloud.


```python
import pandas as pd
events = pd.read_csv("raw-data-export/george-49e4a972/events.csv")
events
```

<div>
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



We can now simply iterate through the recordings and filter the fixation data using the start and end timestamps, to calculate the average number of fixations for every image and subject.


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

        results.loc[rec_name, name] = len(image_fixations["duration [ms]"])

results.loc["Mean"] = results.mean()

results
```




<div>
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
      <td>7</td>
      <td>10</td>
      <td>9</td>
    </tr>
    <tr>
      <th>Jane</th>
      <td>7</td>
      <td>5</td>
      <td>10</td>
    </tr>
    <tr>
      <th>John</th>
      <td>10</td>
      <td>7</td>
      <td>7</td>
    </tr>
    <tr>
      <th>Lisa</th>
      <td>5</td>
      <td>7</td>
      <td>9</td>
    </tr>
    <tr>
      <th>Steve</th>
      <td>7</td>
      <td>8</td>
      <td>11</td>
    </tr>
    <tr>
      <th>Mean</th>
      <td>7.2</td>
      <td>7.4</td>
      <td>9.2</td>
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
plt.ylabel("Number of Fixations")
```




    Text(0, 0.5, 'Number of Fixations')




    
![png](data:image/png;base64,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)
    


## Conclusion
In this guide, you saw how to use events to track the progress of an experiment. Note that this approach can be generalized to much more complex setups.
