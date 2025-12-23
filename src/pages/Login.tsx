import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    navigate("/dashboard")
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

      <a href="/forgot-password">Esqueci minha senha</a>
    </form>
  )
}
