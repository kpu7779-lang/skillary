# Custom Animated Background (optional)

This folder holds **optional** animated backgrounds you can drop in to replace
the built-in aurora wave behind the hero.

## How to use

1. Place any image / GIF / short MP4 in this folder, named `custom-bg.{ext}`.
   Example:

   ```
   public/bg/custom-bg.gif
   ```

2. Reload the page. The file is auto-detected and rendered behind the hero
   (with a dark overlay so text stays readable).

## Override via URL

You can also point to any file in this folder via a query string:

```
/?bg=my-wave.gif
/?bg=stitch-loop.mp4
```

The path is resolved to `/bg/<filename>`, so the file must live in this folder.

## Notes

- Recommended size: **1920×1080** or larger, MP4 / GIF / WebP.
- Keep file size under **~5 MB** for fast first paint.
- If the file fails to load, the built-in aurora wave remains.
- Text readability is preserved by a `bg-background/55` overlay; edit
  `src/components/site/AnimatedBackground.tsx` to tune the opacity.
