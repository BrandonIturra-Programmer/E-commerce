import { NavLink } from 'react-router-dom';
import { FiHome, FiBox, FiTag, FiUser } from 'react-icons/fi';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar__overlay" onClick={onClose}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <span>Mi Ecommerce</span>
        </div>

        <nav className="sidebar__nav">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={onClose}
            end
          >
            <FiHome size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={onClose}
          >
            <FiBox size={18} />
            <span>Productos</span>
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            onClick={onClose}
          >
            <FiTag size={18} />
            <span>Categorías</span>
          </NavLink>
        </nav>

        <div className="sidebar__profile">
          <NavLink to="/profile" className="sidebar__item" onClick={onClose}>
            <FiUser size={18} />
            <span>Olivia</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
  
}

export default Sidebar;