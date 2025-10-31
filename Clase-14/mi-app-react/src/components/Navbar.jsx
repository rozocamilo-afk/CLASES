// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#8C98CA', marginBottom: '1rem' }}>
      
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? 'white' : 'lightgray',
          marginRight: '1rem'
        })}
        end 
      >
        Inicio
      </NavLink>
      
      <NavLink
        to="/perfil/Juan-developer" // Un ejemplo de enlace a un perfil específico
        style={({ isActive }) => ({
          color: isActive ? 'white' : 'lightgray',
          marginRight: '1rem'
        })}
      >
        Mi Perfil
      </NavLink>
      
      <NavLink
        to="/detalles/proyecto-web" // Un ejemplo de enlace a un proyecto específico
        style={({ isActive }) => ({
          color: isActive ? 'white' : 'lightgray'
        })}
      >
        Proyectos
      </NavLink>

    </nav>
  );
}

export default Navbar;