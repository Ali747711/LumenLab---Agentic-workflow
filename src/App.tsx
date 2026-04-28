import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { LandingPage } from "@/pages/landing-page"
import { PricingPage } from "@/pages/pricing-page"
import { ChangelogPage } from "@/pages/changelog-page"
import { ChatPage } from "@/pages/chat-page"
import { LoginPage } from "@/pages/login-page"
import { SignupPage } from "@/pages/signup-page"
import { ForgotPasswordPage } from "@/pages/forgot-password-page"
import { ProfilePage } from "@/pages/profile-page"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="lumen-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/app/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
