from datetime import datetime, timedelta
from typing import Dict, Union, Optional, Tuple

import numpy as np
import pandas as pd

import fitdecode

# The names of the columns we will use in our points DataFrame. For the data we will be getting
# from the FIT data, we use the same name as the field names to make it easier to parse the data.
POINTS_COLUMN_NAMES = [
    "latitude",
    "longitude",
    "altitude",
    "timestamp",
    "heart_rate",
    "cadence",
    "speed",
]


def get_fit_point_data(
    frame: fitdecode.records.FitDataMessage,
) -> Optional[Dict[str, Union[float, int, str, datetime]]]:
    """Extract some data from an FIT frame representing a track point
    and return it as a dict.
    """

    data: Dict[str, Union[float, int, str, datetime]] = {}

    if not (frame.has_field("position_lat") and frame.has_field("position_long")):
        # Frame does not have any latitude or longitude data. We will ignore these frames in order to keep things
        # simple, as we did when parsing the TCX file.
        return None
    else:
        data["latitude"] = frame.get_value("position_lat") / ((2 ** 32) / 360)
        data["longitude"] = frame.get_value("position_long") / ((2 ** 32) / 360)

    for field in POINTS_COLUMN_NAMES[3:]:
        if frame.has_field(field):
            data[field] = frame.get_value(field)

    return data


def load_fit_data(fname: str) -> pd.DataFrame:
    """Takes the path to a FIT file (as a string) and returns Pandas
    DataFrame: one containing individual points.
    """

    points_data = []
    with fitdecode.FitReader(fname) as fit_file:
        for frame in fit_file:
            if isinstance(frame, fitdecode.records.FitDataMessage):
                if frame.name == "record":
                    single_point_data = get_fit_point_data(frame)
                    if single_point_data is not None:
                        points_data.append(single_point_data)

    # Create DataFrames from the data we have collected. If any information is missing from a particular
    # point, it will show up as a null value or "NaN" in the DataFrame.
    df = pd.DataFrame(points_data, columns=POINTS_COLUMN_NAMES)

    df["timestamp"] = df["timestamp"].dt.tz_localize(None)

    return df


def get_pupil_timestamps(fname: str) -> pd.DataFrame:
    df = pd.read_csv(fname)
    ns_ts = df["timestamp [ns]"]
    # convert utc nanoseconds to datetime
    # TODO: modify this conversion
    return pd.DataFrame([datetime.utcfromtimestamp(x / 1e9) for x in ns_ts])


if __name__ == "__main__":
    # from sys import argv
    fname_fit = "/Users/rcdew/pupil-docs/src/invisible/how-tos/advanced-analysis/syncing-sensors/data/eye-tracking-run.FIT"  # Path to FIT file
    points_df = load_fit_data(fname_fit)

    fname_pl = "/Users/rcdew/Dropbox/PC/Documents/Pupil Labs/SyncBiosensors/Extract FIT data/raw-data-export/running_rd-4a40d94d/gaze.csv"  # Path to Invisible data
    ts_pl = get_pupil_timestamps(fname_pl)
    # print("\nGarmin ts:")
    # print(points_df["timestamp"])
    # print("\nPL ts:")
    # print(ts_pl)
    print(points_df)
