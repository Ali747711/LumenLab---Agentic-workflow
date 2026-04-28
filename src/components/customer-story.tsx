import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/section-label"

export function CustomerStory() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionLabel index="03" label="Field report" />

        <blockquote className="mt-16 max-w-5xl text-balance text-3xl leading-tight font-medium tracking-tight md:text-5xl md:leading-[1.1]">
          <span className="text-clay">"</span>
          We replaced 47 cron jobs with 3 Lumen workflows. The first month, we
          saved <span className="text-clay">$14,200</span> in compute and one
          engineer's full attention.
          <span className="text-clay">"</span>
        </blockquote>

        <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-4 text-sm">
          <div>
            <p className="font-bold">Maya Patel</p>
            <p className="text-muted-foreground">
              Head of Platform · Northwind Logistics
            </p>
          </div>
          <Link
            to="#"
            className="group inline-flex items-center gap-2 border-b border-foreground pb-1 font-bold transition hover:gap-3"
          >
            read the case study
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <dl className="mt-20 grid grid-cols-1 gap-y-8 border-t pt-10 md:grid-cols-3 md:gap-x-12">
          {[
            {
              n: "47",
              suffix: "→ 3",
              label: "Cron jobs replaced with workflows",
            },
            {
              n: "$14,200",
              suffix: "/ mo",
              label: "Compute saved · first month",
            },
            { n: "11", suffix: "min p95", label: "Down from 4h incident MTTR" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-3 text-4xl font-bold tabular-nums tracking-tight md:text-5xl">
                {s.n}
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  {s.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
