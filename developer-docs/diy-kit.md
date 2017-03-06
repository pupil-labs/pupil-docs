+++
date = "2017-01-20T10:54:04+07:00"
title = "diy kit"
weight = 14
+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#diy-kit-guide">
      <h2 id="diy-kit-guide">DIY Kit Guide</h2>
    </a>
  </div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#diy-intro">
      <h3 id="diy-intro">Intro</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

Please note that this DIY Kit is for [non-commercial use only](#license). If you have questions about this please [contact Pupil Labs](#email).

<div class="content-container">
  <div class="header-link">
    <a href="#get-parts">
      <h3 id="get-parts">Getting all the parts</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

The 3d-printed headset is the centerpiece of the Pupil mobile eye tracker. You can buy it from the Pupil Labs team through the [Pupil shapeways store](http://www.shapeways.com/shops/pupil_store). The price for the headset is part production cost and part support to the pupil development team.  This enables us to give you support and continue to work on the project. 

All other parts of the Pupil DIY kit have been specifically selected with availability and affordability in mind. See the [Bill of Materials][bom] to learn what else you will need to get.

<div class="content-container">
  <div class="header-link">
    <a href="#diy-tools">
      <h3 id="diy-tools">Tools</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

You will need access to these tools:

* Solder station, wick, flux (for SMD solder work)
* Tweezers
* Small philips screwdriver
* Prying tool to help un-case the webcams

<div class="content-container">
  <div class="header-link">
    <a href="#prepare-webcams">
      <h3 id="prepare-webcams">Prepare Webcams</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

The first step is to modify the cameras so we can use them for eye-tracking.

<div class="content-container">
  <div class="header-link">
    <a href="#decase-cameras">
      <h4 id="decase-cameras">De-case Cameras</h4>
    </a>
  </div>
</div>

Take both webcams out of their casings. Follow the video guides.

1. [decase Logitech C525/C512](http://vimeo.com/59844059)
2. [decase Microsoft HD-6000](http://vimeo.com/53005603)

<div class="content-container">
  <div class="header-link">
    <a href="#solder-eye-pcb">
      <h4 id="solder-eye-pcb">Solder Work on Eye Camera PCB</h4>
    </a>
  </div>
</div>

This is by far the trickiest part. You will need some soldering experience, or work with someone that can help you for this step. In the video and photo the lens holder is removed, but you will do it with the *lens holder attached*.

1. Cut off the microphone
2. Desolder or break off the push button (Note: Some cameras don't have this button.)
3. Desolder the blue LED's
4. solder on the IR-LED's. Please take note of LED polarity! [video](http://youtu.be/O-FAXldfq94)

<img class="padTop--2 padBottom--2" src="https://raw.github.com/wiki/pupil-labs/pupil/media/headset/hd-6000_pcb_text.jpg" alt="Solder Instructions">

<div class="content-container">
  <div class="header-link">
    <a href="#replace-ir-filter">
      <h4 id="replace-ir-filter">Replace IR-blocking Filter on the Eye Camera</h4>
    </a>
  </div>
</div>

1. Unscrew the lens from the mount.
2. Carefully remove the IR filter. Be very careful! The IR filter is a thin piece of coated glass and right behind it is a lens element that must stay intact and unharmed! It is necessary to remove the IR filter, so that the image sensor will be able to "see" the IR light.
3. Using a hole punch, cut out 1 round piece of exposed film and put it where the older filter was.
4. Use plastic glue to fix the piece. Don't let the glue touch the center!
5. Put the lens back inside. You will have to manually focus the lens when you run the software for the first time by hand. Later you can use the focus control in software to fine tune.

[Video](https://vimeo.com/59844058)

<div class="content-container">
  <div class="header-link">
    <a href="#assembly-diy-kit">
      <h3 id="assembly-diy-kit">Assembly of the Pupil DIY Kit</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

If you are reading this, chances are that you received one or more Pupil headsets -- **Awesome!** If you feel like letting us know something about the headset, print quality, good and bad, please go ahead and post your thoughts on the [Pupil Google Group][google-group].

<div class="content-container">
  <div class="header-link">
    <a href="#3dprint-unboxing">
      <h4 id="3dprint-unboxing">Headset 3D print Intro & Unboxing</h4>
    </a>
  </div>
</div>

1. Get used to the material
2. Clean out the eye-camera arm
3. Try it on!

[Pupil Headset 3D Print Unboxing Video](http://www.youtube.com/watch?v=wF_ryq6uDdo)

<div class="content-container">
  <div class="header-link">
    <a href="#camera-assembly">
      <h4 id="camera-assembly">Camera Assembly</h4>
    </a>
  </div>
</div>

1. Attach the world camera onto the mount using 4 small screws, leftover from disassembly.
2. Clip the world camera clip onto the headset
3. Slide the eye-cam into the mount [video guide](http://www.youtube.com/watch?v=wkV9Ye7psP4)
4. Slide the arm onto the headset
5. Route the cables
6. Attach USB extension cable(s)

<div class="content-container">
  <div class="header-link">
    <a href="#customization">
      <h3 id="customization">Customization</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

The camera mounts can be replaced by custom build parts that suit your specific camera setup or other sensors. 
Pupil hardware is designed to fit most face geometries. But, if you want to customize the headset you can use [sugru][sugru-site] an air curing silicone rubber. Using sugru, the nose rest can be custom fit (1:1 mould) to each individual.

[google-group]: http://groups.google.com/group/pupil-discuss
[sugru-site]: http://www.sugru.com
[bom]: https://docs.google.com/spreadsheet/pub?key=0Al-zbr5hUFxPdEdJY1Z0dGRXU18yU0JxTVQ3THBOZFE&single=true&gid=0&output=html