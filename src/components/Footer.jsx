import { Link } from 'react-router-dom'
import '../styles/footer.css'

function Footer() {
  return (
    <footer>
      <ul className="footer-nav">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
      </ul>

      <div className="footer-redes">
        <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Jolie">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="https://www.instagram.com/jolie" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Jolie">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>

      <p>&copy; 2026 Jolie. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer