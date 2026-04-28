import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { SectionLabel } from "@/components/section-label"
import { cn } from "@/lib/utils"

type Tag = "FEATURE" | "FIX" | "BREAKING" | "PERF" | "DOCS"

type Entry = {
  version: string
  date: string
  title: string
  items: { tag: Tag; body: string }[]
}

const entries: Entry[] = [
  {
    version: "v0.42.0",
    date: "2026-04-26",
    title: "Replays you can actually use",
    items: [
      {
        tag: "FEATURE",
        body: "Replay any run from any step. Branching off a replay creates a fork visible in the inspector.",
      },
      {
        tag: "PERF",
        body: "Cold start on iad/sfo down 38% (p50 142ms → 88ms).",
      },
      {
        tag: "FIX",
        body: "Workflows sleeping > 7 days no longer wake 250ms early on DST boundaries.",
      },
    ],
  },
  {
    version: "v0.41.2",
    date: "2026-04-19",
    title: "Smaller things",
    items: [
      {
        tag: "FIX",
        body: "OpenAI 429s are now classified as transient and retried with jittered backoff (was: terminal).",
      },
      {
        tag: "DOCS",
        body: "Rewrote the durable-execution guide. We're sorry the old one had three different code samples for the same thing.",
      },
    ],
  },
  {
    version: "v0.41.0",
    date: "2026-04-12",
    title: "BYOC for Enterprise",
    items: [
      {
        tag: "FEATURE",
        body: "Run the Lumen runtime in your own AWS / GCP / Azure account. Control plane stays with us, data plane stays with you.",
      },
      {
        tag: "BREAKING",
        body: "ctx.step() callbacks must now be pure-async. We're sorry. Migration guide linked below.",
      },
    ],
  },
  {
    version: "v0.40.0",
    date: "2026-04-05",
    title: "Observability v2",
    items: [
      {
        tag: "FEATURE",
        body: "Per-step token + cost attribution, including for tool calls inside agent loops.",
      },
      {
        tag: "FEATURE",
        body: "OTel exporter — pipe traces to Datadog, Honeycomb, Grafana Tempo.",
      },
    ],
  },
  {
    version: "v0.39.0",
    date: "2026-03-29",
    title: "Agents 2.0",
    items: [
      {
        tag: "FEATURE",
        body: "Tool definitions are now strongly-typed at runtime (Zod) and propagate to the inspector.",
      },
      {
        tag: "PERF",
        body: "Agent loops with > 8 steps no longer quadratically re-serialize history.",
      },
    ],
  },
]

const tagStyle: Record<Tag, string> = {
  FEATURE: "bg-clay/10 text-clay",
  FIX: "bg-foreground/10 text-foreground",
  BREAKING: "bg-red-500/10 text-red-600 dark:text-red-400",
  PERF: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  DOCS: "bg-foreground/5 text-muted-foreground",
}

export function ChangelogPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-32">
            <SectionLabel index="∞" label="Changelog" />
            <h1 className="mt-10 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              What we shipped, <br />
              <span className="text-muted-foreground">
                and what we broke fixing it.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              We ship every Friday. Sometimes Tuesdays. Subscribe via{" "}
              <a href="#" className="text-foreground underline">
                RSS
              </a>{" "}
              or{" "}
              <a href="#" className="text-foreground underline">
                email
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <ol className="space-y-20">
              {entries.map((e) => (
                <li key={e.version}>
                  <div className="grid grid-cols-12 gap-x-6">
                    <header className="col-span-12 md:col-span-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {e.date}
                      </p>
                      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight">
                        {e.version}
                      </p>
                    </header>
                    <div className="col-span-12 mt-6 md:col-span-9 md:mt-0 md:border-l md:pl-6">
                      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {e.title}
                      </h2>
                      <ul className="mt-6 space-y-4">
                        {e.items.map((it, i) => (
                          <li
                            key={i}
                            className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4"
                          >
                            <span
                              className={cn(
                                "inline-flex w-fit shrink-0 items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
                                tagStyle[it.tag]
                              )}
                            >
                              {it.tag}
                            </span>
                            <p className="text-[15px] leading-relaxed">
                              {it.body}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
