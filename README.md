# Sony WH-1000XM6 Product Experience

A high-end, scroll-driven product landing page concept for Sony WH-1000XM6 headphones. The site focuses on an editorial black-and-white visual system, animated product storytelling, feature highlights, specifications, and a responsive buying journey.

## Highlights

- Scroll-scrubbed headphone animations across the hero, design, and hardware sections.
- Premium, minimalist product UI with responsive navigation and mobile menu.
- Animated feature, statistic, press, comfort, sound, noise-cancelling, and specification sections.
- Desktop-first presentation with initial mobile/tablet canvas adjustments.
- Asset-processing scripts for repeatable image and animation-frame optimization.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Styling | Tailwind CSS 4, custom CSS variables and responsive utilities |
| Motion | GSAP + ScrollTrigger, Framer Motion |
| Product animation | HTML Canvas drawing WebP image sequences |
| Image processing | Sharp-based Node.js scripts |
| Code quality | ESLint |

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful commands:

```bash
npm run lint
npm run build
npm run optimize:frames
npm run optimize:images
npm run compress:frames
```

## Performance: the page-load challenge

The visual identity relies on image-sequence animation rather than a single video. That gives direct control over each scroll frame, but it introduces a serious delivery cost:

- The original project included **840 full-HD PNG frames** across the hero and two product-animation sections.
- The original animation assets alone were roughly **538 MB**.
- Loading and decoding hundreds of images can delay first paint, consume significant memory, and make slow connections or mobile devices feel unresponsive.

## Optimizations applied

1. Converted the animation sequences from PNG to WebP.
2. Reduced the frames from 1920×1080 to 1440×810, then applied a further 1280×720 compression pass where files were available.
3. Compressed supporting photography to WebP as well.
4. Replaced the original source images only after verifying optimized counterparts existed.
5. Corrected canvas DPR handling and use a contained composition on mobile/tablet screens, which prevents oversized, cropped product frames.

The optimized media collection is now approximately **13 MB**, a reduction of more than **97%** from the original raster assets.

## What still needs improvement

The current result is much lighter, but image-sequence animation is still not as efficient as a purpose-built media pipeline.

### Responsive design status

The page is currently optimized and visually polished primarily for **desktop**. Basic mobile and tablet safeguards exist for canvas sizing and navigation, but those layouts are not yet production-ready. The scroll-driven animation sections, text placement, spacing, and interaction density still need a dedicated mobile and tablet design pass.

### Performance and delivery

- Each animated section still has many individual image requests and decodes frames in the browser.
- Some sequences preload a large number of frames, which can create memory pressure on lower-end phones.
- The project does not yet use adaptive frame counts by device/network conditions.
- A production CDN and explicit long-lived cache policy should be configured at the deployment layer.
- For the largest animation sequences, AV1/WebM/MP4 video or a sprite/streaming strategy could reduce requests and improve startup time further.
- The frame compression scripts may skip locally locked files while the development preview is open; rerun them after closing the preview to process those files.

## Asset tools

The image tools live in `scripts/`:

- `optimize-animation-frames.js` — converts original PNG animation frames to WebP.
- `recompress-animation-webp.js` — further reduces existing WebP frame dimensions and quality only when it produces a smaller file.
- `optimize-static-images.js` — converts supporting static images to WebP.

Use the `:clean` scripts only after checking that the generated WebP files are valid, because they remove the original source assets.
