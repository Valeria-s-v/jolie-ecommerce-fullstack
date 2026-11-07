import { useState, useEffect, useCallback, useMemo } from 'react'
import { AuthContext } from './authContext'
import { loginUsuario, registrarUsuario, SESSION_KEY } from '../services/api'

// Lee la fecha de vencimiento (exp) que trae el JWT, en milisegundos
const vencimientoDelToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.exp * 1000
  } catch {
    return 0
  }
}

// Recupera la sesión guardada solo si el token sigue vigente
const leerSesion = () => {
  try {
    const sesion = JSON.parse(localStorage.getItem(SESSION_KEY))
    if (sesion?.token && vencimientoDelToken(sesion.token) > Date.now()) return sesion
  } catch {
    // sesión corrupta: se ignora
  }
  localStorage.removeItem(SESSION_KEY)
  return null
}

function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion)

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSesion(null)
  }, [])

  const login = useCallback(async (email, password) => {
    const { token, usuario } = await loginUsuario(email, password)
    // Se guarda el token y los datos públicos. La contraseña nunca se guarda.
    const nueva = { token, usuario }
    localStorage.setItem(SESSION_KEY, JSON.stringify(nueva))
    setSesion(nueva)
    return usuario
  }, [])

  // Registra y, si sale bien, inicia sesión con los mismos datos
  const registro = useCallback(async (name, email, password) => {
    await registrarUsuario(name, email, password)
    return login(email, password)
  }, [login])

  // Cierra la sesión cuando el token vence o la API responde 401
  useEffect(() => {
    window.addEventListener('sesionVencida', logout)
    if (!sesion) return () => window.removeEventListener('sesionVencida', logout)
    const restante = vencimientoDelToken(sesion.token) - Date.now()
    const timer = setTimeout(logout, Math.max(restante, 0))
    return () => {
      clearTimeout(timer)
      window.removeEventListener('sesionVencida', logout)
    }
  }, [sesion, logout])

  const valor = useMemo(
    () => ({ usuario: sesion?.usuario || null, login, registro, logout }),
    [sesion, login, registro, logout]
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default AuthProvider
