# wood-blank-tag-generator

Free, instant, printable tags, batch tag sheets, and drying-log cards for woodturning blanks.
Part of the `svc-lab` micro-service portfolio (`E:\CLAUDE\projects\svc-lab\`).

## What it is

Three tools:
- **Blank tag** (`/blank-tag`) — one blank's species/type/dimensions/date → a printable tag,
  with an estimated ready-to-finish-turn date range for rough-turned blanks.
- **Batch tag sheet** (`/batch-tags`) — tag a whole log's worth of blanks at once, print as one
  sheet.
- **Drying-log card** (`/drying-log`) — a printable weekly weigh-in log, the real way (per every
  source this tool cites) to know a rough-turned blank is actually dry.

No accounts, no uploads — everything runs client-side and prints via the browser's own
print/save-as-PDF.

## Run locally

```
npm install --legacy-peer-deps
npm run dev
```

Tests: `npx vitest run` (unit) and `npx playwright test` (e2e). Both plus `npx eslint .` and
`npm run build` must pass before shipping — see `AGENTS.md`.

## Current state

See `HANDOVER.md` for what's built, verified, and deployed.
