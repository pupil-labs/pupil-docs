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
- **Y axis**: Select the metric to show on the y axis. Metrics are aggregated from all AOIs with the same label

Additionally, use your mouse or trackpad to zoom and pan within the Bar Chart.

## Export Format

From the Bar Chart visualization or the Downloads view, you can download:

- The visualization in `.png`  format

The download also contains AOI metrics in `.csv` format as reported in the [AOI Metrics CSV](../../areas-of-interest/index.md#exporting-aoi-metrics), with these additional Reach Metrics:

| Field	| Description
| -------- | -------- | 
|**wearer reach**	| Percentage of wearers in which an AOI was fixated on at least once.|
|**recording reach** |	Percentage of recordings in which an AOI was fixated on at least once.|