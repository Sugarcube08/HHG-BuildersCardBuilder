# Technology Stack & Dependency Reference

This document outlines the framework choices, core libraries, dev tools, and design system tokens powering the **Hacker House Goa 2026 Digital Builder Passport Platform**.

---

## Tech Stack Overview

```text
┌────────────────────────────────────────────────────────┐
│                   CORE FRAMEWORK                       │
│        Next.js 16.3 (App Router) + React 19            │
└───────────────────────────┬────────────────────────────┘
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ STYLING & UI │     │ UTILITIES    │     │ BUILD TOOLS  │
│ Tailwind v4  │     │ html-to-image│     │ Turbopack    │
│ Lucide Icons │     │ qrcode       │     │ PostCSS      │
│ clsx         │     │ react-hook-  │     │ TypeScript   │
│ tailwind-    │     │ form         │     │ 6.0          │
│ merge        │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Core Technologies & Dependencies

| Package | Version | Purpose & Rationale |
| :--- | :--- | :--- |
| **`next`** | `^16.3.0` | React Framework for hybrid SPA rendering, App Router dynamic routes, server metadata, and `ImageResponse` OG generation. |
| **`react`** | `^19.2.8` | UI rendering engine supporting modern React Server Components and concurrent features. |
| **`react-dom`** | `^19.2.8` | DOM rendering and portal bindings for React 19. |
| **`tailwindcss`** | `^4.3.3` | Engine for utility-first styling, responsive layouts, and custom design tokens (`@import "tailwindcss";`). |
| **`@tailwindcss/postcss`**| `^4.0.0` | PostCSS plugin compiling Tailwind CSS v4 directives under Next.js Turbopack compiler. |
| **`html-to-image`** | `^1.11.13` | High-fidelity DOM element to PNG canvas exporter operating at 3x scale. |
| **`qrcode`** | `^1.5.4` | High-ecc standard QR code generator producing Base64 Data URLs for SVG/Canvas rendering. |
| **`lucide-react`** | `^1.29.0` | Modern SVG iconography library used throughout navigation, badges, buttons, and inputs. |
| **`clsx`** | `^2.1.1` | Utility for conditionally constructing `className` strings cleanly. |
| **`tailwind-merge`** | `^3.6.0` | Utility for merging Tailwind CSS classes without specificity conflicts. |
| **`react-hook-form`** | `^7.84.0` | High-performance form state management and input validation. |
| **`typescript`** | `~6.0.2` | Static type checking enforcing strict schema validation across client and server. |

---

## Design System Tokens (`app/globals.css`)

### Color Palette

* **Primary Dark Emerald**: `#0B3B2B`
* **Vibrant Hot Pink**: `#FF2E93`
* **Cream Background**: `#FAF7F2`
* **Deep Navy Text/Borders**: `#0F172A`
* **Electric Gold Accent**: `#FFB800`

### Retro Pop Shadows

* `.hh-shadow-sm`: `3px 3px 0px #0F172A`
* `.hh-shadow-md`: `5px 5px 0px #0F172A`
* `.hh-shadow-pink`: `5px 5px 0px #FF2E93`
* `.hh-shadow-yellow`: `5px 5px 0px #FFB800`
