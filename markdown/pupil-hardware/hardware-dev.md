---
date = "2017-01-19T16:13:49+07:00"
section_weight = 2
page_weight = 6
---

## Pupil Hardware Development

This page contains documentation and discussion on open source camera mounts, optics, and cameras.

### Camera Mounts

<img src="/images/pupil-hardware/explo_side_800_mounts.webp" alt="Headset camera mounts" >

We release the CAD files for the camera mounts for you to download, modify, in accordance with our [license](#license).  CAD files for the frame are not open source; [see explanation](#hardware).

**Interface Documentation**

By releasing the mounts as example geometry we automatically document the interface. You can use the CAD files to take measurements and make your own mounts.

<aside class="notice">
Note - The tolerances may need to be changed for your material or fabrication process.
</aside>

#### Compatibility
The mounts were developed as part of the whole headset and carry the revision number of the headset they were designed for.

#### Download Camera Mount CAD Files
All files are hosted in the `pupil-hardware-diy` repo [here](https://github.com/pupil-labs/pupil-hardware-diy)

You can clone the latest revision

```
git clone https://github.com/pupil-labs/pupil-hardware-diy.git
```

Or, if you want an older version, just checkout an older version.  In this example, we checkout `rev006` rev006 with the git version id of `6ad49c6066d5`

```
git clone https://github.com/pupil-labs/pupil-hardware-diy.git
git checkout 6ad49c6066d5
```