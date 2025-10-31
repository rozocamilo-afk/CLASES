// src/components/Perfil.jsx
import { useParams } from 'react-router-dom';

function Perfil() {
  // Usamos el hook useParams para acceder a los parámetros de la URL
  const { id } = useParams(); // La variable { id } debe coincidir con el :id de la ruta

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Perfil de Usuario</h1>
      <p>ID del usuario: <strong>{id}</strong></p>
      
      <div style={{ marginTop: '1rem' }}>
        <h3>Información Personal</h3>
        {/* Un pequeño truco para mostrar el nombre más bonito */}
        <p>Nombre: <span style={{ textTransform: 'capitalize' }}>{id.replace('-', ' ')}</span></p>
        <p>Especialidad: React Developer</p>
      </div>
    </div>
  );
}

export default Perfil;