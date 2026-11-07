import { useState } from 'react'
import '../styles/contact.css'

function Contact() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Por ahora el mensaje no se envía a ningún servidor (pendiente: endpoint de contacto)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre.trim() || !form.mensaje.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError('Completá tu nombre, un email válido y el mensaje')
      return
    }
    setError('')
    setEnviado(true)
    setTimeout(() => setEnviado(false), 4000)
    handleReset()
  }

  const handleReset = () => {
    setForm({
      nombre: '',
      email: '',
      mensaje: ''
    })
  }

  return (
    <main id="contacto" className="contacto-main">
      <h1>Contacto</h1>
      <p>¿Tenés alguna duda o consulta? Escribinos.</p>

      {enviado && (
        <div role="status" className="alerta-exito">
          <i className="fa-solid fa-circle-check" aria-hidden="true"></i> ¡Mensaje enviado correctamente!
        </div>
      )}

      <section className="form-container" aria-label="Formulario de contacto">
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="nombre">Nombre*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje*</label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              placeholder="Escribí tu consulta..."
              value={form.mensaje}
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>

          {error && <p role="alert" className="error-mensaje">{error}</p>}

          <div className="form-group button-container">
            <button className="btn btn-primary" type="submit">Enviar mensaje</button>
            <button className="btn btn-danger" type="button" onClick={handleReset}>
              Limpiar Formulario
            </button>
          </div>

        </form>
      </section>
    </main>
  )
}

export default Contact
