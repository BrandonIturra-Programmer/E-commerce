import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';
import { openSidebar } from '../../utils/sidebarController';
import './Header.css';

function Header({ title, actions, showBack, onBack }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={openSidebar}>
          <FiMenu size={20} />
        </button>
        {showBack && (
          <button className="header__back" onClick={onBack || (() => navigate(-1))}>
            <FiArrowLeft size={20} />
          </button>
        )}
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__actions">
        {actions}
      </div>
    </header>
  );
}

export default Header;