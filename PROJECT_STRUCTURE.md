# Project Directory & File Reference

This document maps out every key directory, source file, route handler, component, and engine utility in the **Hacker House Goa 2026 Digital Builder Passport** repository.

---

## Root Level Configuration Files

```text
.
├── app/                        <-- Next.js 16 App Router Routes & Open Graph Generators
├── public/                     <-- Static Assets (Logos, Backgrounds, Decorations, Favicons)
├── src/                        <-- React UI Components, Engine Modules, State Context & Types
├── next.config.ts              <-- Next.js Production Configuration & Global CORS Headers
├── postcss.config.mjs          <-- PostCSS Configuration with @tailwindcss/postcss Plugin
├── package.json                <-- Package Manifest & Execution Scripts
├── tsconfig.json               <-- TypeScript Strict Compiler Configuration
├── ARCHITECTURE.md             <-- System Architecture & Design Specification
├── KNOWN_LIMITATIONS.md        <-- Engineering Constraints & Browser Security Specification
└── README.md                   <-- Main Project Documentation
```

---

## 1. App Router Directory (`app/`)

Next.js 16 file-system based routes, metadata generators, and API handlers.

| File Path | Description |
| :--- | :--- |
| **`app/layout.tsx`** | Global Root Layout wrapping children in `<BuilderProvider>`, loading Tailwind v4 styles, and defining global metadata base. |
| **`app/page.tsx`** | Home route rendering client application shell (`<App />`). |
| **`app/globals.css`** | Tailwind CSS v4 directives, color tokens, retro pop-shadow utilities (`hh-shadow-md`), and typography rules. |
| **`app/builder/d/[payload]/page.tsx`** | Canonical server-side Builder profile route with personalized `generateMetadata()`. |
| **`app/builder/d/[payload]/BuilderCardView.tsx`** | Client component rendering reconstructed Builder Passport directly from decoded payload. |
| **`app/builder/d/[payload]/opengraph-image.tsx`** | Dynamic 1200×630 Open Graph PNG image generator (`ImageResponse`). |
| **`app/builder/d/[payload]/twitter-image.tsx`** | Re-exports Open Graph image generator for Twitter Cards (`summary_large_image`). |
| **`app/api/share/upload/route.ts`** | POST endpoint accepting generated PNG image data and returning temporary `imageId`. |
| **`app/api/share/image/[id]/route.ts`** | GET endpoint serving uploaded PNG images with immutable cache headers for Open Graph previews. |
| **`app/api/og/route.tsx`** | Fallback CORS-enabled Open Graph image API endpoint. |
| **`app/icon.svg`** | App Router primary site favicon. |

---

## 2. Public Static Assets (`public/`)

Guaranteed static assets served directly without bundler hash degradation.

| Directory / File | Description |
| :--- | :--- |
| **`public/favicon.svg`** | Hindi emblem vector favicon (`goa_hindi.svg`). |
| **`public/logos/Hacker house.png`** | Primary Hacker House Goa 2026 header logo. |
| **`public/backgrounds/Sun rise.png`** | Decorative ambient sunrise background graphic. |
| **`public/decorations/footer trees.png`** | Retro palm trees footer background texture. |
| **`public/decorations/goa_hindi.svg`** | Hindi decorative emblem. |
| **`public/illustrations/hackers.png`** | Hacker workspace graphic for landing page step. |

---

## 3. Source Directory (`src/`)

### Core Application Entry

* **`src/App.tsx`**: Application controller managing step progression, mobile live preview drawers, and step wizard views.

### UI Components (`src/components/`)

* **`BuilderCard/`**:
  * `BuilderCard.tsx`: Master CR80 visual badge component (Single Source of Truth).
  * `BuilderHeader.tsx`: Event title and header logo.
  * `BuilderPhoto.tsx`: Avatar display with aspect ratio cropping.
  * `BuilderIdentity.tsx`: Builder name, role badge, motto, and tech stack tags.
  * `BuilderQR.tsx`: Standard QR code display element.
  * `BuilderFooter.tsx`: Verification status and timestamp.
  * `ExportBoundary.tsx`: Wrapper enforcing 440px export bounds for 3x Retina PNG capture.
* **`flow/`**: Multi-step flow views (`StepLanding`, `StepUpload`, `StepForm`, `StepPreview`, `StepVerify`).
* **`layout/`**: Application shell components (`Header`, `Footer`, `StepTracker`, `PageShell`).
* **`common/`**: UI primitives (`Button`, `Input`, `Card`, `Badge`).

### Engine Layer (`src/engine/`)

* **`share/payload.ts`**: Compact JSON payload creation, Base64URL encoding/decoding, validation, and URL generation.
* **`export/exportBuilderCard.ts`**: High-resolution DOM capture using `html-to-image` at `pixelRatio: 3`.
* **`export/share.ts`**: Pre-warming, delay execution, and Twitter Intent URL formatter.
* **`qr/generateQr.ts`**: Standard QR code renderer.
* **`theme/cardComposer.ts`**: Role badge color schemes and tagline generator.
* **`image/aspectRatio.ts`**: Image file dimensions and aspect ratio analyzer.

### Application Context & Types

* **`src/context/BuilderContext.tsx`**: State management provider for wizard step data, uploaded images, form inputs, and QR links.
* **`src/types/builder.ts`**: TypeScript type definitions for application steps, form fields, card themes, and context APIs.
* **`src/constants/steps.ts`**: Step metadata constants and step sequence configuration.
