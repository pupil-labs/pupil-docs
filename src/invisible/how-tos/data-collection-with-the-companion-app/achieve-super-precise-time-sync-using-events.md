# Achieve super-precise Time Sync using Events
For many applications it is critical to accurately synchronize your Pupil Invisible device with another external clock. That could be another sensor you use in parallel or a computer you use for stimulus presentation. 

Pupil Invisible is providing UTC timestamps for all the data it generates, which in principle makes it easy to sync the data to anything. All digital clocks suffer from drift however, meaning that they are running slightly too fast or slow at all times. Over time this error accumulates and can lead to significant errors.

Therefore digital clocks regularly readjust themselves by syncing to a master clock over the internet. This limits the accumulated error to not much more than a second in the worst case, which is sufficient for most consumer applications. When measuring physiological responses, a second of error is however often not acceptable.


### Force Syncing to the Master Clock on Demand
The easiest way to achieve more accurate time synchronization is to force a sync-up to the master clock of all devices before starting data collection. The drift error takes a while to accumulate and is negligible for at least several hours after a sync-up. Directly after sync-up, the synchronization error should be `<20 ms`. After 24 hours it should still be `<150 ms`.

A sync-up can usually be forced by toggling automatic determination of the current time off and back on in the operating systems settings. In Android for example the `Date & Time` settings in the `System` settings have a toggle called `use network-provided time`. Whenever this toggle is turned on, the system is syncing up.

Depending on the operating system, devices use different master clock servers to sync with. Ideally, all devices would sync to the exact same master clock to avoid small errors between different masters. Some operating systems allow to specify which server to use. Android is using the following ones depending on the region:

```
Asia
NTP_SERVER=asia.pool.ntp.org

Europe
NTP_SERVER=europe.pool.ntp.org

North America
NTP_SERVER=north-america.pool.ntp.org
```

### Improving Synchronisation further
While an error of `<20 ms` is sufficient for most applications, some require even better synchronization. To improve further, you can estimate the offset between the clock used by Pupil Invisible and the external device.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../../media/invisible/how-tos/time-synchronization-with-events.jpg')"
    max-width=100%
  >
  </v-img>
</div>


```python
import nest_asyncio
nest_asyncio.apply()

import numpy as np
import time
from pupil_labs.realtime_api.simple import discover_one_device, Device

device = discover_one_device(max_search_duration_seconds=10)
```


```python
deltas = []
for i in range(50):
    before = time.time()
    e = device.send_event("test")
    after = time.time()

    ts1 = (after + before) / 2
    ts2 = e.timestamp / 1e9

    d = (ts2 - ts1) * 1000
    deltas.append(d)

delay = np.median(deltas)
print(f"Delay estimate: {delay:.2f} ms")
```


    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    ~\AppData\Local\Temp/ipykernel_13676/342108368.py in <module>
          2 for i in range(50):
          3     before = time.time()
    ----> 4     e = device.send_event("test")
          5     after = time.time()
          6 
    

    AttributeError: 'NoneType' object has no attribute 'send_event'



```python

```
