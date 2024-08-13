# Eye State Timeline


The `Eye State Timeline` plugin visualizes the 3D eye state and pupil diameter data. 

![Eye State Timeline](./eye-state-timeline.webp)

::: info
The data will be visualized only if the Eye State computation was enabled in the Neon Companion app settings during this recording. 
::: 

## Export Format
Results exported to `3d_eye_states.csv` contain the [3D eye states](/data-collection/data-streams/#_3d-eye-states) as well as [pupil diameter](/data-collection/data-streams/#pupil-diameters) data. The fields are listed below:

| Field                     | Description | 
| ------------------------- | -------- | 
| **section id**            | Unique identifier of the corresponding section.     |
| **recording id**          | Unique identifier of the recording this sample belongs to.     |
| **timestamp [ns]**        | UTC timestamp in nanoseconds of the sample. Equal to the timestamp of the eye video frame this sample was generated with. |
| **pupil&nbsp;diameter&nbsp;left&nbsp;[mm]**   | Physical diameter of the pupil of the left eye. |
| **pupil&nbsp;diameter&nbsp;right&nbsp;[mm]**   | Physical diameter of the pupil of the right eye. |
| **eye&nbsp;ball&nbsp;center&nbsp;left&nbsp;x&nbsp;[mm]**<br /> **eye ball center left y [mm]**<br /> **eye ball center left z [mm]**<br /> **eye&nbsp;ball&nbsp;center&nbsp;right&nbsp;x&nbsp;[mm]**<br /> **eye&nbsp;ball&nbsp;center&nbsp;right&nbsp;y&nbsp;[mm]**<br /> **eye ball center right z [mm]** | Location of left and right eye ball centers in millimeters in relation to the scene camera of the Neon module. For details on the coordinate systems see [here](/data-collection/data-streams/#_3d-eye-states). |
| **optical axis left x**<br /> **optical axis left y**<br /> **optical axis left z**<br /> **optical axis right x**<br /> **optical axis right y**<br /> **optical axis right z** | Directional vector describing the optical axis of the left and right eye, i.e. the vector pointing from eye ball center to pupil center of the respective eye. For details on the coordinate systems see [here](/data-collection/data-streams/#_3d-eye-states). |
