# Platform Development Roadmap

This document outlines the past release history and future feature milestones for the **Hacker House Goa 2026 Digital Builder Passport Platform**.

---

## 1. Completed Milestones (Version 1.0)

* [x] **Next.js 16 App Router Migration**: Full transition from legacy SPA to hybrid Next.js 16 App Router architecture.
* [x] **Single Source of Truth Rendering**: Consolidated preview, download, and verification views around `BuilderCard.tsx`.
* [x] **Retina 3x PNG DOM Export**: High-resolution image export via `html-to-image` at 3x scale.
* [x] **Backend-Free Base64URL Payload Engine**: Decoupled payload encoder/decoder enabling instant server-less profile URL sharing.
* [x] **Dynamic Open Graph & Twitter Cards**: Dynamic 1200×630 Open Graph image generation via Next.js `ImageResponse`.
* [x] **Hardened Social Pre-Warming**: Pre-fetching routes and 300ms edge cache delay before opening Twitter Web Intents.
* [x] **Static Asset Migration**: Zero 404 static media paths served directly from `/public/`.

---

## 2. Planned Features (Version 1.1)

* [ ] **Wallet Signature Verification**: Allow builders to sign their identity payload using Ethereum/Solana Web3 wallets (e.g. MetaMask, Phantom).
* [ ] **ENS & Lens Protocol Auto-Fill**: Auto-populate builder name, avatar, and bio from ENS domain or Lens profile handle.
* [ ] **Physical Badge Printing Export**: Export high-DPI PDF files with crop marks for physical badge lanyard printing.

---

## 3. Future Goals (Version 2.0)

* [ ] **Dynamic Event Schedule Integration**: Show customized workshop agendas based on builder role.
* [ ] **Peer-to-Peer NFC Badge Swapping**: WebBluetooth / WebNFC support for instant builder contact exchange at physical hackathons.
* [ ] **Persistent Image CDN Storage**: Optional integration with Vercel Blob / Cloudflare R2 for storing high-resolution uploaded avatars permanently.

---

## 4. Stretch Goals

* [ ] **3D Interactive Hologram View**: Three.js WebGL 3D card tilt and reflection shaders for animated badge previews.
* [ ] **Multi-Event Badge Passport**: Wallet credential storing multiple attended Hacker House event badges in a single digital passport.
