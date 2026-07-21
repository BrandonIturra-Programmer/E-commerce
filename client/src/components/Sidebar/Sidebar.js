import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBox, FiTag, FiUser, FiMenu } from 'react-icons/fi';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        <FiMenu size={20} />
      </button>

      {isOpen && (
        <div className="sidebar__overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <span>Mi Ecommerce</span>
        </div>

        <nav className="sidebar__nav">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={closeSidebar}
            end
          >
            <FiHome size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={closeSidebar}
          >
            <FiBox size={18} />
            <span>Productos</span>
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={closeSidebar}
          >
            <FiTag size={18} />
            <span>Categorías</span>
          </NavLink>
        </nav>

        <div className="sidebar__profile">
          <NavLink to="/profile" className="sidebar__item" onClick={closeSidebar}>
            <FiUser size={18} />
            <span>Olivia</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;