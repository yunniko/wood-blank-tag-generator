import { describe, expect, it } from "vitest";
import { buildDryingLogCard } from "@/lib/drying-log";

describe("buildDryingLogCard", () => {
  it("uses the blank type alone as the headline when no species is given", () => {
    const card = buildDryingLogCard({
      blankType: "bowl-blank",
      dateStarted: "2026-09-17",
      rowCount: 12,
    });
    expect(card.headline).toBe("Bowl blank");
    expect(card.rows).toBe(12);
  });

  it("prefixes the species onto the headline when given", () => {
    const card = buildDryingLogCard({
      species: "Black Walnut",
      blankType: "bowl-blank",
      dateStarted: "2026-09-17",
      rowCount: 8,
    });
    expect(card.headline).toBe("Black Walnut — Bowl blank");
  });

  it("omits the starting weight when zero or not given", () => {
    const card = buildDryingLogCard({
      blankType: "bowl-blank",
      dateStarted: "2026-09-17",
      rowCount: 8,
      startingWeightG: 0,
    });
    expect(card.startingWeightG).toBeUndefined();
  });

  it("includes a positive starting weight and computes a 10-25% target loss range", () => {
    const card = buildDryingLogCard({
      blankType: "bowl-blank",
      dateStarted: "2026-09-17",
      rowCount: 8,
      startingWeightG: 1000,
    });
    expect(card.startingWeightG).toBe(1000);
    expect(card.targetWeightRange).toEqual({ lowG: 750, highG: 900 });
  });

  it("omits the target weight range when no starting weight is given", () => {
    const card = buildDryingLogCard({ blankType: "bowl-blank", dateStarted: "2026-09-17", rowCount: 8 });
    expect(card.targetWeightRange).toBeUndefined();
  });

  it("trims the turner name and omits it when blank", () => {
    const card = buildDryingLogCard({
      blankType: "bowl-blank",
      dateStarted: "2026-09-17",
      rowCount: 8,
      turnerName: "   ",
    });
    expect(card.turnerName).toBeUndefined();
  });
});
