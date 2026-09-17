"use client";

import { useMemo, useState } from "react";
import {
  BLANK_TYPE_LABELS,
  COMMON_TURNING_SPECIES,
  DRY_STATE_LABELS,
  buildBlankTag,
  type BlankType,
  type DryState,
} from "@/lib/blank-tag";
import { BlankTagCard } from "./BlankTagCard";

const BLANK_TYPES = Object.keys(BLANK_TYPE_LABELS) as BlankType[];
const DRY_STATES = Object.keys(DRY_STATE_LABELS) as DryState[];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function BlankTagTool() {
  const [species, setSpecies] = useState("");
  const [blankType, setBlankType] = useState<BlankType>("bowl-blank");
  const [dryState, setDryState] = useState<DryState>("green");
  const [dimensions, setDimensions] = useState("");
  const [dateLabel, setDateLabel] = useState(todayIso());
  const [roughWallThicknessIn, setRoughWallThicknessIn] = useState("1");
  const [turnerName, setTurnerName] = useState("");
  const [notes, setNotes] = useState("");

  const tag = useMemo(
    () =>
      buildBlankTag({
        species,
        blankType,
        dryState,
        dimensions,
        dateLabel,
        roughWallThicknessIn: dryState === "rough-turned" ? Number(roughWallThicknessIn) || undefined : undefined,
        turnerName,
        notes,
      }),
    [species, blankType, dryState, dimensions, dateLabel, roughWallThicknessIn, turnerName, notes],
  );

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="species">
            Species (optional)
          </label>
          <input
            id="species"
            list="species-suggestions"
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="e.g. Black Walnut"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-species"
          />
          <datalist id="species-suggestions">
            {COMMON_TURNING_SPECIES.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="blank-type">
            Blank type
          </label>
          <select
            id="blank-type"
            value={blankType}
            onChange={(e) => setBlankType(e.target.value as BlankType)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-type"
          >
            {BLANK_TYPES.map((type) => (
              <option key={type} value={type}>
                {BLANK_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dry-state">
            Current state
          </label>
          <select
            id="dry-state"
            value={dryState}
            onChange={(e) => setDryState(e.target.value as DryState)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-dry-state"
          >
            {DRY_STATES.map((state) => (
              <option key={state} value={state}>
                {DRY_STATE_LABELS[state]}
              </option>
            ))}
          </select>
        </div>

        {dryState === "rough-turned" && (
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="wall-thickness">
              Rough wall thickness (in)
            </label>
            <input
              id="wall-thickness"
              type="number"
              min="0.1"
              step="0.05"
              value={roughWallThicknessIn}
              onChange={(e) => setRoughWallThicknessIn(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              data-testid="blank-wall-thickness"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dimensions">
            Dimensions (optional)
          </label>
          <input
            id="dimensions"
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="e.g. 10 in dia x 4 in"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-dimensions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="date-label">
            Date
          </label>
          <input
            id="date-label"
            type="date"
            value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="turner-name">
            Turner / maker name (optional)
          </label>
          <input
            id="turner-name"
            type="text"
            value={turnerName}
            onChange={(e) => setTurnerName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-turner-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="notes">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="blank-notes"
          />
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Print / save as PDF
        </button>
      </div>

      <div className="printable-area" data-testid="blank-tag-preview">
        <BlankTagCard tag={tag} />
      </div>
    </div>
  );
}
