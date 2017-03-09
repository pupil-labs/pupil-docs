+++
date = "2017-01-20T11:37:57+07:00"
title = "win driver setup"
weight = 18

+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#win-driver-setup">
      <h2 id="win-driver-setup">Windows Driver Setup</h2>
    </a>
  </div>
</div>

In order to support isochronous USB transfer on Windows, you will need to install drivers for the cameras in your Pupil headset. 


<div class="content-container">
  <div class="header-link">
    <a href="#download-driver-tools">
      <h3 id="download-driver-tools">Download drivers and tools</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

1. Download and install [libusbk 3.0.7.0](https://sourceforge.net/projects/libusbk/files/libusbK-release/3.0.7.0/libusbK-3.0.7.0-setup.exe/download).
1. Download [Zadig](http://zadig.akeo.ie/downloads/zadig_2.2.exe).
1. Plug in your Pupil headset 

<div class="content-container">
  <div class="header-link">
    <a href="#install-driver">
      <h3 id="install-driver">Install drivers for your Pupil headset</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

1. Start ZadiG. 
 
<p align="center"> 
	<img width="80%" src="/images/windows_driver_setup/zadig_001.jpg" title="Start ZadiG">
</p>

2. In the `Options` menu **check** `List All Devices`.

<p align="center"> 
	<img width="80%" src="/images/windows_driver_setup/zadig_002.jpg" title="Zadig options menu">
</p>

3. In the `Options` menu **uncheck** `Ignore Hubs or Composite Parents`. In the dropdown list you should now see devices with the name *Pupil Cam1* followed by an ID 

<aside class="notice">
Note - The number of devices depends on your headset configuration. For example, if you have a binocular setup, you will see Pupil Cam1 ID2, Pupil Cam1 ID1, Pupil Cam1 ID0.
</aside>

<p align="center"> 
	<img width="80%" src="/images/windows_driver_setup/zadig_003.jpg" title="Zadig pupil cam">
</p>

4. Select one of the **Pupil Cam1** devices. Select `libusbK (v3.0.7.0)` from the options list (to the right of the green arrow ➡️ ). Click `Replace Driver`.

<p align="center"> 
	<img width="80%" src="/images/windows_driver_setup/zadig_004.jpg" title="Zadig replace driver">
</p>

5. Repeat Step 4 with the other **Pupil Cam1** devices until the `Driver` field reads `libusbK (v3.0.7.0)` for all **Pupil Cam1** devices

6. Verify the driver is correctly replaced in `Windows Device Manager`. Your Pupil headset cameras should be listed under a new category titled: `libusbK USB Devices`. 

<aside class="notice">
Note - Device names will all show up with the same name in Windows - don't worry - just make sure that the number of devices are the same as the number of cameras you have connected.
</aside>

<p align="center"> 
	<img width="80%" src="/images/windows_driver_setup/device_manager_check.jpg" title="Windows device manager libusbK">
</p>