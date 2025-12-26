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
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Senha
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-semibold hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueci minha senha
          </a>
        </div>
      </form>
    </div>
  )
}
