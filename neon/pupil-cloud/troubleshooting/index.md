# Troubleshooting
Below you can find a list of issues we have observed in the past and recommendations on how to fix them. If you can not find your issue in the list, please reach out to us on [Discord](https://pupil-labs.com/chat/) or via email to `info@pupil-labs.com`.

## Recordings are not uploading to Pupil Cloud successfully
1. Make sure **Cloud upload** is enabled in the Neon Companion app's settings.
1. Try logging out of the app and back in.

## My enrichment download contains only an `info.json` file and nothing else!
Did you use **Safari browser** to make the download?
   - Enrichments downloads come as ZIP files. By default, Safari will automatically extract ZIP files when the download is finished. However, it will only extract file types that are considered "safe". Surprisingly, CSV and MP4 files are not considered safe and Safari will by default only extract the remaining JSON files.

      To fix this you can either use a different browser to make the download, or disable the **"Open 'safe' files after downloading"** setting in Safari.