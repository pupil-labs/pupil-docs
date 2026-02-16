# Scanpath

<Youtube src="6xn2ehOLS94"/>

The output of the [**Reference Image Mapper**](/pupil-cloud/enrichments/reference-image-mapper/), [**Marker Mapper**](/pupil-cloud/enrichments/marker-mapper/), and [**Manual Mapper**](/pupil-cloud/enrichments/manual-mapper/) enrichments can be visualized as a scanpath over the reference image or surface.

A scanpath is a graphical representation of fixations over time, showing how a participant’s visual attention moves across a scene. 
Scanpaths are a great tool for analyzing visual attention and perception, as they reveal which parts of a scene attracted focus and in what order.

- **Fixation location**s - Visualised as numbered circles.
- **Fixation durations** - Mapped to the size of the circles. Longer fixations correspond to larger circles.
- **First and final fixations** - Marked with a colored border.
- **Saccades** - Represented by lines connecting sequential fixations. Saccade distances between sequential fixations are reflected by the length of the lines. Longer lines correspond to bigger gaze shifts. Note this assumes a task without smooth pursuit movements.

![Edit scanpaths](./scanpath_view.png)

## Setup

To visualize your scanpath:

- Navigate to the `Visualizations` tab.
- Click on `Create Visualization`.
- Select `Scanpath` and the enrichment to which it should be applied.

The following configuration options are available for customizing the scanpath visualization:

- **Show Fixation ID** — Displays fixation IDs next to each fixation when enabled.
- **Scale Circle to Fixation Duration** — Adjusts the size of fixation circles based on fixation duration. Larger circles represent longer fixations. When disabled, all circles are displayed at the same size.
- **Show Scanpath** — Draws lines connecting consecutive fixations to visualize the scanpath.
- **Circle Opacity** — Use the opacity bar to adjust the transparency of the fixation circles.

Additionally, within the **Scanpath** view, you can select which recordings to include, allowing you to create visualizations for a single recording or combine multiple recordings in one overview. In the recording drop-down selector, you can view the fixation count for each recording. This provides a clearer understanding of exactly what data is contributing to the visualization.

::: tip
Only fixations mapped _within_ the reference image or surface are displayed in the scanpath. Fixations located _outside_ 
of the image are not shown. As a result, the visualized fixation IDs may not increase sequentially on the image if an 
observer fixated off and then back on the reference image or surface. 

Fixations that are mapped _outside_ the reference image or surface are still connected by the scanpath. The lines will 
leave the reference image or surface and subsquently return. If a fixation was not mapped at all, then no scanpath 
lines will connect them.
:::

## Export Format

Through the `Visualizations` tab, in the Scanpath view, you can download the final visualization displaying the generated scanpath in `.png` format.
