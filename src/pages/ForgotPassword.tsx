import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password"
    })
    setLoading(false)
    if (error) {
      alert(error.message)
      return
    }
    alert("Email enviado para redefinição de senha")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Redefinir senha
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar email"}
        </button>

        <div className="text-center">
          <a
            href="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Voltar para login
          </a>
        </div>
      </form>
    </div>
  )
}
