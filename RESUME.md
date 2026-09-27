# Resume — wood-blank-tag-generator

**Status: built, domain-reviewed, verified, committed, and PUSHED. Deploy BLOCKED on a host-level
Docker issue — not this project's code.** Resume at "Next step" once the Owner has cleared the
host issue below.

## Done and verified
- 3 tools built: `/blank-tag`, `/batch-tags`, `/drying-log`. Full suite green (re-verified fresh
  this session): ESLint clean, 19/19 Vitest, production build clean (7 routes, confirms
  `next@16.3.5`, no known RCE), 8/8 Playwright.
- Domain-expert review (wood science / woodturning craft practice) findings condensed into
  `docs/domain-reference.md` (written this session — a real date-anchoring bug, a mischaracterized
  "species doesn't matter" claim, re-sourced drying bands, plus several caveat-level fixes, all
  already applied and re-verified in the prior session).
- `HANDOVER.md` written this session (didn't exist before).
- Manual security checklist clean: no server routes, no secrets staged, `.gitignore` covers
  `.env*`, only the shared escaped `lib/json-ld.tsx` helper uses `dangerouslySetInnerHTML`, no
  eval/dynamic import/uploads.
- `git init`, repo-local `user.email`, committed (`2263444`, then `6628584` for the docs).
- **Pushed**: https://github.com/yunniko/wood-blank-tag-generator (public), via `init-repo.ps1`.

## BLOCKED: deploy fails on a host-level Docker issue
`deploy-service.ps1 -Name wood-blank-tag-generator -Port 30290 -Domain wood-blank-tag-generator.svc.julienika.cz`
fails at the `docker compose ... up -d --build` step, every time (tried twice, identical error):

```
Network wood-blank-tag-generator_default Error Error response from daemon: all predefined address pools have been fully subnetted
failed to create network wood-blank-tag-generator_default: ...
```

This is Docker's network-address-pool capacity on the shared host, not a bug in this project — the
image builds fine, only network creation fails. Likely cause: 24+ services now each have their own
compose-created bridge network on this host, exhausting Docker's default address pools. Fixing it
needs either `docker network prune -f` (safe — only removes networks not attached to a running
container) or a larger `default-address-pools` list in the host's Docker daemon config
(`/etc/docker/daemon.json`, requires a daemon restart) — both are host-level actions on shared
infrastructure that this automation has no path to perform (no raw `ssh`/`docker` access, only the
two validated helper scripts; see `svc-lab/automation/HANDOVER.md` and `COMPANY/INFRASTRUCTURE.md`).
Logged as `PENDING APPROVAL` in `svc-lab/GOALS.md`'s progress log — **do not attempt a workaround**,
wait for the Owner (or a future interactive session with host access) to clear it.

## Next step (in order), once the host issue is cleared
1. Retry: `powershell -File E:/CLAUDE/projects/svc-lab/automation/scripts/deploy-service.ps1 -Name wood-blank-tag-generator -Port 30290 -Domain wood-blank-tag-generator.svc.julienika.cz`
   (resumable — repo is already cloned on the host and `.env` already written, so this just retries
   the container-up step).
2. SEO review via curl (robots.txt → sitemap.xml → all 4 real routes; title/description/OG tags).
3. Update `julienika-home`'s `TOOLS` array (`app/page.tsx`) and `SITEMAPS` array
   (`app/sitemap-index.xml/route.ts`) — grep first. Redeploy via `redeploy-service.ps1 -Name julienika-home`.
4. Update `svc-lab/GOALS.md`: mark backlog idea #80 Shipped, add the shipped-services table row,
   append the progress-log entry, resolve the `PENDING APPROVAL:` entry with a `RESOLVED` note,
   rotate the progress log if grown past 8 entries. Log the COMPANY-doc reconciliation note
   (port 30290, domain) for the next interactive session. Commit and push `svc-lab` itself.
5. Update `HANDOVER.md`'s deploy log with the real commit/date/verification once live.
6. Delete this file once shipped.

## What the next run does NOT need to re-derive
- Port: **30290** (deploy), **30291** (Playwright dev, already in `playwright.config.ts`).
- The idea/decision rationale is in `docs/decisions/D001-idea-choice.md`.
- Repo is already pushed; don't re-run `init-repo.ps1`.
