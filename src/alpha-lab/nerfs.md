---
title: Creating 3D Models of Your Environment Using Pupil Invisible Recordings and NerfStudio
description: "Nerfing your Pupil Invisible Recordings, using nerfstudio to create 3D models of your environment, and plotting gaze in 3D."
permalink: /alpha-lab/nerfs
tags: [Pupil Invisible, Neon, Cloud]
---
<!-- <head> <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script> </head> -->
# Creating 3D Models of Your Environment Using Pupil Invisible Recordings and NerfStudio

<TagLinks />
<Youtube src="ZSWl8qQcQk0"/>

::: danger
🕰️ - *Great Scott! This page contains highly experimental stuff. Using it will take you on a wild ride into the future, but beware - you'll be going solo. Consider yourself warned!* 🎢
:::

If you watched the video accompanying this article, you might be wondering what you witnessed. Well, what you saw was a 3D reconstruction of a environment, based on eye tracking recordings from Pupil Invisible. by using the [reference image mapper enrichment](/invisible/enrichments/reference-image-mapper/) that you might be familiar with, we explored how to augment this data and show you a third person view of your recording. 

A third person view allows you to see more of the environment around and how your partipants explore it, additionally, a 3D model of certain objects can also help you understand how we analyse objects. On that video, the green points denoted where the “user’s head” was during the recording, while the yellow line illustrated a gaze ray from the head to the object being gazed, you can also appreciate a heat-map of the most salient areas.

## A 3D view?

We do perceive the world around us in three dimensions, and for many years, we have tried to capture this “3D world” using photogrammetry or special cameras and reconstructing it. This approach was traditionally quite expensive and/or required of specific types of cameras capable of recording depth and localising themselves in the scene.

But nowadays, thanks to recent advances in deep learning, we now have an easier way to reconstruct and build 3D environments. Isn't that exciting?!

## What are NeRFs and how do they work?

