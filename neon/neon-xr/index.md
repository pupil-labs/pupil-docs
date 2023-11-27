# Neon XR

Neon XR allows you to equip XR devices with research-grade eye tracking powered by Neon. This equally enables gaze-based interaction for XR applications and visual behaviour analysis in XR environments.

Thanks to the small form factor of the [Neon module](TODO), it can be easily integrated into a variety of XR devices. A hardware mount for the [Pico 4](TODO) headset is available for purchase and additional mounts for other headsets are in development. You can also [build your own mount](TODO) for any headset!

Neon XR includes software integration with Unity. This allows you to receive eye tracking data from a Neon module in your Unity project in real-time. We also provide a [template project](TODO) for the [Mixed Reality Toolkit](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/) that makes it easy to add gaze-based interaction to your XR application.

## TODOs
- System topology
- building frames
- GitHub links

## Adding Neon XR to Your Unity Project
The **Neon XR Unity package** enables you to receive eye tracking data from a Neon module in your Unity project in real-time. 

To integrate the Neon XR Unity package in your project, follow these steps:

1. Add the `Neon XR` package in the Package Manager.
    1. Select `Window -> Package Manager`
    2. Select `+ -> Add Package from git URL…`
    3. Insert `https://github.com/pupil-labs/neon-xr.git`.
1. If your project does not use Addressables, create default Addressables settings.
    1. Select `Window -> Asset Management -> Addressables -> Groups`.
    2. Click `Create Addressables Settings`.
    3. If legacy bundles are detected click on `Ignore`.
1. In menu, click on `Pupil Labs -> Addressables -> Import Groups`. After this step the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 2.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Copy the `NeonXR` prefab from the imported package into the scene.
1. Locate the `Neon Gaze Data Provider` component on GameObject `NeonXR/PupilLabs`.
1. Add your own listener for the `gazeDataReady` event (see for example, `GazeDataVisualizer.OnGazeDataReady`).


## Add Gaze-Based Interaction to Your Unity Project
Gaze-Based interaction is of interest to many XR developers. It allows users to interact with virtual objects simply by looking at them. Often this is combined with hand interactions to e.g. select an object by fixating it and executing a pinching motion with one hand. 

To make adding gaze-based interactions to your project easier, we have integrated Neon XR with the [Mixed Reality Toolkit](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/) (MRTK). The MRTK is a collection of scripts and components that make it easy to build XR applications for a variety of platforms. It also includes a gaze-based interaction system that can be used to interact with virtual objects.

To get started use our fork of the MRTK repository, which contains a template project, following these steps:
1. Clone the repository
    ```
    git clone git@github.com:pupil-labs/MixedRealityToolkit-Unity.git
    ```
1. Checkout the correct branch. When using the Pico 4 headset use the `neon-pico` branch (which uses the PICO Unity Integration SDK), otherwise use branch `neon`.
    ```
    git checkout neon-pico
    ```
    or

    ```
    git checkout neon
    ```
1. Download PICO Unity Integration SDK from [here](https://developer-global.pico-interactive.com/resources/) and extract it to the root folder of the MRTK repository. This should create a folder called `PICO Unity Integration SDK 230`.
1. Open the Unity sample project located in `UnityProjects\MRTKDevTemplate` using Unity Hub.
1. When the project loads for the first time, a `PXR SDK Settings` window will pop up. Click `Apply`. Once finished click `Close`.
1. Create default Addressables settings.
    1. Select `Window -> Asset Management -> Addressables -> Groups`.
    2. Click `Create Addressables Settings`.
    3. If legacy bundles are detected click on `Ignore`.
1. In menu, click on `Pupil Labs -> Addressables -> Import Groups`. After this step the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 2.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Import `TMP resources` by clicking `Window -> TextMeshPro -> Import TMP Essential Resources`.
1. Click `Edit->Project Settings`.
1. In the `XR Plug-in Management` section, set `Plug-in Providers` to `PICO`. No other options should be selected.
1. Set your App ID in `PXR_SDK -> Platform Settings`.

All the pre-configured sampe scenes that work with Neon XR start with a `PL_` prefix, e.g. `PL_HandInteractionExamples`. Check them out!
