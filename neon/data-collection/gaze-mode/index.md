# Gaze Mode
Neon produces three gaze signals in every session: `Binocular`, `Monocular Left`, and `Monocular Right`. 

`Binocular` gaze is generated using images from both the left and right eyes. `Monocular` gaze is generated using images 
from a single eye only (left or right).

These signals are computed in parallel, stored in the recording, and streamed live through the Real-Time API. 

In other words, you always capture the complete set of gaze signals, no configuration required, and they can be easily
exported, e.g. via Pupil Cloud, to .csv files for offline analysis.

The `Gaze Mode` setting in the Neon Companion app selects which of these signals is treated as the **primary** gaze signal. 
The primary signal is used for real-time fixation & saccade detection, and it is the signal Pupil Cloud uses for 
post-processing, enrichments, visualizations, and derived metrics.

### Choosing a primary signal
`Binocular` is the default and recommended option for most users. If one eye is closed or obstructed, the system handles 
this gracefully and automatically uses `Monocular` input when needed.

Some specialist applications, such as ophthalmic testing, require gaze to be driven by a single eye. In that case, select 
`Monocular Left` or `Monocular Right`. While `Binocular` mode’s automatic fallback works well for complete closure or 
obstruction, selecting a `Monocular` primary signal is recommended if you need to be certain gaze is coming from one eye.

### What this does not affect
Eye State and Pupillometry are unaffected by the `Gaze Mode` selection and will always be generated using images from both eyes.
