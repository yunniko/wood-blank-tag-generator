// Rough-out drying-time guidance. A 2026-09-17 domain-expert review checked
// this against the primary sources directly (not just against the sibling
// project's own citation trail) and found the bands needed correcting:
// - American Association of Woodturners forum thread 21568, "Drying time
//   for rough turned blanks"
//   (https://www.aawforum.org/community/threads/drying-time-for-rough-turned-blanks.21568/)
//   reports roughly 7-10 months for paper-bag drying and 10-12 months for
//   sealed (Anchorseal) drying of a typical rough-out, with a wide reported
//   spread (from ~6-8 weeks for thin/stable species in a closed box to
//   9-24 months for flat blanks) depending heavily on wall thickness,
//   drying method, and shop humidity/airflow — species also matters
//   (oak is repeatedly cited as slow), contrary to an earlier draft of
//   this file that claimed it didn't.
// - Turn A Wood Bowl, "Drying Green Wood Bowls"
//   (https://turnawoodbowl.com/drying-green-wood-bowls-6-methods-success/)
//   and "Twice Turning Wood Bowls"
//   (https://turnawoodbowl.com/twice-turning-wood-bowls-how-to-step-by-step/)
//   give a general "about a year per inch of thickness to equalize"
//   rule for green stock, noting a rough-turned bowl dries faster than
//   solid lumber of the same thickness because it exposes end grain
//   around its whole circumference.
// The bands below skew toward the slower/more conservative end of what
// these sources report (rather than the shorter figures that circulate
// informally in the community), because understating drying time risks a
// real cost — finish-turning a blank that isn't actually dry yet, which
// commonly causes warping or cracking after the final turning. They are
// NOT species-aware: a naturally slow-drying species (oak is the standard
// example) should be expected to run past the top of the range shown, and
// drying method/shop conditions can shift the true time considerably in
// either direction. This is a widely-repeated shop rule of thumb, not a
// physics model or a species-specific prediction — always presented as
// planning guidance, never a guarantee, and always paired with the
// drying-log tool's weigh-until-stable method, which is the one technique
// every source above agrees is the reliable way to actually know.

export type BlankType =
  | "bowl-blank"
  | "spindle-blank"
  | "pen-blank"
  | "live-edge-slab"
  | "board-lumber"
  | "other";

export const BLANK_TYPE_LABELS: Record<BlankType, string> = {
  "bowl-blank": "Bowl blank",
  "spindle-blank": "Spindle blank",
  "pen-blank": "Pen blank",
  "live-edge-slab": "Live-edge slab",
  "board-lumber": "Board / lumber",
  other: "Other",
};

export type DryState =
  | "green"
  | "rough-turned"
  | "air-drying"
  | "kiln-dried"
  | "dry-stable"
  | "unknown";

export const DRY_STATE_LABELS: Record<DryState, string> = {
  green: "Green (freshly cut)",
  "rough-turned": "Rough-turned (twice-turning method)",
  "air-drying": "Air-drying",
  "kiln-dried": "Kiln-dried",
  "dry-stable": "Dry / stable (ready to finish)",
  unknown: "Unknown",
};

// A convenience name list for the species field's <datalist> autocomplete —
// just common names, no numeric claims attached, so there's nothing here
// that needs a domain citation beyond "these are commonly turned species,"
// which is uncontroversial. Per-species shrinkage/toxicity data is
// woodturning-blank-calculator's job, not this tool's.
export const COMMON_TURNING_SPECIES = [
  "Black Walnut",
  "Black Cherry",
  "Northern Red Oak",
  "White Oak",
  "Sugar Maple",
  "Red Maple",
  "White Ash",
  "Yellow Birch",
  "American Beech",
  "American Sycamore",
  "Quaking Aspen",
  "American Basswood",
  "Black Locust",
  "Shagbark Hickory",
];

export const DRYING_MONTHS_CAVEAT =
  "Planning estimate only, not a guarantee — it does not account for species (slow-drying species like oak commonly run longer) or drying method/shop humidity, both of which shift real drying time considerably. The reliable sign a blank is actually dry is its weight leveling off across several weighings over at least a few weeks, not a calendar date — track it with the drying-log card.";

