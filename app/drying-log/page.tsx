import type { Metadata } from "next";
import Link from "next/link";
import { DryingLogTool } from "../_components/drying-log-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Drying-Log Card Generator",
  description:
    "Free, instant, printable weigh-in log card for a rough-turned woodturning blank — track weekly weight readings, the real way to know a blank is dry. No signup.",
};

const FAQ = [
  {
    question: "Why track weight instead of just waiting out the estimated range?",
    answer:
      "The sources the blank-tag calendar estimate is based on (American Association of Woodturners forum discussion, Turn A Wood Bowl) agree a calendar range is only a planning guide — actual moisture loss varies with species, drying method, shop humidity, and airflow. The reliable signal is the blank's weight holding steady across several weighings spanning at least a few weeks on the same scale, not one flat reading (weight can even tick up briefly in humid weather). This card exists to make that habit easy to keep up.",
  },
  {
    question: "What scale do I need?",
    answer:
      "A postal or parcel scale with several kilograms of capacity and 1g resolution — many kitchen scales cap out around 5kg, which a large green rough-out can exceed. The point is using the same scale each time so the readings are comparable to each other, not matching an absolute reference.",
  },
  {
    question: "The weight has stopped dropping — is it ready to finish-turn?",
    answer:
      "Probably, but one more thing matters: a blank that's stabilized in a cold or damp space (an unheated garage, for example) has only equalized with that space's humidity, not with a heated indoor room. Bring it inside for a couple of weeks and confirm the weight still holds before finish-turning, or it may move again once it's in the house.",
  },
  {
    question: "Is my data uploaded anywhere?",
    answer:
      "No. Everything runs in your browser — nothing you type is sent to a server. Printing or saving as PDF uses your browser's own print function.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
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

      <h1 className="text-3xl font-semibold">Drying-Log Card Generator</h1>
      <p className="mt-3 text-gray-600">
        Fill in the blank&apos;s details, then print a card with weekly
        weigh-in rows to staple to the piece or keep in the shop.
      </p>

      <div className="mt-6">
        <DryingLogTool />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Want an estimated ready-date range instead?{" "}
        <Link href="/blank-tag" className="underline">
          Use the blank tag generator
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
