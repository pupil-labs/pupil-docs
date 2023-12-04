# Using Offset Correction to Improve Gaze Accuracy
For some wearers, you may find a constant offset in their gaze estimates. Especially in setups where wearers gaze at somethings that is less than 1 meter away from them this can happen due to parallax error. 

To compensate for those offsets, you can use the Offset Correction feature in the Pupil Invisible Companion App. See the video below to learn how it works! The video is using demonstrating the feature within the Neon Companion App, but the approach is very similar.

<Youtube videoId="7weK8UPLOzo" />

::: warning
Note, that the amount of offset introduced by parallax error is highly dependend on the distance between the wearer and the object they are looking at. The closer the object, the larger the offset.

The offset correction is only valid for the specific distance at which it was recorded. If the wearer changes their distance to the object, you will need to record a new offset correction.
:::