const VERY_THICK_WALL_IN = 2;
export const VERY_THICK_WALL_NOTE =
  "This wall is thick enough that these community-sourced bands likely understate the real drying time — rely on the weigh-in log rather than this estimate.";

/** Rough wall thickness in inches -> [min, max] months, sourced above. */
export function estimateDryingRangeMonths(roughWallThicknessIn: number): [number, number] {
  if (!(roughWallThicknessIn > 0)) {
    throw new RangeError("Rough wall thickness must be greater than zero.");
  }
  if (roughWallThicknessIn < 0.75) return [4, 7];
  if (roughWallThicknessIn <= 1.25) return [6, 10];
  return [8, 12];
}

// dateLabel is a yyyy-mm-dd string from an <input type="date">. Parsed and
// displayed in UTC throughout so the shown month never shifts a day off
// depending on the browser's local timezone.
function parseDateLabel(dateLabel: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateLabel);
  if (!match) return new Date();
  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
}

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export interface BlankTagInput {
  species?: string;
  blankType: BlankType;
  dryState: DryState;
  dimensions?: string;
  dateLabel: string;
  roughWallThicknessIn?: number;
  turnerName?: string;
  notes?: string;
}

export interface DryingEstimate {
  rangeMonths: [number, number];
  readyByRangeLabel: string;
  caveat: string;
  veryThickNote?: string;
}

export interface BlankTag {
  headline: string;
  species?: string;
  blankTypeLabel: string;
  dryStateLabel: string;
  dateLabel: string;
  dimensions?: string;
  roughWallThicknessIn?: number;
  turnerName?: string;
  notes?: string;
  dryingEstimate?: DryingEstimate;
}

export function buildBlankTag(input: BlankTagInput): BlankTag {
  const species = input.species?.trim() || undefined;
  const blankTypeLabel = BLANK_TYPE_LABELS[input.blankType];
  const headline = species ? `${species} — ${blankTypeLabel}` : blankTypeLabel;

  let dryingEstimate: DryingEstimate | undefined;
  if (input.dryState === "rough-turned" && input.roughWallThicknessIn && input.roughWallThicknessIn > 0) {
    const rangeMonths = estimateDryingRangeMonths(input.roughWallThicknessIn);
    // Anchored to the tag's own date (when rough-turning/drying started),
    // not "today" — a fix for a bug an earlier draft had where backdating a
    // tag (e.g. filling in a batch from a milling day weeks ago) silently
    // shifted the estimate by the backdate amount.
    const anchor = parseDateLabel(input.dateLabel);
    const earliest = addMonths(anchor, rangeMonths[0]);
    const latest = addMonths(anchor, rangeMonths[1]);
    dryingEstimate = {
      rangeMonths,
      readyByRangeLabel: `${MONTH_YEAR_FORMAT.format(earliest)} – ${MONTH_YEAR_FORMAT.format(latest)}`,
      caveat: DRYING_MONTHS_CAVEAT,
      veryThickNote: input.roughWallThicknessIn > VERY_THICK_WALL_IN ? VERY_THICK_WALL_NOTE : undefined,
    };
  }

  return {
    headline,
    species,
    blankTypeLabel,
    dryStateLabel: DRY_STATE_LABELS[input.dryState],
    dateLabel: input.dateLabel,
    dimensions: input.dimensions?.trim() || undefined,
    roughWallThicknessIn:
      input.dryState === "rough-turned" && input.roughWallThicknessIn && input.roughWallThicknessIn > 0
        ? input.roughWallThicknessIn
        : undefined,
    turnerName: input.turnerName?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    dryingEstimate,
  };
}

/** Batch-tag sheet generator: one call per blank from the same log/haul. */
export function buildBatchTags(inputs: BlankTagInput[]): BlankTag[] {
  return inputs.map((input) => buildBlankTag(input));
}
