// src/components/FormularioUsuario.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

// 1. Recibimos las nuevas props: usuarios y actualizarUsuario
function FormularioUsuario({ agregarUsuario, usuarios, actualizarUsuario }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // 2. Obtenemos el :id de la URL

  // 3. useEffect para pre-llenar el formulario si estamos en modo edición
  useEffect(() => {
    if (id && usuarios) {
      // Buscamos el usuario a editar. ¡Ojo con el tipo de dato!
      const usuarioEncontrado = usuarios.find(u => u.id === Number(id));
      if (usuarioEncontrado) {
        setNombre(usuarioEncontrado.nombre);
        setCorreo(usuarioEncontrado.correo);
      }
    }
  }, [id, usuarios]); // Este efecto se ejecuta si el 'id' o 'usuarios' cambian

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre.trim() || !correo.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // 4. Decidimos si crear o actualizar
    if (id) {
      // Modo UPDATE
      const usuarioActualizado = { id: Number(id), nombre, correo };
      actualizarUsuario(usuarioActualizado);
    } else {
      // Modo CREATE
      const nuevoUsuario = { id: Date.now(), nombre, correo };
      agregarUsuario(nuevoUsuario);
    }
    
    navigate('/'); // Redirigimos a la lista
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      {/* 5. Título dinámico */}
      <h1>{id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (los inputs del formulario son los mismos) ... */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Correo:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        {/* Botón con texto dinámico */}
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
          {id ? 'Guardar Cambios' : 'Guardar Usuario'}
        </button>
      </form>
      <Link to="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
        &lt; Volver a la lista
      </Link>
    </div>
  );
}

export default FormularioUsuario;