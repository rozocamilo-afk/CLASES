import React, { useState } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana García', correo: 'ana@email.com' },
    { id: 2, nombre: 'Carlos López', correo: 'carlos@email.com' },
    { id: 3, nombre: 'María Silva', correo: 'maria@email.com' },
  ]);

  // Estados para los inputs del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  
  // Estado para saber qué usuario estamos editando (null si estamos creando)
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  // Lógica para seleccionar y cargar datos para editar
  const handleSelectParaEditar = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setUsuarioAEditar(usuario);
      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
    }
  };

  // Lógica para eliminar un usuario
  const handleDeleteUsuario = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar a este usuario?");
    if (confirmar) {
      const usuariosFiltrados = usuarios.filter(usuario => usuario.id !== id);
      setUsuarios(usuariosFiltrados);
    }
  };

  // Manejador principal del formulario que decide si crear o actualizar
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre.trim() || !correo.trim()) {
      alert("Nombre y correo son obligatorios.");
      return;
    }

    if (usuarioAEditar) {
      // --- Lógica de UPDATE ---
      const usuariosActualizados = usuarios.map(u =>
        u.id === usuarioAEditar.id ? { ...u, nombre, correo } : u
      );
      setUsuarios(usuariosActualizados);
    } else {
      // --- Lógica de CREATE ---
      const nuevoUsuario = { id: Date.now(), nombre, correo };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    // Limpiar formulario y estado de edición
    setNombre('');
    setCorreo('');
    setUsuarioAEditar(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>{usuarioAEditar ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">
          {usuarioAEditar ? 'Guardar Cambios' : 'Agregar Usuario'}
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h2>Nuestros Usuarios</h2>
        {usuarios.map(usuario => (
          <div key={usuario.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{usuario.nombre}</h3>
            <p>Correo: {usuario.correo}</p>
            <button onClick={() => handleSelectParaEditar(usuario.id)} style={{ marginRight: '0.5rem' }}>
              Editar
            </button>
            <button onClick={() => handleDeleteUsuario(usuario.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;