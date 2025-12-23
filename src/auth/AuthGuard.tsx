import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export function AuthGuard({ children }: { children: React.ReactElement }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)


  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return null

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
