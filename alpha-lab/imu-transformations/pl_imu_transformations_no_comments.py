import numpy as np
from scipy.spatial.transform import Rotation as R

def imu_heading_in_world(imu_quaternions):
    imu_neutral_heading = np.array([0.0, 1.0, 0.0])
    world_rotation_matrices = R.from_quat(imu_quaternions).as_matrix()
    headings_in_world = world_rotation_matrices @ imu_neutral_heading
    return headings_in_world
