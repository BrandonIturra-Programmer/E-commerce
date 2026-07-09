import './MainArea.css';

function MainArea({ children }) {
  return (
    <div className="main-area">
      <div className="main-area__content">
        {children}
      </div>
    </div>
  );
}

export default MainArea;