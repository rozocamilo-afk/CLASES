// src/components/Detalles.jsx
import { useParams, Link } from 'react-router-dom';

function Detalles() {
  const { proyecto } = useParams(); // Obtenemos el parámetro :proyecto de la URL

  // Simulación de una base de datos de proyectos
  const proyectos = {
    'ecommerce-react': 'Tienda Online con React y Redux',
    'portfolio-personal': 'Portfolio Personal Responsivo',
    'blog-gatsby': 'Blog Estático con Gatsby',
    'proyecto-web': 'Proyecto Web con HTML, CSS y JS' // Añadido para el enlace del Navbar
  };

  const descripcionProyecto = proyectos[proyecto] || 'Proyecto no encontrado';

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Detalles del Proyecto</h1>
      <h2>{descripcionProyecto}</h2>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default Detalles;