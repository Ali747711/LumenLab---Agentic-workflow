import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { LandingPage } from "@/pages/landing-page"
import { PricingPage } from "@/pages/pricing-page"
import { ChangelogPage } from "@/pages/changelog-page"
import { ChatPage } from "@/pages/chat-page"
import { LoginPage } from "@/pages/login-page"
import { SignupPage } from "@/pages/signup-page"
import { ForgotPasswordPage } from "@/pages/forgot-password-page"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="lumen-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/app/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
