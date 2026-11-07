import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Registro from './pages/Registro'
import Catalogo from './pages/Catalogo'
import Login from './pages/Login'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './styles/style.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
