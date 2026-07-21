import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../../utils/api';
import Header from '../../../components/Header/Header';
import { FiSearch } from 'react-icons/fi';
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
      p.categoria?.toLowerCase().includes(texto) ||
      String(p.id).includes(texto)
    );
  });

  return (
    <div className="products-list">
      <Header
        title="Lista de Productos"
        actions={
          <>
            <div className="search-wrapper">
              <FiSearch size={16} color="#888" />
              <input
                className="search-input"
                placeholder="Buscar productos"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button className="btn btn--primary" onClick={() => navigate('/products/new')}>
              Agregar Producto
            </button>
          </>
        }
      />

      <div className="products-list__content">
        {loading ? (
          <p className="products-list__loading">Cargando...</p>
        ) : productosFiltrados.length === 0 ? (
          <p className="products-list__empty">No hay productos que coincidan con la búsqueda.</p>
        ) : (
          productosFiltrados.map((p) => (
            <div
              key={p.id}
              className="products-list__item"
              onClick={() => navigate(`/products/${p.id}`)}
            >
              <img src={`/img/${p.imagen}`} alt={p.nombre} />
              
              <div className="products-list__item-info">
                <p className="products-list__item-nombre">{p.nombre}</p>
                <span className="products-list__item-id">#{p.id}</span>
              </div>

              <div className="products-list__item-col">
                <span className="products-list__label">Categoría</span>
                <span className="products-list__badge">{p.categoria}</span>
              </div>

              <div className="products-list__item-divider"></div>

              <div className="products-list__item-col">
                <span className="products-list__label">Precio</span>
                <span className="products-list__precio">${p.precio.toLocaleString()}</span>
              </div>

              <div className="products-list__item-divider"></div>

              <div className="products-list__item-col">
                <span className="products-list__label">Stock</span>
                <span className="products-list__stock">
                  ✅ {p.stock} unidades
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsList;