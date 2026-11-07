import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import logoOficial from '../assets/img/logo-oficial.png'

function Navbar() {
  const [busquedaVisible, setBusquedaVisible] = useState(false)
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleBusqueda = (e) => {
    if (e.key === 'Enter' && textoBusqueda.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(textoBusqueda.trim())}`)
      setBusquedaVisible(false)
      setTextoBusqueda('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logoOficial} alt="Logo de Jolie" className="logo" />
        </Link>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>

        {busquedaVisible && (
          <input
            type="search"
            className="buscador-navbar"
            placeholder="Buscar..."
            aria-label="Buscar productos"
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onKeyDown={handleBusqueda}
            autoFocus
          />
        )}

        <div className="header-icons">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setBusquedaVisible(!busquedaVisible)}
            aria-label="Mostrar buscador"
            aria-expanded={busquedaVisible}
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>

          {usuario ? (
            <button type="button" className="icon-btn usuario-nombre" onClick={handleLogout}>
              Hola, {usuario.name.split(' ')[0]} | Salir
            </button>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Iniciar sesión">
              <i className="fa-solid fa-user" aria-hidden="true"></i>
            </Link>
          )}

          <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
