import './MainArea.css';

function MainArea({ children }) {
  return (
    <div className="main-area">
      {children}
    </div>
  );
}

export default MainArea;