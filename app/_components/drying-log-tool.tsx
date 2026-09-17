"use client";

import { useMemo, useState } from "react";
import {
  BLANK_TYPE_LABELS,
  COMMON_TURNING_SPECIES,
  type BlankType,
} from "@/lib/blank-tag";
import { ROW_COUNT_OPTIONS, buildDryingLogCard, type RowCount } from "@/lib/drying-log";
import { DryingLogCardView } from "./DryingLogCardView";

const BLANK_TYPES = Object.keys(BLANK_TYPE_LABELS) as BlankType[];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DryingLogTool() {
  const [species, setSpecies] = useState("");
  const [blankType, setBlankType] = useState<BlankType>("bowl-blank");
  const [dateStarted, setDateStarted] = useState(todayIso());
  const [startingWeightG, setStartingWeightG] = useState("");
  const [turnerName, setTurnerName] = useState("");
  const [rowCount, setRowCount] = useState<RowCount>(12);

  const card = useMemo(
    () =>
      buildDryingLogCard({
        species,
        blankType,
        dateStarted,
        startingWeightG: Number(startingWeightG) || undefined,
        turnerName,
        rowCount,
      }),
    [species, blankType, dateStarted, startingWeightG, turnerName, rowCount],
  );

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-species">
            Species (optional)
          </label>
          <input
            id="log-species"
            list="log-species-suggestions"
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="e.g. Black Walnut"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-species"
          />
          <datalist id="log-species-suggestions">
            {COMMON_TURNING_SPECIES.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-blank-type">
            Blank type
          </label>
          <select
            id="log-blank-type"
            value={blankType}
            onChange={(e) => setBlankType(e.target.value as BlankType)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-blank-type"
          >
            {BLANK_TYPES.map((type) => (
              <option key={type} value={type}>
                {BLANK_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-date-started">
            Date rough-turned / started drying
          </label>
          <input
            id="log-date-started"
            type="date"
            value={dateStarted}
            onChange={(e) => setDateStarted(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-date-started"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-starting-weight">
            Starting weight in grams (optional)
          </label>
          <input
            id="log-starting-weight"
            type="number"
            min="0"
            value={startingWeightG}
            onChange={(e) => setStartingWeightG(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-starting-weight"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-turner-name">
            Turner / maker name (optional)
          </label>
          <input
            id="log-turner-name"
            type="text"
            value={turnerName}
            onChange={(e) => setTurnerName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-turner-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="log-row-count">
            Number of weigh-in rows
          </label>
          <select
            id="log-row-count"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value) as RowCount)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="log-row-count"
          >
            {ROW_COUNT_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count} weigh-ins
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Print / save as PDF
        </button>
      </div>

      <div className="printable-area" data-testid="log-preview">
        <DryingLogCardView card={card} />
      </div>
    </div>
  );
}
