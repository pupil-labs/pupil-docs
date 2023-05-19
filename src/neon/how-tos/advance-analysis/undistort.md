---
title: Undistorting Video and Gaze Data
description: "Undistorting Neon's scene camera video and gaze data, using the intrinsic and extrinsic camera parameters."
permalink: /neon/how-tos/advance-analysis/undistort/
---
# Correcting for the fish-eye lens distortion on Neon's scene camera
One particular challenge that often arises in eye tracking setups is the presence of [fish-eye lens distortions](https://en.wikipedia.org/wiki/Fisheye_lens), also known as barrel distortions. Fish-eye lenses, with their wide-angle characteristics, allow for a broad field of view, enabling the capture of more information within a single frame. However, this advantage comes at the cost of introducing non-linear distortions. 

While we account for them in Pupil Cloud, and we even give you the possibility to download the undistorted video using the [Gaze Overlay enrichment](/enrichments/gaze-overlay), this is not the case when using the [Realtime API](/neon/real-time-api) or raw data, where you may want to correct it by yourself.

## Why is it important to correct for fisheye lens distortions?
Correcting these distortions brings many benefits, by aligning the captured scene with the underlying geometry of the environment, the corrected images provide a more faithful representation of the observer's visual perspective. This alignment is particularly crucial in scenarios where spatial relationships, distances, or areas of interest are essential factors under investigation.

Moreover, the correct calibration of fisheye lens distortions ensures comparability and consistency across different eye tracking studies. Researchers often rely on datasets collected from various experiments, and without a standardized correction procedure, variations in lens distortions could introduce unnecessary variability and hinder the ability to generalize findings across studies.

Beyond the scientific realm, the application of fisheye lens correction extends to practical domains as well. If you plan to incorporate Neon to virtual reality or augmented reality, you will need to affix the Neon module to the headset and to compute the geometrical relationship from the scene camera to the virtual reality camera. By accounting for fisheye lens distortions, you can better correlate the gaze position with the underlying geometry of the virtual environment, thus improving the accuracy of your gaze-based interactions.

## How to correct for fisheye lens distortions?
In this tutorial, we will cover how to read the provided intrinsic and extrinsic camera parameters and correct for fisheye lens distortions in Neon's scene camera. We will also show you how to undistort the gaze data, so that you can map the gaze position onto the undistorted scene camera video.

We will be using Python and OpenCV to perform the undistortion but the same principles apply to other programming languages and libraries.

## Requirements
To follow this guide, you will need to have the following libraries installed on your python environment:

- OpenCV for image processing and undistortion
- Numpy for numerical data manipulation

```bash
pip install opencv-python numpy
```

### Reading from the raw file
We measure the intrinsics and extrinsics parameters from the cameras for you, such that you do not need to do it by yourself. So, let's start by reading the raw file containing these parameters. The calibration parameters are stored in a binary file, and you can read it using the following function:

```python
def read_instrinsics_neon(path):
    return np.fromfile(
        path,
        np.dtype(
            [
                ("version", "u1"),
                ("serial", "6a"),
                ("scene_camera_matrix", "(3,3)d"),
                ("scene_distortion_coefficients", "8d"),
                ("scene_extrinsics_affine_matrix", "(4,4)d"),
                ("right_camera_matrix", "(3,3)d"),
                ("right_distortion_coefficients", "8d"),
                ("right_extrinsics_affine_matrix", "(4,4)d"),
                ("left_camera_matrix", "(3,3)d"),
                ("left_distortion_coefficients", "8d"),
                ("left_extrinsics_affine_matrix", "(4,4)d"),
                ("crc", "u4"),
            ]
        ),
    )
```

Where *path* points to the calibration file, which is located in the same folder as the raw data with the name *calibration.bin*. Then, we will store the scene camera matrix, distortion coefficients in variables for later use.

``` python
calibration = read_instrinsics_neon(path)
R = np.eye(3)
K = calibration["scene_camera_matrix"][0]
D = calibration["scene_distortion_coefficients"][0]
```

### Reading from the Cloud download JSON file

If you are using the [Cloud download](/export-formats/recording-data/neon/#scene-camera-json) format, you can find the intrinsic parameters in the *scene_camera.json* file which you can read using the following function:

```python
def read_from_json(path):
    with open(path, "r") as f:
        data = json.load(f)
    return data
```

Similarly, we will store the scene camera matrix, distortion coefficients in variables for later use.

```python
calibration = read_from_json(path)
R = np.eye(3)
K = np.array(calibration["camera_matrix"])
D = np.array(calibration["distortion_coefficients"])[0]
```

## Understanding the variables
### Identity matrix (R)
An identity matrix representing no rotation, meaning that the camera coordinate system is aligned with the world coordinate system without any rotation. This implies that the camera is positioned in the world such that its x-axis aligns with the world's x-axis, its y-axis aligns with the world's y-axis, and its z-axis aligns with the world's z-axis.


### Scene camera matrix (K)
A 3x3 matrix representing the intrinsic parameters of the camera. The camera matrix contains information about the focal length, principal point, and skew of the camera, defined as follows:

```
K = [[fx, 0, cx],
     [0, fy, cy],
     [0,  0,  1]]
```

where:

- **fx** and **fy** are the focal lengths expressed in pixels. They represent the ratio between the size of a pixel in the image plane and the focal length of the camera. A larger value indicates a higher zoom level.
- **cx** and **cy** are the coordinates of the principal point, which represents the optical center of the camera. It indicates the position of the image center in the image plane, usually close to the center of the image.

### Distortion coefficients (D)

```
D = [k1, k2, p1, p2, k3, k4, k5, k6]
```

where:

- **k1** to **k6** are radial distortion coefficients. They model the radial distortion caused by the curvature of the lens, making straight lines appear curved near the edges of the image.
- **p1** and **p2** are tangential distortion coefficients. They model the tangential distortion caused by the misalignment between the camera sensor and the lens, resulting in image distortions that are not radial.


## Undistorting the video and gaze data per frame
Assuming we have our frame (in OpenCV) and gaze data, we can undistort them using the following code:

```python
undist_frame = cv2.undistort(orig_frame, K, D)
```

<!-- ```python
undistorted_size = frame.shape[:2][::-1]
map1, map2 = cv2.fisheye.initUndistortRectifyMap(
    np.array(K),
    np.array(D),
    R,
    np.array(K),
    undistorted_size,
    cv2.CV_16SC2,
)
frame = cv2.remap(
    frame,
    map1,
    map2,
    interpolation=cv2.INTER_LINEAR,
    borderMode=cv2.BORDER_CONSTANT,
)
``` -->

And this is how we undistort the gaze point:

```python
xy_undist = cv2.fisheye.undistortPoints(
    xy.reshape(-1, 1, 2).astype(np.float32), K, D, P=K
)
xy_undist = xy_undist.reshape(-1, 2)
```