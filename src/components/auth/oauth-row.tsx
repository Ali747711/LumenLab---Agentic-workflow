import { Button } from "@/components/ui/button"

export function OAuthRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="h-11 rounded-none gap-2 border-foreground/15 hover:border-foreground/40"
      >
        <GitHubIcon />
        GitHub
      </Button>
      <Button
        variant="outline"
        className="h-11 rounded-none gap-2 border-foreground/15 hover:border-foreground/40"
      >
        <GoogleIcon />
        Google
      </Button>
    </div>
  )
}

export function OrDivider({ label = "or with email" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.45c-.28 1.46-1.13 2.7-2.4 3.53v2.94h3.88c2.27-2.09 3.56-5.18 3.56-8.71z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.88-2.94c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.04A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.34A7.21 7.21 0 0 1 4.86 12c0-.81.14-1.6.41-2.34V6.62H1.27A12 12 0 0 0 0 12c0 1.94.46 3.78 1.27 5.38l4-3.04z"
      />
      <path
        fill="#EA4335"
        d="M12 4.74c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0A11.99 11.99 0 0 0 1.27 6.62l4 3.04C6.22 6.85 8.87 4.74 12 4.74z"
      />
    </svg>
  )
}
