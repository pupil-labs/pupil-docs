---
description: How-To guide on achieving super-precise time sync using the real-time API.
---

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

### Improving Synchronization further
While an error of `<20 ms` is sufficient for most applications, some require even better synchronization. To improve further, you can estimate the offset between the clock used by Pupil Invisible and the clock of the external device.

This can be done using events and the real-time API. When sending an event to the Companion app via the API, the event will be saved with a timestamp generated on the phone. This timestamp will be generated when the event is received on the phone. When sending the event from the external device, you can also manually save a timestamp there and compare the two.

You do however have to factor in the travel time the event has through the local network, which will also influence the timestamps. The following diagram visualizes the message flow.

<div style="display:flex;justify-content:center;" class="pb-4">
  <v-img
    :src="require('../../../media/invisible/how-tos/time-synchronization-with-events.jpg')"
    max-width=60%
  >
  </v-img>
</div>

On a wifi the travel time of messages can vary a lot ranging from `~3-400 ms`. To make the estimate you can assume that the travel time from the external device to the phone is roughly equal to the opposite direction, i.e. from the phone to the external device. This implies that the event timestamp `ts_E` should coincide with the mean value of `ts_A` and `ts_B`, and the difference between the two is an estimate of the synchronization error.

To compensate for fluctuations in the travel time, take the median of multiple measurements. The median is preferable over the mean, as there might be significant outliers.

While running this test, **make sure the screen of the phone is turned on**! While the screen is turned off Android is significantly decreasing the speed of network 


```python
# The 2 lines below are only needed to run this code in a Jupyter notebook
import nest_asyncio
nest_asyncio.apply()

import time
import numpy as np

from pupil_labs.realtime_api.simple import discover_one_device


device = discover_one_device(max_search_duration_seconds=10)

deltas = []
for i in range(50):
    ts_A = time.time_ns()
    e = device.send_event("test")
    ts_E = e.timestamp
    ts_B = time.time_ns()

    ts_AB = (ts_A + ts_B) / 2

    d = ts_AB - ts_E
    deltas.append(d)

offset = np.median(deltas)
print(f"Clock offset estimate: {offset / 1e6:.2f} ms")
```

    Exception in thread Device(ip=192.168.1.166, port=8080, dns=pi-1.local.) auto-update thread:
    Traceback (most recent call last):
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 932, in _bootstrap_inner
        self.run()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 870, in run
        self._target(*self._args, **self._kwargs)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 421, in _auto_update
        return asyncio.run(_auto_update_until_closed())
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 38, in run
        return loop.run_until_complete(task)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 81, in run_until_complete
        return f.result()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 418, in _auto_update_until_closed
        await notifier.receive_updates_stop()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 171, in receive_updates_stop
        await self._auto_update_task
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 263, in __await__
        return self.result()  # May raise too.
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 188, in _auto_update
        async for changed in self._device.status_updates():
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 59, in status_updates
        component = parse_component(message_json)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\models.py", line 137, in parse_component
        model_class = _model_class_map[model_name]
    KeyError: 'NetworkDevice'
    Exception ignored in: <async_generator object Connect.__aiter__ at 0x000002E5F65F5EE0>
    Traceback (most recent call last):
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 66, in status_updates
        break
    RuntimeError: async generator ignored GeneratorExit


    Clock offset estimate: 840.44 ms



```python
# The 2 lines below are only needed to run this code in a Jupyter notebook
import nest_asyncio
nest_asyncio.apply()

import time
import numpy as np

from pupil_labs.realtime_api.simple import discover_one_device, discover_devices


devices = discover_devices(search_duration_seconds=10)

offsets = []
for device in devices:
    deltas = []
    for i in range(100):
        ts_A = time.time_ns()
        e = device.send_event("test")
        ts_E = e.timestamp
        ts_B = time.time_ns()

        ts_AB = (ts_A + ts_B) / 2

        d = ts_AB - ts_E
        deltas.append(d)

    offset = np.median(deltas)
    print(f"Clock offset estimate: {offset / 1e6:.2f} ms")

    offsets.append((offset, device.serial_number_glasses))
```

    Exception in thread Device(ip=192.168.1.166, port=8080, dns=pi-1.local.) auto-update thread:
    Traceback (most recent call last):
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 932, in _bootstrap_inner
        self.run()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 870, in run
        self._target(*self._args, **self._kwargs)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 421, in _auto_update
        return asyncio.run(_auto_update_until_closed())
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 38, in run
        return loop.run_until_complete(task)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 81, in run_until_complete
        return f.result()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 418, in _auto_update_until_closed
        await notifier.receive_updates_stop()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 171, in receive_updates_stop
        await self._auto_update_task
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 263, in __await__
        return self.result()  # May raise too.
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 188, in _auto_update
        async for changed in self._device.status_updates():
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 59, in status_updates
        component = parse_component(message_json)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\models.py", line 137, in parse_component
        model_class = _model_class_map[model_name]
    KeyError: 'NetworkDevice'
    Exception in thread Device(ip=192.168.1.169, port=8080, dns=pi.local.) auto-update thread:
    Traceback (most recent call last):
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 932, in _bootstrap_inner
        self.run()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\threading.py", line 870, in run
        self._target(*self._args, **self._kwargs)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 421, in _auto_update
        return asyncio.run(_auto_update_until_closed())
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 38, in run
        return loop.run_until_complete(task)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\nest_asyncio.py", line 81, in run_until_complete
        return f.result()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\simple.py", line 418, in _auto_update_until_closed
        await notifier.receive_updates_stop()
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 171, in receive_updates_stop
        await self._auto_update_task
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 263, in __await__
        return self.result()  # May raise too.
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\futures.py", line 178, in result
        raise self._exception
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\asyncio\tasks.py", line 280, in __step
        result = coro.send(None)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 188, in _auto_update
        async for changed in self._device.status_updates():
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 59, in status_updates
        component = parse_component(message_json)
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\models.py", line 137, in parse_component
        model_class = _model_class_map[model_name]
    KeyError: 'NetworkDevice'
    Exception ignored in: <async_generator object Connect.__aiter__ at 0x000002E5F672EF70>
    Traceback (most recent call last):
      File "C:\Users\Admin\Anaconda3\envs\sci\lib\site-packages\pupil_labs\realtime_api\device.py", line 66, in status_updates
        break
    RuntimeError: async generator ignored GeneratorExit


    Clock offset estimate: 926.60 ms



```python
offsets
```




    [(926604800.0, 'a68l5')]




```python
offsets[0][0] / 1e6 - offsets[1][0] / 1e6
```




    -20.619647999999984



The estimation of this offset should be accurate up to `2-3 ms`. 
