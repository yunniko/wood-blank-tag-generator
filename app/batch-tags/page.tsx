import type { Metadata } from "next";
import Link from "next/link";
import { BatchTagsTool } from "../_components/batch-tags-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Batch Tag Sheet Generator",
  description:
    "Free, instant printable tag sheet for a whole log's worth of woodturning blanks at once — species, dimensions, and an estimated ready-to-turn date per blank. No signup.",
};

const FAQ = [
  {
    question: "Why a batch tool instead of just using the single tag generator repeatedly?",
    answer:
      "Milling one log produces several blanks at once, usually cut and rough-turned the same day. This tool shares the date and turner name across the whole batch, lets you add or remove blanks as you go, and prints them all on one sheet to cut apart — faster than filling out the single-tag form once per blank.",
  },
  {
    question: "Can each blank have a different species or state?",
    answer:
      "Yes — species, blank type, current state, dimensions, and (for rough-turned blanks) wall thickness are all set per blank. Only the date and turner name are shared across the batch, since a single milling session usually happens on one day.",
  },
  {
    question: "Is my data uploaded anywhere?",
    answer:
      "No. Everything runs in your browser — nothing you type is sent to a server. Printing or saving as PDF uses your browser's own print function.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Batch Tag Sheet Generator</h1>
      <p className="mt-3 text-gray-600">
        Tag a whole log&apos;s worth of blanks at once. Add a row per blank,
        then print the whole sheet and cut the tags apart.
      </p>

      <div className="mt-6">
        <BatchTagsTool />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Just one blank?{" "}
        <Link href="/blank-tag" className="underline">
          Use the single tag generator
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
