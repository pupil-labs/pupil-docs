---
title: "Map Gaze Onto Anything"
description: "Combine gaze with object and pose recognition in minutes. Learn how to augment your eye-tracking data using powerful, open-source computer vision models, in real time or after the fact."
permalink: /alpha-lab/map-onto-anything/
meta:
  - name: twitter:card
    content: summary
  - name: twitter:image
    content: "https://example.com/article_image.jpg"
  - name: twitter:player
    content: "https://www.youtube.com/embed/NjXLBsynUkg"
  - name: twitter:width
    content: "1280"
  - name: twitter:height
    content: "720"
  - property: og:image
    content: "https://i.ytimg.com/vi/NjXLBsynUkg/maxresdefault.jpg"
tags: [Neon, Pupil Invisible]
---

<script setup>
import TagLinks from '@components/TagLinks.vue'
</script>

# Map Gaze Onto Anything

<TagLinks :tags="$frontmatter.tags" />

<Youtube src="NjXLBsynUkg"/>

::: tip
🛤️ Track, track track! It's not just where they look — it's what they're looking at.
:::

## Gaze Alone Is Not Enough

Eye-tracking offers a powerful window into human behavior, but raw gaze data only tells part of the story. Truly understanding attention means comprehending the visual environment, what objects a person engages with, what they overlook, or how eye-hand coordination plays out.

Neon provides rich data streams alongside video, but users are often left wondering how to interpret them in the context of the visual scene. Humans can effortlessly turn images into concepts, recognizing a hand, a person or a coffee cup in the scene and intuitively understanding their spatial relationships. Computers, however, often need help bridging that gap from pixels to meaning.

## New Layers of Data

