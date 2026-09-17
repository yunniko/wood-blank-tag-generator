import type { DryingLogCard } from "@/lib/drying-log";

export function DryingLogCardView({ card }: { card: DryingLogCard }) {
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-sm print:border-black print:shadow-none">
      <h3 className="text-base font-semibold text-gray-900">{card.headline}</h3>
      <dl className="mt-2 space-y-1 text-sm text-gray-700">
        <div className="flex justify-between gap-2">
          <dt className="text-gray-500">Started</dt>
          <dd>{card.dateStarted}</dd>
        </div>
        {card.startingWeightG && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Starting weight</dt>
            <dd>{card.startingWeightG} g</dd>
          </div>
        )}
        {card.targetWeightRange && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Target weight</dt>
            <dd>
              {card.targetWeightRange.lowG}–{card.targetWeightRange.highG} g
            </dd>
          </div>
        )}
        {card.turnerName && (
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">Turner</dt>
            <dd>{card.turnerName}</dd>
          </div>
        )}
      </dl>

      <p className="mt-3 text-xs text-gray-600">
        Weigh on the same scale every 1-4 weeks. It&apos;s dry enough to
        finish-turn once the weight holds steady across several weighings
        spanning at least a few weeks — not just one flat reading, since
        weight can tick up briefly in humid weather. A 10-25% loss from the
        starting weight is the typical range before that point.
      </p>

      <table className="mt-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="py-1 pr-2">Date</th>
            <th className="py-1 pr-2">Weight (g)</th>
            <th className="py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: card.rows }).map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="h-7 py-1 pr-2">&nbsp;</td>
              <td className="h-7 py-1 pr-2">&nbsp;</td>
              <td className="h-7 py-1">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
