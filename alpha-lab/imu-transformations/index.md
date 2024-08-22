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

While working through this guide, it can be helpful to try out our IMU visualization utility, [plimu](https://github.com/pupil-labs/plimu). This can assist in understanding the IMU data and the various coordinate systems. For example, some of the code in this article is [adapted from it](https://github.com/pupil-labs/plimu/blob/8b94302982363b203dddea2b15f43c6da60e787e/src/pupil_labs/plimu/visualizer.py#L274-L279).

## Transform to World Coordinates

One of the key steps when dealing with the IMU is the transformation that takes coordinates in the local IMU coordinate system to their corresponding coordinates in the world coordinate system. The quaternion values provided by the IMU can be used to convert between the two coordinate systems. The `transform_imu_to_world` function, defined below, will be used throughout this article.

Note that the origin of the IMU coordinate system is the same as the origin of the world coordinate system.

```python
from scipy.spatial.transform import Rotation as R

def transform_imu_to_world(imu_coordinates, imu_quaternions):
    # This array contains a timeseries of transformation matrices,
    # as calculated from the IMU's timeseries of quaternions values.
    imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()
    
    if np.ndim(imu_coordinates) == 1:
        return imu_to_world_matrices @ imu_coordinates
    else:
        return np.array([
            imu_to_world @ imu_coord
            for imu_to_world, imu_coord in zip(
                imu_to_world_matrices, imu_coordinates
            )
        ])
```

Now that we have the `transform_imu_to_world` function, let's use it!

## Obtain IMU Heading Vectors

An alternative representation of IMU orientation data is a heading vector that points outwards from the center of the IMU. Neutral orientation of the IMU would correspond to a heading vector that points at magnetic North and that is oriented perpendicular to the line of gravity:

```python
heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])
headings_in_world = transform_imu_to_world(
    heading_neutral_in_imu_coords, imu_quaternions,
)
```

## Acceleration in World

The IMU’s acceleration data are specified in its local coordinate system. Sometimes, it can be useful to have the acceleration data specified in the world coordinate system instead:

```python
accelerations_in_world = transform_imu_to_world(
    imu_accelerations, imu_quaternions,
)
```

## Gaze to World Coordinates

Neon simultaneously records gaze and IMU data, making it possible to study the relationship between head and eye movements.

To facilitate the comparison, it can be useful to represent these data streams in the same coordinate system. An important step is accounting for [the fixed 102 degree rotation offset between the scene camera and IMU coordinate systems](https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data), as depicted below.

![Diagrams showing the 102 degree rotation offset between the IMU and scene camera coordinate systems.](./imu-scene_camera_offset-black.png)

We can use data from the IMU to transform gaze from scene camera coordinates to world coordinates. This is facilitated by the `transform_scene_to_imu` and `spherical_to_cartesian_scene` functions:

```python
def transform_scene_to_imu(coords_in_scene, translation = None):
    imu_scene_rotation_diff = np.deg2rad(-90 - 12)
    scene_to_imu = np.array(
        [
            [1.0, 0.0, 0.0],
            [
                0.0,
                np.cos(imu_scene_rotation_diff),
                -np.sin(imu_scene_rotation_diff),
            ],
            [
                0.0,
                np.sin(imu_scene_rotation_diff),
                np.cos(imu_scene_rotation_diff),
            ],
        ]
    )

    if translation:
        scene_to_imu_homogeneous = np.zeros((4, 4))
        scene_to_imu_homogeneous[:3, :3] = scene_to_imu
        scene_to_imu_homogeneous[:3, 3] = translation

        coords_in_scene_homogeneous = cv2.convertPointsToHomogeneous(coords_in_scene)
        return cv2.convertPointsFromHomogeneous(
            scene_to_imu_homogeneous @ coords_in_scene_homogeneous
        )
    else:
        return scene_to_imu @ coords_in_scene


def spherical_to_cartesian_scene(elevations, azimuths):
    """
    Convert Neon's spherical representation of 3D gaze to Cartesian coordinates.
    """

    elevations_rad = np.deg2rad(elevations)
    azimuths_rad = np.deg2rad(azimuths)

    # Elevation of 0 in Neon system corresponds to Y = 0, but
    # an elevation of 0 in traditional spherical coordinates would
    # correspond to Y = 1, so we convert elevation to the
    # more traditional format.
    elevations_rad += np.pi / 2

    # Azimuth of 0 in Neon system corresponds to X = 0, but
    # an azimuth of 0 in traditional spherical coordinates would
    # correspond to X = 1. Also, azimuth to the right in Neon is
    # more positive, whereas it is more negative in traditional
    # spherical coordiantes. So, we convert azimuth to the more
    # traditional format.
    azimuths_rad *= -1.0
    azimuths_rad += np.pi / 2

    return np.array(
        [
            np.sin(elevations_rad) * np.cos(azimuths_rad),
            np.cos(elevations_rad),
            np.sin(elevations_rad) * np.sin(azimuths_rad),
        ]
    ).T
```

Now we have the tools to convert gaze data to world coordinates:

```python
# The gaze data and the IMU quaternions should be sampled at the
# same timestamps. You can linearly interpolate the IMU data to
# ensure this.

cart_gazes_in_scene = spherical_to_cartesian_scene(gaze_elevations, gaze_azimuths)
gazes_in_imu = transform_scene_to_imu(cart_gazes_in_scene.T)
gazes_in_world = transform_imu_to_world(gazes_in_imu.T, imu_quaternions)
```

## Eyestate to World Coordinates

The [3D eyestate estimates](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) provided by Neon are aligned with the scene camera coordinate system. To reconstruct the pose of the eyes in the world coordinate system, we need to also consider that the scene camera coordinate system is positioned downwards and a bit back from the IMU:

```python
# The 3D eyestate data and the IMU quaternions should be sampled
# at the same timestamps. You can linearly interpolate the IMU data
# to ensure this.

# The eyeball centers are specified in terms of their distance from
# the center of the scene camera, so to accurately convert them to
# world coordinates, we need to account for the position of the
# scene camera in the IMU coordinate system. Here, we express that
# position in millimeters.
scene_camera_position_in_imu = np.array([0.0, -1.3, -6.62])

eyeball_centers_in_imu = transform_scene_to_imu(
    eyeball_centers.T, translation=scene_camera_position_in_imu,
)
eyeball_centers_in_world = transform_imu_to_world(
    eyeball_centers_in_imu.T, imu_quaternions,
)

optical_axes_in_imu = transform_scene_to_imu(
    optical_axes.T, translation=scene_camera_position_in_imu,
)
optical_axes_in_world = transform_imu_to_world(
    optical_axes_in_imu.T, imu_quaternions,
)
```

## World Spherical Coordinates

When studying head orientation and gaze orientation as observers navigate a 3D environment, it can be useful to know how much these quantities deviate from pointing at a given landmark or direction. For instance, you might want to know when someone’s gaze or heading deviates from parallel with the horizon. This can be simplified by converting world points from Cartesian to spherical coordinates. The [Euler angles from the IMU](https://docs.pupil-labs.com/neon/data-collection/data-streams/#euler-angles) are already in a compatible format. For gaze data in world coordinates, the `cartesian_to_spherical_world` function below will do the necessary transformation. When wearing Neon normally, an elevation and azimuth of 0 degrees corresponds to a neutral orientation: i.e., aimed at magnetic North and parallel to the horizon.

```python
def cartesian_to_spherical_world(world_points_3d):
    """
    Convert points in 3D Cartesian world coordinates to spherical coordinates.
    
    For elevation:
      - Neutral orientation = 0 (i.e., parallel with horizon)
      - Upwards is positive
      - Downwards is negative

    For azimuth:
      - Neutral orientation = 0 (i.e., aligned with magnetic North)
      - Leftwards is positive
      - Rightwards is negative
    """

    x = world_points_3d[:, 0]
    y = world_points_3d[:, 1]
    z = world_points_3d[:, 2]

    radii = np.sqrt(x**2 + y**2 + z**2)

    elevation = -(np.arccos(z / radii) - np.pi / 2)
    azimuth = np.arctan2(y, x) - np.pi / 2

    # Keep all azimuth values in the range of [-180, 180] to remain
    # consistent with the yaw orientation values provided by the IMU.
    azimuth[azimuth < -np.pi] += 2 * np.pi
    azimuth[azimuth > np.pi] -= 2 * np.pi

    elevation = np.rad2deg(elevation)
    azimuth = np.rad2deg(azimuth)

    return elevation, azimuth
```

::: tip
Need assistance with the IMU code in this article? Or do you have something more custom in mind? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
