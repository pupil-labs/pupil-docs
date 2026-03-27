# Bar Chart

Use the Bar Chart to visualize gaze metrics for each [AOI label](/pupil-cloud/areas-of-interest/). The output from any enrichment in your [Project](https://docs.pupil-labs.com/neon/pupil-cloud/projects/) with AOI labels can be used as input for the Bar Chart visualization. This enables comparison *across* multiple and varied Enrichments.

<!-- todo insert video and update links above -->

## Setup

To create your Bar Chart:

- Navigate to the `Visualizations` tab.
- Click on `Create Visualization`.
- Select `Bar Chart`.

Data from all enrichments will be included by default. The following configuration options are available for customizing the Bar Chart visualization:

- **Enrichment Data**: Select enrichments that you want to include in the visualization
- **Recording Data**: Select recordings that you want to include in the visualization. If you want to exclude a specific recording or isolate a sub-selection of recordings, you can do so with this filter.
- **X axis**: Select AOI labels to show on the x axis
- **Y axis**: Select the metric to show on the y axis - metrics are aggregated from all AOIs with the same label
  - Total Fixation Duration [ms]
  - Average Fixation Duration [ms]
  - Time to First Fixation [ms]
  - Wearer Reach
  - Recording Reach
  - Average Fixation Count

Additionally, use your mouse or trackpad to zoom and pan within the Bar Chart.

## Metrics
Metrics are calculated using data from the selected enrichments and recordings.

### **Total Fixation Duration**

Total fixation duration on AOIs with the selected label. 

Total Fixation Duration = `sum of duration fixated on AOIs with the selected label / number of selected recordings`

### **Average Fixation Duration**

Average fixation duration on AOIs with the selected label. 

Average Fixation Duration = `sum of duration fixated on AOIs with the selected label / sum of fixation count on AOIs with the selected label` 

### **Time to First Fixation**

Average time until an AOI with the selected label gets fixated on for the first time in a recording.

Time to First Fixation = `sum of time until an AOI with the selected label gets fixated on for the first time in a recording / number of recordings included` 

### **Wearer Reach**

Percentage of wearers in which an AOI with the selected label was fixated on at least once. 

Wearer Reach = `count of the wearers who fixated on an AOI with the selected label / sum of wearers from selected recordings`

### **Recording Reach**

Percentage of recordings in which an AOI with the selected label was fixated on at least once. 

Recording Reach = `number of the recordings in which an AOI with the selected label was fixated on / sum of selected recordings`

### **Average Fixation Count**

Average number of fixations on the AOIs with the selected label.

Average Fixation Count =  `number of fixations on AOIs with the selected label / number of recordings selected`

## Export Format

From the Bar Chart visualization or the Downloads view, you can download:

- the visualization in `.png`  format
- `aoi_label_metrics.csv`

| Field	| Description
| -------- | -------- | 
|**label id** |	Unique identifier of the label.|
|**label name** |	Name of the label.|
|**total fixation duration [ms]**	| Total fixation duration on the AOIs with the label.|
|**average fixation duration [ms]** |	Average fixation duration on AOIs with the label.|
|**time to first fixation [ms]** |	Average time until an AOI with the label gets fixated on for the first time in a recording.|
|**wearer reach**	| Percentage of wearers in which an AOI with the label was fixated on at least once.|
|**recording reach** |	Percentage of recordings in which an AOI with the label was fixated on at least once.|
|**average fixation count** |	Average number of fixations on the AOI with the label.|