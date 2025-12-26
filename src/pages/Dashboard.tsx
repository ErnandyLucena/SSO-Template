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

      
      if (data.session.access_token) {
        localStorage.setItem("loginToken", data.session.access_token)
      }
    }

    loadSession()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  function acessarClinica(id: string) {
    
    supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      if (!data.session) return

      const token = data.session.access_token

      window.location.href =
        `https://app-clinica.com/login?ssoToken=${token}&clinica=${id}`
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">SSO Dashboard</h2>

        <div className="space-y-1">
          <p className="text-slate-700"><strong>Email:</strong> {email}</p>
          <p className="text-slate-700"><strong>Papel global:</strong> {papel}</p>
        </div>

        <hr />

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Clínicas disponíveis</h3>
          {clinicas.length === 0 ? (
            <p className="text-slate-500">Você não possui clínicas vinculadas.</p>
          ) : (
            <ul className="space-y-2">
              {clinicas.map(c => (
                <li key={c.id_clinica} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                  <span>
                    <span className="font-medium">Clínica {c.id_clinica}</span> <span className="text-slate-500">— papel: {c.papel}</span>
                  </span>
                  <button
                    className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={() => acessarClinica(c.id_clinica)}
                  >
                    Acessar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <hr />

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
