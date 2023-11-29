# Add Gaze-Interaction to Your Project
Gaze-Based interaction is of interest to many XR developers. It allows users to interact with virtual objects simply by looking at them. Often this is combined with hand interactions to e.g. select an object by fixating it and executing a pinching motion with one hand. 

To make adding gaze-based interactions to your project easier, we have integrated Neon XR with the [Mixed Reality Toolkit](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/) (MRTK). The MRTK is a collection of scripts and components that make it easy to build XR applications for a variety of platforms. It also includes a gaze-based interaction system that can be used to interact with virtual objects.

<Youtube id="2e8kRTn3NJI" />

## Setup

To get started use our [fork of the MRTK repository](https://github.com/pupil-labs/MixedRealityToolkit-Unity), which contains a template project:
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

### Additional Build Settings
The following settings are required to build the project for the Pico 4 headset:
1. Click `Edit->Project Settings`.
1. In the `XR Plug-in Management` section, set `Plug-in Providers` to `PICO`. No other options should be selected.
1. Set your App ID in `PXR_SDK -> Platform Settings`.

All the pre-configured sampe scenes that work with Neon XR start with a `PL_` prefix, e.g. `PL_HandInteractionExamples`. Check them out!
