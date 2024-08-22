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

## Transforming to World Coordinates

One of the key steps when dealing with the IMU is the transformation that take coordinates in the local IMU coordinate system to their corresponding coordinates in the world coordinate system. The quaternion values provided by the IMU can be used to convert between the two coordinate systems. The `transform_imu_to_world` function, defined below, applies the transformation and will be used throughout this article.

```python
def transform_imu_to_world(imu_coordinates, imu_quaternions):
    # This array contains a timeseries of transformation matrices,
    # as calculated from the IMU's timeseries of quaternions values.
    imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()
    
    if len(imu_coordinates) == 1:
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

One representation of IMU orientation data is a heading vector that points outwards from the center of the IMU. Neutral orientation of the IMU would correspond to a heading vector that points at magnetic North and that is oriented perpendicular to the line of gravity:

```python
heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])
headings_in_world = transform_imu_to_world(heading_neutral_in_imu_coords, imu_quaternions)
```

## Transform Acceleration Data to World Coordinates

The IMU’s acceleration data are specified in IMU's local coordinate system. Sometimes, it can be useful to have the acceleration data specified in the world coordinate system instead:

```python
accelerations_in_world = transform_imu_to_world(imu_accelerations, imu_quaternions)
```

## Transform Gaze Data to World Coordinates

Neon simultaneously records gaze and IMU data, making it possible to study the relationship between head and eye movements.

To facilitate the comparison, it can be useful to represent them in the same coordinate system. The coordinates of gaze are specified with respect to the scene camera coordinate system and the function below, `gaze_scene_to_world`, uses data from the IMU to transform gaze to the world coordinate system. The `gaze_scene_to_world` function depends on the `transform_scene_to_imu` and `spherical_to_cartesian_scene`, which we define first.

```python
def transform_scene_to_imu(coords_in_scene, translation = None):
    # The IMU and scene camera coordinate systems have a fixed
    # 102 degree rotation offset. See:
    # https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data
    imu_scene_rotation_diff = np.deg2rad(-102)
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
        return cv2.convertPointsFromHomogeneous(scene_to_imu_homogeneous @ coords_in_scene_homogeneous)
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
    # more positive, whereas it is more negative in traditional spherical coordiantes.
    # So, we convert azimuth to the more traditional format.
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

Now, we have the tools to build the `gaze_scene_to_world` function. Note that the origin of the IMU coordinate system is the same as the origin of the world coordinate system.:

```python
def gaze_scene_to_world(gaze_elevations, gaze_azimuths, imu_quaternions):
    """
        Note that the gaze data and the IMU quaternions should be sampled
        at the same timestamps. You can linearly interpolate the IMU data
        to ensure this.

        The code in this function is adapted from the `plimu` visualization utility:
        https://github.com/pupil-labs/plimu/blob/8b94302982363b203dddea2b15f43c6da60e787e/src/pupil_labs/plimu/visualizer.py#L274-L279

        This function makes use of the spherical_to_cartesian_scene function,
        defined below, that converts Neon's 3D gaze rays from spherical coordinates
        to Cartesian coordinates.
    """

    cart_gazes_in_scene = spherical_to_cartesian_scene(gaze_elevations, gaze_azimuths)
    gazes_in_imu = transform_scene_to_imu(cart_gazes_in_scene.T)
    return imu_to_world(gazes_in_imu.T, imu_quaternions)
```

## Transform 3D Eyestate to World Coordinates

The [3D eyestate estimates](https://docs.pupil-labs.com/neon/data-collection/data-streams/#_3d-eye-states) provided by Neon are aligned with the scene camera coordinate system. This means we can reuse elements of the `gaze_scene_to_world` function to reconstruct the pose of the eyes in the world coordinate system. Note that the origin of the IMU coordinate system is the same as the origin of the world coordinate system.

```python
def eyestate_to_world(eyeball_centers, optical_axes, imu_quaternions):
    """
        Note that the 3D eyestate data and the IMU quaternions should be sampled
        at the same timestamps. You can linearly interpolate the IMU data
        to ensure this.

        The code in this function is adapted from the `plimu` visualization utility:
        https://github.com/pupil-labs/plimu/blob/8b94302982363b203dddea2b15f43c6da60e787e/src/pupil_labs/plimu/visualizer.py#L274-L279
    """

    # The eyeball centers are specified in terms of their distance from
    # the center of the scene camera, so to accurately convert them to
    # world coordinates, we need the position of the scene camera in
    # the IMU coordinate system. Here, we express that position
    # in millimeters.
    scene_camera_position_in_imu = np.array([0.0, -1.3, -6.62])

    # The coordinate system of 3D eyestate is aligned with
    # the coordinate system of the scene camera, so we can
    # make use of the scene->to->IMU transformation procedure.
    #
    # We just need to take into account that the scene camera is
    # offset from the IMU.
    eyeball_centers_in_imu = transform_scene_to_imu(eyeball_centers.T, translation=scene_camera_position_in_imu)
    optical_axes_in_imu = transform_scene_to_imu(optical_axes.T, translation=scene_camera_position_in_imu)

    eyeball_centers_in_world = imu_to_world(eyeball_centers_in_imu.T, imu_quaternions)
    optical_axes_in_world = imu_to_world(optical_axes_in_imu.T, imu_quaternions)

    return eyeball_centers_in_world, optical_axes_in_world
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
def cartesian_to_spherical_world(world_points_3d):
    """
        Convert points in 3D Cartesian world coordinates to spherical coordinates.
    
        When wearing Neon normally, then an elevation and azimuth of 0 degrees corresponds
        to a neutral orientation: i.e., aimed at magnetic North and parallel to the horizon.
    
        Note:
            - For elevation: neutral orientation = 0 elevation; orientation upwards is positive;
            orientation downwards is negative.
            - For azimuth: neutral orientation = 0 azimuth, orientation leftwards is positive;
            orientation rightwards is negative.
    """

    x = world_points_3d[:, 0]
    y = world_points_3d[:, 1]
    z = world_points_3d[:, 2]

    radii = np.sqrt(x**2 + y**2 + z**2)

    elevation = -(np.arccos(z / radii) - np.pi / 2)
    azimuth = np.arctan2(y, x) - np.pi / 2

    # Keep all azimuth values in the range of [-180, 180] to remain consistent
    # with the yaw orientation values provided by the IMU
    azimuth[azimuth < -np.pi] += 2 * np.pi
    azimuth[azimuth > np.pi] -= 2 * np.pi

    # Convert from radians to degrees
    elevation = np.rad2deg(elevation)
    azimuth = np.rad2deg(azimuth)

    return elevation, azimuth
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

heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])
headings_in_world = transform_imu_to_world(heading_neutral_in_imu_coords, quaternions_resampled)

accelerations_in_world = transform_imu_to_world(accelerations_resampled, quaternions_resampled)

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
