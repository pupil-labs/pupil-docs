---
description: How-To guide on achieving super-precise time sync using the real-time API.
---

# Achieve super-precise Time Sync
For some applications it is critical to accurately synchronize your Pupil Invisible device with another clock. That could be a second Pupil Invisible device, an external sensor or a computer you use for stimulus presentation. 

Pupil Invisible is providing UTC timestamps for all the data it generates, which makes it easy to sync the data to anything. Those timestamps are generated using the clock of the Companion device. All digital clocks suffer from drift however, meaning that they are running slightly too fast or slow at all times. Over time this error accumulates and can lead to errors when comparing two clocks.

Therefore digital clocks regularly readajust themselves by syncing to a master clock over the internet every other day or so. Two freshly synced clocks should have <~20 ms of an offset. Over several days this might accumulate to several 100 ms though, which is often not acceptable.


### Force Syncing to the Master Clock on Demand
The easiest way to achieve more accurate time synchronization is to force a sync-up to the master clock of all devices before starting data collection. The drift error takes a while to accumulate and is negligible for at least several hours after a sync-up. While the error is <~20 ms directly after sync-up, it should still be `<~150 ms` after 24 hours.

A sync-up can usually be forced by toggling automatic determination of the current time off and back on in the operating systems settings. In Android for example the `Date & Time` settings in the `System` settings have a toggle called `Use network-provided time`. Whenever this toggle is turned on, the system is syncing up.

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
While an error of `<20 ms` is sufficient for most applications, some require even better synchronization. To improve further, you can estimate the exact offset between the clock used by Pupil Invisible and the external clock down to the millisecond.

This can be done using the `TimeOffsetEstimator` of the real-time API. Using the following code you can estimate the offset between the Pupil Invisible clock and the clock of the host executing the code.

```python
import asyncio

from pupil_labs.realtime_api import Device, Network
from pupil_labs.realtime_api.time_echo import TimeOffsetEstimator


async def main():
    async with Network() as network:
        dev_info = await network.wait_for_new_device(timeout_seconds=5)
    if dev_info is None:
        print("No device could be found! Abort")
        return

    async with Device.from_discovered_device(dev_info) as device:
        status = await device.get_status()

        print(f"Device IP address: {status.phone.ip}")
        print(f"Device Time Echo port: {status.phone.time_echo_port}")

        if status.phone.time_echo_port is None:
            print(
                "You Pupil Invisible Companion app is out-of-date and does not yet "
                "support the Time Echo protocol. Upgrade to version 1.4.28 or newer."
            )
            return

        time_offset_estimator = TimeOffsetEstimator(
            status.phone.ip, status.phone.time_echo_port
        )
        estimated_offset = await time_offset_estimator.estimate()
        print(f"Mean time offset: {estimated_offset.time_offset_ms.mean} ms")
        print(
            "Mean roundtrip duration: "
            f"{estimated_offset.roundtrip_duration_ms.mean} ms"
        )


if __name__ == "__main__":
    asyncio.run(main())
```

Using continuous offset estimates like this, you can precisely compensate for clock drifts by correcting the respective timestamps.

When using a wifi connection, the speed of data transfer can vary at times, leading to inaccuracies in the estimation. If precise synchronization down to a few milliseconds is required, it is recommended to use an ethernet connection. You can connect an ethernet cable to the phone using an appropriate USB-C adapter or hub.