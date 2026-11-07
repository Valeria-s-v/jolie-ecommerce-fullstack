import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import '../styles/registro.css'

const FORM_INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  contrasena: '',
  repetirContrasena: '',
  terminos: false,
}

// Mismas reglas que valida la API, para avisar antes de enviar
const validar = (form) => {
  if (!form.nombre.trim() || !form.apellido.trim()) return 'Completá tu nombre y apellido'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Ingresá un email válido'
  if (form.contrasena.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  if (form.contrasena !== form.repetirContrasena) return 'Las contraseñas no coinciden'
  if (!form.terminos) return 'Tenés que aceptar los términos y condiciones'
  return ''
}

function Registro() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [verContrasena, setVerContrasena] = useState(false)
  const [verRepetir, setVerRepetir] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { usuario, registro } = useAuth()
  const navigate = useNavigate()

  // Con sesión iniciada no se muestra el registro
  if (usuario && !enviando) return <Navigate to="/" replace />

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleReset = () => {
    setForm(FORM_INICIAL)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mensaje = validar(form)
    setError(mensaje)
    if (mensaje) return

    setEnviando(true)
    try {
      // El servidor crea el usuario (siempre con rol "user") y después se inicia sesión
      await registro(
        `${form.nombre.trim()} ${form.apellido.trim()}`,
        form.email.trim(),
        form.contrasena
      )
      navigate('/', { state: { bienvenida: true } })
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <main id="registro" className="registro-main">

      <h1>Registrarse</h1>

      <section id="formulario-registro" className="form-container" aria-label="Formulario de registro">
        <form id="form" onSubmit={handleSubmit} noValidate>

          <fieldset>
            <legend className="visually-hidden">Datos personales</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre*</label>
                <input type="text" id="nombre" name="nombre" required
                  placeholder="Nombre" value={form.nombre} onChange={handleChange}
                  autoComplete="given-name" />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido*</label>
                <input type="text" id="apellido" name="apellido" required
                  placeholder="Apellido" value={form.apellido} onChange={handleChange}
                  autoComplete="family-name" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" name="email" required
                placeholder="tu@email.com" value={form.email} onChange={handleChange}
                autoComplete="email" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="visually-hidden">Contraseña</legend>
            <div className="form-row">
              <div className="form-group password-group">
                <label htmlFor="contrasena">Contraseña* (mínimo 6 caracteres)</label>
                <div className="password-input">
                  <input type={verContrasena ? 'text' : 'password'}
                    id="contrasena" name="contrasena" required minLength={6}
                    placeholder="Contraseña" value={form.contrasena} onChange={handleChange}
                    autoComplete="new-password" />
                  <button type="button" className="toggle-password"
                    onClick={() => setVerContrasena(!verContrasena)}
                    aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                    <i className={`fa-solid ${verContrasena ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="form-group password-group">
                <label htmlFor="repetirContrasena">Repetir contraseña*</label>
                <div className="password-input">
                  <input type={verRepetir ? 'text' : 'password'}
                    id="repetirContrasena" name="repetirContrasena" required
                    placeholder="Repetir contraseña"
                    value={form.repetirContrasena} onChange={handleChange}
                    autoComplete="new-password" />
                  <button type="button" className="toggle-password"
                    onClick={() => setVerRepetir(!verRepetir)}
                    aria-label={verRepetir ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                    <i className={`fa-solid ${verRepetir ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="form-check">
            <input type="checkbox" id="terminos" name="terminos"
              required checked={form.terminos} onChange={handleChange} />
            <label className="form-check-label" htmlFor="terminos">
              Acepto los términos y condiciones*
            </label>
          </div>

          {error && <p role="alert" className="error-mensaje">{error}</p>}

          <div className="form-group button-container">
            <button className="btn btn-primary" type="submit" disabled={enviando}>
              {enviando ? 'Creando cuenta...' : 'Registrarse'}
            </button>
            <button className="btn btn-danger" type="button" onClick={handleReset} disabled={enviando}>
              Limpiar Formulario
            </button>
          </div>

          <div className="login-link">
            <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión acá</Link></p>
          </div>

        </form>
      </section>
    </main>
  )
}

export default Registro
