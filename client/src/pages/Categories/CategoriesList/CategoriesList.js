import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../../../utils/categoriesApi';
import Header from '../../../components/Header/Header';
import './CategoriesList.css';

const COLORES = {
  'Indumentaria': { bg: '#fde8e8', color: '#c0392b', dot: '#e74c3c' },
  'Electrónica':  { bg: '#fef9e7', color: '#b7770d', dot: '#f1c40f' },
  'Accesorios':   { bg: '#e8f4fd', color: '#1a6fa0', dot: '#3498db' },
  'Hogar':        { bg: '#e8f8f0', color: '#1a7a44', dot: '#2ecc71' },
};

const getColor = (nombre) => {
  return COLORES[nombre] || { bg: '#f0f0f0', color: '#555', dot: '#999' };
};

function CategoriesList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="categories-list">
      <Header
        title="Lista de Categorías"
        actions={
          <button className="btn btn--primary" onClick={() => navigate('/categories/new')}>
            Agregar Categoría 
          </button>
        }
      />

      <div className="categories-list__content">
        {loading ? (
          <p className="categories-list__loading">Cargando...</p>
        ) : (
          <div className="categories-list__table">
            <div className="categories-list__thead">
              <span>Categoría</span>
              <span>Productos Asignados</span>
            </div>

            {categorias.map((cat) => {
              const color = getColor(cat.nombre);
              return (
                <div
                  key={cat.id}
                  className="categories-list__row"
                  onClick={() => navigate(`/categories/${cat.id}`)}
                >
                  <div className="categories-list__nombre">
                    <span
                      className="categories-list__badge"
                      style={{ backgroundColor: color.bg, color: color.color }}
                    >
                      <span
                        className="categories-list__dot"
                        style={{ backgroundColor: color.dot }}
                      ></span>
                      {cat.nombre}
                    </span>
                  </div>
                  <div className="categories-list__productos">
                    {`${cat.cantidadProductos} productos`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesList;