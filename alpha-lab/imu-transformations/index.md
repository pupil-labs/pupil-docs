---
title: "Transform IMU Data"
description: "Transform IMU data into different representations and coordinate systems."
permalink: /alpha-lab/imu-transformations/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/DMvmCpCL1ZQ/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/DMvmCpCL1ZQ"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/DMvmCpCL1ZQ/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# IMU Transformations

<TagLinks :tags="$frontmatter.tags" />

::: tip
Want to compare IMU and gaze data in the same coordinate system to better understand how people coordinate 
head and eye movements? The transformation functions in this tutorial will show you how!
:::

This guide contains various transformation functions that can assist when analysing Neon's IMU data.

While working through this guide, it can be helpful to try out our IMU visualization utility, [plimu](https://github.com/pupil-labs/plimu). This can assist in understanding the IMU data and the various coordinate systems.

## Obtain IMU Heading Vectors

An alternate representation of IMU data is a heading vector that points outwards from the center of the IMU. Neutral orientation of the IMU would correspond to a heading vector that points at magnetic North and that is oriented perpendicular to the line of gravity:

```python
<!--@include: ./pl-imu-transformations/pl_imu_transformations_no_comments.py{2,8}-->
```
 
## Transform IMU Acceleration Data to World Coordinates

We mentioned above that the IMU’s acceleration data are specified with respect to the IMU’s coordinate system. Sometimes, it can be useful to have the acceleration data specified in the world coordinate system instead. The function below will perform this transformation:

```python
<!--@include: ./pl-imu-transformations/pl_imu_transformations_no_comments.py{11,21}-->
```

## Represent IMU and Gaze Data in the Same Coordinate System

Neon simultaneously records gaze and IMU data, making it possible to study the relationship between head and eye movements.

To facilitate the comparison, it can be useful to represent them in the same coordinate system. The coordinates of gaze are specified with respect to the scene camera coordinate system and the function below, `gaze_scene_to_world`, uses data from the IMU to transform gaze to the world coordinate system:

```python
<!--@include: ./pl-imu-transformations/pl_imu_transformations_no_comments.py{24,73}-->
```

## Represent IMU and 3D Eyestate in the Same Coordinate System

The [3D eyestate estimates](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) 
provided by Neon are aligned with the scene camera coordinate system. This means we can reuse elements of 
the `gaze_scene_to_world` function to reconstruct the pose of the eyes in the world coordinate system:

```python
<!--@include: ./pl-imu-transformations/pl_imu_transformations_no_comments.py{76,119}-->
```

## Convert (Cartesian) World Points to Spherical Coordinates

When studying head orientation and gaze orientation as observers navigate a 3D environment, it can be useful 
to know how much these quantities deviate from pointing at a given landmark. For instance, you might want to 
know when someone’s gaze or heading deviates from parallel with the horizon. This can be simplified by 
converting world points from Cartesian to spherical coordinates. The orientation values from the IMU are already in such a format. 
For the values returned by  `gaze_scene_to_world`, the function below will do the necessary transformation. 
When wearing Neon normally, then an elevation and azimuth of 0 degrees corresponds to a neutral orientation:
i.e., aimed at magnetic North and parallel to the horizon.


```python
<!--@include: ./pl-imu-transformations/pl_imu_transformations_no_comments.py{122,138}-->
```

## Analysis example

Below is a brief example of how to run the functions on this page using IMU data downloaded from Pupil Cloud.

```python
gaze = pd.read_csv("gaze.csv")
eye3d = pd.read_csv("3d_eye_states.csv")
imu = pd.read_csv("imu.csv")

gaze_ts = gaze["timestamp [ns]"]
imu_ts = imu["timestamp [ns]"]

# We have more gaze datapoints (sampled at 200Hz) than
# IMU datapoints (sampled at 110Hz), so linearly interpolate
# the IMU datapoints to be congruent with gaze.
quaternions_resampled = np.array([
  np.interp(gaze_ts, imu_ts, imu["quaternion x"]),
  np.interp(gaze_ts, imu_ts, imu["quaternion y"]),
  np.interp(gaze_ts, imu_ts, imu["quaternion z"]),
  np.interp(gaze_ts, imu_ts, imu["quaternion w"]),
]).T

accelerations_resampled = np.array([
  np.interp(gaze_ts, imu_ts, imu["acceleration x [g]"]),
  np.interp(gaze_ts, imu_ts, imu["acceleration y [g]"]),
  np.interp(gaze_ts, imu_ts, imu["acceleration z [g]"]),
]).T

# Put the eyestate data in a format that is compatible with
# the transformation functions from this article.
optical_axes_left = np.array([
  eye3d["optical axis left x"],
  eye3d["optical axis left y"],
  eye3d["optical axis left z"],
]).T

eyeball_centers_left = np.array([
  eye3d["eyeball center left x [mm]"],
  eye3d["eyeball center left y [mm]"],
  eye3d["eyeball center left z [mm]"],
]).T

# Now, we can apply the functions.

imu_headings = imu_heading_in_world(quaternions_resampled)

world_accelerations = imu_acceleration_in_world(
  accelerations_resampled,
  quaternions_resampled,
)

world_gazes = gaze_scene_to_world(
  gaze["elevation [deg]"],
  gaze["azimuth [deg]"],
  quaternions_resampled,
)

eye_centers_left_world, optical_axes_left_world = eyestate_to_world(
  eyeball_centers_left,
  optical_axes_left,
  quaternions_resampled,
)

gaze_elevations_world, gaze_azimuths_world = cartesian_to_spherical_world(world_gazes)
```

::: tip
Need assistance with the IMU code in this article? Or do you have something more custom in mind? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
