---
description: "How-to guide on the calibration of the Neon magnetometer"
---
# How to ensure super accurate global orientation in your recordings

<div class="iframe-container2">
    <iframe width="2000" height="1500" src="https://www.youtube.com/embed/QowA9_sTBVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> 
<br>

Neon is equipped with the ICM-20948 9DOF inertial measurement unit (IMU) by InvenSense. This IMU uses an accelerometer, a gyroscope, a magnetometer and a fusion engine to measure relative changes in pose and position as well as the absolute orientation with respect to gravity and magnetic north. The IMU continuously runs a self-calibrating for optimal performance.

The absolute orientation of the IMU with respect to gravity (Pitch and Roll) as well as all relative changes in orientation (as in rotating the head in one direction will also show the same in the IMU readings.) will self-calibrate in under 3 seconds and require no assistance.

The absolute orientation with respect to north (Yaw) requires a lock on the weak magnetic field of earth. We found in our tests that absolute Yaw did not become accurate in all cases and can take time to converge. Moving the Neon module in a special way can speed up the calibration of the magnetometer.

If you require precise absolute yaw readings from the beginning, it is therefore recommended to perform a pre-calibration procedure at the beginning of your recording:

To perform a pre-calibration, begin by starting a recording in the Neon Companion App (this initialises the IMU), and then perform the calibration choreography for approximately 30 seconds. For a visual demonstration, please refer to the video above.

Note that once the pre-calibration is performed, you can stop and start recordings without needing to recalibrate. However, if Neon remains stationary for an extended period, we recommend recalibrating the IMU.

An uncalibrated IMU has no negative effect on Neon gaze estimation!

::: tip
**Note:** As an optional step, you can use our [real-time IMU visualization tool](https://github.com/pupil-labs/plimu) along with a compass to assess the accuracy of your calibration. This tool necessitates familiarity with executing a script from the command line.
:::

<style scoped>



.iframe-container2{
  position: relative;
  width: 100%;
  padding-bottom: 56.65%;
  margin-bottom: 10px;
  height: 0;
  margin-left:0;
  margin-right:0;
}

.iframe-container2 iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
