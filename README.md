# Tienda Jolie — Ecommerce fullstack

Versión fullstack de la tienda **Jolie** (ropa y accesorios). El frontend en React consume la API propia [**julie-api**](https://github.com/Valeria-s-v/julie-api) (Node.js, Express y MongoDB Atlas), con registro e inicio de sesión mediante JWT.

> Este proyecto nace de mi primer front, [jolie-ecommerce-react](https://github.com/Valeria-s-v/jolie-ecommerce-react), que dejo sin cambios como registro de mis comienzos. Acá está la evolución: datos reales desde una API, sesión segura y buenas prácticas.

## Tecnologías

- **React 19** con **Vite**
- **React Router DOM 7**: navegación entre páginas
- **Context API**: manejo de la sesión del usuario
- **Bootstrap 5** y **Font Awesome** (por CDN)
- **julie-api** como backend (REST + JWT)

## Estructura

```
src/
├── components/   Navbar, Footer, Card, Gallery, Layout
├── context/      AuthProvider: sesión (token y datos públicos del usuario)
├── hooks/        useProducts, useAuth
├── pages/        Home, Catalogo, Registro, Login, Contact, NotFound
├── services/     api.js: única puerta de entrada a la API
├── styles/       CSS
└── assets/       Imágenes
```

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

1. Clonar e instalar:

   ```bash
   git clone https://github.com/Valeria-s-v/jolie-ecommerce-fullstack.git
   cd jolie-ecommerce-fullstack
   npm install
   ```

2. Crear un archivo `.env` a partir de `.env.example` con la URL de la API:

   ```
   VITE_API_URL=http://localhost:3000
   ```

   Para usar la API publicada: `VITE_API_URL=https://julie-api.vercel.app`

3. Si usás la API en local, levantala en otra terminal (ver el README de [julie-api](https://github.com/Valeria-s-v/julie-api)).

4. Iniciar el front:

   ```bash
   npm run dev
   ```

   Abre en `http://localhost:5173`.

Otros comandos: `npm run build` (versión de producción), `npm run preview` (probar el build), `npm run lint` (revisar el código).

## Páginas

| Ruta         | Descripción                                                  |
| ------------ | ------------------------------------------------------------ |
| `/`          | Inicio, con los productos destacados traídos de la API       |
| `/catalogo`  | Catálogo con búsqueda (`?q=`), filtros y orden por precio    |
| `/registro`  | Crear cuenta (`POST /api/users/register`)                    |
| `/login`     | Iniciar sesión (`POST /api/users/login`)                     |
| `/contacto`  | Formulario de contacto                                       |

## Seguridad y buenas prácticas

- **La contraseña nunca se guarda en el navegador.** Se envía a la API, que la verifica con bcrypt y devuelve un JWT.
- Se guarda solo el token y los datos públicos del usuario (nombre, email, rol). La sesión se cierra sola cuando el token vence o la API responde `401`.
- La URL de la API sale de una variable de entorno (`VITE_API_URL`); no hay direcciones fijas en el código.
- Todas las llamadas a la API pasan por `src/services/api.js`, que traduce los datos (`_id` → `id`, categoría poblada → nombre) y unifica el manejo de errores.
- Validaciones en el formulario (mismas reglas que la API) y mensajes de error en pantalla.
- Accesibilidad: botones reales para las acciones, `aria-label` en los íconos y mensajes con `role="alert"` / `role="status"`.

**Decisión de diseño sobre el token:** se guarda en `localStorage` y viaja en el encabezado `Authorization: Bearer`, como define la API. La alternativa de cookie `httpOnly` es más resistente a XSS, pero front y API están en dominios distintos y los navegadores bloquean cada vez más esas cookies de terceros. Para compensar, el token vence en 24 horas y no se guarda ningún dato sensible.

## Despliegue

Pensado para **Vercel**: `vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar. En Vercel hay que configurar la variable `VITE_API_URL`.

## A futuro

- Carrito de compras y órdenes.
- Envío real del formulario de contacto.
- Panel de administración para el rol `admin`.
- Detalle de producto y paginación.

---

**Alumna:** Valeria Villegas
