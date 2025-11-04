// src/components/ListaUsuarios.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// 1. Recibimos 'usuarios' y 'setUsuarios' como props desde App.jsx
function ListaUsuarios({ usuarios, setUsuarios }) {

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Gestión de Usuarios</h1>
      
      {/* 2. Enlace para navegar a la página de creación */}
      <Link to="/crear">
        <button style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}>
          Crear Nuevo Usuario +
        </button>
      </Link>

      {/* 3. Renderizamos la lista usando .map() */}
      {usuarios.map(usuario => (
        <div key={usuario.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0 }}><strong>{usuario.nombre}</strong></p>
            <p style={{ margin: 0, color: '#555' }}>{usuario.correo}</p>
          </div>
          <div>
            {/* 4. Enlace para editar cada usuario */}
            <Link to={`/editar/${usuario.id}`} style={{ marginRight: '0.5rem' }}>
              Editar
            </Link>
            
            {/* 5. Botón para eliminar cada usuario */}
            <button onClick={() => {
              const confirmar = window.confirm('¿Estás seguro?');
              if (confirmar) {
                setUsuarios(usuarios.filter(u => u.id !== usuario.id));
              }
            }}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaUsuarios;