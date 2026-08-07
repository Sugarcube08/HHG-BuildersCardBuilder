# Known Limitations & Technical Constraints

This document details the architectural, platform, and browser security constraints governing the **Hacker House Goa 2026 Digital Builder Passport Generator**. It provides transparency into platform APIs, Web Security Standards, and design decisions regarding automated social media asset sharing.

---

## 1. Browser Security Model

Modern web browsers enforce strict security boundaries to protect users, prevent unauthorized data exfiltration, and isolate web applications from manipulating external software or third-party websites.

### Enforced Web Security Policies

| Security Boundary | Description & Impact |
| :--- | :--- |
| **Same-Origin Policy (SOP)** | Prevents scripts running on one origin (`https://your-app.com`) from reading or modifying DOM nodes, cookies, or local storage on another origin (`https://x.com` or `https://twitter.com`). |
| **Cross-Origin Restrictions** | Cross-origin `fetch` or `XMLHttpRequest` calls cannot bypass server-enforced CORS headers. Web pages cannot inject arbitrary content into third-party windows. |
| **Clipboard & Input Permissions** | Modern browser APIs (such as `navigator.clipboard.write`) require explicit, user-initiated gestures and permission grants. Silent background manipulation of system clipboards is blocked. |
| **DOM Isolation & Cross-Tab Boundaries** | A window opened via `window.open('https://twitter.com/intent/tweet')` operates in an isolated browsing context. The parent window cannot programmatically access or inject files into the child window's file input controls. |

---

## 2. X (Twitter) Sharing & Platform API Constraints

Within the constraints of a client-side web application using standard browser APIs, **there is no standards-compliant mechanism to automatically attach a locally generated PNG image file to an X (Twitter) post without user intervention or backend OAuth authentication.**

### Technical Realities of X Share Intents

* ❌ **No File Attachment via Web Intent**: The public Twitter Web Intent API (`https://twitter.com/intent/tweet`) accepts string query parameters (`text`, `url`, `via`, `hashtags`). It does **not** support passing binary file payloads, Base64 image streams, or local filesystem blobs.
* ❌ **No Programmatic DOM Injection**: Browsers prevent web applications from programmatically interacting with X's post composer DOM, simulating drag-and-drop file uploads, or auto-pasting clipboard images.
* ❌ **No Unauthenticated Media Upload**: Uploading images programmatically directly to X's servers requires authenticated API requests via X API v2 using OAuth 2.0 user tokens and server-side secret keys.

---

## 3. Framework Independence

This constraint is **inherent to the Web Platform and Browser Security Architecture**. It is **not** caused by React, Next.js, or any specific frontend technology.

The exact same browser security and platform restrictions apply across all modern frontend frameworks:

* React / Next.js
* Vue / Nuxt
* Angular
* Svelte / SvelteKit
* Astro
* Remix
* SolidJS

Changing web frameworks or UI libraries does not unlock permissions to bypass browser security policies.

---

## 4. Approaches Intentionally Excluded

To ensure strict adherence to web standards, backend-free deployment requirements, privacy guarantees, and open-source hackathon rules, the following approaches were **intentionally excluded**:

| Approach | Reason for Exclusion |
| :--- | :--- |
| **X Media Upload API (OAuth v2)** | Requires server infrastructure, database storage for user OAuth tokens, API secret management, and user authentication friction. |
| **Browser Extensions (Manifest v3)** | Requires users to install third-party extension binaries with elevated permissions (`chrome.tabs`, `webRequest`). |
| **Desktop Automation / Headless Browsers** | Puppeteer, Playwright, or Selenium automation scripts require server-side headless browser runtimes. |
| **Cross-Origin DOM Scripting** | Attempting to bypass SOP via iframe hacks or cross-tab injection violates browser security guidelines. |

---

## 5. Current Standards-Compliant Workflow

To achieve production-quality sharing within standard web security boundaries, the application implements the following optimized architecture:

```
Builder Generation
       │
       ▼
Builder Card Rendering
       │
       ▼
High-Resolution PNG Export (html-to-image 3x)
       │
       ▼
QR Code Generation
       │
       ▼
Canonical Builder URL & Route (/builder/d/<payload>)
       │
       ▼
Dynamic Server Metadata (generateMetadata)
       │
       ▼
Open Graph & Twitter Card Image Generation (opengraph-image.tsx)
       │
       ▼
X Web Intent Execution (&url= parameter)
       │
       ▼
Rich Social Preview Rendering on X
```

### User Experience

1. **Instant Download**: Clicking **"Download Passport"** captures the exact 3x Retina PNG directly to the user's device.
2. **One-Click Share**: Clicking **"Share on X"** opens the pre-filled Twitter composer referencing the canonical Builder URL (`/builder/d/<payload>`).
3. **Rich Preview Automation**: When the tweet is posted on X, X's web crawler fetches the page's `<meta property="og:image">` and `<meta name="twitter:image">` tags, rendering the high-resolution Builder Passport preview card automatically.
