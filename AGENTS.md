# AGENTS.md — Rigi Extensions workspace

## Shared working rules — required

Before any task, read [`/Users/alex0nder/Projects/navorina-labs/products/navorina/docs/agents/AI_WORKING_RULES.md`](/Users/alex0nder/Projects/navorina-labs/products/navorina/docs/agents/AI_WORKING_RULES.md). The shared protocol is mandatory; this file adds Rigi/extension-specific boundaries.

This repository contains Rigi Extensions, its standalone browser tools, shared
frontend sources, release assets, and a separately versioned landing repository.
Read this file before loading extension code.

## Product identity

- **Rigi Extensions** is the current all-in-one Chrome side-panel product.
- `SwissExtensions/` contains the Store package and Manifest V3 runtime.
- Standalone extension directories provide one focused tool with narrower permissions.
- `rigi-navorina-site/` is a nested, independent Git repository for the landing.
- Portfolio endorsement is `A Navorina project` or `by Navorina`; use the exact
  legal entity name in contracts and regulated/publisher disclosures.

Workspace-only portfolio context:
`../navorina/company-docs/products/rigi.md` and
`../navorina/company-docs/BRAND_ARCHITECTURE.md`.

## Read-first routing

| Task | Read first | Then inspect |
|---|---|---|
| Suite scope or installation | root `README.md` | target extension README |
| All-in-one Rigi runtime | `SwissExtensions/README.md` | `manifest.json`, service worker, target UI/module |
| One standalone tool | that folder's `README.md` | its manifest and minimum relevant source |
| Permissions or privacy | target `manifest.json` + `PRIVACY_POLICY.md` | actual API/storage/network usage |
| Chrome Web Store release | `SwissExtensions/STORE_LISTING.md` + `PUBLISHING_CHECKLIST.md` | packaging script and produced ZIP inventory |
| Update/recovery behavior | `SwissExtensions/UPDATE_INSTRUCTIONS.md` | hibernation backup/restore code and tests |
| Brand/store assets | `brand-assets/rigi-extensions/README.md` | only the referenced source/render script |
| Rigi landing | `rigi-navorina-site/README.md` | its own Git status and project files |

Do not load `node_modules/`, `dist/`, built UI, download ZIPs, generated store
assets, or every standalone extension by default.

## Chrome extension invariants

1. Manifest V3 only.
2. Every referenced icon/page/script must exist in the packaged artifact.
3. Service-worker state is ephemeral; durable state belongs in Chrome storage.
4. Side-panel actions must have a real opening path and permissions matching
   their invocation context.
5. Broad permissions and `<all_urls>` require feature-specific justification and
   privacy disclosure; do not copy them into a focused standalone extension.
6. User-facing browser-data operations remain local unless a documented feature
   explicitly requires a network service.
7. Extension pages obey CSP: no inline handlers/scripts or unsafe code execution.
8. Store copy, privacy disclosures, manifest permissions, and shipped behavior
   must describe the same product.

## Repository and release boundaries

- The all-in-one suite and standalone tools may share source concepts but keep
  their own manifests and minimum practical permissions.
- Do not couple extension packaging to the Navorina app release process.
- Enter `rigi-navorina-site/` as a separate Git root before editing or deploying it.
- The landing contains `.openai/hosting.json`; use the repository's Sites build
  and hosting workflow for site changes.
- Do not move the nested landing, rewrite Git history, merge dependencies, or
  publish Store/landing artifacts without an explicit decision.

## Change rules

- Confirm target package, Git root, manifest version, and existing worktree state.
- Preserve suspended-tab recovery and backup compatibility across updates.
- Permission changes require updated justification, privacy review, and Store docs.
- Prefer the focused standalone package when a feature does not need suite-wide permissions.
- Keep product data local and do not introduce analytics/account requirements by default.
- Do not commit, push, package, publish, or deploy unless explicitly requested.

## Verification

Run the target extension's tests first. For an all-in-one Store change, run the
suite tests and packaging checklist, then inspect the ZIP for excluded secrets,
development files, and missing manifest assets. Landing verification is owned by
the nested site's own build and tests.
