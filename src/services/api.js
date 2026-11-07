// Único lugar del front que sabe cómo hablar con julie-api.
// La URL sale de la variable de entorno VITE_API_URL (ver .env.example).
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

const SESSION_KEY = 'jolieSesion'

// Lee el token guardado (solo el token y datos públicos, nunca la contraseña)
export const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))?.token || null
  } catch {
    return null
  }
}

// Hace la petición y devuelve el JSON, o lanza un Error con el mensaje de la API
async function request(path, { method = 'GET', body, signal } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('No se pudo conectar con el servidor. Probá de nuevo en unos minutos.', { cause: error })
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    // Token vencido o inválido en una ruta protegida: se avisa para cerrar la sesión
    if (res.status === 401 && token) {
      window.dispatchEvent(new Event('sesionVencida'))
    }
    const error = new Error(data?.mensaje || 'Ocurrió un error inesperado')
    error.status = res.status
    throw error
  }
  return data
}

// La API devuelve _id, stock y category como objeto.
// Esta función lo traduce a la forma que usan los componentes.
const adaptarProducto = (p) => ({
  id: p._id,
  name: p.name,
  description: p.description,
  price: Number(p.price) || 0,
  stock: p.stock ?? 0,
  image: p.image,
  highlighted: Boolean(p.highlighted),
  category: p.category?.name || '',
})

export const obtenerProductos = async ({ signal } = {}) => {
  const data = await request('/api/products', { signal })
  return data.map(adaptarProducto)
}

export const loginUsuario = (email, password) =>
  request('/api/users/login', { method: 'POST', body: { email, password } })

export const registrarUsuario = (name, email, password) =>
  request('/api/users/register', { method: 'POST', body: { name, email, password } })

export { SESSION_KEY }
