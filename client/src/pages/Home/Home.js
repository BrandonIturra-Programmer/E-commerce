import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../utils/productsApi';
import { getCategorias } from '../../utils/categoriesApi';
import Header from '../../components/Header/Header';
import './Home.css';

function Home() {
  const [cantProductos, setCantProductos] = useState(0);
  const [cantCategorias, setCantCategorias] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productos, categorias] = await Promise.all([
          getProductos(),
          getCategorias()
        ]);
        setCantProductos(productos.length);
        setCantCategorias(categorias.length);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header title="¡Hola Olivia!" />

      <div className="home__content">
        {loading ? (
          <p className="home__loading">Cargando...</p>
        ) : (
          <>
            {/* Bloque Productos */}
            <div className="home__card">
              <div className="home__card-info">
                <span className="home__card-icon">📦</span>
                <span className="home__card-count">{cantProductos} Productos</span>
              </div>
              <div className="home__card-actions">
                <button className="btn btn--secondary" onClick={() => navigate('/products')}>
                  Ver Listado
                </button>
                <button className="btn btn--primary" onClick={() => navigate('/products/new')}>
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Bloque Categorías */}
            <div className="home__card">
              <div className="home__card-info">
                <span className="home__card-icon">🏪</span>
                <span className="home__card-count">{cantCategorias} Categorías</span>
              </div>
              <div className="home__card-actions">
                <button className="btn btn--secondary" onClick={() => navigate('/categories')}>
                  Ver Listado
                </button>
                <button className="btn btn--primary" onClick={() => navigate('/categories/new')}>
                  Agregar Categoría
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;