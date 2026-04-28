import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OAuthRow, OrDivider } from "@/components/auth/oauth-row"
import { useAuth, friendlyAuthError } from "@/lib/auth-context"

type LocationState = { from?: string }

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signInEmail, signInGoogle } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<"email" | "google" | null>(null)

  const dest = (location.state as LocationState | null)?.from ?? "/app/chat"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending("email")
    try {
      await signInEmail(email, password)
      navigate(dest, { replace: true })
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
      navigate(dest, { replace: true })
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setPending(null)
    }
  }

  return (
    <AuthLayout
      prompt="./login"
      title="Welcome back."
      subtitle="Sign in to pick up where your last run left off."
      asideQuote="The replay feature is unfair. I sent a broken run URL to my coworker. He fixed it in 4 minutes."
      asideAttribution="Morgan Tatum"
      asideRole="Staff Engineer · Polaris"
      footerText="No account yet?"
      footerLink={{ to: "/signup", label: "Create one" }}
    >
      <OAuthRow onGoogle={handleGoogle} pending={pending === "google"} />
      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorAlert message={error} />}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            Email
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
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-[11px] uppercase tracking-[0.2em] text-clay hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Button
          type="submit"
          disabled={pending !== null}
          className="group h-11 w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          {pending === "email" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        SOC 2 Type II · Encrypted at rest
      </div>
    </AuthLayout>
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
