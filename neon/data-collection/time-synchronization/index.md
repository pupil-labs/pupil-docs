# Achieve super-precise Time Sync
For some applications, it is critical to accurately synchronize your Neon with another clock. That could be from a second Neon device, an external sensor, or a computer you use for stimulus presentation. 

Neon provides UTC timestamps for all the data it generates, which makes it easy to sync the data to anything. Those timestamps are generated using the clock of the Companion device. However, digital clocks can suffer from drift, meaning that they sometimes run slightly too fast or slow. Over time this error accumulates and can lead to errors when comparing two clocks.

Therefore digital clocks regularly readjust themselves by syncing to a master clock over the internet every other day or so. Two freshly synced clocks should have <~20 ms of an offset. From there, the offset increases in the order of a couple 10s of milliseconds per hour. After 24 hours it may reach about 1 second.


### Force Syncing to the Master Clock on Demand
The easiest way to achieve accurate time synchronization is to force a fresh sync-up to the master clock of all devices before starting data collection. This will ensure drift error is minimized for at least a few hours.

A sync-up can usually be forced by toggling the automatic determination of the current time off and back on in the operating system's settings. In Android 11, for example, the `Date & Time` settings in the `System` settings have a toggle called `Use network-provided time`. In Android 12, the toggle is called `Set time automatically`. Whenever this toggle is turned on, the system syncs up.

Depending on the operating system, devices use different master clock servers to sync with. Ideally, all devices would sync to the same master clock to avoid small errors between different masters. Some operating systems allow specifying which server to use. Android uses the following ones depending on the region:

```
Asia
NTP_SERVER=asia.pool.ntp.org

Europe
NTP_SERVER=europe.pool.ntp.org

North America
NTP_SERVER=north-america.pool.ntp.org
```

### Improving Synchronization further
While an error of `<20 ms` is sufficient for most applications, some require even better synchronization. To achieve this, you can estimate the offset between the clock used by Neon and the external clock down to single millisecond accuracy.

This can be done using the `TimeOffsetEstimator` of the [real-time API](/real-time-api/tutorials/). Using the following code, you can estimate the offset between the Neon clock and the clock of the host executing the code.
::: tip
**Dependency**: `pip install "pupil-labs-realtime-api>=1.1.0"`
:::
```python
from pupil_labs.realtime_api.simple import discover_one_device

# Look for devices. Returns as soon as it has found the first device.
print("Looking for the next best device...")
device = discover_one_device(max_search_duration_seconds=10)
if device is None:
    raise SystemExit("No device found.")

estimate = device.estimate_time_offset()
if estimate is None:
    device.close()
    raise SystemExit("Neon Companion app is too old")

print(f"Mean time offset: {estimate.time_offset_ms.mean} ms")
print(f"Mean roundtrip duration: {estimate.roundtrip_duration_ms.mean} ms")

device.close()
```

Using continuous offset estimates like this, you can precisely compensate for clock drifts by correcting the respective timestamps with it.
The calculation would look like this:
```python
companion_app_time = external_clock_time - offset
```
::: tip
**Note:** In very busy wifi networks the transfer speeds might fluctuate wildly and potentially impact the clock offset measurement. In such cases it would be helpful to connect the phone to the network via [ethernet](/general/using-a-usb-hub/) instead.
:::
