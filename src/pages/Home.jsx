import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import useProducts from '../hooks/useProducts'
import banner2 from '../assets/img/banner2.png'
import bannerHome from '../assets/img/banner-home.jpg'
import banner3 from '../assets/img/banner3.png'
import summer from '../assets/img/summer.jpg'
import springCollection from '../assets/img/Springcollection.png'
import accesorios from '../assets/img/accesorios.png'

function Home() {
  // Tendencias: los productos marcados como destacados (highlighted) en la base
  const { products, loading, error } = useProducts()
  const tendencias = products.filter((p) => p.highlighted).slice(0, 3)
  // Viene desde el registro: se muestra el mensaje de bienvenida
  const { state } = useLocation()

  return (
    <main id="inicio">
      {state?.bienvenida && (
        <div role="status" className="alerta-exito">
          <i className="fa-solid fa-circle-check" aria-hidden="true"></i> ¡Cuenta creada exitosamente! Bienvenida a Jolie.
        </div>
      )}

      {/* Sección Hero - Carousel */}
      <section id="hero" aria-label="Banner principal">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Imagen 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Imagen 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Imagen 3"></button>
          </div>
          <div className="carousel-inner">
            <article className="carousel-item active">
              <img src={banner2} className="d-block w-100" alt="Poster de la tienda Jolie" />
              <div className="carousel-caption d-none d-md-block">
                <h2>OTOÑO/VERANO</h2>
                <p>Explorá nuestra nueva temporada y encontrá tus favoritos.</p>
              </div>
            </article>
            <article className="carousel-item">
              <img src={bannerHome} className="d-block w-100" alt="Temporada de otoño en Jolie" />
              <div className="carousel-caption d-none d-md-block">
                <h2>¡Todo lo que está bien!</h2>
                <p>Lo último en moda, seleccionados especialmente para vos.</p>
              </div>
            </article>
            <article className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="Moda de invierno en Jolie" />
              <div className="carousel-caption d-none d-md-block">
                <h2>Tu estilo, tu esencia.</h2>
                <p>Porque al final del día, solo importás vos.</p>
              </div>
            </article>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      {/* Sección Acceso Rápido */}
      <section id="acceso-rapido" aria-label="Acceso rápido a categorías">
        <div className="acceso-rapido">
          <article className="image-container">
            <img src={summer} alt="Promoción verano 30% OFF" />
            <div className="image-text">
              <h2>30% OFF</h2>
              <p>Verano</p>
            </div>
          </article>
          <article className="image-container">
            <img src={springCollection} alt="Nueva colección primavera" />
            <div className="image-text">
              <h2>Colección</h2>
            </div>
          </article>
          <article className="image-container">
            <img src={accesorios} alt="Nuevos accesorios" />
            <div className="image-text">
              <h2>Nuevos</h2>
              <p>Accesorios</p>
            </div>
          </article>
        </div>
      </section>

      {/* Sección Tendencias */}
      <section id="tendencias" aria-label="Tendencias 2026">
        <div className="contenedor-titulo-tendencia">
          <h2 className="text-center">Tendencia 2026</h2>
        </div>
        <div className="container">
          {loading && <p role="status" className="text-center">Cargando tendencias...</p>}
          {error && <p role="alert" className="text-center">{error}</p>}
          <div className="product-grid">
            {tendencias.map((producto) => (
              <Card
                key={producto.id}
                nombre={producto.name}
                precio={producto.price}
                imagen={producto.image}
                categoria={producto.category}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
