import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ResetPassword() {
  const [password, setPassword] = useState("")

  async function handleUpdate() {
    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Senha atualizada com sucesso")
  }

  return (
    <div>
      <h2>Nova senha</h2>

      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleUpdate}>
        Atualizar senha
      </button>
    </div>
  )
}
