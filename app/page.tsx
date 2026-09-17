import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Wood Blank Tag Generator</h1>
      <p className="mt-4 text-gray-600">
        Free, instant, printable tags for woodturning blanks — no signup,
        nothing uploaded anywhere. Fill in species, dimensions, and the date,
        get a printable tag (or a full sheet for a whole log) with an
        estimated ready-to-turn date range for rough-outs, plus a drying-log
        card for tracking weekly weigh-ins.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/blank-tag"
          className="rounded-lg border border-gray-300 p-5 hover:border-gray-500"
          data-testid="tool-card-blank-tag"
        >
          <h2 className="font-semibold">Single blank tag</h2>
          <p className="mt-1 text-sm text-gray-600">
            One blank&apos;s details → a printable tag with an estimated
            ready date.
          </p>
        </Link>
        <Link
          href="/batch-tags"
          className="rounded-lg border border-gray-300 p-5 hover:border-gray-500"
          data-testid="tool-card-batch-tags"
        >
          <h2 className="font-semibold">Batch tag sheet</h2>
          <p className="mt-1 text-sm text-gray-600">
            Milled a whole log into several blanks? Tag them all at once on
            one printable sheet.
          </p>
        </Link>
        <Link
          href="/drying-log"
          className="rounded-lg border border-gray-300 p-5 hover:border-gray-500"
          data-testid="tool-card-drying-log"
        >
          <h2 className="font-semibold">Drying-log card</h2>
          <p className="mt-1 text-sm text-gray-600">
            A printable weigh-in log to staple to a rough-out — the real way
            to know it&apos;s dry.
          </p>
        </Link>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Already have a bowl blank and want a wall-thickness/drying-time
        calculation, or a sourced 14-species reference chart? See the sibling
        tool at{" "}
        <a href="https://woodturning-blank-calculator.svc.julienika.cz" className="underline">
          woodturning-blank-calculator
        </a>
        .
      </p>
    </main>
  );
}
