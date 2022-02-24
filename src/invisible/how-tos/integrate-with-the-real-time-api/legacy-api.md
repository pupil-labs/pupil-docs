---
description: Guide on using the now deprecated real-time API called NDSI.
---

# Legacy API

:::danger
<v-icon large color="gray">info_outline</v-icon>

Our previous real-time API called NDSI is now deprecated! We recommend using the new real-time API client introduced [here](/invisible/itegrate-with-the-real-time-api/introduction).
:::

[Pupil Invisible Companion App](/invisible/user-guide/invisible-companion-app/ "Pupil Invisible Companion App") uses
the [NDSI v4](https://github.com/pupil-labs/pyndsi/blob/v1.0/ndsi-commspec.md "NDSI communication specification protocol") protocol
to publish its scene video and gaze data via local network.

[Pupil Invisible Monitor](#pupil-invisible-monitor) desktop application uses this API to
list the local devices, receive their scene video, and visualize the most recent gaze data.

Below you can find a full example that receives gaze data from all available Pupil
Invisible Companion devices.

```py
import time

import cv2
import numpy as np

# https://github.com/pupil-labs/pyndsi/tree/v1.0
import ndsi  # Main requirement

SENSOR_TYPES = ["video", "gaze"]
SENSORS = {}  # Will store connected sensors


def main():
    # Start auto-discovery of Pupil Invisible Companion devices
    network = ndsi.Network(
        formats={ndsi.DataFormat.V4}, callbacks=(on_network_event,))
    network.start()

    try:
        #
        world_img = np.zeros((1088, 1080, 3))
        gaze = (0, 0)

        # Event loop, runs until interrupted
        while network.running:
            # Check for recently connected/disconnected devices
            if network.has_events:
                network.handle_event()

            # Iterate over all connected devices
            for sensor in SENSORS.values():

                # We only consider gaze and video
                if sensor.type not in SENSOR_TYPES:
                    continue

                # Fetch recent sensor configuration changes,
                # required for pyndsi internals
                while sensor.has_notifications:
                    sensor.handle_notification()

                # Fetch recent gaze data
                for data in sensor.fetch_data():
                    if data is None:
                        continue
                    
                    if sensor.name == "PI world v1":
                        world_img = data.bgr

                    elif sensor.name == "Gaze":
                        # Draw gaze overlay onto world video frame
                        gaze = (int(data[0]), int(data[1]))

            # Show world video with gaze overlay
            cv2.circle(
                world_img,
                gaze,
                40, (0, 0, 255), 4
            )
            cv2.imshow("Pupil Invisible - Live Preview", world_img)
            cv2.waitKey(1)

    # Catch interruption and disconnect gracefully
    except (KeyboardInterrupt, SystemExit):
        network.stop()


def on_network_event(network, event):
    # Handle gaze sensor attachment
    if event["subject"] == "attach" and event["sensor_type"] in SENSOR_TYPES:
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

## Remote Control

Starting and stopping recordings on Pupil Invisible Companion App can be controlled remotely by another device that is in the same network and follows the NDSI v4 protocol.


 - The Pupil Invisible Companion App has to be ready for recording and the active [template](/invisible/user-guide/intro/#templates) must have no required fields to avoid incomplete templates or force input on the remotely controlled phone.
 - The remote device can set the `local_capture` control of the hardware sensor after attaching to it, to start and stop a recording, see the example below for more details.

```py
import time
import uuid
import json

# https://github.com/pupil-labs/pyndsi/
import ndsi  # Main requirement

HARDWARE_TYPE = "hardware"  # Type of sensors that we are interested in
SENSORS = {}  # Will store connected sensors

RECORDING_TIME = 5  # seconds

timestamps_recording_start = {}


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
            for hardware_sensor in SENSORS.values():
                # Fetch recent sensor configuration changes,
                # required for pyndsi internals
                while hardware_sensor.has_notifications:
                    hardware_sensor.handle_notification()

                stop_recording(hardware_sensor)
        time.sleep(0.1)

    # Catch interruption and disconnect gracefully
    except (KeyboardInterrupt, SystemExit):
        network.stop()


def start_recording(hardware_sensor):
    if hardware_sensor not in timestamps_recording_start:
        # start recording
        hardware_sensor.set_control_value("local_capture", True)
        # request the current configuration
        hardware_sensor.refresh_controls()
        timestamps_recording_start[hardware_sensor] = time.time()
        print(f"started recording for sensor {hardware_sensor.uuid}")


def stop_recording(hardware_sensor):
    # check if the sensor is recording
    if (
        hardware_sensor in timestamps_recording_start
        and timestamps_recording_start[hardware_sensor] is not None
    ):
        rec_time_start = timestamps_recording_start[hardware_sensor]
        now = time.time()
        if now - rec_time_start >= RECORDING_TIME:
            # stop the recording after 5 seconds recording time
            hardware_sensor.set_control_value("local_capture", False)
            # request the current configuration
            hardware_sensor.refresh_controls()
            timestamps_recording_start[hardware_sensor] = None
            print(f"stopped recording for sensor {hardware_sensor.uuid}")


def on_network_event(network, event):
    # Handle event sensor attachment
    if event["subject"] == "attach" and event["sensor_type"] == HARDWARE_TYPE:
        # Create new sensor
        # and request current configuration
        sensor = network.sensor(event["sensor_uuid"])
        sensor.refresh_controls()

        # Save sensor s.t. we can fetch data from it in main()
        SENSORS[event["sensor_uuid"]] = sensor
        print(f"Added sensor {sensor}...")

        # start the recording
        start_recording(sensor)


    # Handle event sensor detachment
    if event["subject"] == "detach" and event["sensor_uuid"] in SENSORS:
        # Known sensor has disconnected, remove from list
        SENSORS[event["sensor_uuid"]].unlink()
        del SENSORS[event["sensor_uuid"]]
        print(f"Removed sensor {event['sensor_uuid']}...")


if __name__ == "__main__":
    main()  # Execute example
```



## Recording Events

Events allow external triggers/annotations to be mixed into the Pupil Invisible recording data stream.

A source for triggers/annotations could be another app that you develop running on the Pupil Invisible Companion Device. Your app might have buttons that the wearer can press. Button presses translate into events that are written into the Pupil Invisible recording data stream. Another source could be a script that runs a PC on the same local network.

When events are received or generated by the Pupil Invisible Companion app they are written to `events.raw/events.time` and also published on the NDSI events sensor.


### Event Data Format

Event datums contain two fields:
1. Name: A UTF-8 encoded string of up to 1024 chars length. Events with an identical string may repeat in the datastream
2. Timestamp: Timestamp of the Event in Pupil Time

### Event Network Interface

Events can be sent to Pupil Invisible Companion app via a Zyre message. Minimal example below:

```py

import pyre
import json

event_message = {
    "name": "your event name",
    "timestamp": None
    # timestamp (optional)  time in nanoseconds.
    # if omitted Pupil Invisible Companion will use the time of message reception
}

node = pyre.Pyre("event_source")
node.join("pupil-mobile-v4")
node.start()
try:
    for evt in node.events():
        if evt.type == "JOIN":
            # send an event to every Pupil Invisible Companion App
            # and other NDSIv4 actor that joins the pupil-mobile-v4 group
            node.whispers(evt.peer_uuid, json.dumps(event_message))
            print(f"sent event {event_message} to: {evt.peer_name}")
except:
    node.stop()
```

A more sophisticated example that also shows how to receive events from the Pupil Invisible Companion App can be found in the [time synchronization](#time-synchronization) section.


## Time Synchronization

The Pupil Invisible Companion App runs its own clock as the source for all data timestamps it generates. To create this clock the App samples the phone’s NTP (Network Time Protocol) synchronised UTC clock (Android Framework's `System.currentTimeMillis() * 1e6`) once at the beginning of the first sensor stream initialization. From then onward until no more sensors are streaming, this app clock is used, the unit used is nanoseconds.

Unlike the phones wall clock, this App clock is guaranteed to be monotonic, it also has a higher resolution. We can utilize the benefits of the initial NTP synchronization to make Pupil Invisible synchronisable with other devices that also follow NTP.

**To check sync quality**
1) Send a notification without timestamp to the companion app.
2) Measure the round-trip-time till reception of the echo.
3) Compare the timestamp in the echo with your target time while taking into account the round-trip-time.


```py
import time
import uuid
import json

# https://github.com/pupil-labs/pyndsi/
import ndsi  # Main requirement

EVENT_TYPE = "event"  # Type of sensors that we are interested in
SENSORS = {}  # Will store connected sensors

timestamps_sent = {}


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
            for event_sensor in SENSORS.values():
                # Fetch recent sensor configuration changes,
                # required for pyndsi internals
                while event_sensor.has_notifications:
                    event_sensor.handle_notification()

                sent_time_ping(network, event_sensor)  # Send <<time>> event
                recv_time_echo(event_sensor)  # wait for echo, calculate time offset

    # Catch interruption and disconnect gracefully
    except (KeyboardInterrupt, SystemExit):
        network.stop()


def sent_time_ping(network, event_sensor):
    if (
        event_sensor not in timestamps_sent
        and "streaming" in event_sensor.controls
        and event_sensor.controls["streaming"]["value"]
    ):
        timestamps_sent[event_sensor] = time.time()
        network.whisper(
            uuid.UUID(event_sensor.host_uuid),
            (json.dumps({"name": "<<time>>"})).encode(),
        )


def recv_time_echo(event_sensor):
    for event in event_sensor.fetch_data():
        if event.label == "<<time>>":
            event_time_send = timestamps_sent[event_sensor]
            event_time_received = time.time()
            event_time_phone = event.timestamp

            roundtrip = event_time_received - event_time_send
            time_diff = (event_time_received + event_time_send) / 2 - event_time_phone

            host_name = event_sensor.host_name
            print(f"[{host_name}] Round trip time: {roundtrip} seconds")
            print(f"[{host_name}] Estimated time difference: {time_diff} seconds")


def on_network_event(network, event):
    # Handle event sensor attachment
    if event["subject"] == "attach" and event["sensor_type"] == EVENT_TYPE:
        # Create new sensor, start data streaming,
        # and request current configuration
        sensor = network.sensor(event["sensor_uuid"])
        sensor.set_control_value("streaming", True)
        sensor.refresh_controls()

        # Save sensor s.t. we can fetch data from it in main()
        SENSORS[event["sensor_uuid"]] = sensor
        print(f"Added sensor {sensor}...")

    # Handle event sensor detachment
    if event["subject"] == "detach" and event["sensor_uuid"] in SENSORS:
        # Known sensor has disconnected, remove from list
        SENSORS[event["sensor_uuid"]].unlink()
        del SENSORS[event["sensor_uuid"]]
        print(f"Removed sensor {event['sensor_uuid']}...")


if __name__ == "__main__":
    main()  # Execute example
```

More info regarding sync can be found in the [time synchronization test report](https://docs.google.com/document/d/16JpIUUXNQvJ74FqfVJI6PAUUAV2nrbcCpdYamrJif_M/edit# "Time synchronization report on google docs")