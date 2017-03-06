+++
date = "2017-01-19T16:13:49+07:00"
title = "hardware dev"
weight = 13
+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#hardware-dev">
      <h2 id="hardware-dev">Pupil Hardware Development</h2>
    </a>
  </div>
</div>

This page contains documentation and discussion on open source camera mounts, optics, and cameras. 

<div class="content-container">
  <div class="header-link">
    <a href="#camera-mounts">
      <h3 id="camera-mounts">Camera Mounts</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

We release the CAD files for the camera mounts for you to download, modify, in accordance with our [license](#license).  CAD files for the frame are not open source; [see explanation](#hardware). 

<p align="center">
	<img width="600" src="images/headset/explo_side_800_mounts.png" />
</p>

<div class="content-container">
  <div class="header-link">
    <a href="#interface-docs">
      <h4 id="interface-docs">Interface Documentation</h4>
    </a>
  </div>
</div>

By releasing the mounts as example geometry we automatically document the interface. You can use the CAD files to take measurements and make your own mounts. 

<aside class="notice">
Note - The tolerances may need to be changes for your material or fabrication process.
</aside>

<div class="content-container">
  <div class="header-link">
    <a href="#compatibility">
      <h4 id="compatibility">Compatibility</h4>
    </a>
  </div>
</div>

The mounts are developed as part of the whole headset and carry the revision number of the headset they where designed for.

<div class="content-container">
  <div class="header-link">
    <a href="#download-cam-cad">
      <h4 id="download-cam-cad">Download Camera Mount CAD Files</h4>
    </a>
  </div>
</div>

All files are hosted in the `pupil-hardware-diy` repo [here](https://github.com/pupil-labs/pupil-hardware-diy)

You can clone the latest revision

```
git clone https://github.com/pupil-labs/pupil-hardware-diy.git
```

Or, if you want an older version, just checkout an older version.  In this example we checkout `rev006` rev006 with the git version id of `6ad49c6066d5`

```
git clone https://github.com/pupil-labs/pupil-hardware-diy.git 
git checkout 6ad49c6066d5
```  