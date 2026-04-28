import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative border-b">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 px-6 pt-24 pb-20 md:pt-36 md:pb-32">
        <div className="col-span-12 md:col-span-9">
          <p className="mb-12 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-clay">[01]</span>
            <span className="mx-3 text-border">/</span>
            Runtime for AI agents
          </p>
          <h1 className="text-balance text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
            Agents that <br className="hidden md:block" />
            don't break in <br className="hidden md:block" />
            <span className="text-clay">production.</span>
          </h1>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Lumen is the runtime your AI workflows have been waiting for —
            durable execution, real observability, and the boring infrastructure
            so the interesting stuff actually ships.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <Link
              to="/app/chat"
              className="group inline-flex items-center gap-2 border-b border-foreground pb-1 font-bold transition hover:gap-3"
            >
              start free
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#tour"
              className="inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
            >
              <span className="text-clay">→</span> read the docs
            </a>
            <span className="text-muted-foreground">
              <span className="text-clay">$</span> npm i @lumen/runtime
            </span>
          </div>
        </div>

        <aside className="col-span-12 mt-16 md:col-span-3 md:mt-0 md:border-l md:pl-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Live · last 7d
          </p>
          <ul className="mt-6 space-y-6">
            <li>
              <p className="text-3xl font-bold tabular-nums tracking-tight">
                20,847,109
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Agent runs executed
              </p>
            </li>
            <li>
              <p className="text-3xl font-bold tabular-nums tracking-tight">
                99.982<span className="text-muted-foreground">%</span>
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Uptime · 90d trailing
              </p>
            </li>
            <li>
              <p className="text-3xl font-bold tabular-nums tracking-tight">
                p50 / 142<span className="text-muted-foreground">ms</span>
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Step latency
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
