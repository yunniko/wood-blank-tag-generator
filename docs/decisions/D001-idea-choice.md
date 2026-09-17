# D001 · Built the wood-blank tag/batch/drying-log generator
Date: 2026-09-17 · Goal: svc-lab G-001 · Status: active (superseded by: —)
Context: svc-lab's backlog had zero clean unshipped ideas (all of #17-79 shipped or
deprioritized-crowded) and the last three shipped services were all `calculator/converter`,
triggering the standing rule requiring a research pass adding at least two non-calculator ideas.
Decision: researched non-calculator niches via WebSearch; found custom-knife spec/provenance
cards, handspun-yarn labels, and hobbyist wood-blank tags are all currently either static
Etsy-style templates or informal sharpie/index-card methods, with no instant generator tool for
any of them. Built the wood-blank tag generator: strongest audience/domain synergy with the
already-shipped, already-domain-reviewed `woodturning-blank-calculator` (reuses its
wall-thickness-driven drying-time formula, re-cited from the same primary sources, without
re-litigating its per-species shrinkage data).
Rejected: custom-knife spec card generator (backlog, weaker built-in-audience fit); handspun-yarn
label generator (backlog, weaker built-in-audience fit); picking another `calculator/converter`
(blocked by the category-diversity rule with 0 clean ideas left).
Consequence: a future service in this niche should not re-litigate per-species wood-shrinkage
numbers — that data lives in `woodturning-blank-calculator/lib/wood-species-data.ts` and this
project deliberately treats species as a free-text convenience field only.
Evidence: svc-lab/GOALS.md backlog ideas #80-82 (this run's research-pass additions);
`woodturning-blank-calculator/lib/rough-out-drying.ts` (source of the reused drying-time formula).
