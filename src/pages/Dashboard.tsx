import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Clinica = {
  id_clinica: string
  papel: string
}

export default function Dashboard() {
  const [email, setEmail] = useState("")
  const [papel, setPapel] = useState("")
  const [clinicas, setClinicas] = useState<Clinica[]>([])

  useEffect(() => {
    async function loadSession() {
      const { data }: { data: { session: any } } = await supabase.auth.getSession()
      

      if (!data.session) return


      const user = data.session.user
      setEmail(user.email ?? "")
      setPapel(user.user_metadata?.papel ?? "user")
      setClinicas(user.user_metadata?.clinicas ?? [])

      // Store token in localStorage
      if (data.session.access_token) {
        localStorage.setItem("loginToken", data.session.access_token)
      }
    }

    loadSession()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  function acessarClinica(id: string) {
    // exemplo: redirecionar passando o token
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      if (!data.session) return

      const token = data.session.access_token

      window.location.href =
        `https://app-clinica.com/login?ssoToken=${token}&clinica=${id}`
    })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>SSO Dashboard</h2>

      <p><strong>Email:</strong> {email}</p>
      <p><strong>Papel global:</strong> {papel}</p>

      <hr />

      <h3>Clínicas disponíveis</h3>

      {clinicas.length === 0 && (
        <p>Você não possui clínicas vinculadas.</p>
      )}

      <ul>
        {clinicas.map(c => (
          <li key={c.id_clinica}>
            Clínica {c.id_clinica} — papel: {c.papel}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => acessarClinica(c.id_clinica)}
            >
              Acessar
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}
