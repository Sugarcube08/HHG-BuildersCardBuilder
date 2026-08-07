# Security Policy & Vulnerability Disclosure

## Security Overview

The **Hacker House Goa 2026 Digital Builder Passport Platform** is designed as a backend-free client-side application using URL-encoded payloads. It does not store user passwords, private keys, or personal identifiable information (PII) on centralized servers.

---

## Reporting Vulnerabilities

If you discover a security vulnerability or potential privacy defect, please report it responsibly:

1. **Do NOT open a public GitHub issue.**
2. Send a detailed description of the issue to the project maintainers via email or private security channel.
3. Include steps to reproduce, impact assessment, and any suggested remediation.
4. The maintenance team will acknowledge receipt within 48 hours and work on a resolution promptly.

---

## Best Practices for Deployments

* Ensure strict SSL/TLS HTTPS configuration on production hosting environments (e.g. Vercel, Cloudflare Pages).
* Configure standard Security Headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy`).
