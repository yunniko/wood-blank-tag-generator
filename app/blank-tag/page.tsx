import type { Metadata } from "next";
import Link from "next/link";
import { BlankTagTool } from "../_components/blank-tag-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Blank Tag Generator",
  description:
    "Free, instant, printable tag for a woodturning blank — species, dimensions, date, and an estimated ready-to-turn date range for rough-outs. No signup.",
};

const FAQ = [
  {
    question: "Where does the estimated ready date come from?",
    answer:
      "For a rough-turned blank, the range is based on rough wall thickness (roughly 4-7 months under 0.75in, 6-10 months from 0.75-1.25in, 8-12 months above that), sourced from American Association of Woodturners forum discussion of paper-bag and sealed drying times and Turn A Wood Bowl's guidance. It does not adjust for species (a naturally slow-drying species like oak commonly runs longer) or drying method/shop humidity, both of which shift the real time considerably — it's a rough planning estimate only. The reliable way to know a blank is actually dry is weighing it every 1-4 weeks until the weight holds steady across several readings spanning at least a few weeks, which is exactly what the drying-log card is for.",
  },
  {
    question: "Why doesn't this ask for my species' shrinkage numbers?",
    answer:
      "This tool keeps the drying estimate simple (wall thickness only) rather than trying to model every species' drying speed — species genuinely does affect drying time in the sources this is based on, so treat the estimate as a starting point that a slow-drying species can run past. If you want species-specific shrinkage/warp data and a sourced 14-species reference chart, see the sibling tool woodturning-blank-calculator.",
  },
  {
    question: "What if the blank cracks while it's drying?",
    answer:
      "A check or crack usually means it's drying too fast — slow it down (more paper-bag layers or damp shavings, a cooler/less drafty spot, or an end-grain sealer like Anchorseal). A blank with a stable, shallow check is often still usable rather than a total loss. Before remounting any dried blank, inspect it for cracks, checks, ring shake, and loose bark, confirm the tenon is sound, and start the lathe at its lowest speed.",
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

      <h1 className="text-3xl font-semibold">Blank Tag Generator</h1>
      <p className="mt-3 text-gray-600">
        Fill in one blank&apos;s details, then print or save the tag as a PDF
        to staple or tape to the piece.
      </p>

      <div className="mt-6">
        <BlankTagTool />
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Paper tags can fall off in the shop — for extra insurance, write the
        species and date directly on the tenon or foot in permanent marker
        as a backup.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Tagging a whole log&apos;s worth at once?{" "}
        <Link href="/batch-tags" className="underline">
          Use the batch tag sheet
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
