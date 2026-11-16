import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pricing | Study Brew",
  description: "Study Brew is free to start. Paid plans are coming soon.",
};

const PLANS: {
  name: string;
  badge: string;
  badgeClass: string;
  features: string[];
}[] = [
  {
    name: "Free",
    badge: "Start here",
    badgeClass: "border border-teal/30 bg-teal/10 text-teal",
    features: [
      "Notes and notebooks",
      "Save words while you read",
      "Daily review",
      "A selection of stories and reads",
    ],
  },
  {
    name: "Plus",
    badge: "Coming soon",
    badgeClass: "border border-yellow/30 bg-yellow/10 text-yellow",
    features: [
      "The full story and read library",
      "More notebooks and decks",
      "Early access to new shows",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-14">
        {/* Hero */}
        <section className="pb-12 pt-10 md:pb-16 md:pt-16">
          <div className="mb-5 flex items-center gap-2.5 text-[0.8rem] font-medium text-teal">
            <span className="h-px w-5 shrink-0 bg-teal-dim" />
            <span>Pricing</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            Simple plans,
            <br />
            <span className="text-teal">brewing soon.</span>
          </h1>
          <p className="mt-6 max-w-[50ch] text-[1.05rem] leading-[1.65] text-text-muted">
            Study Brew will stay free to start. A paid plan for the full library and extra
            features is on the way, with fair prices for students.
          </p>
        </section>

        {/* Plans */}
        <section aria-label="Plans" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl border border-line bg-panel-2 p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[1.7rem] font-bold leading-none">{plan.name}</h2>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[0.76rem] font-medium ${plan.badgeClass}`}
                >
                  {plan.badge}
                </span>
              </div>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[0.95rem] leading-[1.5] text-text-muted"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal/15 text-teal">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="pb-20 pt-10 md:pb-24 md:pt-14">
          <div className="flex flex-col gap-6 rounded-[22px] border border-teal/40 bg-gradient-to-r from-teal/[0.08] to-blue/[0.08] p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold leading-[1.05]">
              Want to know when plans go live?
            </h2>
            <Link
              href="/roadmap"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-[9px] bg-text-primary px-5 py-3 text-[0.9rem] font-semibold text-background transition-opacity hover:opacity-90 md:self-auto"
            >
              See the roadmap
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
