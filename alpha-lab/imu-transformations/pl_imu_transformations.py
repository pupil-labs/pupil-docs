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


