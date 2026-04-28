import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth-context"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-clay">$</span> verifying session…
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
