# Visualization Plugins
We refer to plugins prefixed with Vis as Visualization plugins. These plugins are straightforward and primarily additive (i.e., non-exclusive or unique). 

## Vis Circle
Visualize the gaze positions with a circle for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization.

![Circle Visualizations](./vis-circle.webp)

You can set the following parameters:

| Parameter | Description |
|:----------|:------------|
| Radius | The radius of the circle around the gaze point. |
| Stroke width | The thickness or width of the stoke in pixels. |
| Fill | Toggle on for a circle with solid fill. Toggle off for a circle with only stroke. |
| Color | Define the `Red`, `Green`, and `Blue` values for color. `Alpha` defines the opacity of the stroke and fill. |
 
Here we show an example of how you could use **2** instances of the `Vis Circle` Plugin. The first instance renders the gaze position as a filled blue circle. The second instance renders the same gaze position as yellow stroke circle.

## Vis Cross
Visualize the gaze positions with a cross for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization. 

![Cross Visualizations](./vis-cross.webp)

You can set the following parameters:

| Parameter | Description |
|:----------|:------------|
| Inner offset length | The distance in pixels to offset the interior cross endpoints from the gaze position. A value of `0` will make the crosshairs intersect the gaze position. |
| Outer length | The length of the cross lines in pixels from the gaze position. Note - equal values of `inner offset length` and `outer length` will result in a cross with no length, and therefore not rendered. |
| Stroke width | The thickness or width of the stoke in pixels. |
| Color | Define the `Red`, `Green`, and `Blue` values for color. |

Here we show an example of how you could use **2** instances of the `Vis Cross` Plugin. The first instance renders the gaze position as a blue cross  and the second instance renders the gaze position as a yellow cross, in the outer area.

## Vis Light Points
Visualize the gaze positions as a point of light for each gaze position. The `falloff` of the light from the gaze position is specified by the user. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization.

![Lightpoints Visualizations](./vis-lightpoints.webp)

You can set the following parameters:

| Parameter | Description |
|:----------|:------------|
| Falloff | The distance (in pixels) at which the light begins to fall off (fade to black). A very low number will result in a very dark visualization with tiny white light points. A very large number will result in a visualization of the world view with little or no emphasis on the gaze positions. |

Here we show an example demonstrating `Vis Light Points` with a falloff of 39.

## Vis Polyline
Visualize the gaze positions with a polyline for each gaze position. This plugin is **not unique**, therefore you can add multiple instances of the plugin to build your visualization.

![Polyline Visualizations](./vis-polyline.webp)

 You can set the following parameters:

| Parameter | Description |
|:----------|:------------|
| Line thickness | The thickness or width of the polyline stroke in pixels. |
| Color | Define the `Red`, `Green`, and `Blue` values for color. |

The example above shows a `Vis Polyline` used with `Vis Circle`. The polyline enables one to visualize the sequence of the gaze positions over a single world frame.

## Vis Eye Video Overlay
Visualize the eye cameras video feed. This plugin is **unique**, therefore you can only load one instance of this plugin.

![Eye overlay Visualizations](./vis-eyeoverlay.webp)

This plugin can be used to overlay the eye video on top of the world video. 

You can set the following parameters:

| Parameter | Description |
|:----------|:------------|
| Opacity | the opacity of the overlay eye video image. `1.0` is opaque and `0.0` is transparent. |
| Video scale | Use the slider to increase or decrease the size of the eye videos.|
| Move overlay| Drag the eye videos to move around in the player window. Toggle `off` when done moving the video frames.|
| Show | Show or hide eye video overlays. |
| Horiz. and vert. flip | Flip eye videos vertically or horizontally.|

Here is an example of the `Eye Video Overlay` with binocular eye videos.