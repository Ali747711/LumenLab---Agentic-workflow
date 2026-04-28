import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/section-label"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Hobby",
    price: "$0",
    period: "/ month",
    desc: "For solo builders. Always free.",
    limits: [
      "10,000 step executions / mo",
      "3 workflows",
      "1 environment",
      "7-day run history",
      "Community support",
    ],
    cta: "start free",
    href: "/app/chat",
    highlight: false,
  },
  {
    name: "Team",
    price: "$60",
    period: "/ seat / month",
    desc: "For teams shipping AI to production.",
    limits: [
      "1,000,000 step executions / mo",
      "Unlimited workflows",
      "Unlimited environments",
      "90-day run history",
      "Slack support · 4h response",
    ],
    cta: "start 14-day trial",
    href: "/app/chat",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "from $2,400",
    period: "/ month",
    desc: "For regulated and high-scale orgs.",
    limits: [
      "Custom step volume",
      "BYOC · AWS, GCP, Azure",
      "SOC 2, HIPAA, EU residency",
      "SSO + SCIM + audit log",
      "24/7 SLA · named CSE",
    ],
    cta: "talk to sales",
    href: "#",
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="06" label="Pricing" />
            <h2 className="mt-10 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Pay for what runs. <br />
              <span className="text-muted-foreground">Nothing else.</span>
            </h2>
          </div>
          <p className="col-span-12 mt-6 text-[15px] leading-relaxed text-muted-foreground md:col-span-8 md:mt-0 md:max-w-xl md:justify-self-end">
            We bill on step executions — the actual unit of work. No per-task
            multipliers, no surprise overages. If you hit your cap, we email
            you. We don't shut you off.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 border md:grid-cols-3">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              className={cn(
                "flex flex-col p-8",
                i !== 0 && "md:border-l border-t md:border-t-0",
                t.highlight && "bg-clay/5"
              )}
            >
              <header>
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t.highlight && <span className="text-clay">★</span>}
                  {t.name}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tabular-nums tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t.period}
                  </span>
                </p>
              </header>
              <ul className="mt-8 space-y-3 border-t pt-6 text-[13px]">
                {t.limits.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={t.href}
                className={cn(
                  "group mt-8 inline-flex items-center gap-2 self-start border-b pb-1 text-sm font-bold transition hover:gap-3",
                  t.highlight ? "border-clay text-clay" : "border-foreground"
                )}
              >
                {t.cta}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
