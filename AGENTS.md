# wood-blank-tag-generator — project conventions

Read `HANDOVER.md` first: current state, decision record, next steps. Goal in `GOALS.md` (G-001).
Parent initiative in `E:\CLAUDE\projects\svc-lab\`; company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth, no accounts, no uploads —
  every tag/card is generated client-side from form inputs.
- All drying-time guidance lives in `lib/blank-tag.ts`, with a header comment citing its sources
  (the same American Association of Woodturners forum threads and Turn A Wood Bowl article the
  sibling project `woodturning-blank-calculator` cites, re-derived independently for this repo).
  Don't change the thickness-to-months bands without re-checking against that citation.
- Deliberately does **not** carry per-species shrinkage/warp/toxicity data — that's
  `woodturning-blank-calculator`'s job (`lib/wood-species-data.ts` there). The species field here
  is a free-text convenience with an autocomplete list of common names only, no numeric claims
  attached. Don't add per-species numbers here; link to the sibling tool instead.
- The drying-time estimate is explicitly labeled a planning estimate, not a guarantee, on every
  page that shows it — the drying-log card exists because every source agrees the reliable signal
  is weight leveling off, not a calendar date. Don't strengthen that language.
- The "print" flow is `window.print()` plus `@media print` CSS in `app/globals.css` targeting the
  shared `.printable-area` class — no PDF-generation dependency.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist bug, not specific to this
  project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (`tests/unit/*.test.ts`) and `npx playwright test`
  (`tests/e2e/*.spec.ts`). Both must pass, plus `npx eslint .` and `npm run build`, before calling a
  change done.
- See `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command once live.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
