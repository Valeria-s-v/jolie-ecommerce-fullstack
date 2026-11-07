import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import '../styles/registro.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [verPassword, setVerPassword] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { usuario, login } = useAuth()
  const navigate = useNavigate()

  // Si ya hay sesión iniciada, no tiene sentido mostrar el login
  if (usuario) return <Navigate to="/" replace />

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password) {
      setError('Completá el email y la contraseña')
      return
    }

    setEnviando(true)
    try {
      // La contraseña se verifica en el servidor (bcrypt), nunca en el navegador
      await login(form.email.trim(), form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main id="login" className="registro-main">
      <h1>Iniciar sesión</h1>
      <p className="subtitle">Ingresá tus datos para acceder a tu cuenta</p>

      <section className="form-container" aria-label="Formulario de login">
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Contraseña*</label>
            <div className="password-input">
              <input
                type={verPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setVerPassword(!verPassword)}
                aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <i className={`fa-solid ${verPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {error && <p role="alert" className="error-mensaje">{error}</p>}

          <div className="form-group button-container">
            <button className="btn btn-primary" type="submit" disabled={enviando}>
              {enviando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>

          <div className="login-link">
            <p>¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
          </div>

        </form>
      </section>
    </main>
  )
}

export default Login
