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
    # region neutral_heading
    heading_neutral_in_imu_coords = np.array([0.0, 1.0, 0.0])
    # endregion neutral_heading

    # This array contains a timeseries of transformation matrices,
    # as calculated from the IMU's timeseries of quaternions values.
    # Each of these matrices are used to transform points in the IMU
    # coordinate system to their corresponding coordinates in the world
    # coordinate system.
    # region imu_world_matrices
    imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()
    # endregion imu_world_matrices

    # We now apply each transformation matrix to the neutral IMU heading vector
    # to obtain a timeseries of heading vectors in the world coordinate system.
    # region heading_in_world
    headings_in_world = imu_to_world_matrices @ heading_neutral_in_imu_coords
    # endregion heading_in_world
    
    return headings_in_world


