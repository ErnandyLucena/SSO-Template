import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      password
    })
    setLoading(false)
    if (error) {
      alert(error.message)
      return
    }
    alert("Senha atualizada com sucesso")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Nova senha
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Nova senha
          </label>
          <input
            type="password"
            placeholder="Nova senha"
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
                     font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Atualizar senha"}
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
