---
description: Using densepose to map gaze onto body parts
permalink: /alpha-lab/dense-pose/
tags: [Pupil Invisible, Cloud]
---
# Map your gaze onto body parts using DensePose
<TagLinks />
<Youtube src="90nYSMqUXIE"/>

**Act 3, Scene 1:**  *To be or not to be!* - proclaims Prince Hamlet while holding a skull in his hand. But, where is the audience looking? Are they gazing at the hand, the arm, or the actor's face?<br>
**Did you ever wonder which body parts we gaze upon while having a conversation? or while doing sports? Does a professional basketball player look at the opposing team's player torso or the hands when doing pick and roll? Does hand movement play a role when delivering a speech?** 

If you ever asked yourself any of these questions, but you always hesitate to analyse the eye-tracking data, because you didn't want to manually label frames, well, we have something for you, keep reading! 

With the introduction of [Face Mapper Enrichment](/invisible/explainers/enrichments/face-mapper), we gave you the power to address how much and which faces are looked at in an environment. Now, we are giving you a way to determine which part of a body is being gazed. With the help of *DensePose* (part of [detectron2](https://ai.facebook.com/tools/detectron2/), Meta AI), you will be able to automatically identify, and segment body parts on a video and check if they have been gazed.

<details>
    <summary>Do you want to know more about <b>DensePose</b>? Click here</summary>
<!-- This is collapsed   -->
<h3>What is <b>DensePose</b>?</h3><br>
    DensePose is a method for dense human pose estimation and dense human body part segmentation. It is based on the Mask R-CNN architecture and is trained on the COCO dataset. DensePose is now a part of Detectron2's framework. You can read all the details in their paper <a href="https://arxiv.org/abs/1802.00434">DensePose: Dense Human Pose Estimation In The Wild.</a>
</details>
<br>

::: tip
<b>This sounds complicated...</b><br>
No worries, we wrap this powerful tool into an easy-to-use console package, so you can get started right away, with no coding required. Just follow this tutorial and by the end, you will have a video like the one shared on this page's header and a CSV file with the body parts gazed.
:::

## Let's get started!
We know that you are eager to get started, so let's do it! First, let's find out if you have everything you will need.

### Requirements
- Hardware: We strongly recommend you run it on a Cuda GPU 

- Python 3.7 or higher

If you are not sure what version are you running, go to your command prompt and paste the following to know what version do you have: `python --version`.

- Dependencies

You need to install only one package, as we have put all the dependencies within. So you can do it by running the following command:

`pip install pupil_labs.densepose`

- A RAW enrichment downloaded from Pupil Cloud

And that's it! You are ready to go!

## Running it
Then, you can run the following command to get the results:

`!pl-densepose`

### Arguments
There are several arguments that you can append to the previous command to get the results you want. Here is a list of all the arguments you can use:

**- Device:**
The device to run the DensePose model on. You can choose between `cpu` and `cuda`. The default is `cpu`. But this can be a bit slow, so we recommend using `cuda` if you have a GPU with cuda support.

::: warning
Even running on `cuda` can be slow, just be aware we estimate inference time to be around 2.5 FPS on a Nvidia RTX 3060.
:::

**- Visualize:**
If you want to disable the visualization of the output, you can use this flag. 

**- Input and output paths:**
You can specify the input and output paths by using the `--input_path` and `--output_path` flags. If none are given, a UI will open to select the input and output paths. The input path shall be the subdirectory of the raw download, containing the video, world, and gaze data. The output path shall be the directory where the output files shall be saved.


<details>
<summary>Behind the scenes</summary>
<!-- This is collapsed   -->
<br>
Which model is used? 
</details>

