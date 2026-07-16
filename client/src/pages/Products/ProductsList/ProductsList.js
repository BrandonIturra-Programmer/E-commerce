import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../../utils/api';
import Header from '../../../components/Header/Header';
import './ProductsList.css';

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="products-list">
      <Header
        title="Productos"
        actions={
          <>
            <input className="search-input" placeholder="Buscar productos" />
            <button className="btn btn--primary" onClick={() => navigate('/products/new')}>
              Agregar Producto
            </button>
          </>
        }
      />

      <div className="products-list__content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          productos.map((p) => (
            <div
              key={p.id}
              className="products-list__item"
              onClick={() => navigate(`/products/${p.id}`)}
            >
              <img src={p.imagen} alt={p.nombre} />
              <div>
                <p>{p.nombre}</p>
                <span>#{p.id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsList;