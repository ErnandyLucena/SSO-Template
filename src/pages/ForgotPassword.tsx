import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://sso.seudominio.com/reset-password"
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Email enviado para redefinição de senha")
  }

  return (
    <div>
      <h2>Redefinir senha</h2>

      <input
        placeholder="Seu email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>
        Enviar email
      </button>
    </div>
  )
}
