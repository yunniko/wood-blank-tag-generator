"use client";

import { useMemo, useState } from "react";
import {
  BLANK_TYPE_LABELS,
  COMMON_TURNING_SPECIES,
  DRY_STATE_LABELS,
  buildBatchTags,
  type BlankType,
  type DryState,
} from "@/lib/blank-tag";
import { BlankTagCard } from "./BlankTagCard";

const BLANK_TYPES = Object.keys(BLANK_TYPE_LABELS) as BlankType[];
const DRY_STATES = Object.keys(DRY_STATE_LABELS) as DryState[];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

interface Row {
  id: number;
  species: string;
  blankType: BlankType;
  dryState: DryState;
  dimensions: string;
  roughWallThicknessIn: string;
}

let nextRowId = 1;
function newRow(): Row {
  return {
    id: nextRowId++,
    species: "",
    blankType: "bowl-blank",
    dryState: "green",
    dimensions: "",
    roughWallThicknessIn: "1",
  };
}

export function BatchTagsTool() {
  const [dateLabel, setDateLabel] = useState(todayIso());
  const [turnerName, setTurnerName] = useState("");
  const [rows, setRows] = useState<Row[]>(() => [newRow(), newRow(), newRow()]);

  function updateRow(id: number, patch: Partial<Row>) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addRow() {
    setRows((current) => [...current, newRow()]);
  }

  function removeRow(id: number) {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : current));
  }

  const tags = useMemo(
    () =>
      buildBatchTags(
        rows.map((row) => ({
          species: row.species,
          blankType: row.blankType,
          dryState: row.dryState,
          dimensions: row.dimensions,
          dateLabel,
          roughWallThicknessIn:
            row.dryState === "rough-turned" ? Number(row.roughWallThicknessIn) || undefined : undefined,
          turnerName,
        })),
      ),
    [rows, dateLabel, turnerName],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="batch-date">
            Date (shared across this batch)
          </label>
          <input
            id="batch-date"
            type="date"
            value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="batch-date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="batch-turner-name">
            Turner / maker name (optional)
          </label>
          <input
            id="batch-turner-name"
            type="text"
            value={turnerName}
            onChange={(e) => setTurnerName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            data-testid="batch-turner-name"
          />
        </div>
      </div>

      <datalist id="batch-species-suggestions">
        {COMMON_TURNING_SPECIES.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.id} className="space-y-3 rounded border border-gray-200 p-4" data-testid="batch-row">
            <div className="grid gap-3 sm:grid-cols-4">
              <input
                type="text"
                list="batch-species-suggestions"
                placeholder="Species"
                value={row.species}
                onChange={(e) => updateRow(row.id, { species: e.target.value })}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                data-testid={`batch-species-${index}`}
              />
              <select
                value={row.blankType}
                onChange={(e) => updateRow(row.id, { blankType: e.target.value as BlankType })}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                data-testid={`batch-blank-type-${index}`}
              >
                {BLANK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {BLANK_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
              <select
                value={row.dryState}
                onChange={(e) => updateRow(row.id, { dryState: e.target.value as DryState })}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                data-testid={`batch-dry-state-${index}`}
              >
                {DRY_STATES.map((state) => (
                  <option key={state} value={state}>
                    {DRY_STATE_LABELS[state]}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Dimensions"
                value={row.dimensions}
                onChange={(e) => updateRow(row.id, { dimensions: e.target.value })}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                data-testid={`batch-dimensions-${index}`}
              />
            </div>
            <div className="flex items-center gap-3">
              {row.dryState === "rough-turned" && (
                <input
                  type="number"
                  min="0.1"
                  step="0.05"
                  placeholder="Wall thickness (in)"
                  value={row.roughWallThicknessIn}
                  onChange={(e) => updateRow(row.id, { roughWallThicknessIn: e.target.value })}
                  className="w-48 rounded border border-gray-300 px-2 py-1.5 text-sm"
                  data-testid={`batch-wall-thickness-${index}`}
                />
              )}
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="ml-auto rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                data-testid={`batch-remove-${index}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={addRow}
          className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          data-testid="batch-add-row"
        >
          Add another blank
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Print / save as PDF
        </button>
      </div>

      <div className="printable-area grid grid-cols-2 gap-4 sm:grid-cols-3" data-testid="batch-preview">
        {tags.map((tag, index) => (
          <BlankTagCard key={index} tag={tag} />
        ))}
      </div>
    </div>
  );
}
