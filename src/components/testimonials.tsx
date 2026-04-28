import { SectionLabel } from "@/components/section-label"
import { cn } from "@/lib/utils"

type Testimonial = {
  handle: string
  quote: string
  seed: string
}

const rowOne: Testimonial[] = [
  {
    handle: "@zachklein",
    quote:
      "We replaced an entire Airflow setup with one Lumen workflow. I keep checking the dashboard expecting it to be down.",
    seed: "zachklein",
  },
  {
    handle: "@danpeguine",
    quote:
      "Why @lumen is nuts: durable execution lives on the runtime, not in your queue glue. The mental model finally makes sense.",
    seed: "danpeguine",
  },
  {
    handle: "@elenaboutros",
    quote:
      "Finally a workflow runtime that doesn't make me draw a state diagram on a whiteboard before I can ship.",
    seed: "elenaboutros",
  },
  {
    handle: "@nateliason",
    quote:
      "Yeah, this was 1,000% worth the subscription. Closest thing to magic I've shipped this year.",
    seed: "nateliason",
  },
  {
    handle: "@morgantatum",
    quote:
      "The replay feature is unfair. I sent a broken run URL to my coworker. He fixed it in 4 minutes.",
    seed: "morgantatum",
  },
  {
    handle: "@kasperho",
    quote:
      "BYOC was the dealbreaker for us. Lumen shipped it last month. Migrating off Temporal next sprint.",
    seed: "kasperho",
  },
]

const rowTwo: Testimonial[] = [
  {
    handle: "@philo01",
    quote:
      "Feels like we're living in the future. Cron jobs are dead — long live durable workflows.",
    seed: "philo01",
  },
  {
    handle: "@nikoiglesias",
    quote:
      "Cron jobs were lying to me for years. Lumen just tells the truth.",
    seed: "nikoiglesias",
  },
  {
    handle: "@reefparekh",
    quote:
      "The inspector alone is worth the price. The fact that everything else works is a bonus.",
    seed: "reefparekh",
  },
  {
    handle: "@junemchen",
    quote: "p99 142ms across 3 regions. I checked twice. I'm still suspicious.",
    seed: "junemchen",
  },
  {
    handle: "@avalevin",
    quote:
      "First SaaS where the docs actually match the product. Refreshing.",
    seed: "avalevin",
  },
  {
    handle: "@tobenefits",
    quote:
      "We saved $14k/mo by deleting our queue infra. That's not even the main feature.",
    seed: "tobenefits",
  },
]

export function Testimonials() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="04" label="What people say" />
        </div>
        <h2 className="mt-10 max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
          Receipts. <span className="text-muted-foreground">Real ones.</span>
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Engineers, founders, and platform leads who have shipped on Lumen and
          posted about it without us asking.
        </p>
      </div>

      <div
        className="group relative overflow-hidden pb-24 md:pb-32"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <MarqueeRow items={rowOne} reverse={false} />
        <div className="h-4" />
        <MarqueeRow items={rowTwo} reverse={true} />
      </div>
    </section>
  )
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Testimonial[]
  reverse: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div
      className={cn(
        "flex w-max gap-4 will-change-transform",
        reverse
          ? "animate-[marquee-reverse_45s_linear_infinite]"
          : "animate-[marquee_50s_linear_infinite]",
        "group-hover:[animation-play-state:paused]"
      )}
    >
      {doubled.map((t, i) => (
        <Card key={`${t.handle}-${i}`} t={t} />
      ))}
    </div>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <article className="w-[360px] shrink-0 border bg-card p-5 transition hover:-translate-y-0.5 hover:border-foreground/30 sm:w-[420px]">
      <div className="flex items-start gap-4">
        <img
          src={`https://i.pravatar.cc/80?u=${t.seed}`}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="size-10 shrink-0 rounded-full border bg-muted object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] leading-relaxed">"{t.quote}"</p>
          <p className="mt-3 text-[13px] font-bold text-clay">{t.handle}</p>
        </div>
      </div>
    </article>
  )
}
