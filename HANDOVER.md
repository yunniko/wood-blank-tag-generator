# Handover — wood-blank-tag-generator

Last verified: 2026-09-17 at 2263444

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

## Current state

Three tools, all client-side, no server routes, no accounts/database:
- `/blank-tag` — one blank's species/type/dimensions/date → a printable tag, with an estimated
  ready-to-finish-turn date range for rough-turned blanks.
- `/batch-tags` — tag a whole log's worth of blanks at once, print as one sheet.
- `/drying-log` — a printable weigh-in log with a target weight-loss range, the reliable way (per
  every source cited) to know a rough-turned blank is actually dry.

Verified this session: ESLint clean, 19/19 Vitest, production build clean (7 routes: `/`,
`/_not-found`, `/batch-tags`, `/blank-tag`, `/drying-log`, `/robots.txt`, `/sitemap.xml`, confirms
`next@16.3.5`), 8/8 Playwright. Manual security checklist clean: no server routes (static app,
confirmed by build output), only the shared `lib/json-ld.tsx` helper uses
`dangerouslySetInnerHTML`, no uploads/eval/dynamic `import()`, no third-party network calls except
the gated AdSense script.

**Not yet pushed or deployed as of this session's start** — the prior run stopped on session
budget right after the local commit. This session re-verified the full suite fresh, wrote
`docs/domain-reference.md` (missing until now), and is proceeding through push/deploy/SEO/hub
steps; see the deploy log below for what's actually confirmed live.

## How things fit together

- Drying-time formula and its citations live in `lib/blank-tag.ts`'s header comment; the target
  weight-loss range and its citation live in `lib/drying-log.ts`'s header comment. Both reuse the
  same primary sources as the sibling `woodturning-blank-calculator` project, re-derived
  independently rather than importing that project's code (D001).
- Species is a free-text convenience field only (autocomplete list in `COMMON_TURNING_SPECIES`,
  `lib/blank-tag.ts`) — no per-species shrinkage/toxicity numbers here by design; that data belongs
  to `woodturning-blank-calculator/lib/wood-species-data.ts`.
- `app/_components/*.tsx` are thin wrappers around the pure functions in `lib/`; pages under
  `app/*/page.tsx` hold SEO metadata + FAQ copy. Print flow is `window.print()` plus `@media print`
  CSS in `app/globals.css`, no PDF-generation dependency.

## Rules in force

- Don't strengthen the drying-time/weight-loss language past "planning estimate" — every source
  agrees the reliable signal is weight leveling off, not a calendar date (see
  `docs/domain-reference.md`).
- Don't add per-species numeric data here; link to `woodturning-blank-calculator` instead (D001).
- The drying estimate must stay anchored to the tag's own `dateLabel`, not "today" — reverting this
  reintroduces the date-anchoring bug the 2026-09-17 domain review found and fixed (see
  `docs/domain-reference.md`).
- `npm install`/`npm ci` need `--legacy-peer-deps` (portfolio-wide npm/arborist bug, not specific to
  this project).

## Next steps and open questions

- **COMPANY-doc reconciliation needed** (this automation may not edit `COMPANY\**`): add
  `wood-blank-tag-generator` to `COMPANY\INFRASTRUCTURE_DEPLOY.md`'s port registry
  (`127.0.0.1:30290`, no DB, domain `wood-blank-tag-generator.svc.julienika.cz`) and
  `COMPANY\GOALS.md`'s project index.
- Delete `RESUME.md` once shipped — `rm` is blocked in this automation's sandbox on every prior
  service; needs a future interactive session.
- No revenue/traffic data yet — filled in at the Owner's monthly review from Search Console/AdSense.

## Deploy log

| Date | Commit | What changed | How verified |
|------|--------|---------------|---------------|
| (pending) | | Initial deploy — 3 tools | |

## Decisions

See `docs/decisions/README.md` and `docs/decisions/D001-idea-choice.md`.
