// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos nuestros componentes de página
import Navbar from './components/Navbar';
import Home from './components/Home';
import Perfil from './components/Perfil';
import Detalles from './components/Detalles';

function App() {
  return (
    <BrowserRouter>
      {/* La barra de navegación estará visible en TODAS las páginas */}
      <Navbar />

      {/* Aquí definimos qué componente mostrar para cada ruta */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/detalles/:proyecto" element={<Detalles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;