import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Gallery from '../components/Gallery'
import useProducts from '../hooks/useProducts'
import '../styles/catalogo.css'

// Categorías de la base que se agrupan en cada filtro
const CATEGORIAS_ACCESORIOS = ['accesorios']
const CATEGORIAS_CALZADO = ['zapatos']

function Catalogo() {
  const { products, loading, error } = useProducts()
  // La búsqueda vive en la URL (?q=...): así funciona el buscador del navbar y se puede compartir el link
  const [searchParams, setSearchParams] = useSearchParams()
  const busqueda = searchParams.get('q') || ''
  const [filtro, setFiltro] = useState('Todos')
  const [orden, setOrden] = useState('')

  const handleBusqueda = (e) => {
    const valor = e.target.value
    setSearchParams(valor ? { q: valor } : {}, { replace: true })
  }

  if (loading) return <p role="status" className="catalogo-mensaje">Cargando productos...</p>
  if (error) return <p role="alert" className="catalogo-mensaje">{error}</p>

  let productosFiltrados = products.filter((p) => {
    const categoria = p.category.toLowerCase()
    const coincideBusqueda = p.name.toLowerCase().includes(busqueda.trim().toLowerCase())
    const coincideFiltro =
      filtro === 'Todos' ||
      (filtro === 'Accesorios' && CATEGORIAS_ACCESORIOS.includes(categoria)) ||
      (filtro === 'Calzado' && CATEGORIAS_CALZADO.includes(categoria)) ||
      (filtro === 'Ropa' && ![...CATEGORIAS_ACCESORIOS, ...CATEGORIAS_CALZADO].includes(categoria))
    return coincideBusqueda && coincideFiltro
  })

  if (orden === 'menor') productosFiltrados = [...productosFiltrados].sort((a, b) => a.price - b.price)
  if (orden === 'mayor') productosFiltrados = [...productosFiltrados].sort((a, b) => b.price - a.price)

  return (
    <main id="catalogo" className="catalogo">

      <section id="catalogo-header" className="catalogo-header" aria-label="Encabezado del catálogo">
        <h1>Catálogo</h1>
        <p>Explorá toda nuestra colección</p>
      </section>

      <section id="catalogo-controles" className="productos-controles" aria-label="Filtros y búsqueda">
        <div className="controles-top">
          <label htmlFor="buscador" className="visually-hidden">Buscar productos</label>
          <input
            id="buscador"
            type="search"
            className="buscador"
            placeholder="🔍 Buscar productos..."
            value={busqueda}
            onChange={handleBusqueda}
          />
          <label htmlFor="ordenar" className="visually-hidden">Ordenar productos</label>
          <select
            id="ordenar"
            className="ordenar"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Ordenar por</option>
            <option value="menor">Menor precio</option>
            <option value="mayor">Mayor precio</option>
          </select>
        </div>
        <nav id="filtros-categorias" className="filtros" aria-label="Filtrar por categoría">
          {['Todos', 'Ropa', 'Accesorios', 'Calzado'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`filtro-btn ${filtro === cat ? 'active' : ''}`}
              onClick={() => setFiltro(cat)}
              aria-pressed={filtro === cat}
            >
              {cat}
            </button>
          ))}
        </nav>
      </section>

      <section id="listado-productos" className="productos" aria-label="Catálogo de productos">
        <Gallery productos={productosFiltrados} />
      </section>

    </main>
  )
}

export default Catalogo