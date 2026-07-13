# Custom Background Override (optional)

The site uses a built-in **Twitch-inspired** purple tech mesh background by default.

## Override via URL

Point to any file in this folder via a query string:

```
/?bg=my-wave.gif
/?bg=loop.mp4
```

The path resolves to `/bg/<filename>`.

## Notes

- Recommended size: **1920×1080** or larger, MP4 / GIF / WebP.
- Keep file size under **~5 MB** for fast first paint.
- If the file fails to load, the built-in Twitch-style background remains.
