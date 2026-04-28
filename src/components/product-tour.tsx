import { SectionLabel } from "@/components/section-label"

export function ProductTour() {
  return (
    <section id="tour" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionLabel index="02" label="Product tour" />
        <h2 className="mt-10 max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
          A runtime, an inspector, and a deployment target. <br />
          <span className="text-muted-foreground">
            Three primitives. Nothing else.
          </span>
        </h2>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-24">
          <Chapter
            number="01"
            title="Durable workflows"
            body="Define a workflow as a TypeScript function. Lumen persists every step — retries, branches, sleeps for 30 days, resumes from a crash. No queues to wire up. No state machines to draw."
            mock={<WorkflowMock />}
            reverse={false}
          />
          <Chapter
            number="02"
            title="The run inspector"
            body="Every step, every token, every dollar — searchable, replay-able, and linkable like a stack trace. Send your engineer the URL of a broken run. They open it. They fix it."
            mock={<InspectorMock />}
            reverse={true}
          />
          <Chapter
            number="03"
            title="Ship it"
            body="One command. Workflow goes from your laptop to a globally-distributed runtime. No Dockerfile. No Kubernetes. No 'it works on my machine.'"
            mock={<DeployMock />}
            reverse={false}
          />
        </div>
      </div>
    </section>
  )
}

type ChapterProps = {
  number: string
  title: string
  body: string
  mock: React.ReactNode
  reverse: boolean
}

function Chapter({ number, title, body, mock, reverse }: ChapterProps) {
  const text = (
    <div className="col-span-12 md:col-span-4">
      <p className="text-[11px] uppercase tracking-[0.25em] text-clay">
        {number} /
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h3>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  )

  const visual = (
    <div className="col-span-12 md:col-span-8">
      <div className="overflow-hidden border bg-card">{mock}</div>
    </div>
  )

  return reverse ? (
    <>
      {visual}
      {text}
    </>
  ) : (
    <>
      {text}
      {visual}
    </>
  )
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2">
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
      </div>
      <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </span>
      <span className="w-12" />
    </div>
  )
}

function WorkflowMock() {
  return (
    <div>
      <WindowChrome title="workflows/onboard-customer.ts" />
      <pre className="overflow-x-auto p-6 text-[13px] leading-relaxed">
        <code>
          <span className="text-muted-foreground">
            {`// Survives crashes. Resumes from any step.`}
          </span>
          {`\n`}
          <span className="text-clay">export</span>
          {` `}
          <span className="text-clay">const</span>
          {` `}
          <span className="font-bold">onboardCustomer</span>
          {` = `}
          <span className="text-clay">workflow</span>
          {`(`}
          <span className="text-emerald-600 dark:text-emerald-400">
            "onboard"
          </span>
          {`, `}
          <span className="text-clay">async</span>
          {` (ctx, customer) =&gt; {`}
          {`\n  `}
          <span className="text-clay">const</span>
          {` account = `}
          <span className="text-clay">await</span>
          {` ctx.step(`}
          <span className="text-emerald-600 dark:text-emerald-400">
            "create-stripe"
          </span>
          {`, () =&gt;`}
          {`\n    stripe.customers.create({ email: customer.email })`}
          {`\n  )`}
          {`\n\n  `}
          <span className="text-clay">await</span>
          {` ctx.sleep(`}
          <span className="text-emerald-600 dark:text-emerald-400">"24h"</span>
          {`)  `}
          <span className="text-muted-foreground">{`// durable. seriously.`}</span>
          {`\n\n  `}
          <span className="text-clay">await</span>
          {` ctx.step(`}
          <span className="text-emerald-600 dark:text-emerald-400">
            "send-followup"
          </span>
          {`, () =&gt;`}
          {`\n    resend.emails.send({ to: customer.email, ... })`}
          {`\n  )`}
          {`\n})`}
        </code>
      </pre>
    </div>
  )
}

function InspectorMock() {
  const rows = [
    {
      step: "fetch_user_profile",
      status: "ok",
      ms: 142,
      cost: "$0.000",
      tokens: "—",
    },
    {
      step: "classify_intent",
      status: "ok",
      ms: 891,
      cost: "$0.012",
      tokens: "1,204",
    },
    {
      step: "search_knowledge_base",
      status: "ok",
      ms: 312,
      cost: "$0.001",
      tokens: "—",
    },
    {
      step: "draft_response",
      status: "retry",
      ms: 4_201,
      cost: "$0.043",
      tokens: "3,891",
    },
    {
      step: "draft_response",
      status: "ok",
      ms: 2_104,
      cost: "$0.038",
      tokens: "3,612",
    },
    {
      step: "post_to_slack",
      status: "ok",
      ms: 87,
      cost: "$0.000",
      tokens: "—",
    },
  ]
  return (
    <div>
      <WindowChrome title="run · 2026-04-28T08:14:22Z · #run_8b3a91" />
      <div className="px-6 py-4 text-[13px]">
        <div className="flex items-center justify-between border-b pb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>step</span>
          <div className="flex gap-8 tabular-nums">
            <span className="w-16 text-right">status</span>
            <span className="w-14 text-right">ms</span>
            <span className="w-16 text-right">tokens</span>
            <span className="w-16 text-right">cost</span>
          </div>
        </div>
        <ul className="divide-y">
          {rows.map((r, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-2.5 tabular-nums"
            >
              <span className="truncate">{r.step}</span>
              <div className="flex gap-8">
                <span
                  className={
                    "w-16 text-right uppercase text-[11px] tracking-wider " +
                    (r.status === "retry"
                      ? "text-clay"
                      : "text-emerald-600 dark:text-emerald-400")
                  }
                >
                  {r.status}
                </span>
                <span className="w-14 text-right">{r.ms.toLocaleString()}</span>
                <span className="w-16 text-right text-muted-foreground">
                  {r.tokens}
                </span>
                <span className="w-16 text-right">{r.cost}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t pt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>6 steps · 1 retry</span>
          <span className="tabular-nums">total · 7,737 ms · $0.094</span>
        </div>
      </div>
    </div>
  )
}

function DeployMock() {
  return (
    <div>
      <WindowChrome title="bash" />
      <pre className="overflow-x-auto p-6 text-[13px] leading-relaxed">
        <code>
          <span className="text-muted-foreground">~/projects/acme</span>
          {` `}
          <span className="text-clay">$</span>
          {` lumen deploy\n`}
          <span className="text-muted-foreground">
            {`▸ packing workflows ...... 3 found\n▸ uploading ............... 412 KB\n▸ provisioning runtime .... iad, sfo, fra, sin\n▸ running migrations ...... ok\n`}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {`✔ deployed in 4.2s\n`}
          </span>
          {`\n`}
          <span className="text-muted-foreground">
            {`onboard-customer       https://acme.lumen.run/onboard-customer\nincident-triage        https://acme.lumen.run/incident-triage\nweekly-report          https://acme.lumen.run/weekly-report\n`}
          </span>
          {`\n`}
          <span className="text-clay">$</span>
          {` _`}
          <span className="ml-0.5 inline-block h-3 w-2 animate-pulse bg-foreground align-middle" />
        </code>
      </pre>
    </div>
  )
}
