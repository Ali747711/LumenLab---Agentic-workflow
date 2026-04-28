import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Pricing } from "@/components/pricing"
import { SectionLabel } from "@/components/section-label"

const faqs = [
  {
    q: "What is a step execution?",
    a: "Every call to ctx.step() is one step execution. A workflow with 5 steps that runs once = 5 step executions. We don't charge for retries inside a single step.",
  },
  {
    q: "What happens if I exceed my plan?",
    a: "We email you. Workflows keep running. You're billed for overage at $0.0004/step at the end of the cycle. We will never silently shut you off mid-run.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — 10,000 step executions per month, forever. No credit card required. Plenty for solo projects and learning.",
  },
  {
    q: "Can I bring my own LLM provider?",
    a: "Yes. Lumen does not bill you for tokens — you pay your provider directly. We charge for orchestration, observability, and durable state.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Annual billing is 20% off on Team. Enterprise has custom commitments — talk to us.",
  },
  {
    q: "Where does my data live?",
    a: "By default: us-east-1. Enterprise can choose us-east, eu-west, or ap-southeast, and BYOC customers run the data plane in their own cloud account.",
  },
]

export function PricingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-32">
            <SectionLabel index="$" label="Pricing" />
            <h1 className="mt-10 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Honest pricing for <br />
              <span className="text-clay">honest workloads.</span>
            </h1>
          </div>
        </section>

        <Pricing />

        <section className="border-b">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <SectionLabel index="?" label="Frequently asked" />
            <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
              {faqs.map((f) => (
                <div key={f.q} className="border-t pt-6">
                  <p className="text-base font-bold">{f.q}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
