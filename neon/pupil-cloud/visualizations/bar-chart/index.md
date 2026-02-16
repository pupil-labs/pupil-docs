# Bar Chart

Use the Bar Chart to visualize gaze metrics for each [AOI label]. The output from any enrichment in your [Project](https://docs.pupil-labs.com/neon/pupil-cloud/projects/) with AOI labels can be used as input for the Bar Chart visualization. This enables comparison *across* multiple and varied Enrichments.

<!-- todo insert video and update links above -->

## Setup

To create your Bar Chart:

- Navigate to the `Visualizations` tab.
- Click on `Create Visualization`.
- Select `Bar Chart`.

Data from all enrichments will be included by default. The following configuration options are available for customizing the Bar Chart visualization:

- **Recording Data**: Select recordings that you want to include in the visualization (all recordings are included by default)
- **Enrichment Data**: Select enrichments that you want to include in the visualization (all enrichments are included by default)
- **X axis**: Select AOI labels to show on the x axis
- **Y axis**: Select the metric to show on the y axis - metrics are aggregated from all AOIs with the same label
    - total fixation duration [ms]
    - average fixation duration [ms]
    - time to first fixation [ms]
    - wearer reach
    - fixation count

Additionally, use your mouse or trackpad to zoom and pan within the Bar Chart.

## Export Format

You can download the Bar Chart from within the Bar Chart visualization view in `.png` format.
