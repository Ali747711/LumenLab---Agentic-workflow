import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { updateProfile } from "firebase/auth"
import {
  ArrowLeft,
  Check,
  Copy,
  LogOut,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SectionLabel } from "@/components/section-label"
import { useAuth } from "@/lib/auth-context"
import { auth } from "@/lib/firebase"

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState(user?.displayName ?? "")
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  if (!user) return null

  const initials = (user.displayName || user.email || "U")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const provider = user.providerData[0]?.providerId ?? "password"
  const providerLabel =
    provider === "google.com" ? "Google" : provider === "github.com" ? "GitHub" : "Email + password"

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) return
    setSaving(true)
    await updateProfile(auth.currentUser, { displayName })
    setSavedAt(Date.now())
    setSaving(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/", { replace: true })
  }

  const copyUid = async () => {
    await navigator.clipboard.writeText(user.uid)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="text-base font-bold tracking-tight">lumen</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                v0.42
              </span>
            </Link>
            <Link
              to="/app/chat"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              back to app
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <SectionLabel index="@" label="Profile" />

        <div className="mt-12 flex flex-col items-start gap-6 border-b pb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="size-20 rounded-none border">
              {user.photoURL && <AvatarImage src={user.photoURL} alt="" />}
              <AvatarFallback className="rounded-none bg-foreground text-background text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {user.displayName || "Unnamed user"}
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                {user.email}
                {user.emailVerified ? (
                  <span className="ml-1 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-3" />
                    verified
                  </span>
                ) : (
                  <span className="ml-1 text-clay">unverified</span>
                )}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-none gap-2 border-foreground/15 hover:border-foreground/40"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          <section className="md:col-span-7">
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-clay">[01]</span> // Profile details
            </h2>
            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="displayName"
                  className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Display name
                </Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should we call you?"
                  className="h-11 rounded-none border-foreground/15 focus-visible:border-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emailField"
                  className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="emailField"
                  value={user.email ?? ""}
                  readOnly
                  className="h-11 rounded-none border-foreground/15 bg-muted/30 text-muted-foreground"
                />
                <p className="text-[11px] text-muted-foreground">
                  Locked. Contact support to change your sign-in email.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={saving || displayName === (user.displayName ?? "")}
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
                {savedAt && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3" /> saved
                  </span>
                )}
              </div>
            </form>
          </section>

          <aside className="md:col-span-5 md:border-l md:pl-12">
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-clay">[02]</span> // Account
            </h2>
            <dl className="mt-6 divide-y border-y">
              <Row label="Sign-in method" value={providerLabel} />
              <Row
                label="Created"
                value={fmt(user.metadata.creationTime)}
              />
              <Row
                label="Last sign-in"
                value={fmt(user.metadata.lastSignInTime)}
              />
              <div className="flex items-center justify-between py-3">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  User ID
                </dt>
                <dd className="flex items-center gap-2">
                  <span className="font-mono text-xs">
                    {user.uid.slice(0, 8)}…{user.uid.slice(-4)}
                  </span>
                  <button
                    onClick={copyUid}
                    className="text-muted-foreground transition hover:text-foreground"
                    aria-label="Copy user ID"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Danger zone
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Deleting your account removes all workflows, runs, and audit
                logs. This is permanent.
              </p>
              <button
                disabled
                className="mt-4 cursor-not-allowed text-sm font-bold text-clay/60 underline-offset-4 hover:underline disabled:no-underline"
              >
                Delete account →
              </button>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Coming soon. Email{" "}
                <a href="mailto:support@lumen.run" className="underline">
                  support
                </a>{" "}
                in the meantime.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm">{value}</dd>
    </div>
  )
}

function fmt(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}
