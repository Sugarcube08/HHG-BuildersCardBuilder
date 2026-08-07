# Feature Specification & Functional Guide

This document details every feature implemented in the **Hacker House Goa 2026 Digital Builder Passport Platform**.

---

## Feature Matrix

| Feature Area | Description | Implementation Status |
| :--- | :--- | :--- |
| **Interactive Step Wizard** | 5-step wizard (`Landing` -> `Upload` -> `Details` -> `Preview` -> `Verify`). | ✅ Complete |
| **CR80 Builder Passport** | Standard CR80 badge ratio with dynamic role color themes and event artwork. | ✅ Complete |
| **Single Source of Truth** | One `BuilderCard.tsx` component drives preview, verification, and DOM export. | ✅ Complete |
| **Retina 3x PNG Export** | High-resolution DOM capture (`html-to-image`) at 3x scale without canvas math. | ✅ Complete |
| **High-ECC QR Generation** | Standard embedded QR code pointing to canonical Builder URL (`/builder/d/<payload>`). | ✅ Complete |
| **Backend-Free Storage** | Base64URL compressed payload encoding URL parameters for instant link sharing. | ✅ Complete |
| **Next.js Open Graph Engine** | Native `generateMetadata` and `ImageResponse` (1200x630) social previews. | ✅ Complete |
| **Twitter (X) Share Integration** | Pre-warmed route pre-fetching and formatted X Intent URL with `&url=` parameter. | ✅ Complete |
| **Verification Credential Route** | Server-side `/builder/d/[payload]` route for credential validation. | ✅ Complete |
| **Retro Pop Design System** | Tailwind v4 custom tokens (`#0B3B2B`, `#FF2E93`, `#FAF7F2`) and pop-shadows (`hh-shadow-md`). | ✅ Complete |

---

## Detailed Feature Specifications

### 1. Multi-Step Builder Wizard

The application guides builders through an intuitive process:

1. **Landing Step**: Event branding, motivation overview, and "Get Started" CTA.
2. **Upload Step**: Avatar image upload with instant aspect ratio detection (`square`, `portrait`, `landscape`).
3. **Form Step**: Name, Role selection (Full Stack Developer, Frontend Architect, Smart Contract Engineer, AI/ML Researcher, UI/UX Designer), Motto generator, and Tech Stack input.
4. **Preview Step**: Live interactive preview, card theme selector, and download/share actions.
5. **Verify Step**: Credential verification status dashboard displaying canonical share URL and QR code.

---

### 2. CR80 Digital Builder Passport

* **Dimensions**: Formatted to standard CR80 physical badge ratio (85.6mm × 53.9mm / 1.586 ratio).
* **Color Themes**: Dynamic role-based accent themes:
  * **Full Stack Developer**: Deep Emerald Green (`#0B3B2B`) & Vibrant Pink (`#FF2E93`)
  * **Smart Contract Engineer**: Electric Amber & Dark Gold
  * **AI/ML Researcher**: Royal Indigo & Violet Accent
  * **UI/UX Designer**: Bright Coral & Warm Sunflower
* **Event Artwork**: Integrated Hacker House Goa logo, ambient sunrise vector artwork, and retro palm trees texture.

---

### 3. Backend-Free Payload & URL Synchronization

* Identifiers and profile attributes are serialized into a minified JSON schema:
  ```json
  { "v": 1, "i": "HH26-4A8F92C1", "n": "Harsh", "r": "Full Stack Developer", "g": "\"Building\"", "s": "React" }
  ```
* Base64URL string guarantees zero mandatory database latency while retaining complete profile fidelity across devices and social crawlers.

---

### 4. Retina 3x PNG DOM Export

* Captures the rendered `<ExportBoundary>` DOM element directly at 3x pixel ratio (`1320px × 2085px`).
* Guarantees 100% pixel parity between the on-screen preview and the downloaded PNG asset.

---

### 5. Social Open Graph & Twitter Card Previews

* Server-rendered dynamic Open Graph images (`1200px × 630px`) built via Next.js `ImageResponse`.
* Pre-warmed asynchronously upon clicking **"Share on X"** to ensure immediate bot crawling.
* Complete HTML `<head>` metadata inclusion (`og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `twitter:card`).