That advance we are talking about is [Neural Radiance Fields](https://arxiv.org/pdf/2003.08934.pdf) or NeRFs 🔫. NeRFs are a relatively novel method that using deep neural networks learns how light and colour vary based on the viewer's location and direction. So, by providing this tool with a set of images of a scene from different angles, it can generate novel views that were never captured by the camera.

Thus, with this technique, we can create high-fidelity and photorealistic 3D models that can be used for various applications such as virtual reality, robotics, urban mapping, or in our case eye tracking, without taking endless pictures of the environment. We only need a set of frames and camera poses (where was the camera located and where it pointed to).

## That sounds cool! How we get those?

Well, once you made a recording, we do not know where the camera was on each frame and this is crucial information that we need to train the NeRF. Here comes COLMAP, which you can think of it as puzzle solver that takes your frames and figures out where the camera was located and where it was pointing out on that frames. Something similar is used within our Reference Image Mapper, in fact, we will use the poses that our enrichment produce, and transform them to something nerfstudio can understand.

## Now, what is NeRFStudio?

[Nerfstudio](https://docs.nerf.studio/en/latest/) 🚜 is an open-source package that allows users to interactively create, visualise and edit NeRFs, and bundles several tools including a way to generate 3D meshes from the NeRF.

Under the hood, NerfStudio is built on top of PyTorch and PyQt, and uses OpenGL for real-time rendering. It leverages the NeRF codebase to load and manipulate the models, and provides a high-level interface to interact with them. NerfStudio is still in active development, and new features and improvements are being added regularly.

## Great, how can I generate my own?

I already warned you, this is not gonna be an easy path, did I? 

<details>
    <summary>But if you insist...</summary><br>
<!-- This is collapsed   -->
    
### First things first, what would you need?

You will need a powerful computer with CUDA support (that's mostly a Nvidia GPU), if you don’t know if your computer have it, I discourage you to try this out.

### Get your development environment ready

By this point, I will assume you know some basic Python, otherwise reconsider going forward. So, here is the basic code to create a [*conda*](https://anaconda.org/) environment that can run this:

```bash
# Creating the CONDA environment and installing COLMAP
conda create --name {ENV_NAME} python=3.8
conda activate {ENV_NAME}
conda install-c conda-forge colmap
pip install -U pip setuptools

# Checkout which CUDA version you have and install the appropiate pytorch and torchvision wheels. 
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 -f [https://download.pytorch.org/whl/torch_stable.html](https://download.pytorch.org/whl/torch_stable.html)
pip install git+https://github.com/NVlabs/tiny-cuda-nn/#subdirectory=bindings/torch

# Installing further dependencies
pip install nerfstudio
pip install glfw
pip install pyrr
pip install trimesh
pip install PyOpenGL
pip install PyOpenGL_accelerate

# Get gaze mapping repo
git clone https://github.com/pupil-labs/pyflux.git
cd pyflux
git checkout -b mgg
pip install -e .

# Cloning the nerfstudio repo
cd ..
git clone https://github.com/nerfstudio-project/nerfstudio.git nerfstudio_git
cd nerfstudio_git
```

::: tip
You might need to change the following line on *nerfstudio*, if you use **COLMAP >=3.7 :**<br>
In `/nerfstudio/nerfstudio/process_data/colmap_utils.py` on the line 563, change: <br>
`mapper_cmd.append("--Mapper.ba_global_function_tolerance 1e-6")`
to:<br>
`mapper_cmd.append("--Mapper.ba_global_function_tolerance 1e-7")`
:::
    
If everything went sucessfully, it will take you around 20 minutes to install everything.
    
### Generate a token
Now, you will need a developer token from Pupil Cloud, so click on your profile picture at the bottom left of the page, select "Account Settings" on the pop-up. Click on the Developer section and "Generate a new token".

Once showing, copy the token. Note that you won't be able to see it again, so please store it securely and if you ever doubt if you expose it, delete it and create a new one.

<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require('../media/alpha-lab/generate-token.png')" 
  width="100%" 
  alt="Screenshot of Cloud Developer's page with tokens generated"
  title="Screenshot of Cloud Developer's page with tokens generated" />
</div>
    
### Time to define your parameters

Navigate to your `pyflux` folder, inside the `pyflux` repository folder. There, you will find a `config.json` file where you can directly change the paths, IDs and token to yours. See the description below, for a better understanding of each field.

```json
{
    "NERFSTUDIO_PATH": "/nerfstudio", # Path to your nerfstudio git clone
    "BASE_PATH": "/nerf_dir", # Path for a working directory, whichever you want
    "API_KEY": "XgZUjCbXbZwjg2v4JzCs6hbkygjsYWHTBSooXXXXXXXX", # API key from Pupil Cloud
    "WORKSPACE_ID": "f66d330c-1fa1-425d-938a-36be565XXXXX", 
    "PROJECT_ID": "29119766-3635-4f0f-af57-db0896dXXXXX",
    "ENRICHMENT_ID": "95882476-0a10-4d8e-9941-fe0f77eXXXXX",
    "EXPERIMENT_NAME": "building", # The experiment name of your choice
    "bbox": 2.3, # Bounding box size for nerfstudio
    "far_plane": 7.0 # Far plane clip for the OpenGL visualisation
}
```
    
### Time to run it.
    
With the conda environment active, the ids set on the config file and on the pyflux folder we will run the following comands in the terminal:
    
`python prepare_enrichment.py`

This will download ALL recordings in the enrichment to `{BASE_PATH}/{EXPERIMENT_NAME}` that we defined on the JSON file, it will also prepare a set of frames to be used by NERF.
    
#### Time to "cherry pick" frames
    
It's time for some manual labour, so navigate to `{BASE_PATH}/{EXPERIMENT_NAME}/raw_frames` and remove all those frames where there is any occlusion, such as the Companion Device (phone) or body parts (like your hands). Otherwise, you will end up with a weird mesh.

### Continue running it
    
Run `python pyflux/consolidate_raw_frames.py` in your terminal, to reorganise the frames.
    
Run `python pyflux/run_nerfstudio.py`, this will run colmap on the selected frames, train the NeRF and export the mesh. 
    
::: warning
Depending on amount of GPU RAM, running the mesh export from the same run as the NeRF training causes problems. <br> In that case run `run_nerfstudio.py` again, only for the export (set flags in code). <br> You will also have to get the right value for timestamp from the `{BASE_PATH}/outputs/{EXPERIMENT_NAME}/nerfacto` folder. 
:::

If you got to here, congrats! You are almost there. By now, you should already have a 3D model, like the one below:
    
<div class="mb-4" style="display:flex;justify-content:center;">
  <v-img class="rounded" :src="require('../media/alpha-lab/nerf.png')" 
  width="100%" 
  alt="An example of a 3D model generated by NeRF of a building faccade in Berlin"
  title="An example of a 3D model generated by NeRF of a building faccade in Berlin" />
</div>

<!-- <template>
  <div>
    <model-viewer src="../public/assets/building.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="poster.png" shadow-intensity="1">
    <div class="progress-bar hide" slot="progress-bar">
        <div class="update-bar"></div>
    </div>
    <button slot="ar-button" id="ar-button">
        View in your space
    </button>
    </model-viewer>
  </div>
</template> -->


### To Blender!
    
Now it's time again for more manual fine-tuning, you will need to use [Blender](https://www.blender.org/) or Maya to open the mesh export `.obj` ({BASE_PATH}/exports/{EXPERIMENT_NAME}/mesh.obj), prune it if necesary, and export it as `.ply` format.

    
### Almost there!
    
The only step missing to generate a video like the one on the header of this article, is to run the visualisation.
    
`python pyflux/viz/rimviz.py`
    
This will open a new window on your computer with OpenGL and create a visualisation. So there you go! 
    
You can close anytime the visualisation by pressing `ESC` or it will close after the recording is over.
    
</details>
<br>

## Why is this not a Cloud feature?

While showing gaze heat-maps in 3D as demonstrated in this document is a very exciting and promising tool, it is still in an experimental stage and not quite reliable. The tool uses advanced AI techniques like NeRFs and requires a powerful computer with CUDA support to generate 3D models, which can be expensive, and it would fail with occlusions. Therefore, although the tool is visually impressive, it is not yet a reliable or practical solution for most research or commercial applications.