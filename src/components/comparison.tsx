import { SectionLabel } from "@/components/section-label"
import { cn } from "@/lib/utils"

const cols = ["Lumen", "Zapier", "n8n", "LangChain"] as const
type Col = (typeof cols)[number]

const rows: { axis: string; cells: Record<Col, { v: string; tone?: "good" | "bad" | "ok" }> }[] = [
  {
    axis: "Durable execution",
    cells: {
      Lumen: { v: "Native · resumes from any step", tone: "good" },
      Zapier: { v: "Best-effort retries", tone: "bad" },
      n8n: { v: "Manual via queue node", tone: "ok" },
      LangChain: { v: "DIY with LangGraph", tone: "ok" },
    },
  },
  {
    axis: "Observability",
    cells: {
      Lumen: { v: "Per-step traces, replays, cost", tone: "good" },
      Zapier: { v: "Run history, no traces", tone: "bad" },
      n8n: { v: "Run history + diff", tone: "ok" },
      LangChain: { v: "LangSmith (separate $)", tone: "ok" },
    },
  },
  {
    axis: "Agent loops",
    cells: {
      Lumen: { v: "First-class · tools + memory", tone: "good" },
      Zapier: { v: "No", tone: "bad" },
      n8n: { v: "Plugin", tone: "ok" },
      LangChain: { v: "Yes (the whole point)", tone: "good" },
    },
  },
  {
    axis: "Deployment",
    cells: {
      Lumen: { v: "lumen deploy · global", tone: "good" },
      Zapier: { v: "Hosted only", tone: "ok" },
      n8n: { v: "Self-host · Docker", tone: "ok" },
      LangChain: { v: "Bring your own infra", tone: "bad" },
    },
  },
  {
    axis: "Cost model",
    cells: {
      Lumen: { v: "Per run · usage caps", tone: "good" },
      Zapier: { v: "Per task · expensive at scale", tone: "bad" },
      n8n: { v: "Per workflow exec", tone: "ok" },
      LangChain: { v: "OSS · infra costs", tone: "ok" },
    },
  },
  {
    axis: "Open source",
    cells: {
      Lumen: { v: "SDK is OSS · runtime is closed", tone: "ok" },
      Zapier: { v: "No", tone: "bad" },
      n8n: { v: "Yes (fair-code)", tone: "good" },
      LangChain: { v: "Yes (MIT)", tone: "good" },
    },
  },
]

export function Comparison() {
  return (
    <section className="border-b bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="05" label="Spec sheet" />
            <h2 className="mt-10 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Why Lumen, plainly.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              We're not going to pretend the alternatives don't exist. Here's
              the honest comparison — including where we lose.
            </p>
          </div>

          <div className="col-span-12 mt-12 md:col-span-8 md:mt-0">
            <div className="overflow-x-auto border bg-background">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <th className="w-[28%] px-4 py-3 text-left font-normal">
                      axis
                    </th>
                    {cols.map((c) => (
                      <th
                        key={c}
                        className={cn(
                          "px-4 py-3 text-left font-normal",
                          c === "Lumen" && "text-foreground"
                        )}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.axis} className="border-b last:border-b-0">
                      <td className="px-4 py-3 align-top font-bold">
                        {r.axis}
                      </td>
                      {cols.map((c) => {
                        const cell = r.cells[c]
                        return (
                          <td
                            key={c}
                            className={cn(
                              "px-4 py-3 align-top",
                              c === "Lumen" && "bg-clay/5"
                            )}
                          >
                            <span className="flex items-start gap-2">
                              <span
                                className={cn(
                                  "mt-1.5 inline-block size-1.5 shrink-0 rounded-full",
                                  cell.tone === "good" && "bg-emerald-500",
                                  cell.tone === "ok" && "bg-foreground/30",
                                  cell.tone === "bad" && "bg-clay"
                                )}
                              />
                              <span
                                className={cn(
                                  cell.tone === "bad" && "text-muted-foreground"
                                )}
                              >
                                {cell.v}
                              </span>
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Updated 2026-04-15 · Submit corrections at{" "}
              <a href="#" className="text-foreground underline">
                github.com/lumen/comparison
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
