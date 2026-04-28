import { cn } from "@/lib/utils"

type Props = {
  index: string
  label: string
  className?: string
}

export function SectionLabel({ index, label, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
        className
      )}
    >
      <span className="text-clay">[{index}]</span>
      <span className="h-px flex-1 bg-border" />
      <span>// {label}</span>
    </div>
  )
}
