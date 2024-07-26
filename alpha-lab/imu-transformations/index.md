---
title: "IMU Coordinate System Snippets"
description: "Use values from the IMU to express your data in a world reference frame."
permalink: /alpha-lab/imu-transformations/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/jag9EQB7840"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/nt_zNSBMJWI/maxresdefault.jpg"
tags: [Neon, Cloud]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# IMU Coordinate System Snippets

<TagLinks :tags="$frontmatter.tags" />

<!-- <Youtube src="3N8jGLYCrNk"/> -->

::: tip
Compare IMU and gaze data in the same coordinate system to better understand how people coordinate head and eye movements.
:::

Here, we will provide some code snippets that can assist when analyzing the IMU data from Neon.

We will use Python with the NumPy and SciPy packages for the code snippets below. Let’s start by loading those:

```python
import numpy as np
from scipy.spatial.transform import Rotation as R
```

First, it is important to understand how the IMU data should be interpreted. The [orientation readings of the calibrated IMU](https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data) are specified with respect to magnetic North and gravity:

- Y axis = vector pointing towards magnetic North.
  - Rotations about this axis are called “roll” and range from -180 to +180 degrees. Wearing Neon normally and sitting or standing upright roughly corresponds to a roll of 0 degrees. Rightward head tilt is positive roll; leftward head tilt is negative roll.
- Z axis = vector pointing upwards, opposite to the direction of gravity.
  - Rotations about this axis are called “yaw” and range from -180 to +180 degrees. When the IMU is calibrated, a Neon module oriented at magnetic North corresponds to a yaw of 0 degrees. Leftward head turn is positive yaw; rightward head turn is negative yaw.
- X axis = cross-product of Y and Z, which is a vector pointing rightwards.
  - Rotations about this axis are called “pitch” and range from -90 to +90 degrees. Wearing Neon normally and sitting or standing upright roughly corresponds to a pitch of 0 degrees. Backward head tilt is positive pitch; forward head tilt is negative pitch

This coordinate system is known as the “global reference frame”. Here, we will refer to it as the world coordinate system. To be very exact, it is distinct from the IMU coordinate system. As the Neon module rotates, the IMU coordinate system rotates with it. The IMU actually measures the rotational difference between its coordinate system and the world coordinate system.

The gyroscope values give the rotational velocity of roll, yaw, and pitch in degrees/s (i.e., they provide the change over time of each of these quantities).

Note that Neon can sit differently on each wearer’s face, such that the headset is not necessarily in line with the naso-occiptal plane. For example, if the wearer is looking at magnetic North, the IMU might still report some deviation from neural orientation. 

Now that we have laid out the relationship between the IMU and world coordinate systems, we can do some useful transformations.

## Obtain IMU heading vectors

An alternate representation of IMU data is a heading vector that points outwards from the center of the IMU. Neutral orientation of the IMU would correspond to a heading vector that points at magnetic North and that is oriented perpendicular to gravity.

Note that a neutral IMU heading vector is unlikely to be perfectly aligned with the floor.

:::: details Code
```python
def imu_heading_in_world(imu_quaternions):
  """
  Construct heading vectors from the IMU's quaternion values.
        
  Inputs:
      - imu_quaternions (Nx4 np.array): A timeseries of quaternions
      from Neon's IMU stream.
        
  Returns:
      - headings_in_world (Nx3 np.array): A timeseries of IMU heading vectors
      in the world coordinate system.
  """

  # We start by specifying the direction of a neutral heading vector
  # in the IMU's coordinate system.
  heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])

  # This array contains a timeseries of transformation matrices,
  # as calculated from the IMU's timeseries of quaternions values.
  # Each of these matrices sends points in the IMU coordinate system to their
  # corresponding coordinates in the world coordinate system.
  imu_to_world = R.from_quat(imu_quaternions).as_matrix()
    
  # We now apply each transformation matrix to the neutral IMU heading vector
  # to obtain a timeseries of heading vectors in the world coordinate system.
  headings_in_world = imu_to_world @ heading_neutral_in_imu_coords

  return headings_in_world
```
::::

