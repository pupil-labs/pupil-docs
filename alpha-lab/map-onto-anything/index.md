---
title: "Map Gaze Onto Anything"
description: "Combine gaze with object and pose recognition in minutes. Learn how to augment your eye tracking data using powerful, open-source computer vision models, in real time or after the fact."
permalink: /alpha-lab/map-onto-anything/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://example.com/article_image.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/_mmFz2_7j0w"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/_mmFz2_7j0w/maxresdefault.jpg"
tags: [Neon, Pupil Invisible]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Map Gaze Onto Anything

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="_mmFz2_7j0w"/>

::: tip
🏀 Ever wanted to know not just *where* a person is looking, but also *what* they're looking at? This guide shows you how to build a flexible bridge between Neon's eye tracking data and any computer vision model.
:::

## When Gaze Alone Is Not Enough

Eye tracking offers a powerful window into human behavior, but raw gaze data only tells part of the story. Truly understanding attention means comprehending the visual environment: what objects a person engages with, what they overlook, or how eye-hand coordination plays out.

Neon provides rich data streams alongside video, but users often wonder how to interpret them in the context of the visual scene. While humans can effortlessly turn images into concepts, recognizing a hand, a person, or a coffee cup, and intuitively understand their spatial relationships, computers need help bridging the gap from pixels to meaning.

This is where our guide comes in. It shows you how to connect computer vision tools with Neon’s data streams, through practical examples, such as running object and hand-pose detection models in both real-time and post-hoc, turning raw data into meaningful insights.

## Adding New Layers of Data

Pupil Cloud offers powerful built-in enrichments, like [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) or [Face Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/), which are excellent for static scenes or tracking faces.

In Alpha Lab, we’ve also explored how to map gaze onto [dense human body parts](../dense-pose/), [screens](../gaze-contingency-assistive/) and using [large multimodal models for object recognition and scene understanding](../gpt4-eyes/). But we’ve only just scratched the surface.

The last few years have seen an explosion in accessible, highly accurate, and real-time capable models from different research labs. These powerful algorithms are becoming increasingly efficient, allowing them to be run more effectively on consumer hardware and opening up new possibilities for research.

This guide shows how easy it is to apply these state-of-the-art tools directly to your eye tracking data.

## Running the Examples

### Real-Time

