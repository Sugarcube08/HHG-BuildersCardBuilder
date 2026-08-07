# Release Notes & Changelog

All notable changes to the **Hacker House Goa 2026 Digital Builder Passport Platform** will be documented in this file.

---

## [1.0.0] - 2026-08-07

### Added

* **Next.js 16 App Router Migration**: Full architectural upgrade to Next.js 16 App Router while preserving complete client UX.
* **Single Source of Truth Card Engine**: Consolidated visual badge rendering into a single canonical `BuilderCard.tsx` component.
* **Retina 3x PNG DOM Export**: High-resolution image export powered by `html-to-image` at 3x scale.
* **Compact Base64URL Payload Engine**: Serverless profile encoding and decoding under `/builder/d/[payload]`.
* **Dynamic Open Graph & Twitter Cards**: Dynamic 1200×630 Open Graph image rendering (`opengraph-image.tsx`) and Twitter Cards.
* **Pre-Warmed X Share Integration**: Hardened route pre-fetching and explicit `&url=` Intent parameter binding.
* **Static Assets in `public/`**: Direct static serving for branding logos, sunrise artwork, palm tree textures, and emblems.
* **Comprehensive Documentation Suite**: Added `ARCHITECTURE.md`, `KNOWN_LIMITATIONS.md`, `PROJECT_STRUCTURE.md`, `FEATURES.md`, `TECH_STACK.md`, `ROADMAP.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `LICENSE`.
