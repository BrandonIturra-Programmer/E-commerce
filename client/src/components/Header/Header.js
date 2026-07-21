import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Header.css';

function Header({ title, actions, showBack }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__left">
        {showBack && (
          <button className="header__back" onClick={() => navigate(-1)}>
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