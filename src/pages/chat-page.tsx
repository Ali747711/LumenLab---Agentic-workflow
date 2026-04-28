import { useEffect, useRef, useState } from "react"
import { ChevronDown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { Composer } from "@/components/chat/composer"
import {
  Message,
  TypingIndicator,
  type ChatMessage,
} from "@/components/chat/message"
import { Welcome } from "@/components/chat/welcome"
import { ThemeToggle } from "@/components/theme-toggle"

const FAKE_REPLIES = [
  "Sure — let's break it down. Here's a quick plan to get us started:\n\n1. Clarify the audience and the one outcome we want them to take away.\n2. Draft a single, sharp sentence as the headline.\n3. Layer the supporting beats around it.\n\nWant me to start with the headline, or sketch the full structure first?",
  "Great question. The cleanest way to think about this is to separate *what* you're optimizing for from *how* you measure it. Once those are pinned down, the implementation usually picks itself.",
  "Here's a first pass — feel free to push back on anything:\n\nThe key tension is between speed and certainty. If we lean into speed, we accept more rework downstream. If we lean into certainty, we pay for it in cycle time. Most teams I've seen do well biasing toward speed early and tightening the loop as the surface area grows.",
]

export function ChatPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, pending])

  const send = (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setPending(true)
    setTimeout(() => {
      const reply = FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)]
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ])
      setPending(false)
    }, 900)
  }

  const newChat = () => {
    setMessages([])
    setActiveId(null)
    setInput("")
  }

  const handlePickRecent = (id: string) => {
    setActiveId(id)
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "user",
        content: id,
      },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Picking up where we left off. Want me to recap the last few points, or jump straight into the next step?",
      },
    ])
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      <ChatSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        activeId={activeId}
        onSelect={handlePickRecent}
        onNewChat={newChat}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-4 py-3">
          <Button variant="ghost" size="sm" className="gap-1 rounded-full">
            <span className="font-medium">Lumen Sonnet 4.6</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Share2 className="mr-1 size-4" />
              Share
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <Welcome onPick={(p) => send(p)} />
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
              {messages.map((m) => (
                <Message key={m.id} message={m} />
              ))}
              {pending && <TypingIndicator />}
            </div>
          )}
        </div>

        <Composer
          value={input}
          onChange={setInput}
          onSend={() => send()}
          disabled={pending}
        />
      </div>
    </div>
  )
}
