# Domain reference — wood-blank-tag-generator

Domain-expert review (wood science + woodturning craft practice), run 2026-09-17 against
`lib/blank-tag.ts` and `lib/drying-log.ts` and the FAQ copy on `/blank-tag`, `/batch-tags`, and
`/drying-log`. **Not a rubber stamp — found and fixed one real bug plus several accuracy gaps**,
all applied and re-verified (19/19 Vitest, ESLint clean, production build clean, 8/8 Playwright)
before shipping.

## Sources

- American Association of Woodturners forum thread 21568, "Drying time for rough turned blanks"
  (https://www.aawforum.org/community/threads/drying-time-for-rough-turned-blanks.21568/):
  roughly 7-10 months paper-bag / 10-12 months sealed (Anchorseal) drying for a typical rough-out,
  wide reported spread (6-8 weeks to 9-24 months) depending on wall thickness, method, and shop
  conditions; species matters (oak repeatedly cited as slow).
- Turn A Wood Bowl, "Drying Green Wood Bowls" (https://turnawoodbowl.com/drying-green-wood-bowls-6-methods-success/)
  and "Twice Turning Wood Bowls" (https://turnawoodbowl.com/twice-turning-wood-bowls-how-to-step-by-step/):
  "about a year per inch of thickness to equalize" rule for green stock; a rough-turned bowl dries
  faster than solid lumber of the same thickness (exposed end grain around the whole circumference).
- Woodworker's Journal, "Options for Drying Green Bowl Blanks"
  (https://www.woodworkersjournal.com/options-for-drying-green-bowl-blanks/): turners "generally
  allow the bowl to dry and lose between 10%-25% of the weight of the rough out before finishing
  it" — the source for the drying-log card's target weight-loss range.
- Reused without re-deriving: `woodturning-blank-calculator/lib/rough-out-drying.ts`'s own citation
  trail (same AAW/Turn A Wood Bowl sources, cross-checked independently here), per D001's decision
  not to re-litigate the sibling project's per-species data.

Retrieved 2026-09-17.

## Bug found and fixed

1. **Date-anchoring bug.** The drying-estimate range was computed from "today" (the moment the tag
   is generated) instead of the tag's own `dateLabel` (when rough-turning/drying actually started).
   Silently wrong for any backdated entry — e.g. logging a blank from a milling day three months
   ago showed a ready-by window three months too late. Fixed in `buildBlankTag()`
   (`lib/blank-tag.ts`): the estimate now anchors on `parseDateLabel(input.dateLabel)`, not `new
   Date()`. Covered by a unit test.

## Accuracy fixes applied

- **"Species doesn't affect drying time" was wrong.** An earlier draft's copy claimed the estimate
  applied regardless of species; every source above says species matters materially (oak is the
  standard slow-drying example). Fixed: `DRYING_MONTHS_CAVEAT` now explicitly flags that
  slow-drying species commonly run longer than the shown range, and the species field stays
  deliberately non-numeric (no per-species override) rather than implying false precision.
- **Drying-time bands widened and re-grounded.** Changed from an under-cited, effectively unbounded
  3-8 month range to thickness-keyed bands (`estimateDryingRangeMonths`: <0.75in → 4-7mo, 0.75-1.25in
  → 6-10mo, >1.25in → 8-12mo) matching the AAW/Turn A Wood Bowl sources' more conservative figures.
  A `VERY_THICK_WALL_NOTE` (>2in) tells the user these community bands likely understate drying
  time further and to rely on the weigh-in log instead.
- **Target weight-loss range added** (`drying-log.ts`): 10-25% of starting weight, per the
  Woodworker's Journal figure above, so the drying-log card has something concrete to compare each
  weighing against.
- **"Stops dropping between weighings" was too weak.** Sources describe stability across several
  weighings spanning at least a few weeks (weight can tick up briefly in humid conditions), not one
  flat reading. Card copy and FAQ strengthened to say so.
- **Cheap-but-real additions**, all cross-checked against the same sources: printing the rough wall
  thickness on the tag itself (so the drying estimate's basis is visible on the physical tag, not
  just in the app); an indoor-acclimation note (a rough-out that's reached target weight loss
  outdoors/in a shop still needs a period at indoor humidity before finish-turning, per the same
  Turn A Wood Bowl guidance); a cracking/remount-safety FAQ entry (finish-turning before the blank
  is actually stable risks cracking or throwing the piece off-center on remount); a scale-capacity
  correction (an earlier FAQ draft implied any kitchen scale suffices — corrected to note larger
  rough-outs commonly exceed a typical kitchen scale's capacity, and to check the scale's rated
  range before relying on it for the drying-log method).

## What's explicitly a rule of thumb, not a guarantee

The drying-time bands and the 10-25% weight-loss range are both widely-repeated shop conventions,
not a physics model or species-specific prediction — `DRYING_MONTHS_CAVEAT` and the drying-log
card's own copy say so on every page that shows them, and both defer to the weigh-until-stable
method as the one technique every source agrees is reliable.
