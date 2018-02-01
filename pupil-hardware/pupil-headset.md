+++
date = "2017-01-18T11:51:10+07:00"
section_weight = 2
page_weight = 1
+++

## Pupil Mobile Eye Tracking Headset

> {{< webp-img figure-class="img-m" src="/images/pupil-hardware/pupil_w120_e200.webp" alt="Pupil headset" >}}

You wear Pupil like a pair of glasses. Pupil connects to a computing device via a USBA or USBC cable. The headset is designed to be lightweight and adjustable in order to accommodate a wide range of users. 

To the right is an illustration of a monocular Pupil Headset, depending on your configuration your headset might look different, but working principles are the same.

Pupil ships with a number of additional parts. The below sections provide an overview of their use and a guide to adjusting the Pupil headset. 

### Additional parts

#### World Camera

> {{< video-webm src="/videos/headset-adjust/worldcam-lens.webm" >}}

The high speed 2d world camera comes with two lenses. 60 degree FOV lens (shown on the left) and a wide angle 100 degree FOV lens (shown on the right). 

The world camera lens are interchangeable, so you can swap between the two lenses provided for normal or wide angle FOV.

<aside class="warning">
  If you change lenses you need to <a href="#camera-intrinsics-estimation">recalibrate the camera</a> to update intrisics. Otherwise 3d calibraiton and accuracy test will not work properly!
</aside>

#### Arm Extender

> {{< video-webm src="/videos/headset-adjust/arm-extend.webm" >}}

If you need to adjust the eye cameras beyond the built in adjustment range, you can use the orange arm extenders that are shipped with your Pupil headset. Unplug your eye camera. Slide the existing eye camera arm off the headset. Slide the arm extender onto the triangular mount rail on the headset frame. Slide the camera onto the extended mount rail. Plug the camera back in.

The eye camera arm extender works for all existing 120 and 200hz systems.

<aside class="notice">
  Starting on <strong>2018-02-01</strong> the arm extender is shipped with all Pupil headset orders. If you have an older headset, you can get the extender from our <a href="https://www.shapeways.com/product/AP2XV2VNH/pupil-labs-camera-arm-extender-for-120hz-and-200h?optionId=64624597">Shapeways store</a>.
</aside>

#### Nose Pads

> {{< video-webm src="/videos/headset-adjust/nosepad.webm" >}}

All Pupil headsets come with 2 sets of nose pads. You can swap the nose pads to customize the fit.

<aside class="notice">
Depending on your configuration, some additional parts may be included with your Pupil headset.
</aside>

### Pupil Headset Adjustments

A lot of design and engineering thought has gone into getting the ergonomics of the headset just right. It is designed to fit snugly, securely, and comfortably. The headset and cameras can be adjusted to accommodate a wide range of users. 

To ensure a robust eye tracking performance, make sure all the cameras are in focus with a good field of view of your eyes.

#### Slide Eye Camera
> {{< video-webm src="/videos/headset-adjust/eyecam-slide.webm" >}}

The eye camera arm slides in and out of the headset frame. You can slide the eye camera arm along the track.

#### Rotate World Camera
> {{< video-webm src="/videos/headset-adjust/worldcam-rotate.webm" >}}

You can rotate the world camera up and down to align with your FOV.

#### Rotate Eye Camera
> {{< video-webm src="/videos/headset-adjust/eyecam-rotate.webm" >}}

The eye camera arm is connected to the eye camera via the ball joint. You can rotate about its ball joint.

#### Ball Joint Set Screw
> {{< video-webm src="/videos/headset-adjust/eyecam-screw.webm" >}}

You can adjust the set screw to control the movement of the eye camera about the ball joint. We recommend setting the set screw so that you can still move the eye camera by hand but not so loose that the eye camera moves when moving the head. You can also tighten the set screw to fix the eye camera in place.

<aside class="notice">
  Before you calibrate, make sure to properly adjust the headset to get optimal eye detection and world camera FOV.
</aside>

### Focus Cameras
#### Focus 120hz Eye Camera

> {{< video-webm src="/videos/headset-adjust/eye-adjust.webm" >}}

If you have a 120hz eye camera, make sure the eye camera is in focus. Twist the lens focus ring of the eye camera with your fingers or lens adjuster tool to bring the eye camera into focus.

<aside class="notice">
200hz eye cameras <strong>do not</strong> need to be focused, and <strong>can not</strong> be focused. Only the 120hz eye cameras can adjust their focal length.
</aside>

#### Focus World Camera

> {{< video-webm src="/videos/headset-adjust/worldcam-focus.webm" >}}

Set the focus for the distance at which you will be calibrating by rotating the camera lens.

<aside class="notice">
  It is <strong>very important</strong> that your eye camera(s) are in focus. You will not achieve optimal eye tracking performance with poorly focused cameras. Pupil cameras are focused manually using the focus tool to twist the lens of the eye camera and adjusting the focal depth.
</aside>

