# System Architecture & Technical Design

This document details the software architecture, design principles, component hierarchy, rendering pipeline, and data flow of the **Hacker House Goa 2026 Digital Builder Passport Platform**.

---

## 1. Executive Summary & Principles

The application is built as a hybrid **Next.js 16 App Router** project. It combines the responsiveness of a client-side Single Page Application (SPA) with server-side Open Graph metadata generation, dynamic social image rendering (`ImageResponse`), and dynamic payload routing.

### Core Architectural Principles

1. **Single Source of Truth Rendering**: One canonical React component (`BuilderCard.tsx`) defines the visual passport across preview, verification, and high-resolution DOM image capture (`html-to-image`).
2. **Backend-Free State Synchronization**: All identity data (Name, Role, Motto, Tech Stack, Image Metadata) is compressed and URL-safe Base64 encoded into canonical URLs (`/builder/d/<payload>`), eliminating mandatory database dependencies.
3. **Decoupled Engine Layer**: Business logic (payload encoding, QR generation, image aspect ratio analysis, DOM export, share intent formatting) is isolated inside pure typescript engine modules under `src/engine/`.

---

## 2. System Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────┐      ┌────────────────────┐     ┌──────────────┐ │
│  │   Step Wizard     │ ───► │   BuilderContext   │ ──► │ BuilderCard  │ │
│  │ (Landing-Verify)  │      │  (Global State)    │     │  (CR80 UI)   │ │
│  └───────────────────┘      └────────────────────┘     └──────────────┘ │
│                                       │                        │        │
│                                       ▼                        ▼        │
│                             ┌───────────────────┐    ┌────────────────┐ │
│                             │   Payload Engine  │    │  Export Engine │ │
│                             │ (src/engine/share)│    │(html-to-image) │ │
│                             └───────────────────┘    └────────────────┘ │
│                                       │                        │        │
└───────────────────────────────────────┼────────────────────────┼────────┘
                                        │                        │
                                        ▼                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS 16 APP ROUTER SERVER                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────┐         ┌──────────────────────────────┐ │
│  │ app/builder/d/[payload]   │         │ opengraph-image.tsx          │ │
│  │ (generateMetadata)        │         │ (ImageResponse 1200x630 PNG) │ │
│  └───────────────────────────┘         └──────────────────────────────┘ │
│                │                                      │                 │
└────────────────┼──────────────────────────────────────┼─────────────────┘
                 │                                      │
                 ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SOCIAL MEDIA CRAWLERS (X, BOTs)                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Directory Layout & Module Responsibilities

### UI & Component Layer (`src/components/`)

* **`BuilderCard/`**:
  * `BuilderCard.tsx`: The primary CR80 visual badge (Single Source of Truth).
  * `BuilderHeader.tsx`: Event branding, logo, and event tagline.
  * `BuilderPhoto.tsx`: Avatar display with aspect ratio cropping and fallback initial badge.
  * `BuilderIdentity.tsx`: Builder name, role badge, motto, and tech stack tags.
  * `BuilderQR.tsx`: Embedded QR code display.
  * `BuilderFooter.tsx`: Monospace verification status and timestamp.
  * `ExportBoundary.tsx`: Container ref forcing 440px rendering surface for 3x Retina PNG export.
* **`flow/`**: Multi-step step wizard views (`StepLanding`, `StepUpload`, `StepForm`, `StepPreview`, `StepVerify`).
* **`layout/`**: Application shell (`Header`, `Footer`, `StepTracker`, `PageShell`).
* **`common/`**: Reusable design system primitives (`Button`, `Input`, `Card`, `Badge`).

### Engine Layer (`src/engine/`)

* **`share/payload.ts`**: Compact JSON payload schema creation, Base64URL encoding, decoding, and validation.
* **`export/exportBuilderCard.ts`**: DOM capture using `html-to-image` at `pixelRatio: 3`.
* **`export/share.ts`**: Route pre-warming, edge delay, and Twitter Intent URL formatting.
* **`qr/generateQr.ts`**: High-ecc standard QR code renderer.
* **`theme/cardComposer.ts`**: Role badge color mappings and default motto generator.
* **`image/aspectRatio.ts`**: Image dimension inspection and aspect ratio classifier.

---

## 4. Single Source of Truth Rendering Pipeline

```text
                           React BuilderCard
                                  │
          ┌───────────────────────┼───────────────────────┐
          ▼                       ▼                       ▼
   On-Screen Preview        DOM Export PNG          Public Profile
    (Responsive UI)        (html-to-image 3x)    (/builder/d/<payload>)
```

1. **On-Screen Preview**: Rendered dynamically within the step wizard and live preview drawers.
2. **DOM Export PNG**: Captured directly from the rendered `<ExportBoundary>` DOM node at 3x pixel ratio, producing sharp 1320px high-resolution PNG downloads without canvas math duplication.
3. **Public Profile Route**: Directly decodes the Base64URL payload on the server (`app/builder/d/[payload]/page.tsx`) and renders the verified card UI instantly.

---

## 5. Data & Payload Flow

```json
{
  "v": 1,
  "i": "HH26-4A8F92C1",
  "n": "Harsh Raikwar",
  "r": "Full Stack Developer",
  "g": "\"Building in Public\"",
  "s": "React, TypeScript, Next.js",
  "ts": 1770442800000,
  "meta": { "w": 400, "h": 400, "r": 1, "o": "square" }
}
```

1. **Compression**: Json string -> Base64 -> URL-safe character replacement (`+` -> `-`, `/` -> `_`, trim `=`).
2. **Reconstruction**: Universal decoding across Client React, Server Components, `generateMetadata()`, and `ImageResponse`.