Accessing a scene camera frame with corresponding gaze data is [relatively easy](https://pupil-labs.github.io/pl-realtime-api/dev/methods/simple/streaming/scene-camera/#scene-camera-video-with-overlayed-gaze). But let’s go beyond that.

First, we capture video and gaze data. Then, we run computer vision models (described below), and overlay the video frames with resulting hand pose and object detections (e.g. a sports ball). As a final step, we calculate the spatial relationship between the wearer’s gaze and these dynamically tracked objects in the scene camera video.

If you are using [Astral's uv](https://docs.astral.sh/uv/), you can run the command below; no setup or dependency management needed. Alternatively, download the script from the gist, set up a Python environment, install the dependencies listed at the top, and run the script manually.

::: code-group

```sh [uv]
uv run -s https://gist.githubusercontent.com/mikelgg93/cedc064a1b065bd1e9d8b9aa1f05e53d/raw/af67f5686f8bbbf94345dbcab80e99827ae0f29b/ball_hand_rt.py
```

```sh [vanilla]
python3 ball_hand_rt.py
```

:::

For this task, we've chosen two powerful and lightweight tools: [Google's MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/guide) for robust real-time hand tracking, and the Ultralytics framework for high-performance object detection using state-of-the-art [YOLO model](https://docs.ultralytics.com/) or [**Baidu’s RT-DTER**](https://docs.ultralytics.com/models/rtdetr/).

The script is highly configurable via command-line arguments. You can specify options such as the Ultralytics model, which [object classes](https://github.com/ultralytics/ultralytics/blob/main/ultralytics/cfg/datasets/coco.yaml) to detect, confidence detection thresholds, or the device's IP address. To see a full list of available options, use the `--help` flag. For implementation details on performance optimizations, check out the [source code](https://gist.github.com/mikelgg93/cedc064a1b065bd1e9d8b9aa1f05e53d).

::: warning 🐌 INFO
Even though these models are relatively lightweight and heavily optimized, you’ll still need a powerful computer with a GPU to run them in real time without frame drops.
:::

### Post-Hoc

Next, we demonstrate a post-hoc workflow using [pl-neon-recording](https://github.com/pupil-labs/pl-neon-recording), a library that simplifies access to native Neon recordings.

We process recorded video and gaze streams with a more demanding YOLO model to run instance segmentation and the same Google’s Mediapipe for hand tracking. Check out the [code](https://gist.github.com/mikelgg93/7355a22d3502249328b43ad150b2e2d9) here.

::: code-group

```sh [uv]
uv run -s https://gist.githubusercontent.com/mikelgg93/7355a22d3502249328b43ad150b2e2d9/raw/8802398a3337ed5e94cd6c54441e6b072a4c113e/ball_hand_plnr.py HERE_YOUR_RECORDING_DIR
```

```sh [vanilla]
python3 ball_hand_plnr.py HERE_YOUR_RECORDING_DIR
```

:::

## Bring Your Own Models

We have two more examples that keep it simple; to show how to plug in your own models. They contain comments and highlight certain lines to help you navigate.

The first one shows how to use an object detection model (YOLO) in post-hoc analysis, using the [**pl-neon-recording**](https://pupil-labs.github.io/pl-neon-recording/dev/) library to access the recording data.

::: details Using a Model in Post-Hoc Analysis

```py{16-17,25-26,40-41,46-47} [yolo_plnr.py]
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "opencv-python",
#     "pupil-labs-video",
#     "pupil-labs-neon-recording",
#     "ultralytics",
# ]
# ///

from pathlib import Path

import cv2
import pupil_labs.neon_recording as nr
from tqdm import tqdm
# Import YOLO or any other model you want to use
from ultralytics import YOLO

RECORDING_DIR = Path(
    "path/to/recording"
)  # Replace with your actual recording directory


def main():
    # Load the model
    detector = YOLO("yolo11n-seg.pt")

    recording = nr.load(RECORDING_DIR)
    combined_data = zip(
        recording.scene.ts,
        recording.scene.sample(recording.scene.ts),
        recording.gaze.sample(recording.scene.ts),
        strict=False,
    )
    for ts, scene_frame, gaze_datum in tqdm(
        combined_data, total=len(recording.scene.ts)
    ):
        frame_pixels = scene_frame.bgr

        # Run the detector over the scene camera frame
        detection = detector(frame_pixels)
        # Here you can pass classes if needed, e.g., detector(frame_pixels, classes=[0, 1])
        # For example, to detect only person and car classes, you can use:
        # detection = detector(frame_pixels, classes=[0, 2])  # 0 for person, 2 for car

        # Plot the detections over the frame
        frame_with_detection = detection[0].plot()
        # Here you can get iterate through the results if needed
        # for result in detection[0]:
        #     print(result.boxes.xyxy)  # Bounding box coordinates
        #     print(result.boxes.conf)  # Confidence scores
        #     print(result.boxes.cls)  # Class IDs

        # Here you can compute distances, store the position, or perform any other analysis

        # Draw the gaze point on the frame
        final_frame = cv2.circle(
            frame_with_detection,
            (int(gaze_datum.x), int(gaze_datum.y)),
            10,
            (0, 0, 255),
            5,
        )
        # Show the image
        cv2.imshow("Frame with detection", final_frame)
        if cv2.waitKey(1) & 0xFF == 27:  # Press ESC to exit
            break


if __name__ == "__main__":
    main()
```

:::

The second example shows how to use YOLO in real-time. We show you how to implement a few more options here, like using the gaze point to detect the gazed object or to specify specific classes. Those options are implemented through arguments.

::: details Using a Model in Real-Time

```py{67-68,111-113,115,119-120,122-128} [yolo_rt.py]
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "opencv-python",
#     "pupil-labs-realtime-api",
#     "ultralytics",
#     "click",
#     "lap",
# ]
# ///

import click
import cv2
from pupil_labs.realtime_api.simple import Device, discover_one_device
from ultralytics import YOLO


class DetectMode(click.ParamType):
    """Custom Click type for validating the --detect argument.

    It accepts 'all', 'gazed', or a comma-separated list of integers.
    The conversion returns a tuple: (mode_string, class_list_or_None).
    """

    name = "detect_mode"

    def convert(self, value, param, ctx):
        val_lower = str(value).lower()
        if val_lower in ("all", "gazed"):
            return (val_lower, None)

        try:
            classes = [int(p.strip()) for p in value.split(",")]
            if not classes and value.strip() != "0":
                self.fail(
                    f"'{value}' is not a valid non-empty list of class IDs.", param, ctx
                )
        except ValueError:
            self.fail(
                f"""Value '{value}' for --plot is not 'all', 'gazed', or a
                comma-separated list of integers.""",
                param,
                ctx,
            )
        return ("specific", classes)


@click.command()
@click.option(
    "--model",
    type=click.Choice(["n", "s", "m"]),
    default="n",
    help="Specify YOLO model variant: 'n' (nano), 's' (small), 'm' (medium).",
)
@click.option("--track", is_flag=True, help="Enable YOLO tracking.")
@click.option(
    "--detect",
    default="gazed",
    type=DetectMode(),
    help="Plotting mode: 'gazed', 'all', or comma-separated specific class IDs from"
    "coco.yaml (e.g., '0,15,16').",
)
@click.option("--ip", default=None, help="IP address of the Pupil Labs device.")
@click.option("--port", default=8080, help="Port of the Pupil Labs device.")
def main(model, track, detect, ip, port):
    """YOLO-based detection over Neon streaming."""
    # Instantiate the model
    detector = YOLO(f"yolo11{model}-seg.pt")
    device = None

    if ip is None:
        print("IP address not provided. Attempting to discover device via mDNS...")
        try:
            device = discover_one_device(max_search_duration_seconds=10)
            if device:
                print(f"Discovered device: {device}")
        except Exception as e:
            print(f"mDNS discovery failed: {e}")
    else:
        print(f"Attempting to connect to device at {ip}:{port}...")
        try:
            device = Device(address=ip, port=port)
        except Exception as e:
            print(f"Failed to connect to device at {ip}:{port}. Error: {e}")

    if device is None:
        print(
            "Could not find or connect to a device. "
            "Please check the connection or provide a valid IP address using --ip."
        )
        raise SystemExit(-1)

    print(f"Connecting to {device}...")

    mode, target_classes = detect
    print(f"Detection mode: {mode}, Target classes: {target_classes}")

    try:
        while True:
            matched = device.receive_matched_scene_and_eyes_video_frames_and_gaze()
            if not matched:
                print(
                    "Not able to find a match! Note: Pupil Invisible does not support "
                    "streaming eyes video"
                )
                continue
            gaze_x = int(matched.gaze.x)
            gaze_y = int(matched.gaze.y)
            # Run the detector over the scene camera frame
            if track:
                detection = detector.track(
                    matched.scene.bgr_pixels, classes=target_classes
                )
            else:
                detection = detector(matched.scene.bgr_pixels, classes=target_classes)

            frame = matched.scene.bgr_pixels.copy()
            if mode in ["all", "specific"]:
            # We plot all detections
                frame = detection[0].plot()
            elif mode == "gazed":
            # Here we plot only if gazed
                for result in detection[0]:
                    if result.boxes:
                        for box in result.boxes.xyxy:
                            x1, y1, x2, y2 = box
                            if x1 < gaze_x < x2 and y1 < gaze_y < y2:
                                frame = result.plot()

            cv2.circle(
                frame,
                (int(matched.gaze.x), int(matched.gaze.y)),
                radius=10,
                color=(0, 0, 255),
                thickness=5,
            )

            # Render eyes video into the scene video
            if matched.eyes is not None and matched.eyes.bgr_pixels is not None:
                height, width, _ = matched.eyes.bgr_pixels.shape
                frame[0:height, 0:width] = matched.eyes.bgr_pixels

            cv2.imshow("Scene camera with eyes and gaze overlay", frame)
            if cv2.waitKey(1) & 0xFF == 27:  # Press ESC to exit
                break
    except KeyboardInterrupt:
        print("\nScript interrupted by user.")
    finally:
        print("Stopping...")
        if device:
            device.close()  # Explicitly stop auto-update
        cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

:::

:::tip
When you've chosen a model to implement, it's always worth checking out their documentation and examples.
:::

## Your Turn to Build

Once you’ve run these examples, you will have new metrics such as ball and hand detections, and distance between these objects and the gaze point.

More importantly, you’ll have the building blocks for your own custom computer vision pipeline. You now have a clear path to integrate state-of-the-art models with your Neon data. 

So now it's your turn! Choose a different [category](https://github.com/ultralytics/ultralytics/blob/main/ultralytics/cfg/datasets/coco.yaml), [fine tune your models](https://docs.ultralytics.com/guides/model-evaluation-insights/#accessing-yolo11-metrics) or use [completely different ones](https://huggingface.co/models?sort=trending). 
You’ve got the foundation, now build on it and start tracking what's truly important to your research.

::: tip
Need assistance implementing a model? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
