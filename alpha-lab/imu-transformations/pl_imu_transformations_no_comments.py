import numpy as np
from scipy.spatial.transform import Rotation as R

def imu_heading_in_world(imu_quaternions):
    imu_neutral_heading = np.array([0.0, 1.0, 0.0])
    world_rotation_matrices = R.from_quat(imu_quaternions).as_matrix()
    headings_in_world = world_rotation_matrices @ imu_neutral_heading
    return headings_in_world


def gaze_scene_to_world(gaze_elevations, gaze_azimuths, imu_quaternions):
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

    cart_gazes_in_scene = spherical_to_cartesian_scene(gaze_elevations, gaze_azimuths)
    gazes_in_imu = scene_to_imu @ cart_gazes_in_scene.T
    imu_to_world_matrices = R.from_quat(imu_quaternions).as_matrix()
    gazes_in_world = [
        imu_to_world @ gaze
        for imu_to_world, gaze in zip(imu_to_world_matrices, gazes_in_imu.T)
    ]

    return np.array(gazes_in_world)


def spherical_to_cartesian_scene(elevations, azimuths):
    elevations_rad = np.deg2rad(elevations)
    azimuths_rad = np.deg2rad(azimuths)

    elevations_rad += np.pi / 2

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
