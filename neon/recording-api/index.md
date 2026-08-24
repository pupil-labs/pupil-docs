# Neon Recording API
Neon recordings come in two different formats: CSV or a native binary format. Both formats are fully accessible.

## CSV Format
The most simple approach is to export the data to CSV format using [Pupil Cloud](/pupil-cloud/) or [Neon Player](/neon-player/). The resulting CSV (and MP4 files for video data) can then be processed using standard data analysis tools. The format of the exported CSV files is documented [here](/data-collection/data-format/).


## Native Binary Format
Alternatively, the native binary format used by the Neon Companion app can be accessed programmatically using the open-source [pl-neon-recording](https://github.com/pupil-labs/pl-neon-recording) library. This library provides functionality for reading all scalar and video data contained in a Neon recording, and also helps with temporal synchronization of the different data streams.

