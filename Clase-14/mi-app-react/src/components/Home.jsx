// src/components/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido a Mi Portfolio</h1>
      <p>Desarrollador Frontend especializado en React</p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/perfil/Juan-developer" style={{ marginRight: '1rem' }}>
          Ver mi perfil
        </Link>
        <br />
        <Link to="/detalles/ecommerce-react" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Ver mis proyectos
        </Link>
      </div>
    </div>
  );
}

export default Home;