Pupil Cloud bridges the gap with many enrichments like the [Face Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/face-mapper/) or the [Reference Image Mapper](https://docs.pupil-labs.com/neon/pupil-cloud/enrichments/reference-image-mapper/) with [AOIs](https://docs.pupil-labs.com/neon/pupil-cloud/visualizations/areas-of-interest/). We’ve also explored here, mapping onto [dense human body parts](../dense-pose/), [screens](../gaze-contingency-assistive/) or using [AI for visual understanding](../gpt4-eyes/), but we’ve only just scratched the surface.

Over the years, the computer vision field have greatly evolved and a plethora of models have emerged. These go beyond detection and tracking of objects, poses and depth, allowing segmentation and even full scene understanding.

Yet many users don’t realize how easy it is to layer object recognition or pose tracking models onto Neon recordings. This article is your entry point, whether you’re plugging in your own models or using open ones off the shelf.

## News

Accessing a scene camera frame with corresponding gaze data is relatively easy, both in real-time and post-hoc analysis. But let’s go beyond that, here we present a few examples augmenting this data:

- First, using our real-time API, we capture video and gaze data and overlay it with hand pose and ball detections. As a final step, we calculate the spatial relationship between the user’s gaze and these dynamically tracked objects in the scene camera space.

  For this task, we've chosen two powerful and lightweight solutions, [Google's MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/guide) for robust real-time hand tracking and the Ultralytics framework for high-performance object detection using state-of-the-art [YOLO model](https://docs.ultralytics.com/) or [Baidu’s RT-DTER](https://docs.ultralytics.com/models/rtdetr/).

::: warning 🐌 WARNING
Even though these models are quite light and heavily optimized, you’ll still need a powerful computer with a GPU to run them in real time without frame drops.
:::

- Next, we demonstrate a post-hoc workflow using pl-neon-recording, a library that simplifies access to native Neon data. In this example, we process recorded video and gaze streams with a more demanding YOLO model to run instance segmentation and Google’s Mediapipe for hand tracking.

- Finally, we include two simple snippets using YOLO as your entry point, to demonstrate the basics, removing optimizations, just showcasing the barebones.

## Steps

Do you want to run the examples? We make it easy:
If using [uv](https://docs.astral.sh/uv/) you can run the command below—no setup or dependency management needed. Alternatively, download the script from the gist, set up a Python environment, install the dependencies listed at the top, and run the script manually.

### Real-Time Example

::: code-group

```sh [uv]
uv run -s https://gist.githubusercontent.com/mikelgg93/cedc064a1b065bd1e9d8b9aa1f05e53d/raw/af67f5686f8bbbf94345dbcab80e99827ae0f29b/ball_hand_rt.py
```

```sh [vanilla]
python3 ball_hand_rt.py
```

:::

Note that you can pass different Ultralytics models, configure thresholds, define the IP address it should connect to, etc, through the arguments. Use the flag `--help` to see all the options.

::: info
[View the code](https://gist.github.com/mikelgg93/cedc064a1b065bd1e9d8b9aa1f05e53d)
:::

### Post-Hoc Example

::: code-group

```sh [uv]
uv run -s https://gist.githubusercontent.com/mikelgg93/7355a22d3502249328b43ad150b2e2d9/raw/8802398a3337ed5e94cd6c54441e6b072a4c113e/ball_hand_plnr.py
```

```sh [vanilla]
python3 ball_hand_plnr.py
```

:::

::: info  
[View the code](https://gist.github.com/mikelgg93/7355a22d3502249328b43ad150b2e2d9)
:::

### Entrypoints

::: details Using YOLO in Real-Time

```py [yolo_rt.py]
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
            matched = device.receive_matched_scene_and_eyes_video_frames_and_gaze() // [!code focus]
            if not matched:
                print(
                    "Not able to find a match! Note: Pupil Invisible does not support "
                    "streaming eyes video"
                )
                continue
            gaze_x = int(matched.gaze.x)
            gaze_y = int(matched.gaze.y)

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

::: details Using YOLO in Post-Hoc Analysis

```py [yolo_plnr.py]
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
from ultralytics import YOLO

RECORDING_DIR = Path(
    "path/to/recording"
)  # Replace with your actual recording directory


def main():
    detector = YOLO("yolo11n-seg.pt")  # Load the YOLO model

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
        detection = detector(frame_pixels)
        # Here you can pass classes if needed, e.g., detector(frame_pixels, classes=[0, 1])
        # For example, to detect only person and car classes, you can use:
        # detection = detector(frame_pixels, classes=[0, 2])  # 0 for person, 2 for car

        frame_with_detection = detection[0].plot()
        # Here you can get iterate through the results if needed
        # for result in detection[0]:
        #     print(result.boxes.xyxy)  # Bounding box coordinates
        #     print(result.boxes.conf)  # Confidence scores
        #     print(result.boxes.cls)  # Class IDs

        # Draw the gaze point on the frame
        final_frame = cv2.circle(
            frame_with_detection,
            (int(gaze_datum.x), int(gaze_datum.y)),
            10,
            (0, 0, 255),
            5,
        )
        cv2.imshow("YOLO detection", final_frame)
        if cv2.waitKey(1) & 0xFF == 27:  # Press ESC to exit
            break


if __name__ == "__main__":
    main()
```

:::

## Contribution

Once running these examples you would have new metrics such as ball, hand detection and distance from gaze.

More importantly, you’ll understand how to integrate these models with your Neon data streams and data analysis.

Now is your turn, dive into those snippets and tweak them to your needs. Choose a different [category](https://github.com/ultralytics/ultralytics/blob/main/ultralytics/cfg/datasets/coco.yaml), [fine tune your models](https://docs.ultralytics.com/guides/model-evaluation-insights/#accessing-yolo11-metrics) or use completely different ones. You now have the building blocks for your own custom computer vision pipeline.

::: tip
Need assistance implementing your model? Reach out to us via email at [info@pupil-labs.com](mailto:info@pupil-labs.com), on our [Discord server](https://pupil-labs.com/chat/), or visit our [Support Page](https://pupil-labs.com/products/support/) for formal support options.
:::
