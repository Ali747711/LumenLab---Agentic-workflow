import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, Mail, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useAuth, friendlyAuthError } from "@/lib/auth-context"

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setError(null)
    setPending(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthLayout
      prompt="./reset"
      title={sent ? "Check your inbox." : "Reset your password."}
      subtitle={
        sent
          ? "If an account exists, a reset link is on its way. It expires in 30 minutes."
          : "Enter the email tied to your workspace. We'll send a one-time link."
      }
      asideQuote="First SaaS where the docs actually match the product. Refreshing."
      asideAttribution="Ava Levin"
      asideRole="Eng Lead · Helix"
      footerText={sent ? "Wrong email?" : "Remembered it?"}
      footerLink={{
        to: sent ? "#" : "/login",
        label: sent ? "Try another" : "Back to sign in",
      }}
    >
      {sent ? (
        <SentState email={email} onReset={() => setSent(false)} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-3 border border-clay/40 bg-clay/5 p-3 text-[13px]">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-clay" />
              <p>{error}</p>
            </div>
          )}

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

          <Button
            type="submit"
            disabled={pending}
            className="group h-11 w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-0.5" />
              </>
            )}
          </Button>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Reset links expire after 30 minutes. If you don't receive one,
            check spam or{" "}
            <Link to="#" className="text-foreground underline">
              contact support
            </Link>
            .
          </p>
        </form>
      )}
    </AuthLayout>
  )
}

function SentState({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3 border bg-muted/30 p-4">
        <span className="grid size-9 shrink-0 place-items-center bg-foreground text-background">
          <Check className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Sent to
          </p>
          <p className="truncate font-bold">{email}</p>
        </div>
      </div>

      <ol className="mt-8 space-y-4 border-t pt-6 text-[14px]">
        {[
          "Open the email from no-reply@lumen.run.",
          "Click the reset link — it's good for 30 minutes.",
          "Pick a new password. Done.",
        ].map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="text-clay font-bold tabular-nums">
              0{i + 1}
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 text-[13px]">
        <a
          href={`https://mail.google.com/mail/u/0/#search/from%3Ano-reply%40lumen.run`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-bold transition hover:gap-3"
        >
          <Mail className="size-4" />
          Open Gmail
          <ArrowRight className="size-4" />
        </a>
        <button
          onClick={onReset}
          className="text-muted-foreground transition hover:text-foreground"
        >
          <span className="text-clay">→</span> resend link
        </button>
      </div>
    </div>
  )
}
