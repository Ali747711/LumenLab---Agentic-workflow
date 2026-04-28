import { Link, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const links = [
  { label: "Product", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Docs", href: "#" },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="text-base font-bold tracking-tight">lumen</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              v0.42
            </span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.href}
                  end={l.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 text-[13px] transition",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </a>
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="rounded-none">
            <Link to="/app/chat">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to="/app/chat">$ ./start →</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
