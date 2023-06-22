---
description: "How-to guide on the pre-calibration of the Neon magnetometer"
---
# Calibrate the magnetometer

<div class="iframe-container2">
    <iframe width="2000" height="1500" src="https://www.youtube.com/embed/QowA9_sTBVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> 
<br>

Neon comes equipped with a self-calibrating magnetometer that provides accurate orientation measurements for most use cases. However, if you require precise absolute yaw readings, it is recommended to perform a pre-calibration procedure. 

To perform a pre-calibration, begin by starting a recording in the Neon Companion App (this initialises the IMU), and then perform the calibration choreography for approximately 30 seconds. For a visual demonstration, please refer to the video above.

Note that once the pre-calibration is performed, you can stop and start recordings without needing to recalibrate. However, if Neon remains stationary for an extended period, we recommend recalibrating the IMU.

The pre-calibration of the magnetometer does not affect Neon gaze estimation.

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
