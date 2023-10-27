# Calibrate the IMU for accurate yaw orientation

<Youtube src="kXgAJHavqaM" />

Neon is equipped with the ICM-20948 9DOF inertial measurement unit (IMU) by InvenSense. This IMU uses an accelerometer, a gyroscope, a magnetometer and a fusion engine to measure relative changes in pose and position as well as the absolute orientation with respect to gravity and magnetic north. The IMU continuously self-calibrates for optimal performance.

The absolute orientation of the IMU with respect to gravity (Pitch and Roll) as well as all relative changes in orientation (as in rotating the head in one direction will also show the same in the IMU readings.) will self-calibrate in under 3 seconds and require no assistance.

The absolute orientation with respect to north (Yaw) requires a lock on the weak magnetic field of earth. We found in our tests that absolute Yaw did not become accurate in all cases and can take time to converge. Moving the Neon module in a special way will speed up the calibration of the magnetometer. If you require precise absolute yaw readings from the beginning, we recommend to follow the calibration choreography as shown in the video above.

An uncalibrated IMU has no negative effect on Neon gaze estimation!

::: tip
**Note:** As an optional step, you can use our [real-time IMU visualization script](https://github.com/pupil-labs/plimu) along with a compass to assess the accuracy of your calibration.
:::