## Transform IMU acceleration data to world coordinates

We stated above that the Z axis of the world coordinate system is a vector pointing directly upwards, opposite gravity. However, the Z component of the IMU acceleration data points downwards, such that if you are standing on Earth, then positive acceleration values mean that you are accelerating towards the center of the Earth. The X and Y axes are the same and shared between the orientation and acceleration data provided by the IMU. The function below will transform the acceleration data to the world coordinate system described above.

:::: details Code
```python
def imu_acceleration_in_world(accelerations_imu):
  """
  Transform the IMU's acceleration values to the world coordinate system.
    
  Inputs:
    - accelerations_imu (Nx3 np.array): Timeseries of acceleration data
    from the IMU, where columns are in the order: accel_x, accel_y, accel_z.
    
  Returns:
    - accelerations_world (Nx3 np.array): Timeseries of acceleration data,
    expressed in the world coordinate system.
  """
    
  accelerations_world = accelerations_imu.copy()
  accelerations_world[2] *= -1.0
    
  return accelerations_world
```
::::

## Represent IMU and Gaze Data in the Same Coordinate System

Neon simultaneously records gaze and IMU data, making it possible to study the relationship between head and eye movements.

To facilitate comparison of gaze and head rotations, it can sometimes be easier to represent them in the same coordinate system. The coordinates of gaze are specified with respect to the scene camera coordinate system and the function below, `gaze_scene_to_world`, uses data from the IMU to transform gaze to the world coordinate system.

::: tip
💡 Reminder: The world coordinate system is defined by the direction away from the center of gravity, as well as the direction towards magnetic North.
:::

:::: details Code
```python
def gaze_scene_to_world(gaze_elevations, gaze_azimuths, imu_quaternions):
  """
  Transform a 3D gaze ray to the world coordinate system.
    
  Note that the gaze data and the IMU quaternion should be sampled 
  at the same timestamps. You can linearly interpolate the IMU data
  to ensure this.
    
  The origin of the IMU coordinate system is the same as the
  origin of the world coordinate system.
    
  This function makes use of the spherical_to_cartesian function,
  defined below, that converts 3D gaze rays from spherical coordinates
  to Cartesian coordinates.
    
  Inputs:
    - gaze_elevations (Nx1 np.array): A timeseries of gaze elevations (degrees),
    specified in the scene camera coordinate system.
    - gaze_azimuths (Nx1 np.array): A timeseries of gaze azimuths (degrees),
    specified in the scene camera coordinate system.
    - imu_quaternions (Nx4 np.array): A timeseries of quaternion values
    from Neon's IMU.
    
  Returns:
    - gazes_in_world (Nx3 np.array): A timeseries of 3D Cartesian gaze
    unit vectors, specified in the world coordinate system.
  """
    
  # The IMU and scene camera coordinate systems have a fixed
  # 102 degree rotation offset.
  imu_scene_rotation_diff = np.deg2rad(-90 - 12)
  
  # This matrix send points in the scene camera coordinate
  # system to their corresponding coordinates in the
  # IMU coordinate system.
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
  
  # Neon provides 3D gaze in spherical coordinates by default, 
  # so first transform the gaze data from spherical coordinates
  # to Cartesian coordinates.
  cart_gazes_in_scene = spherical_to_cartesian(gaze_elevations, gaze_azimuths)
    
  # Apply the transformation from the scene camera to the IMU coordinate system.
  gazes_in_imu = scene_to_imu @ cart_gazes_in_scene
  
  # This array contains a timeseries of transformation matrices,
  # as calculated from the IMU's timeseries of quaternions values.
  # Each of these matrices sends points in the IMU coordinate system to their
  # corresponding coordinates in the world coordinate system.
  imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()
  
  # Apply the transformations from the IMU to the world coordinate system.
  gazes_in_world = [imu_to_world @ gaze for imu_to_world, gaze in zip(imu_to_world_matrices, gazes_in_imu.T)]
  
  return np.array(gazes_in_world)


def spherical_to_cartesian(elevations, azimuths):
  """
  Convert Neon's spherical representation of 3D gaze to Cartesian coordinates.
    
  Inputs:
    - elevations (Nx1 np.array): A timeseries of gaze elevations (degrees),
    specified in the scene camera coordinate system.
    - azimuths (Nx1 np.array): A timeseries of gaze azimuths (degrees),
    specified in the scene camera coordinate system.
    
  Returns:
    - cartesian_unit_vectors (Nx3 np.array): A timeseries of gaze unit
    vectors, in Cartesian coordinates, specified in the scene camera
    coordinate system.
  """
    
  elevations_rad = np.deg2rad(elevations)
  azimuths_rad = np.deg2rad(azimuths)

  # Elevation of 0 in Neon system corresponds to Y = 0, but
  # an elevation of 0 in traditional spherical coordinates would
  # correspond to Y = 1, so first we convert elevation to the
  # more traditional format.
  elevations_rad = elevations_rad + np.pi / 2
 
  # Azimuth of 0 in Neon system corresponds to X = 0, but
  # an azimuth of 0 in traditional spherical coordinates would
  # correspond to X = 1. Also, azimuth to the right in Neon is
  # more positive, whereas it is more negative in traditional spherical coordiantes.
  # So, first we convert azimuth to the more traditional format.
  azimuths_rad = -azimuths_rad + np.pi / 2
    
  cartesian_unit_vectors = np.array([
    np.sin(elevations_rad) * np.cos(azimuths_rad),
    np.cos(elevations_rad),
    np.sin(elevations_rad) * np.sin(azimuths_rad),
  ])
  
  return cartesian_unit_vectors
```
::::

