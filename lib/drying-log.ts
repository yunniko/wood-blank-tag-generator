// The drying-log card exists to support the one practice the blank-tag.ts
// header comment's sources agree on: weigh a rough-turned blank
// periodically and watch for the weight to level off, rather than trusting
// a calendar estimate. Domain-expert review (2026-09-17) added one formula
// here: Woodworker's Journal, "Options for Drying Green Bowl Blanks"
// (https://www.woodworkersjournal.com/options-for-drying-green-bowl-blanks/)
// states turners "generally allow the bowl to dry and lose between 10%-25%
// of the weight of the rough out before finishing it" — printed as a target
// weight range when a starting weight is given, so the log has something to
// compare each reading against instead of a blank table. The review also
// found "stops dropping between weighings" (an earlier draft's wording) was
// too weak: sources describe stability across several weighings spanning at
// least a few weeks, not one flat reading (weight can even tick up briefly
// in humid weather) — the card copy reflects that now.

import type { BlankType } from "./blank-tag";
import { BLANK_TYPE_LABELS } from "./blank-tag";

export const ROW_COUNT_OPTIONS = [8, 12, 16, 20] as const;
export type RowCount = (typeof ROW_COUNT_OPTIONS)[number];

const MIN_WEIGHT_LOSS_FRACTION = 0.1;
const MAX_WEIGHT_LOSS_FRACTION = 0.25;

export interface DryingLogInput {
  species?: string;
  blankType: BlankType;
  dateStarted: string;
  startingWeightG?: number;
  turnerName?: string;
  rowCount: RowCount;
}

export interface TargetWeightRange {
  lowG: number;
  highG: number;
}

export interface DryingLogCard {
  headline: string;
  blankTypeLabel: string;
  dateStarted: string;
  startingWeightG?: number;
  targetWeightRange?: TargetWeightRange;
  turnerName?: string;
  rows: number;
}

export function buildDryingLogCard(input: DryingLogInput): DryingLogCard {
  const species = input.species?.trim() || undefined;
  const blankTypeLabel = BLANK_TYPE_LABELS[input.blankType];
  const headline = species ? `${species} — ${blankTypeLabel}` : blankTypeLabel;
  const startingWeightG = input.startingWeightG && input.startingWeightG > 0 ? input.startingWeightG : undefined;

  return {
    headline,
    blankTypeLabel,
    dateStarted: input.dateStarted,
    startingWeightG,
    targetWeightRange: startingWeightG
      ? {
          lowG: Math.round(startingWeightG * (1 - MAX_WEIGHT_LOSS_FRACTION)),
          highG: Math.round(startingWeightG * (1 - MIN_WEIGHT_LOSS_FRACTION)),
        }
      : undefined,
    turnerName: input.turnerName?.trim() || undefined,
    rows: input.rowCount,
  };
}
