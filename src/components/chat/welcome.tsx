import { Code2, FileText, Lightbulb, PenLine } from "lucide-react"

const suggestions = [
  {
    icon: PenLine,
    label: "Draft a launch announcement",
    prompt: "Help me draft a launch announcement for our new AI platform.",
  },
  {
    icon: Code2,
    label: "Debug a React component",
    prompt: "Help me debug a React component that's re-rendering too often.",
  },
  {
    icon: FileText,
    label: "Summarize a long doc",
    prompt: "Summarize a 20-page PDF into 5 key takeaways.",
  },
  {
    icon: Lightbulb,
    label: "Brainstorm product names",
    prompt: "Brainstorm 10 product names for a developer-focused analytics tool.",
  },
]

type Props = {
  onPick: (prompt: string) => void
}

export function Welcome({ onPick }: Props) {
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16">
      <h1 className="text-balance text-center text-4xl font-semibold tracking-tight md:text-5xl">
        <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
          {greeting}, Azamat.
        </span>
      </h1>
      <p className="mt-3 text-center text-lg text-muted-foreground">
        How can I help you today?
      </p>

      <div className="mt-10 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.prompt)}
            className="flex items-start gap-3 rounded-2xl border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {s.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
