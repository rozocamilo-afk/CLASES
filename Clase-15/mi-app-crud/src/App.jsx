// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaUsuarios from './components/ListaUsuarios.jsx';
import FormularioUsuario from './components/FormularioUsuario.jsx'; // Importamos el formulario

function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana García', correo: 'ana@email.com' },
    { id: 2, nombre: 'Carlos López', correo: 'carlos@email.com' }
  ]);

  // Función para agregar un usuario al estado principal
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  const actualizarUsuario = (usuarioActualizado) => {
  setUsuarios(usuarios.map(u => 
    u.id === usuarioActualizado.id ? usuarioActualizado : u
  ));
};

  return (
    <BrowserRouter>
      <Routes>
  <Route 
    path="/" 
    element={<ListaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />} 
  />
  <Route 
    path="/crear" 
    element={<FormularioUsuario agregarUsuario={agregarUsuario} />} 
  />
  {/* ¡Actualizamos esta ruta! */}
  <Route 
    path="/editar/:id" 
    element={<FormularioUsuario usuarios={usuarios} actualizarUsuario={actualizarUsuario} />}
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;