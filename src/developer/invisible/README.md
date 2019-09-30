# Invisible

Welcome to Pupil Invisible developer docs!

<v-divider></v-divider>

## Recording Format

Similar to [Pupil Capture](/developer/core/recording-format/), the Pupil Invisible Companion
stores its data files in pairs: Each data file has a corresponding timestamp file. This
is required to correlate the different data source after-the-effect in Pupil Cloud or
Pupil Player.

You can find details to the specification of the Pupil Invisible Companion app recording
format in this [document](https://docs.google.com/spreadsheets/d/1e1Xc1FoQiyf_ZHkSUnVdkVjdIanOdzP0dgJdJgt0QZg/edit?usp=sharing).

<v-divider></v-divider>

## Network API

The [Pupil Invisible Companion](/invisible/user-guide/invisible-companion-app/) app uses
the [NDSI v4](https://github.com/pupil-labs/pyndsi/blob/v1.0/ndsi-commspec.md) protocol
to publish its scene video and gaze data via the local network.

The [Pupil Invisible Monitor](#pupil-invisible-monitor) app makes use of this API to
list the local devices, receive their scene video, and overlay the most recent gaze onto
it.

Below you can find a full example that receives gaze data from all available Pupil
Invisible Companion devices:

```py
import time

# https://github.com/pupil-labs/pyndsi/tree/v1.0
import ndsi  # Main requirement

GAZE_TYPE = "gaze"  # Type of sensors that we are interested in
SENSORS = {}  # Will store connected sensors


def main():
    # Start auto-discovery of Pupil Invisible Companion devices
    network = ndsi.Network(formats={ndsi.DataFormat.V4}, callbacks=(on_network_event,))
    network.start()

    try:
        # Event loop, runs until interrupted
        while network.running:
            # Check for recently connected/disconnected devices
            if network.has_events:
                network.handle_event()

            # Iterate over all connected devices
            for gaze_sensor in SENSORS.values():
                # Fetch recent sensor configuration changes,
                # required for pyndsi internals
                while gaze_sensor.has_notifications:
                    gaze_sensor.handle_notification()

                # Fetch recent gaze data
                for gaze in gaze_sensor.fetch_data():
                    # Output: GazeValue(x, y, ts)
                    print(gaze_sensor, gaze)

            time.sleep(0.1)

    # Catch interruption and disconnect gracefully
    except (KeyboardInterrupt, SystemExit):
        network.stop()


def on_network_event(network, event):
    # Handle gaze sensor attachment
    if event["subject"] == "attach" and event["sensor_type"] == GAZE_TYPE:
        # Create new sensor, start data streaming,
        # and request current configuration
        sensor = network.sensor(event["sensor_uuid"])
        sensor.set_control_value("streaming", True)
        sensor.refresh_controls()

        # Save sensor s.t. we can fetch data from it in main()
        SENSORS[event["sensor_uuid"]] = sensor
        print(f"Added sensor {sensor}...")

    # Handle gaze sensor detachment
    if event["subject"] == "detach" and event["sensor_uuid"] in SENSORS:
        # Known sensor has disconnected, remove from list
        SENSORS[event["sensor_uuid"]].unlink()
        del SENSORS[event["sensor_uuid"]]
        print(f"Removed sensor {event['sensor_uuid']}...")


main()  # Execute example
```

<v-divider></v-divider>

## Pupil Invisible Monitor

This is a stand alone desktop app that connects to Pupil Invisible using the Network API
over WiFi. You can use it to live stream scene video and gaze data from all connected
Pupil Invisible(s) on the network. 

Check out Pupil Invisible Monitor on [Github](https://github.com/pupil-labs/pupil-invisible-monitor "Pupil Invisible Monitor").