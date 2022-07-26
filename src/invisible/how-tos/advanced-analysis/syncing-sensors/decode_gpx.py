"""Some functions for parsing a GPX file (specifically, a GPX file
downloaded from Strava, which was generated based on data recorded by a
Garmin vívoactive 3) and creating a Pandas DataFrame with the data.
"""

from typing import Dict, Union
from datetime import datetime

import gpxpy
import pandas as pd
import numpy as np



# The XML namespaces used by the GPX file for extensions, used when parsing the extensions
NAMESPACES = {'garmin_tpe': 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1'}

# The names of the columns we will use in our DataFrame
COLUMN_NAMES = ['latitude', 'longitude', 'elevation', 'time', 'heart_rate', 'cadence']

def get_gpx_point_data(point: gpxpy.gpx.GPXTrackPoint) -> Dict[str, Union[float, datetime, int]]:
        """Return a tuple containing some key data about `point`."""
        
        data = {
            'latitude': point.latitude,
            'longitude': point.longitude,
            'elevation': point.elevation,
            'time': point.time
        }
    
        # Parse extensions for heart rate and cadence data, if available
        elem = point.extensions[0]  # Assuming we know there is only one extension
        try:
            data['heart_rate'] = int(elem.find('garmin_tpe:hr', NAMESPACES).text)
        except AttributeError:
            # "text" attribute not found, so data not available
            pass
            
        try:
            data['cadence'] = int(elem.find('garmin_tpe:cad', NAMESPACES).text)
        except AttributeError:
            pass

        return data

def get_dataframe_from_gpx(fname: str) -> pd.DataFrame:
    """Takes the path to a GPX file (as a string) and returns a Pandas
    DataFrame.
    """
    with open(fname) as f:
        gpx = gpxpy.parse(f)
    segment = gpx.tracks[0].segments[0]  # Assuming we know that there is only one track and one segment
    data = [get_gpx_point_data(point) for point in segment.points]
    return pd.DataFrame(data, columns=COLUMN_NAMES)

def get_pupil_timestamps(fname: str) -> pd.DataFrame:
    df = pd.read_csv(fname)
    ns_ts = df["timestamp [ns]"]
    # convert utc nanoseconds to datetime
    # TODO: modify this conversion
    return pd.DataFrame([datetime.utcfromtimestamp(x / 1e9) for x in ns_ts])

if __name__ == '__main__':
    
    from sys import argv
    fname = "/Users/rcdew/Dropbox/PC/Documents/Pupil Labs/SyncBiosensors/Extract GPX data/eye-tracking-run.gpx"  # Path to GPX file to be given as first argument to script
    df = get_dataframe_from_gpx(fname)
    fname_pl = "/Users/rcdew/Dropbox/PC/Documents/Pupil Labs/SyncBiosensors/Extract FIT data/raw-data-export/running_rd-4a40d94d/gaze.csv"  # Path to Invisible data
    ts_pl = get_pupil_timestamps(fname_pl)
    print(df)
    print("\nPL ts:")
    print(ts_pl)