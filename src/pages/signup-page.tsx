import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OAuthRow, OrDivider } from "@/components/auth/oauth-row"
import { useAuth, friendlyAuthError } from "@/lib/auth-context"

const checks = [
  "10,000 step executions / mo · free forever",
  "No credit card required",
  "5-minute setup · ship your first workflow today",
]

export function SignupPage() {
  const navigate = useNavigate()
  const { signUpEmail, signInGoogle } = useAuth()

  const [workspace, setWorkspace] = useState("")
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<"email" | "google" | null>(null)

  const strength = scorePassword(pw)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending("email")
    try {
      await signUpEmail(email, pw, workspace || undefined)
      navigate("/app/chat", { replace: true })
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setPending(null)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setPending("google")
    try {
      await signInGoogle()
      navigate("/app/chat", { replace: true })
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setPending(null)
    }
  }

  return (
    <AuthLayout
      prompt="./start"
      title="Start shipping runs."
      subtitle="Free tier · no credit card · 5-minute setup."
      asideQuote="We saved $14k/mo by deleting our queue infra. That's not even the main feature."
      asideAttribution="Maya Patel"
      asideRole="Head of Platform · Northwind"
      footerText="Already have an account?"
      footerLink={{ to: "/login", label: "Sign in" }}
    >
      <OAuthRow onGoogle={handleGoogle} pending={pending === "google"} />
      <OrDivider label="or with email" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorAlert message={error} />}

        <div className="space-y-2">
          <Label
            htmlFor="workspace"
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            Workspace name
          </Label>
          <Input
            id="workspace"
            required
            placeholder="acme"
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            className="h-11 rounded-none border-foreground/15 focus-visible:border-foreground"
          />
          <p className="text-[11px] text-muted-foreground">
            <span className="text-clay">→</span>{" "}
            {workspace ? `${workspace.toLowerCase()}.lumen.run` : "your-team.lumen.run"}
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            Work email
          </Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-none border-foreground/15 focus-visible:border-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="At least 6 characters"
              className="h-11 rounded-none border-foreground/15 pr-10 focus-visible:border-foreground"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {pw.length > 0 && <StrengthMeter score={strength} />}
        </div>

        <Button
          type="submit"
          disabled={pending !== null}
          className="group h-11 w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          {pending === "email" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-0.5" />
            </>
          )}
        </Button>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link to="#" className="text-foreground underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="#" className="text-foreground underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <ul className="mt-8 space-y-2 border-t pt-6 text-[13px]">
        {checks.map((c) => (
          <li key={c} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-clay" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </AuthLayout>
  )
}

function scorePassword(pw: string) {
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(score, 4)
}

function StrengthMeter({ score }: { score: number }) {
  const labels = ["weak", "weak", "ok", "good", "strong"]
  const color =
    score <= 1 ? "bg-clay" : score === 2 ? "bg-clay/80" : "bg-emerald-500"
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-1 flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={
              "flex-1 transition " + (i < score ? color : "bg-foreground/10")
            }
          />
        ))}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {labels[score]}
      </span>
    </div>
  )
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 border border-clay/40 bg-clay/5 p-3 text-[13px]">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-clay" />
      <p>{message}</p>
    </div>
  )
}
