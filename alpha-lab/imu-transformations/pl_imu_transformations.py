import numpy as np
from scipy.spatial.transform import Rotation as R

def imu_heading_in_world(imu_quaternions):
    """
    Construct heading vectors from the IMU's quaternion values.

    Inputs:
      - imu_quaternions (Nx4 np.array): A timeseries of quaternions
      from Neon's IMU stream.

    Returns:
      - headings_in_world (Nx3 np.array): The corresponding timeseries of
      IMU heading vectors in the world coordinate system.
    """

    # We start by specifying the direction of a neutral heading vector
    # in the IMU's coordinate system.
    imu_neutral_heading = np.array([0.0, 1.0, 0.0])

    # This array contains a timeseries of transformation matrices,
    # as calculated from the IMU's timeseries of quaternions values.
    # Each of these matrices are used to transform points in the IMU
    # coordinate system to their corresponding coordinates in the world
    # coordinate system.
    world_rotation_matrices = R.from_quat(imu_quaternions).as_matrix()

    # We now apply each transformation matrix to the neutral IMU heading vector
    # to obtain a timeseries of heading vectors in the world coordinate system.
    headings_in_world = world_rotation_matrices @ imu_neutral_heading
    
    return headings_in_world


def gaze_scene_to_world(gaze_elevations, gaze_azimuths, imu_quaternions):
    """
    Transform a 3D gaze ray to the world coordinate system.

    Note that the gaze data and the IMU quaternion should be sampled
    at the same timestamps. You can linearly interpolate the IMU data
    to ensure this.

    The origin of the IMU coordinate system is the same as the
    origin of the world coordinate system.
    The code in this function is adapted from the `plimu` visualization utility:
    https://github.com/pupil-labs/plimu/blob/8b94302982363b203dddea2b15f43c6da60e787e/src/pupil_labs/plimu/visualizer.py#L274-L279

    This function makes use of the spherical_to_cartesian_scene function,
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
      - gazes_in_world (Nx3 np.array): The corresponding timeseries of
      3D Cartesian gaze unit vectors, specified in the world coordinate system.
    """

    # The IMU and scene camera coordinate systems have a fixed
    # 102 degree rotation offset. See:
    # https://docs.pupil-labs.com/neon/data-collection/data-streams/#movement-imu-data
    imu_scene_rotation_diff = np.deg2rad(-90 - 12)

    # This matrix is used to transform points in the scene
    # camera coordinate system to their corresponding coordinates
    # in the IMU coordinate system.
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
    # so we first transform the gaze data from spherical coordinates
    # to Cartesian coordinates.
    cart_gazes_in_scene = spherical_to_cartesian_scene(gaze_elevations, gaze_azimuths)

    # Apply the transformation from the scene camera to the IMU coordinate system.
    gazes_in_imu = scene_to_imu @ cart_gazes_in_scene.T

    # This array contains a timeseries of transformation matrices,
    # as calculated from the IMU's timeseries of quaternions values.
    # Each of these matrices are used to transform points in the IMU coordinate
    # system to their corresponding coordinates in the world coordinate system.
    imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()

    # Apply the transformations from the IMU to the world coordinate system.
    gazes_in_world = [
        imu_to_world @ gaze
        for imu_to_world, gaze in zip(imu_to_world_matrices, gazes_in_imu.T)
    ]

    return np.array(gazes_in_world)


def spherical_to_cartesian_scene(elevations, azimuths):
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
    elevations_rad += np.pi / 2

    # Azimuth of 0 in Neon system corresponds to X = 0, but
    # an azimuth of 0 in traditional spherical coordinates would
    # correspond to X = 1. Also, azimuth to the right in Neon is
    # more positive, whereas it is more negative in traditional spherical coordiantes.
    # So, first we convert azimuth to the more traditional format.
    azimuths_rad *= -1.0
    azimuths_rad += np.pi / 2

    cartesian_unit_vectors = np.array(
        [
            np.sin(elevations_rad) * np.cos(azimuths_rad),
            np.cos(elevations_rad),
            np.sin(elevations_rad) * np.sin(azimuths_rad),
        ]
    ).T

    return cartesian_unit_vectors
