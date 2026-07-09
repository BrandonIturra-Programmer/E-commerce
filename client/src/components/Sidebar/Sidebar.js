import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Botón hamburguesa - solo visible en pantallas pequeñas */}
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay - fondo oscuro cuando el sidebar está abierto en mobile */}
      {isOpen && (
        <div className="sidebar__overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <span>MiEcommerce</span>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'} onClick={closeSidebar}>
            🏠 Inicio
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'} onClick={closeSidebar}>
            📦 Productos
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'} onClick={closeSidebar}>
            🏪 Categorías
          </NavLink>
        </nav>

        <div className="sidebar__profile">
          <NavLink to="/profile" className="sidebar__item" onClick={closeSidebar}>
            👤 Olivia
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;