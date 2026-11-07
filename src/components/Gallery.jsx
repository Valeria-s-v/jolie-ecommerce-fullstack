import Card from './Card'

function Gallery({ productos }) {
  if (productos.length === 0) {
    return <p role="status" className="sin-resultados">No se encontraron productos.</p>
  }

  return (
    <div className="product-grid2">
      {productos.map((p) => (
        <Card
          key={p.id}
          nombre={p.name}
          precio={p.price}
          imagen={p.image}
          categoria={p.category}
        />
      ))}
    </div>
  )
}

export default Gallery
