# VideoResizer — 100% Client-Side Online Video Resizer & Cropper

> **Resize, crop, pad, and compress videos for TikTok, Instagram Reels, YouTube, and Facebook directly in your browser RAM — with zero cloud uploads and zero watermarks.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-videoresizer.github.io-427A5B?style=for-the-badge&logo=googlechrome&logoColor=white)](https://videoresizer.github.io/)
[![Built with Astro](https://img.shields.io/badge/Astro-Static%20Islands-427A5B?style=for-the-badge&logo=astro&logoColor=FCF5B8)](https://astro.build/)
[![Powered by FFmpeg.wasm](https://img.shields.io/badge/FFmpeg.wasm-0.12-B4CD93?style=for-the-badge&logo=ffmpeg&logoColor=403F3F)](https://ffmpegwasm.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FCF5B8?style=for-the-badge&labelColor=403F3F)](./LICENSE)
[![Support the Developer](https://img.shields.io/badge/Support%20the%20Developer-Buy%20a%20Coffee-427A5B?style=for-the-badge&logo=buymeacoffee&logoColor=FCF5B8)](https://kisharadilshan.gumroad.com/coffee)

---

## Key Features

- **Zero Cloud Uploads (100% Local RAM):** Decoding, scaling, cropping, blurred padding, and H.264 MP4 re-encoding execute locally inside your browser using FFmpeg WebAssembly. Your private footage never leaves your device.
- **1-Click Social Media Presets:** Instant presets for **9:16 TikTok / Instagram Reels / Shorts** (`1080×1920`), **1:1 Square Feed** (`1080×1080`), **16:9 YouTube Widescreen** (`1920×1080`), **4:5 Facebook Portrait** (`1080×1350`), plus custom `W × H` dimensions and batch video queues.
- **Smart Crop vs. Smart Scale & Pad Modes:** Choose **Crop to Fill** with focal positioning (`Center`, `Top`, `Bottom`, `Left`, `Right`) or **Pad with Blur / Black** to preserve 100% of your original frame, alongside a live HTML5 framing preview before encoding.
- **8-Language Internationalization (i18n):** Full native UI, metadata, hreflang links, structured data, and guides in **English (`/`), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), Japanese (`/ja/`), Chinese (`/zh/`), and Russian (`/ru/`)**.
- **Light & Dark Theme System:** Defaults to warm Soft Butter Yellow & Deep Forest Green light mode with instant, FOUC-free Dark Slate Charcoal theme toggling persisted in `localStorage`.
- **Offline-Ready PWA:** Installable via **Add to Home Screen** with a Service Worker caching HTML, CSS, JS, and FFmpeg WebAssembly core files for 100% offline resizing.

---

## Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework & Routing** | **Astro (Islands Architecture)** | Zero-JS static HTML shells per locale + hydrated React interactive workspace (`client:load`) |
| **Styling & Design System** | **Tailwind CSS v4 + CSS Variables** | Theme-aware Soft Butter & Forest Green tokens, responsive `48×48px` mobile icon navbar, smooth animations |
| **Video Processing Engine** | **`@ffmpeg/ffmpeg` & `@ffmpeg/core`** | Single-threaded ESM WebAssembly worker executing `scale`, `crop`, `pad`, `boxblur`, and H.264/AAC encoding without COOP/COEP headers |
| **Offline & Installability** | **Service Worker (`public/sw.js`) + Manifest** | Offline-first caching for HTML routes, `_astro/` bundles, and `/ffmpeg/` WASM core files |
| **SEO & Sitemaps** | **Flat `sitemap.xml` + `@astrojs/sitemap` + JSON-LD** | Dual GSC sitemap architecture (`sitemap.xml` & `sitemap-index.xml`), strict zero-fake-rating schema (`WebApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`) |
| **Analytics** | **Google Tag Manager & GA4** | Async `GTM-NR3MJ3G9` and `G-L974XJ0CJ9` instrumentation |

---

## Color Palette Specification

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Soft Butter Yellow** | `#FCF5B8` | Light-mode primary background, highlight pill badges, dark-mode secondary accent |
| **Muted Matcha Green** | `#B4CD93` | Secondary accent surfaces, dark-mode primary action button & borders, active dropzone glow |
| **Deep Forest Green** | `#427A5B` | Light-mode primary action CTA, workspace borders, dark-mode surface cards |
| **Dark Slate Charcoal** | `#403F3F` | Light-mode primary typography, dark-mode canvas background |

---

## Quick Start & Deployment

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/videoresizer/videoresizer.github.io.git
cd videoresizer.github.io

# 2. Install dependencies (automatically copies FFmpeg WASM assets to public/ffmpeg/)
npm install

# 3. Start local Astro dev server
npm run dev

# 4. Run type checks and production static build
npm run build
```

### Automated GitHub Pages Deployment

Pushes to the `main` branch automatically trigger [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):
1. Checks out the repository and ensures `public/.nojekyll` is present.
2. Runs `withastro/action@v3` on Node 22 to install packages, sync FFmpeg WebAssembly assets, typecheck, and build `dist/`.
3. Publishes `dist/` to GitHub Pages via `actions/deploy-pages@v4`.

---

## Support the Developer

If VideoResizer saved you time or kept your workflow private without subscriptions or watermarks, consider buying the creator a coffee:

[**Support Kishara Dilshan on Gumroad**](https://kisharadilshan.gumroad.com/coffee)

---

## License

Released under the **MIT License** — see [LICENSE](./LICENSE) for full copyright and permission details.
