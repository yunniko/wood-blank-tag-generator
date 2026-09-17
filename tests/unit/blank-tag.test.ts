import { describe, expect, it } from "vitest";
import { buildBatchTags, buildBlankTag, estimateDryingRangeMonths } from "@/lib/blank-tag";

describe("estimateDryingRangeMonths", () => {
  it("gives 4-7 months for a thin rough wall", () => {
    expect(estimateDryingRangeMonths(0.5)).toEqual([4, 7]);
  });

  it("gives 6-10 months for a mid-range rough wall", () => {
    expect(estimateDryingRangeMonths(0.75)).toEqual([6, 10]);
    expect(estimateDryingRangeMonths(1.25)).toEqual([6, 10]);
  });

  it("gives 8-12 months for a thick rough wall", () => {
    expect(estimateDryingRangeMonths(1.5)).toEqual([8, 12]);
  });

  it("rejects a zero or negative thickness", () => {
    expect(() => estimateDryingRangeMonths(0)).toThrow(RangeError);
    expect(() => estimateDryingRangeMonths(-1)).toThrow(RangeError);
  });
});

describe("buildBlankTag", () => {
  it("uses the blank type alone as the headline when no species is given", () => {
    const tag = buildBlankTag({ blankType: "bowl-blank", dryState: "green", dateLabel: "2026-09-17" });
    expect(tag.headline).toBe("Bowl blank");
  });

  it("prefixes the species onto the headline when given", () => {
    const tag = buildBlankTag({
      species: "  Black Walnut  ",
      blankType: "bowl-blank",
      dryState: "green",
      dateLabel: "2026-09-17",
    });
    expect(tag.headline).toBe("Black Walnut — Bowl blank");
  });

  it("has no drying estimate for a green blank", () => {
    const tag = buildBlankTag({ blankType: "bowl-blank", dryState: "green", dateLabel: "2026-09-17" });
    expect(tag.dryingEstimate).toBeUndefined();
  });

  it("has no drying estimate for a rough-turned blank with no wall thickness given", () => {
    const tag = buildBlankTag({ blankType: "bowl-blank", dryState: "rough-turned", dateLabel: "2026-09-17" });
    expect(tag.dryingEstimate).toBeUndefined();
  });

  it("anchors the drying estimate to the tag's own date, not today", () => {
    const tag = buildBlankTag({
      blankType: "bowl-blank",
      dryState: "rough-turned",
      dateLabel: "2026-01-17",
      roughWallThicknessIn: 1,
    });
    expect(tag.dryingEstimate?.rangeMonths).toEqual([6, 10]);
    // 2026-01-17 + 6 months = Jul 2026, + 10 months = Nov 2026 — anchored to
    // dateLabel, which is not "today" in this test environment.
    expect(tag.dryingEstimate?.readyByRangeLabel).toBe("Jul 2026 – Nov 2026");
  });

  it("flags a very thick rough wall as likely understated by the estimate", () => {
    const thick = buildBlankTag({
      blankType: "bowl-blank",
      dryState: "rough-turned",
      dateLabel: "2026-09-17",
      roughWallThicknessIn: 2.5,
    });
    const normal = buildBlankTag({
      blankType: "bowl-blank",
      dryState: "rough-turned",
      dateLabel: "2026-09-17",
      roughWallThicknessIn: 1,
    });
    expect(thick.dryingEstimate?.veryThickNote).toMatch(/understate/);
    expect(normal.dryingEstimate?.veryThickNote).toBeUndefined();
  });

  it("prints the rough wall thickness only when rough-turned with a thickness given", () => {
    const roughTurned = buildBlankTag({
      blankType: "bowl-blank",
      dryState: "rough-turned",
      dateLabel: "2026-09-17",
      roughWallThicknessIn: 1,
    });
    const green = buildBlankTag({ blankType: "bowl-blank", dryState: "green", dateLabel: "2026-09-17" });
    expect(roughTurned.roughWallThicknessIn).toBe(1);
    expect(green.roughWallThicknessIn).toBeUndefined();
  });

  it("trims optional text fields and omits them when blank", () => {
    const tag = buildBlankTag({
      blankType: "pen-blank",
      dryState: "unknown",
      dateLabel: "2026-09-17",
      dimensions: "   ",
      turnerName: "  ",
      notes: "  ",
    });
    expect(tag.dimensions).toBeUndefined();
    expect(tag.turnerName).toBeUndefined();
    expect(tag.notes).toBeUndefined();
  });
});

describe("buildBatchTags", () => {
  it("builds one tag per input, preserving order", () => {
    const tags = buildBatchTags([
      { species: "Oak", blankType: "bowl-blank", dryState: "green", dateLabel: "2026-09-17" },
      { species: "Ash", blankType: "spindle-blank", dryState: "green", dateLabel: "2026-09-17" },
    ]);
    expect(tags).toHaveLength(2);
    expect(tags[0].headline).toBe("Oak — Bowl blank");
    expect(tags[1].headline).toBe("Ash — Spindle blank");
  });
});
