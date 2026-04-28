import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function Message({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-3xl bg-muted px-5 py-3 text-base">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <Avatar className="mt-1 size-8 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className={cn("min-w-0 flex-1 pt-1 leading-relaxed")}>
        {message.content.split("\n").map((line, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <Avatar className="mt-1 size-8 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1 pt-3">
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:0ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
      </div>
    </div>
  )
}
