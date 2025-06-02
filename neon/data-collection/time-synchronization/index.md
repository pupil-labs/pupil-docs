# Achieve Super-Precise Time Sync

For some applications, it is critical to accurately synchronize your Neon with another clock. That could be from a second Neon device, an external sensor, or a computer you use for stimulus presentation.

Neon provides UTC timestamps for all the data it generates, which makes it easy to sync the data to anything. Those timestamps are generated using the clock of the Companion device. However, digital clocks can suffer from drift, meaning that they sometimes run slightly too fast or slow. Over time, this error accumulates and can lead to errors when comparing two clocks.

Therefore digital clocks regularly readjust themselves by syncing to a master clock over the internet every other day or so. Two freshly synced clocks should usually have <10 ms of an offset, sometimes even <3 ms. From there, the offset increases at different rates, depending on Operating System and other factors, with Linux (e.g., Ubuntu) exhibiting the most stable timing and the least drift. After 24 hours, the drift can reach about 700ms to 1 second.

### Force Syncing to the Master Clock on Demand

The easiest way to achieve accurate time synchronization is to force a fresh sync-up to the master clock of all devices before starting data collection. This will ensure drift error is minimized for at least a few hours.

A sync-up can be forced on Android as follows:

- Restart the phone before initiating a sync
- Go to `Settings > System > Date & time`
- Turn off `Set time automatically`, and change the time by one hour forwards or backwards.
- Wait 5 seconds, then re-enable `Set time automatically`

This sequence of disabling the automatic time setting, manually adjusting by an hour, then re-enabling automatic time setting, is based on the NTP specification. Doing this will help achieve a minimal clock offset once the NTP sync-up has been forced.

Then, on your computer, do the following:

- Go to your Operating System's `Date & Time` settings
- Disable automatic time setting, and change the time by one hour forwards or backwards.
- Wait 5 seconds, then re-enable automatic time setting
- If you are using MacOS, then as a last step, you need to open a terminal and run `sudo sntp -sS time.apple.com`

Note that MacOS has shown the most unstable timing, along with sudden reversals in drift slope. Windows 11 is more stable, exhibiting a linear drift, and Linux has been the most stable, with a slow, linear drift. On a desktop with Ubuntu 24.04.2 LTS and the Samsung S25 Companion device, it has been possible to reach an offset of ~1ms, with a relative drift between the two devices of <=1.5ms over an hour.

Depending on your needs, you may want to measure the specific drift of your system.

::: tip
If you are familiar with [the `adb` tool](https://developer.android.com/tools/adb), then instead of restarting the phone, you can also connect it via USB cable to your computer and run the following command:

```bash
adb shell cmd network_time_update_service force_refresh
```

Then, follow the remaining steps for Android above.
:::

### Improving Synchronization further

While an error of `<10 ms` is sufficient for most applications, some require even better synchronization. To achieve this, you can estimate the offset between the clock used by Neon and the external clock down to single millisecond accuracy.

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
    raise SystemExit("Neon Companion App is too old")

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
**Note:** In very busy wifi networks, the transfer speeds might fluctuate wildly and potentially impact the clock offset measurement. In such cases it would be helpful to connect the phone to the network via [Ethernet](/hardware/using-a-usb-hub/) instead.
:::
