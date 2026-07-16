import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../../utils/api';
import Header from '../../../components/Header/Header';
import './ProductsList.css';

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
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

const productosFiltrados = productos.filter((p) => {
  const texto = busqueda.toLowerCase();
  return (
    p.nombre.toLowerCase().includes(texto) ||
    p.descripcion?.toLowerCase().includes(texto) ||
    p.tienda?.toLowerCase().includes(texto) ||
    String(p.id).includes(texto)
  );
});

  return (
    <div className="products-list">
      <Header
        title="Productos"
        actions={
          <>
            <input
              className="search-input"
              placeholder="Buscar productos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn--primary" onClick={() => navigate('/products/new')}>
              Agregar Producto
            </button>
          </>
        }
      />

      <div className="products-list__content">
        {loading ? (
          <p>Cargando...</p>
        ) : productosFiltrados.length === 0 ? (
            <p>No hay productos que coincidan con la búsqueda.</p>
        ) : (
          productosFiltrados.map((p) => (
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