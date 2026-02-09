# Basic Visualizations

Some plugins have the capability to overlay additional visualizations on top of the scene camera video. These plugins can have different ways to customize the appearance.

## Gaze Visualizations

Visualize the gaze positions with a circle or a crosshair for each gaze position, you can add multiple instances of gaze visualizations to build your own custom visualization.

<video width="100%" controls>
  <source src="./viz-gaze.mp4" type="video/mp4">
</video>

The following parameters can be set within the Gaze Data plugin for both circle and crosshair visualizations:

| Parameter              | Description                                                                                                                                                           |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use offset**         | If enabled, gaze points are rendered using the gaze offset. If disabled, raw gaze positions are used.                                                                 |
| **Aggregation**        | Controls how gaze points are displayed over the scene camera frame: `Raw` draws all gaze points; `Mean`, `Median`, `First`, and `Last` draw only one point per frame. |
| **Show when worn**     | If enabled, gaze points are shown when Neon is detected as worn.                                                                                                      |
| **Show when not worn** | If enabled, gaze points are shown when Neon is detected as not worn.                                                                                                  |
| **Color**              | Select the gaze point color and opacity.                                                                                                                              |

If using a circle visualization, you can additionally set the following parameters:

| Parameter        | Description                                     |
| :--------------- | :---------------------------------------------- |
| **Radius**       | The radius of the circle around the gaze point. |
| **Stroke width** | The thickness or width of the stoke in pixels.  |

If using a crosshair visualization, you can set the following parameters:

| Parameter        | Description                                                                                                                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Size**         | The size of the crosshair around the gaze point.                                                                                                         |
| **Gap size**     | The distance in pixels to offset the interior cross endpoints from the gaze position. A value of 0 will make the crosshairs intersect the gaze position. |
| **Stroke width** | The thickness or width of the stoke in pixels.                                                                                                           |
| **Draw dot**     | If enabled, it draws the gaze point at the center of the crosshair.                                                                                      |

## Fixation Visualizations

Similarly to gaze visualizations, you can visualize fixation points with a circle for each fixation position.

<video width="100%" controls>
  <source src="./viz-fix.mp4" type="video/mp4">
</video>

You can set the following parameters within the Fixations plugin:

| Parameter                | Description                                                                                                            |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Use offset**           | If enabled, fixation points are rendered using the gaze offset. If disabled, raw fixations positions are used.         |
| **Ajust for optic flow** | If enabled, fixation points are rendered with optic flow adjustment, reducing the impact of scene motion on fixations. |
| **Color**                | Select the fixation circle color and opacity.                                                                          |
| **Base radius**          | Scaling factor for fixation circle size based on fixation duration.                                                    |
| **Stroke width**         | The thickness or width of the stoke in pixels.                                                                         |
| **Font size**            | Sets the font size of the fixation ID labels.                                                                          |

## Eye Overlay

You can also visualize the eye videos on top of the scene camera video using the `Eye Overlay` plugin. You can resize and drag the eye overlay to position it anywhere on the video player, allowing you to customize the layout of your visualizations.

<video width="100%" controls>
  <source src="./eye-overlay.mp4" type="video/mp4">
</video>

You can set the following parameters:

| Parameter        | Description                                                                           |
| :--------------- | :------------------------------------------------------------------------------------ |
| **Opacity**      | The opacity of the overlay eye video image. `1.0` is opaque and `0.0` is transparent. |
| **Border width** | The thickness or width of the border around the eye video image.                      |
| **Border color** | Select the border color and opacity for the eye video image.                          |

## Others

Other plugins may have different visualizations and customizable parameters, check the documentation of each plugin for more details on the available visualizations and how to customize them.
