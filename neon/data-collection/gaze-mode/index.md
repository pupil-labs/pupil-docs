# Binocular vs. Monocular Gaze Mode

Starting from version 2.8.34-prod, the Neon Companion App allows you to select between using both eyes (binocular) or a single eye (monocular) images for outputing gaze positions. This option enables you to isolate gaze from a specific eye, e.g. when recording participants with strabismus, or other experimental paradgims that require monocular gaze.

## Modes

- `Binocular` _(default)_: Utilizes images from both the right and left eyes to infer gaze position. This mode offers higher accuracy and robustness by leveraging information from both eyes.
- `Mono Right`: Uses only the right eye's image to infer gaze position. This mode may be useful in scenarios where one eye can only be used.
- `Mono Left`: Uses only the left eye's image to infer gaze position. Similar to `Mono Right` but using the left eye.

::: warning
**Monocular gaze is less accurate and robust** since it relies on a single eye image. Use this mode only if binocular tracking is not feasible or if there's a specific need for single-eye tracking.
:::

## Changing Gaze Modes

To switch between gaze modes, follow these steps:

1. From the home screen of the Neon Companion App, tap the gear icon located at the top-right corner to open **Companion Settings**.
2. Scroll down to the **NeonNet** section.
3. Choose your desired **Gaze Mode** (`Binocular`, `Mono Right`, or `Mono Left`).
4. After selecting the new gaze mode, **unplug and re-plug** the Neon device to apply the changes.

::: tip
After altering the gaze mode to monocular, it's recommended to perform a new [Offset Correction](/data-collection/offset-correction/) to improve accuracy.
:::

## Other Considerations

- Changing the gaze mode modifies the existing gaze stream. It does **not** create an additional stream.
- All downstream processes, including fixations and enrichments, will utilize this monocular gaze data.
- Eye State and Pupillometry remain unaffected by changes to the gaze mode and will output the data for each eye.

## In Pupil Cloud:

Pupil Cloud handles gaze data processing as follows:

- **Default Behavior**: Pupil Cloud reprocesses recordings to maintain a consistent sampling rate of **200Hz**, regardless of the real-time sampling rate set in the app.

- **Monocular Mode**: If a monocular gaze mode is selected, Pupil Cloud **will not** reprocess the recordings. Ensure that this aligns with your data analysis requirements.

## Where Can I Find Which Mode Was Used on a Recording?

On the recording's view in the Neon Companion App, you can tap on the three dots to visualize the metadata.

Additionally, the [info.json](/data-collection/data-format/#info-json) file now includes a new field `gaze_mode`.

---

### Best Practices / Additional Recommendations

- **Testing**: After changing the gaze mode, perform tests to verify that the gaze tracking meets your accuracy and performance needs.

- **Update your Team**: Keep your team informed about changes in gaze modes to ensure consistency in data collection and analysis.

---
