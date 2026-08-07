# Hacker House Goa 2026 — Digital Builder Passport Platform 🌴⚡

> **Official Digital Identity Credential Generator & Verification Platform for Hacker House Goa 2026.**

![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)
![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 👥 Team Bit 0x1

Designed and engineered for **Hacker House Goa 2026** by **Team Bit 0x1**:

* 👑 **Team Lead**: **Harsh Raikwar** (Architecture, Next.js 16 App Router Engine, Open Graph Generator & Core Development)
* 🎨 **Team Member**: **Asthaa Jain** (UI/UX Design System, Builder Card CR80 Aesthetics & Branding)
* ⚡ **Team Member**: **Anshul Patel** (Payload Engine, Image Aspect Ratio Utilities & Verification Flow)

---

## 📌 Project Overview

The **Hacker House Goa 2026 Digital Builder Passport Platform** is a production-grade web application enabling event participants to generate, verify, export, and share personalized digital builder credentials. 

Built with **Next.js 16 (App Router)** and **Tailwind CSS v4**, the application operates entirely **backend-free** by serializing builder payloads into URL-safe Base64 strings. It generates dynamic 1200×630 Open Graph preview cards for social platforms (X/Twitter, LinkedIn, WhatsApp) while serving high-resolution 3x Retina PNG downloads directly in the browser.

---

## 🚀 Motivation & Core Problem Solved

Hackathons and tech summits often lack an instant, verifiable digital badge system that builders can share directly on social media. Generic links fail to display personalized social cards, while traditional backend storage introduces unnecessary latency, database costs, and account creation friction.

**This platform solves the problem by providing:**
1. **Single Source of Truth Rendering**: One canonical React component drives the on-screen UI, high-resolution PNG downloads, and verification profile views.
2. **Zero-Database Payload URLs**: Identity data is encoded into `/builder/d/<payload>` canonical URLs.
3. **Automated Social Open Graph Previews**: Dynamic `ImageResponse` social previews matching the event branding.

---

## 🛠️ System Architecture & Data Flow

```text
Builder Input Form
       │
       ▼
Compress Payload (src/engine/share/payload.ts)
       │
       ▼
Canonical Share URL (/builder/d/<payload>)
       │
       ├────────────────────────────────┐
       ▼                                ▼
Browser App (React UI)          Social Crawlers (X, LinkedIn)
       │                                │
       ▼                                ▼
Reconstruct BuilderCard        generateMetadata() + opengraph-image
       │                                │
       ▼                                ▼
3x PNG Download                1200x630 Social Card Preview
```

---

## ✨ Features at a Glance

* **CR80 Digital Passport**: Standard CR80 badge ratio with dynamic role-based color themes (`Full Stack Developer`, `Smart Contract Engineer`, `AI/ML Researcher`, `UI/UX Designer`).
* **Retina 3x PNG Export**: DOM-to-image capture (`html-to-image`) at 3x scale (1320px × 2085px).
* **Embedded QR Code**: High-ECC QR code linking directly to the canonical verification profile.
* **Hardened Social Sharing**: Pre-warmed route pre-fetching and explicit `&url=` Intent parameter binding for X (Twitter).
* **Dynamic Open Graph Images**: Edge-rendered 1200×630 Open Graph images (`opengraph-image.tsx`).
* **Retro Pop Design System**: Curated color palette (`#0B3B2B`, `#FF2E93`, `#FAF7F2`) with pop-shadow utilities (`hh-shadow-md`).

---

## 📁 Repository Documentation Index

| Documentation File | Purpose |
| :--- | :--- |
| **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** | Technical design, module boundaries, data pipelines, and ASCII diagrams. |
| **[`KNOWN_LIMITATIONS.md`](./KNOWN_LIMITATIONS.md)** | Browser security models, SOP, X sharing constraints, and intentional design choices. |
| **[`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)** | Map of every folder, source file, component, and static asset. |
| **[`FEATURES.md`](./FEATURES.md)** | Complete feature matrix and badge specifications. |
| **[`TECH_STACK.md`](./TECH_STACK.md)** | Dependency reference, rationale, and CSS design tokens. |
| **[`ROADMAP.md`](./ROADMAP.md)** | Past release history and future development goals. |
| **[`CHANGELOG.md`](./CHANGELOG.md)** | Version 1.0.0 release notes. |
| **[`SECURITY.md`](./SECURITY.md)** | Vulnerability disclosure policy and security model. |
| **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** | Contribution standards and pull request workflows. |
| **[`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)** | Community behavior standards. |

---

## ⚡ Quick Start & Development Setup

### Prerequisites

* **Node.js**: `v18.17.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Sugarcube08/HHG-BuildersCardBuilder.git

# Change into the directory
cd HHG-BuildersCardBuilder

# Install dependencies
npm install
```

### Running Locally (Development Mode)

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Compile optimized Next.js production build
npm run build

# Start production server
npm run start
```

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

## 🤝 Acknowledgements & Credits

Inspired by **Hacker House Goa 2026** and the global Web3 builder community. Built with open-source software from Next.js, React, Tailwind Labs, and Lucide. See [`ACKNOWLEDGEMENTS.md`](./ACKNOWLEDGEMENTS.md).
