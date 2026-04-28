import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

type AuthState = {
  user: User | null
  loading: boolean
  signInEmail: (email: string, password: string) => Promise<void>
  signUpEmail: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>
  signInGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const value: AuthState = {
    user,
    loading,
    signInEmail: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    signUpEmail: async (email, password, displayName) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(cred.user, { displayName })
      }
    },
    signInGoogle: async () => {
      await signInWithPopup(auth, googleProvider)
    },
    resetPassword: async (email) => {
      await sendPasswordResetEmail(auth, email)
    },
    logout: async () => {
      await signOut(auth)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function friendlyAuthError(err: unknown): string {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: unknown }).code)
      : ""
  switch (code) {
    case "auth/invalid-email":
      return "That email looks malformed."
    case "auth/user-disabled":
      return "This account has been disabled."
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is incorrect."
    case "auth/email-already-in-use":
      return "An account already exists for that email."
    case "auth/weak-password":
      return "Password must be at least 6 characters."
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled."
    case "auth/network-request-failed":
      return "Network error. Check your connection."
    case "auth/too-many-requests":
      return "Too many attempts. Try again in a moment."
    default:
      return "Something went wrong. Try again."
  }
}
