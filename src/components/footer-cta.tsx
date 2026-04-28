import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { SectionLabel } from "@/components/section-label"

export function FooterCTA() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionLabel index="07" label="Get started" />
        <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <h2 className="col-span-12 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:col-span-8 md:text-6xl">
            Stop wiring tools. <br />
            Start shipping <span className="text-clay">runs.</span>
          </h2>
          <div className="col-span-12 md:col-span-4">
            <p className="text-sm text-muted-foreground">
              Free tier · no credit card · 5-minute setup.
            </p>
            <Link
              to="/app/chat"
              className="group mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 font-bold transition hover:gap-3"
            >
              start free
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
