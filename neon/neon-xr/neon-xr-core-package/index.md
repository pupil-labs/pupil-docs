# The Neon XR Core Package

Using the Neon XR Core Package in your Unity project enables you to receive eye tracking data from a Neon device over the local network in real-time.

## Adding Neon XR to Your Project

The [**Neon XR Unity package**](https://github.com/pupil-labs/neon-xr) enables you to receive eye tracking data from a Neon module in your Unity project in real-time.

To integrate it in your project, follow these steps:

1. Add the `Neon XR` package in the Package Manager.
   1. Select `Window -> Package Manager`
   2. Select `+ -> Add Package from git URL…`
   3. Insert ` https://github.com/pupil-labs/neon-xr.git?path=/com.pupil-labs.neon-xr.core`.
1. If your project does not use Addressables, create default Addressables settings.
   1. Select `Window -> Asset Management -> Addressables -> Groups`.
   2. Click on `Create Addressables Settings`.
   3. If legacy bundles are detected click on `Ignore`.
1. Select `Pupil Labs -> Addressables -> Import Groups`. After this step the `NeonXR Group` should appear in the `Addressables Groups` window (you can open this window again following step 2.1).
1. In the `Addressable Groups` window, select `Build -> New Build -> Default Build Script`.
1. Copy the `NeonXR` prefab from the imported package into the scene.
1. Locate the `Neon Gaze Data Provider` component on GameObject `NeonXR/PupilLabs`.
1. Add your own listener for the `gazeDataReady` event (see for example, `GazeDataVisualizer.OnGazeDataReady`).

## Connecting to Neon

The Neon Companion app publishes the data it generates to the local network using the [real-time API](/real-time-api/tutorials/). The Neon XR Core package contains a client to receive this data and map it into the 3D virtual world. By default, it tries to connect to the first Neon device it detects on the network.

::: tip
You can stream & receive data in your Unity program without starting a recording in the Neon Companion app.

Note that the real-time reception rate will be determined by Unity's update rate, so if you need a higher sample rate, then you can run a recording in parallel.
:::

You can configure the connection behaviour by editing the `config.json` file of the app, which is located at the following path:

```
\Android\data\org.MixedRealityToolkit.MRTK3Sample\files\config.json
```

You can edit this file by copying it to your computer, modifying the values, and then copying it back to the headset.

It contains a field `rtspSettings` with the following keys:

| Field        | Description                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `autoIP`     | Enables the automatic discovery of Neon devices connected to the local network. The first detected device will be used. |
| `deviceName` | If not empty, only devices with the provided name can be discovered.                                                    |
| `ip`         | This IP address that will be used if automatic discovery is disabled.                                                   |
