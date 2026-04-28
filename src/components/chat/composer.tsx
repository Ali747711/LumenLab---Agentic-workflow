import { useRef, useEffect } from "react"
import { ArrowUp, Mic, Paperclip, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
}

export function Composer({ value, onChange, onSend, disabled }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <div className="rounded-3xl border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring/40">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Reply to Lumen…"
          rows={1}
          className="w-full resize-none rounded-3xl bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between gap-2 px-3 pb-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground"
            >
              <Paperclip className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-muted-foreground"
            >
              <Sparkles className="mr-1 size-4" />
              Tools
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground"
            >
              <Mic className="size-4" />
            </Button>
            <Button
              size="icon"
              className="size-8 rounded-full"
              disabled={disabled || !value.trim()}
              onClick={onSend}
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Lumen can make mistakes. Verify important info.
      </p>
    </div>
  )
}