## Analysis example

Below is a brief example of running these commands on values from Pupil Cloud.

:::: details Code
```python
import pandas as pd

gaze = pd.read_csv("gaze.csv")
imu = pd.read_csv("imu.csv")

gaze_ts = gaze["timestamp [ns]"]
imu_ts = imu["timestamp [ns]"]

# We have more gaze datapoints (sampled at 200Hz) than
# IMU datapoints (sampled at 110Hz), so linearly interpolate
# the IMU datapoints to be congruent with gaze.
quats_x_resampled = np.interp(gaze_ts, imu_ts, imu["quaternion x"])
quats_y_resampled = np.interp(gaze_ts, imu_ts, imu["quaternion y"])
quats_z_resampled = np.interp(gaze_ts, imu_ts, imu["quaternion z"])
quats_w_resampled = np.interp(gaze_ts, imu_ts, imu["quaternion w"])

quaternions_resampled = np.vstack(
    [quats_x_resampled, quats_y_resampled, quats_z_resampled, quats_w_resampled]
).T

accels_x_resampled = np.interp(gaze_ts, imu_ts, imu["acceleration x [G]"])
accels_y_resampled = np.interp(gaze_ts, imu_ts, imu["acceleration y [G]"])
accels_z_resampled = np.interp(gaze_ts, imu_ts, imu["acceleration z [G]"])

accelerations_resampled = np.vstack(
    [accels_x_resampled, accels_y_resampled, accels_z_resampled]
).T

# Now, we can apply the functions.

imu_headings = imu_heading_in_world(quaternions_resampled)
world_gazes = gaze_scene_to_world(
    gaze["elevation [deg]"],
    gaze["azimuth [deg]"],
    quaternions_resampled,
)
world_accelerations = imu_acceleration_in_world(accelerations_resampled)
```
::::

::: tip
Need assistance with aligning your AprilTags or applying the transformations to your Reference Image Mapper recordings? Or do you have something more custom in mind? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for dedicated support options.
:::