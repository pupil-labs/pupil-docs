# MRTK3 Template Project
The [Mixed Reality Toolkit 3 (MRTK3)](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/) is a collection of scripts and components that make it easy to build XR applications for a variety of platforms. We provide a template project for the MRTK3 with Neon XR already integrated to kickstart your development.

The template contains several demo scenes that showcase how to use Neon XR with MRTK3, including e.g. the following scenes demonstrating gaze-based interaction:

<Youtube src="2e8kRTn3NJI" />

## Running the Template Project
If you just want to try out the demo scenes included in the template project in action, you can download and install a pre-built APK. The APKs a platform-specific and we currently only offer one for the Pico 4 headset. You can download it at this link: 

[Link to download]()

To install it, simply open the link in the browser of your Pico 4 headset, download the file and open it.
<!-- TODO: Double-check this works and potentially elaborate. -->

## Building the Project

To get started use our [fork of the MRTK repository](https://github.com/pupil-labs/MixedRealityToolkit-Unity), which contains the template project.

Clone the repository using e.g. this command:
```
git clone git@github.com:pupil-labs/MixedRealityToolkit-Unity.git
```

Depending on your target platform the required setup may differ slightly as some platforms require e.g. specific SDKs. Here we provide instructions for the Pico 4 as well as generic instructions that can be adapted to other platforms.


### Pico 4
Follow these steps to setup the template project for the Pico 4 headset:
1. Checkout the `neon-pico` branch which is setup to use the PICO Unity Integration SDK.
    ```
    git checkout neon-pico
    ```
1. Download the PICO Unity Integration SDK [here](https://developer-global.pico-interactive.com/resources/) and extract it to the root folder of the MRTK3 repository. This should create a folder called `PICO Unity Integration SDK 240` or similar with the version number at the end. **Remove the version from the folder name**, such that the folder is called `PICO Unity Integration SDK`.
1. Open the Unity sample project located in `UnityProjects\MRTKDevTemplate` using Unity Hub.
1. When the project loads for the first time, a `PXR SDK Settings` window will pop up. Click `Apply`. Once finished click `Close`.
1. Create default Addressables settings.
    1. Select `Window -> Asset Management -> Addressables -> Groups`.
    2. Click on `Create Addressables Settings`.
    3. If legacy bundles are detected click on `Ignore`.
1. From the menu, select `Pupil Labs -> Addressables -> Import Groups`. After this step, the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 2.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Import `TMP resources` by clicking `Window -> TextMeshPro -> Import TMP Essential Resources`. In the opening window, keep everything selected and click `Import`.

#### Additional Build Settings
The following settings are required to build the project for the Pico 4 headset:
1. Click `Edit->Project Settings`.
1. In the `XR Plug-in Management` section, set `Plug-in Providers` to `PICO`. No other options should be selected.
1. Set your App ID in `PXR_SDK -> Platform Settings`.

### Other Platforms
Adapt the following steps to setup the template project for other platforms:

1. Checkout the `neon` branch. 
    ```
    git checkout neon
    ```
1. Open the Unity sample project located in `UnityProjects\MRTKDevTemplate` using Unity Hub.
1. Create default Addressables settings.
    1. Select `Window -> Asset Management -> Addressables -> Groups`.
    2. Click on `Create Addressables Settings`.
    3. If legacy bundles are detected click on `Ignore`.
1. From the menu, select `Pupil Labs -> Addressables -> Import Groups`. After this step, the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 2.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Import `TMP resources` by clicking `Window -> TextMeshPro -> Import TMP Essential Resources`. In the opening window, keep everything selected and click `Import`.

## Usage

All the pre-configured sampe scenes that work with Neon XR start with a `PL_` prefix, e.g. `PL_HandInteractionExamples`. Check them out!
<!-- TODO: Add descriptions of all available scenes. Add instructions on how to switch between scenes when running the app. -->