import { Link } from "react-router-dom"
import {
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Search,
  Settings,
  Folder,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const recents = [
  "Brainstorm Q3 launch headline",
  "Review onboarding flow copy",
  "Refactor billing webhook handler",
  "Draft investor update — April",
  "Plan team offsite agenda",
  "Summarize Stripe API changelog",
  "Compare vector DB options",
  "Write SQL for cohort retention",
]

const projects = ["Marketing site", "Internal tools", "Investor docs"]

type Props = {
  collapsed: boolean
  onToggle: () => void
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({
  collapsed,
  onToggle,
  activeId,
  onSelect,
  onNewChat,
}: Props) {
  return (
    <aside
      className={cn(
        "flex h-svh shrink-0 flex-col border-r bg-muted/30 transition-[width] duration-200",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex items-center justify-between p-3">
        <Link
          to="/"
          className={cn(
            "flex items-baseline gap-2",
            collapsed && "justify-center"
          )}
        >
          <span className="text-base font-bold tracking-tight">lumen</span>
          {!collapsed && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              v0.42
            </span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={onToggle}
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="px-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-full"
            onClick={onToggle}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <div className="px-3">
        <Button
          onClick={onNewChat}
          className={cn(
            "w-full gap-2 rounded-none bg-foreground text-background hover:bg-foreground/90",
            collapsed && "size-10 p-0 [&>span]:hidden"
          )}
        >
          <MessageSquarePlus className="size-4" />
          <span>New chat</span>
        </Button>
      </div>

      {!collapsed && (
        <>
          <div className="mt-4 px-3">
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm text-muted-foreground">
              <Search className="size-3.5" />
              <span>Search chats…</span>
            </div>
          </div>

          <div className="mt-6 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Projects
          </div>
          <ul className="mt-1 px-2">
            {projects.map((p) => (
              <li key={p}>
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  <Folder className="size-3.5" />
                  {p}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recents
          </div>
          <ScrollArea className="mt-1 flex-1 px-2">
            <ul className="space-y-0.5 pb-4">
              {recents.map((title) => {
                const id = title
                const active = activeId === id
                return (
                  <li key={id}>
                    <button
                      onClick={() => onSelect(id)}
                      className={cn(
                        "flex w-full items-center rounded-lg px-2 py-1.5 text-left text-sm transition",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        </>
      )}

      <UserBlock collapsed={collapsed} />
    </aside>
  )
}

function UserBlock({ collapsed }: { collapsed: boolean }) {
  const { user } = useAuth()
  const name = user?.displayName || user?.email?.split("@")[0] || "Guest"
  const initials = name
    .split(/[\s.@_-]+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="mt-auto border-t p-3">
      <Link
        to="/app/profile"
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-muted",
          collapsed && "justify-center px-0"
        )}
      >
        <Avatar className="size-7">
          {user?.photoURL && <AvatarImage src={user.photoURL} alt="" />}
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email ?? "Pro plan"}
            </p>
          </div>
        )}
        {!collapsed && <Settings className="size-4 text-muted-foreground" />}
      </Link>
    </div>
  )
}
