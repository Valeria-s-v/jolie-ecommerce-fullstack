import { useState, useEffect } from 'react'
import { obtenerProductos } from '../services/api'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Si el componente se desmonta antes de que llegue la respuesta, se cancela
    const controller = new AbortController()

    obtenerProductos({ signal: controller.signal })
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { products, loading, error }
}

export default useProducts
