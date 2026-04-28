import { Link } from "react-router-dom"

const cols = [
  {
    title: "Product",
    links: [
      ["Workflows", "/"],
      ["Agents", "/"],
      ["Observability", "/"],
      ["Pricing", "/pricing"],
      ["Changelog", "/changelog"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Docs", "#"],
      ["API reference", "#"],
      ["Examples", "#"],
      ["System status", "#"],
      ["Security", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["Customers", "#"],
      ["Careers", "#"],
      ["Press kit", "#"],
      ["Contact", "#"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms", "#"],
      ["Privacy", "#"],
      ["DPA", "#"],
      ["Sub-processors", "#"],
      ["SOC 2 report", "#"],
    ],
  },
] satisfies { title: string; links: [string, string][] }[]

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="text-base font-bold tracking-tight">lumen</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-background/60">
                v0.42
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-background/70">
              Runtime for AI agents that don't break in production.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-background/60">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              All systems operational · 99.982%
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-background/60">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-background/85 transition hover:text-background"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-background/15 pt-6 text-[11px] uppercase tracking-[0.18em] text-background/60 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Lumen Labs, Inc. ·{" "}
            <span className="text-background">Built in Brooklyn + Berlin</span>
          </p>
          <p>Last edit · 2026-04-28</p>
        </div>
      </div>
    </footer>
  )
}
