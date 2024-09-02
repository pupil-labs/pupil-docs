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
Want to compare IMU and gaze data in the same coordinate system to better understand how people coordinate head and eye movements? The transformation functions in this tutorial will show you how!
:::

This guide contains various transformation functions that can assist when working with Neon's IMU data.

## IMU to World Coordinates

One of the key steps when working with IMU data is the transformation that takes coordinates in the local IMU coordinate system to their corresponding coordinates in [the world coordinate system](http://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data). The quaternion values provided by the IMU can be used to convert between the two coordinate systems. The `transform_imu_to_world` function, defined below, will be used throughout this article.

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

### Obtain IMU Heading Vectors

An alternative representation of IMU orientation data is a heading vector that points outwards from the center of the IMU. It can be useful to compare this heading vector with the 3D gaze vectors in world coordinates.

```python
def imu_heading_in_world(imu_quaternions):
    heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])
    return transform_imu_to_world(
        heading_neutral_in_imu_coords, imu_quaternions
    )
```

Neutral orientation of the IMU would correspond to a heading vector that points at magnetic North and that is oriented perpendicular to the line of gravity.

### IMU Acceleration in World

The IMU’s acceleration data are specified in its local coordinate system. If you want to understand how the observer is accelerating through their environment, then it can be easier to have the acceleration data specified in the world coordinate system:

```python
accelerations_in_world = transform_imu_to_world(
    imu_accelerations, imu_quaternions
)
```

## Scene to World Coordinates

Neon simultaneously records data in the scene camera and IMU coordinate systems, making it possible to study the relationship between head and eye movements.

To facilitate the comparison, it can be useful to represent these data streams in the same coordinate system. An important step is accounting for [the fixed 102 degree rotation offset between the scene camera and IMU coordinate systems](https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data), as depicted below.

![Diagrams showing the fixed 102 degree rotation offset between the IMU and scene camera coordinate systems.](./imu-scene_camera_offset-black.png)

We can use data from the IMU to transform gaze in scene camera coordinates to world coordinates. We proceed by building a `transform_scene_to_imu` function that handles the rotation between the two coordinate systems. It also accepts a `translation_in_imu` keyword argument to specify if points should be shifted in the IMU system. This will be relevant when converting 3D eyestate to world coordinates.


```python
def transform_scene_to_imu(coords_in_scene, translation_in_imu=np.zeros((3,))):
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

    coords_in_imu = scene_to_imu @ coords_in_scene.T

    coords_in_imu[0, :] += translation_in_imu[0]
    coords_in_imu[1, :] += translation_in_imu[1]
    coords_in_imu[2, :] += translation_in_imu[2]

    return coords_in_imu.T
```

Putting together the `transform_scene_to_imu` and `transform_imu_to_world` functions, we can build a composite `transform_scene_to_world` function:

```python
def transform_scene_to_world(coords_in_scene, imu_quaternions, translation_in_imu=np.zeros((3,))):
    coords_in_imu = transform_scene_to_imu(coords_in_scene, translation_in_imu)
    return transform_imu_to_world(coords_in_imu, imu_quaternions)
```

You can now use this function to transform data in scene camera coordinates to world coordinates. Head to the [Application Example](#application-example) to see how!

## Eyestate to World Coordinates

The [3D eyestate estimates](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) provided by Neon are aligned with the scene camera coordinate system. This means we can use the `transform_scene_to_world` function above to reconstruct the pose of the eyes in the world coordinate system. We just need to consider that the scene camera is displaced a bit from the IMU.
Since the eyeball center and optical axis values provided by the 3D eyestate estimates are intrinsically linked, we provide the `eyestate_to_world` function to simplify doing the conversions:

```python
# The 3D eyestate data and the IMU quaternions should be sampled
# at the same timestamps. You can linearly interpolate the IMU data.
# See the Application Example:
# http://docs.pupil-labs.com/alpha-lab/imu-transformations/#application-example

def eyestate_to_world(eyeball_centers, optical_axes, imu_quaternions):
    """
    The eyeball_centers and optical_axes inputs are for the same eye.
    """

    # The eyeball centers are specified relative to the center of the scene
    # camera, so we need to account for the position of the scene camera in
    # the IMU coordinate system. Here, we express that position in millimeters.
    scene_camera_position_in_imu = np.array([0.0, -1.3, -6.62])
    eyeball_centers_in_world = transform_scene_to_world(
        eyeball_centers, imu_quaternions, translation=scene_camera_position_in_imu
    )

    # The optical axes are unit vectors originating at the eyeball centers,
    # so they should not be translated.
    optical_axes_in_world = transform_scene_to_world(
        optical_axes, imu_quaternions
    )

    return eyeball_centers_in_world, optical_axes_in_world
```

## 3D Gaze to World Coordinates

Neon provides 3D gaze data in [spherical coordinates (i.e., `azimuth/elevation [deg]`)](https://docs.pupil-labs.com/neon/data-collection/data-format/#gaze-csv). The `transform_scene_to_world` function above expects 3D Cartesian coordinates, so to convert spherical 3D gaze to world coordinates, we will need the `spherical_to_cartesian_scene` function:

```python
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

Now we have the tools to convert 3D gaze data to world coordinates:

```python
def gaze_3d_to_world(gaze_elevation, gaze_azimuth, imu_quaternions):
    cart_gazes_in_scene = spherical_to_cartesian_scene(gaze_elevation, gaze_azimuth)
    return transform_scene_to_world(cart_gazes_in_scene, imu_quaternions)
```

## 2D Gaze to World Coordinates

If you are starting from [the 2D gaze values in scene image coordinates (i.e., `gaze x/y [px]`)](https://docs.pupil-labs.com/neon/data-collection/data-format/#gaze-csv), then you will need to first [undistort](https://docs.pupil-labs.com/alpha-lab/undistort/) and unproject those points to obtain the corresponding 3D gaze vectors. Note that this requires [loading the scene camera calibration data](https://docs-staging.pupil-labs.com/alpha-lab/undistort/#reading-from-the-cloud-download-json-file).

```python
def unproject_2d_gaze(gaze_points_2d, scene_camera_matrix, scene_distortion_coefficients):
    """
    Transform the 2D gaze values from Neon to 3D gaze vectors.
    """

    gaze_points_2d_undist = cv2.undistortPoints(gaze_points_2d, scene_camera_matrix, scene_distortion_coefficients)
    gaze_vectors_3d = cv2.convertPointsToHomogeneous(gaze_points_2d_undist)
    gaze_vectors_3d /= np.linalg.norm(gaze_vectors_3d, axis=2)[:, np.newaxis]
    
    return gaze_vectors_3d
```

Then, we can use the functions from [the previous section](#3d-gaze-to-world-coordinates) to convert 2D gaze to 3D world coordinates:

```python
# The gaze data and the IMU quaternions should be sampled at the
# same timestamps. You can linearly interpolate the IMU data to
# ensure this.
# See the Application Example:
# http://docs.pupil-labs.com/alpha-lab/imu-transformations/#application-example

gaze_points_2d = gaze[["gaze x [px]", "gaze y [px]"]].to_numpy()
def gaze_2d_to_world(gaze_points_2d, scene_camera_matrix, scene_distortion_coefficients, imu_quaternions):
    cart_gazes_in_scene = undistort_and_unproject(
        gaze_points_2d, scene_camera_matrix, scene_distortion_coefficients
    )
    return transform_scene_to_world(
        cart_gazes_in_scene, imu_quaternions
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

## Application Example

Below, we present a video showing how some of the functions in this article where used to visualize different combinations of head and eye movements in world coordinates. The code for producing the visualization [can be found here](https://gist.github.com/rennis250/8a684ea1e2f92c79fa2104b7a0f30e20).

<Youtube src="lbmyBgpS2OE"/>

## Related content

It can also be helpful to try out our IMU visualization utility, [plimu](https://github.com/pupil-labs/plimu). This can assist in understanding the IMU data and the various coordinate systems. For example, some of the code in this article is [adapted from it](https://github.com/pupil-labs/plimu/blob/8b94302982363b203dddea2b15f43c6da60e787e/src/pupil_labs/plimu/visualizer.py#L274-L279).

::: tip
Need assistance with the IMU code in this article? Or do you have something more custom in mind? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::
