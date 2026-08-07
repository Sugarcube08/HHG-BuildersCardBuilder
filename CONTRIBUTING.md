# Contributing Guidelines

Thank you for your interest in contributing to the **Hacker House Goa 2026 Digital Builder Passport Platform**! We welcome contributions from developers, designers, and community maintainers.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please maintain a welcoming, inclusive, and respectful environment.

---

## How to Contribute

### 1. Reporting Issues

* Check existing GitHub Issues to avoid duplicates.
* Provide a clear title, reproduction steps, expected vs actual behavior, and browser/OS details.

### 2. Submitting Pull Requests

1. **Fork the Repository** and create a feature branch (`git checkout -b feature/amazing-feature`).
2. **Follow Coding Standards**:
   * Use TypeScript strict typing.
   * Follow existing file and component conventions inside `src/components/` and `src/engine/`.
   * Ensure design tokens match `app/globals.css`.
3. **Verify Build & Type Safety**:
   ```bash
   npm run build
   npm run lint
   ```
4. **Commit & Push**: Write descriptive commit messages adhering to Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`).
5. **Open a Pull Request**: Provide a clear description of changes, motivation, and screenshots if UI changes were made.
