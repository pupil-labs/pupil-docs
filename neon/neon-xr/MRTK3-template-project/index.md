# MRTK3 Template Project

The [Mixed Reality Toolkit 3 (MRTK3)](https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/) is a collection of scripts and components that make it easy to build XR applications for a variety of platforms. We provide a template project for the MRTK3 with Neon XR already integrated to kickstart your development.

The template contains several demo scenes that showcase how to use Neon XR with MRTK3, including e.g. the following scenes demonstrating gaze-based interaction:

<Youtube src="2e8kRTn3NJI" />

## Running the Template Project

If you just want to try out the demo scenes included in the template project in action, you can download and install a pre-built APK. The APKs are platform-specific and we currently only offer them for the Pico 4 and Quest 3 headsets.

### Pico 4

You can download the Pico 4 APK at this link:

- [Pico 4 - MRTK3 Template Project](https://drive.google.com/file/d/1WaJxx6wgQNKFfpGUAPKxbOfHZ49kXJgW/view?usp=sharing)

To install it, simply open the link in the headset's browser, download the file and open it.

### Quest 3

You can download the Quest 3 APK at this link:

- [Quest 3 - MRTK3 Template Project](https://drive.google.com/file/d/1oqItPeX0NtCI47RWGdbHfSkEHezwsmPz/view?usp=sharing)

To install it, [enable Developer Mode](https://developers.meta.com/horizon/documentation/native/android/mobile-device-setup/#enable-developer-mode) on the headset and use [the `adb` tool](https://developer.android.com/tools/adb) to install it:

```shell
adb install neon-quest3.apk
```

The installed APK will be found under `Library -> Applications -> Unknown Sources` in the Quest 3 headset's GUI.

::: tip
See [the official Quest 3 documentation](https://developers.meta.com/horizon/documentation/native/android/ts-adb/) for more details on how to install with `adb`.
:::

## Building the Project

To get started use our [fork of the MRTK repository](https://github.com/pupil-labs/MixedRealityToolkit-Unity), which contains the template project.

Clone the repository using e.g. this command:

```
git clone git@github.com:pupil-labs/MixedRealityToolkit-Unity.git
```

Currently, the best supported development environment is Unity 2021.3.21f1 on Windows.

Depending on your target platform the required setup may differ slightly as some platforms require e.g. specific SDKs. Here we provide instructions for the Pico 4 and Quest 3.

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
1. From the menu, select `Pupil Labs -> Addressables -> Import Groups`. After this step, the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 5.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Import `TMP resources` by clicking `Window -> TextMeshPro -> Import TMP Essential Resources`. In the opening window, keep everything selected and click `Import`.

#### Additional Build Settings

The following settings are required to build the project for the Pico 4 headset:

1. Click `Edit->Project Settings`.
1. In the `XR Plug-in Management` section, set `Plug-in Providers` to `PICO`. No other options should be selected.
1. Set your App ID in `PXR_SDK -> Platform Settings`.

### Quest 3

Follow these steps to setup the template project for the Quest 3 headset:

1. Checkout the `neon` branch.
   ```
   git checkout neon
   ```
1. Open the Unity sample project located in `UnityProjects\MRTKDevTemplate` using Unity Hub.
1. Create default Addressables settings.
   1. Select `Window -> Asset Management -> Addressables -> Groups`.
   2. Click on `Create Addressables Settings`.
   3. If legacy bundles are detected click on `Ignore`.
1. From the menu, select `Pupil Labs -> Addressables -> Import Groups`. After this step, the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 3.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Import `TMP resources` by clicking `Window -> TextMeshPro -> Import TMP Essential Resources`. In the opening window, keep everything selected and click `Import`.
1. Switch to `Android` as the `Build Platform` in `Build Settings`.
1. Before building, disable `Google ARCore` under `Edit -> Project Settings -> XR Plug-in Management`.

Once built, use `adb` to install the resulting APK onto the headset, following the instructions [here](#running-the-template-project).

## Usage

All the pre-configured sample scenes that work with Neon XR start with a `PL_` prefix and are found in the Project Browser under `Assets -> PupilLabs -> Scenes`.

The `PL_HandInteractionExamples` scene is the main entry point to all of the sample scenes. The default build of the MRTK3 APK will start in this scene.

You navigate to the other scenes by holding up a hand, palm open and facing you, until the MRTK3 navigation menu appears. You interact with buttons by reaching forward with the index finger of your other hand until you "push" a button.

If you plan to run a scene standalone, such as the `PL_Calibration` scene, then you need to first add a `MRTK NeonXR Variant` Prefab to the scene. This Prefab is found in Unity's Project Browser under `Assets -> PupilLabs -> MRTK -> Prefabs`.

<!-- TODO: Add descriptions of all available scenes. -->
