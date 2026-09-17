import type { BlankTag } from "@/lib/blank-tag";

export function BlankTagCard({ tag }: { tag: BlankTag }) {
  return (
    <div className="w-full max-w-xs rounded-lg border border-gray-300 bg-white p-4 shadow-sm print:border-black print:shadow-none">
      <h3 className="text-base font-semibold text-gray-900">{tag.headline}</h3>
      <dl className="mt-2 space-y-1 text-sm text-gray-700">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">Date</dt>
          <dd>{tag.dateLabel}</dd>
        </div>
        {tag.dimensions && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Dimensions</dt>
            <dd>{tag.dimensions}</dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">State</dt>
          <dd>{tag.dryStateLabel}</dd>
        </div>
        {tag.roughWallThicknessIn && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Rough wall</dt>
            <dd>{tag.roughWallThicknessIn} in</dd>
          </div>
        )}
        {tag.turnerName && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Turner</dt>
            <dd>{tag.turnerName}</dd>
          </div>
        )}
      </dl>

      {tag.dryingEstimate && (
        <p className="mt-3 border-t border-gray-200 pt-2 text-xs text-gray-600">
          Estimated ready to finish-turn: <strong>{tag.dryingEstimate.readyByRangeLabel}</strong>.{" "}
          {tag.dryingEstimate.caveat}
          {tag.dryingEstimate.veryThickNote && ` ${tag.dryingEstimate.veryThickNote}`}
        </p>
      )}

      {tag.notes && <p className="mt-3 text-xs text-gray-500">{tag.notes}</p>}
    </div>
  );
}
