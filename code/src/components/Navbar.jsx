import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SeleCat
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/courses" className="nav-link">
            Cursos
          </Link>
          <Link to="/resources" className="nav-link">
            Recursos
          </Link>
        </div>
        <div className="nav-search">
          <input 
            type="text" 
            placeholder="Buscar lecciones..." 
            className="search-input"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;