import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

type Props = {
  prompt: string
  title: string
  subtitle: string
  children: React.ReactNode
  asideQuote: string
  asideAttribution: string
  asideRole: string
  footerText: string
  footerLink: { to: string; label: string }
}

export function AuthLayout({
  prompt,
  title,
  subtitle,
  children,
  asideQuote,
  asideAttribution,
  asideRole,
  footerText,
  footerLink,
}: Props) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-12">
      <section className="flex flex-col border-b lg:col-span-7 lg:border-r lg:border-b-0">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="text-base font-bold tracking-tight">lumen</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              v0.42
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            back to site
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-clay">$</span> {prompt}
            </p>
            <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>

            <div className="mt-10">{children}</div>

            <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
              {footerText}{" "}
              <Link
                to={footerLink.to}
                className="font-bold text-foreground underline-offset-4 hover:underline"
              >
                {footerLink.label} →
              </Link>
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© Lumen Labs, Inc.</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="#" className="hover:text-foreground">
              Status
            </Link>
          </div>
        </footer>
      </section>

      <aside className="relative hidden flex-col justify-between bg-foreground p-10 text-background lg:col-span-5 lg:flex">
        <div className="text-[11px] uppercase tracking-[0.25em] text-background/60">
          <span className="text-clay">[★]</span> // field report
        </div>

        <blockquote className="text-balance text-2xl leading-snug font-medium tracking-tight md:text-3xl">
          <span className="text-clay">"</span>
          {asideQuote}
          <span className="text-clay">"</span>
        </blockquote>

        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold">{asideAttribution}</p>
            <p className="text-xs text-background/60">{asideRole}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums tracking-tight">
              99.982<span className="text-background/60">%</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">
              Uptime · 90d
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
