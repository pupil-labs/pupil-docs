---
description: "Using densepose to map gaze onto body parts. To be or not to be? proclaims Prince Hamlet while holding a skull in his hand. But, where is the audience looking? At the hand, at the arm, or the face?"
permalink: /alpha-lab/dense-pose/
tags: [Pupil Invisible, Cloud]
---
# Map gaze onto body parts using DensePose

<TagLinks />
<Youtube src="uoq11XtNH5E"/>

**Act 3, Scene 1:**  *"To be or not to be?"* proclaims Prince Hamlet while holding a skull in his hand. But, where is the audience looking? At the hand, at the arm, or the face?<br>

## Introduction

Have you ever wondered which body parts we gaze upon while conversing with others? Where a professional basketball player looks just before passing? Does hand movement play a role when delivering a speech?

Here we introduce a powerful and time-saving automation that can help answer these questions. It works by identifying body parts of people in the scene video and recording whether they were gazed at!

::: tip
<b>This sounds really complicated...</b><br>
Don't worry! We've made this powerful tool easy-to-use, so you can get started right away – no coding required! By the end, you'll have a video like the one above, and a CSV file documenting which body parts were gazed.
:::

## Powered by DensePose
<details>
    <summary>This tool employs <b>DensePose</b> (<a href="https://ai.facebook.com/tools/detectron2/">detectron2</a>, Meta AI). Click here to learn more</summary><br>
<!-- This is collapsed   -->
    DensePose is a method for dense human pose estimation and dense human body part segmentation. It's based on the Mask R-CNN architecture and is trained on the COCO dataset. DensePose is now a part of Detectron2's framework. You can read all the details in their paper <a href="https://arxiv.org/abs/1802.00434">DensePose: Dense Human Pose Estimation In The Wild.</a>
</details>
<br>

## What you'll need

1. A **[Raw data export](https://docs.pupil-labs.com/invisible/explainers/enrichments/raw-data/)** from Pupil Cloud. The downloaded folder contains one subfolder for every recording in the project. Each subfolder contains a scene video, gaze.csv, and other files. We will work with those subfolders, so have them at hand
2. A **Google account**. We set up a Google Colab notebook so you can execute all of this [from your browser](#Running-in-your-browser). This way, Google will lend you some extra computing power and required dependencies. [FAQ about Google Colab](https://research.google.com/colaboratory/intl/en-GB/faq.html), including what it is, how it's free, and some limitations. (If you do fancy running things locally, check out [this section](#running-locally).)


## Running in your browser

Firstly, from the raw enrichment, upload one of the subfolders that you're interested in **(uncompressed)** to Google Drive.

Now for the Google Colab part: [click here to access the notebook](https://colab.research.google.com/drive/1s6mBNAhcnxhJlqxeaQ2IZMk_Ca381p25#forceEdit=true&sandboxMode=true), and carefully follow the instructions there.

<div class="mb-4" style="display:flex;justify-content:center;">
  <a href="https://colab.research.google.com/drive/1s6mBNAhcnxhJlqxeaQ2IZMk_Ca381p25#forceEdit=true&sandboxMode=true" target="_blank">
    <img style="width:180px" src="https://img.shields.io/static/v1?label=&message=Open%20in%20Google%20Colab&color=blue&labelColor=grey&logo=Google%20Colab&logoColor=#F9AB00" alt="colab badge">
  </a>
</div>

::: tip
The notebook contains lots of rows and this can seem overwhelming. It needn't be. It's actually really simple. Just click on each of the play buttons...
:::

## Outputs

After the code is executed, new files will be generated. Check the new DensePoseColab folder. Let's see what's in those files!

#### Video

You've already seen the accompanying video above. There's no mystery – you have a bounding box delimiting each person detected, a blue shaded mask over the body parts, a yellow highlighted body part when it's gazed at, and the typical red circle for the gaze position.

#### Gaze map image

You'll also find an image reporting the body segments and the amount of frames in which they were gazed, like below.

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require(`../media/alpha-lab/densepose-result.png`)" width="100%" />
</div>

#### CSV files

Two files are stored as well, 1) a simple `parts_count.csv` showing the number of times each body part is gazed, and 2) a `densepose.csv` following a structure similar to the gaze.csv, but also with a new column indicating gazed body parts.

## Running locally

<details><summary>Learn about running this tool locally</summary><br>
<!-- This is collapsed   -->
<b>Feeling brave?</b> This is how to run locally on your computer. 

<b>Note:</b> this option is only for Linux and Mac users as detectron2 doesn't supports Windows 😕<br>

If you don't have a GPU on your computer, we strongly recommend avoiding running locally</b>.

### Requirements

- Hardware: Linux or MacOS + we recommend that you have a Cuda GPU 
- Python 3.7 or higher
- Dependencies

You only need to install two packages as we have put almost all the dependencies within a single package. Just run the following command:

```
python -m pip install torch 'git+https://github.com/pupil-labs/densepose-module.git'
```

Then, run the following command in your command prompt to get the DensePose output:

```
pl-densepose  --no-vis --device "cuda"
```

You can also check out the arguments below.

</details>
<!-- empty line   -->

## Optional Arguments

<details><summary>Learn about additional command line arguments</summary><br>
<!-- This is collapsed   -->
We can't build a shoe that fits everyone, so we also allow you to pass arguments to the code:<br><br>

**- Device** 
The device on which to run the DensePose model. You can choose between `cpu` and `cuda`. The default is `--device "cpu"`. But this can be a bit slow, so we recommend using `cuda` if you have a GPU with CUDA support.

::: warning
Even running on `cuda` can be slow, just be aware we estimate inference time to be around 2.5 FPS on a Nvidia RTX 3060.
:::

**- Visualize**
Use the flag `--vis` to enable live visualization of the output. By default, the visualisation is turned off to save resources, but even with this off, you'll still get the final video output.

**- Input and output paths**
Specify the input and output paths using `--input_path` and `--output_path`. If none are given, a UI will open to select the input and output paths. The input path shall be the subdirectory of the raw download, containing the video, world, and gaze data. The output path shall be the directory where the output files shall be saved.

**- Confidence threshold**
The default confidence is 0.7. You can change this value to tune the confidence threshold by using `--confidence` followed by a number between 0 and 1.

**- Start and end**
If you want to run it only on one specific section of your recording, you can pass the start and end event annotations to be used, like this: `--start "recording.begin" --end "recording.end"`.

</details>
<!-- empty line   -->

## Behind the scenes

<details>
<summary>Model details & FAQ</summary><br>
<!-- This is collapsed   -->
- Model weights:<br>
<code>densepose_rcnn_R_50_FPN_DL_s1x</code><br><br>
- Why is there no gaze recorded on the back of the head, hands or feet?<br>
There is no definition for those parts in DensePose. Likewise the frontal view of the arms in the picture refers to the inside of the arms, not the front.<br>
<br>
</details>
