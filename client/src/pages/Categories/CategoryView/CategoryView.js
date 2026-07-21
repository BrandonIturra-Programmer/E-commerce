import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  getCategoriaPorId,
  updateCategoria,
  deleteCategoria,
} from '../../../utils/api';
import Header from '../../../components/Header/Header';
import './CategoryView.css';

const COLORES = {
  'Indumentaria': { bg: '#fde8e8', color: '#c0392b' },
  'Electrónica':  { bg: '#fef9e7', color: '#b7770d' },
  'Accesorios':   { bg: '#e8f4fd', color: '#1a6fa0' },
  'Hogar':        { bg: '#e8f8f0', color: '#1a7a44' },
};

const getColor = (nombre) => {
  return COLORES[nombre] || { bg: '#f0f0f0', color: '#555' };
};

function CategoryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esNuevo = !id;

  const [categoria, setCategoria] = useState({ nombre: '' });
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(!esNuevo);
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState('');

  useEffect(() => {
    if (!esNuevo) {
      getCategoriaPorId(id).then((data) => {
        setCategoria(data);
        setNombreTemp(data.nombre);
        setProductos(data.productos || []);
        setLoading(false);
      });
    }
  }, [id, esNuevo]);

  const handleGuardarNombre = async () => {
    if (!nombreTemp) return;
    const actualizada = await updateCategoria(id, { nombre: nombreTemp });
    setCategoria(actualizada);
    setEditandoNombre(false);
  };

  const handleEliminarCategoria = async () => {
    if (!window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) return;
    await deleteCategoria(id);
    navigate('/categories');
  };

  const handleEliminarProducto = async (productoId) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await fetch(`/productos/${productoId}`, { method: 'DELETE' });
    setProductos((prev) => prev.filter((p) => p.id !== productoId));
  };

  const handleStock = async (producto, delta) => {
    const nuevoStock = Math.max(0, producto.stock + delta);
    await fetch(`/productos/${producto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...producto, stock: nuevoStock }),
    });
    setProductos((prev) =>
      prev.map((p) => (p.id === producto.id ? { ...p, stock: nuevoStock } : p))
    );
  };

  if (loading) return <p>Cargando...</p>;

  const color = getColor(categoria.nombre);

  return (
    <div className="category-view">
      <Header
        title={esNuevo ? 'Nueva Categoría' : 'Detalle de Categoría'}
        showBack
        actions={
          !esNuevo && (
            <button
              className="btn btn--danger"
              onClick={handleEliminarCategoria}
            >
              Eliminar Categoría
            </button>
          )
        }
      />

      <div className="category-view__content">
        {/* Badge nombre */}
        <div className="category-view__nombre-row">
          {editandoNombre ? (
            <div className="category-view__edit-nombre">
              <input
                value={nombreTemp}
                onChange={(e) => setNombreTemp(e.target.value)}
              />
              <button className="btn btn--primary" onClick={handleGuardarNombre}>Guardar</button>
              <button className="btn btn--secondary" onClick={() => setEditandoNombre(false)}>Cancelar</button>
            </div>
          ) : (
            <div className="category-view__badge-row">
              <span
                className="category-view__badge"
                style={{ backgroundColor: color.bg, color: color.color }}
              >
                {categoria.nombre}
              </span>
              <button className="category-view__edit-btn" onClick={() => setEditandoNombre(true)}>
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Tabla productos */}
        {!esNuevo && (
          <div className="category-view__table">
            <div className="category-view__thead">
              <span>Producto</span>
              <span>Precio</span>
              <span>Stock</span>
              <span></span>
            </div>

            {productos.length === 0 ? (
              <p className="category-view__empty">No hay productos en esta categoría.</p>
            ) : (
              productos.map((p) => (
                <div key={p.id} className="category-view__row">
                  <span className="category-view__product-nombre">{p.nombre}</span>

                  <span className="category-view__precio">
                    ${p.precio.toLocaleString()}
                  </span>

                  <div className="category-view__stock">
                    <button onClick={() => handleStock(p, -1)}>−</button>
                    <span>{p.stock}</span>
                    <button onClick={() => handleStock(p, 1)}>+</button>
                  </div>

                  <div className="category-view__actions">
                    <button
                      className="category-view__action-btn category-view__action-btn--edit"
                      onClick={() => navigate(`/products/${p.id}`)}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      className="category-view__action-btn category-view__action-btn--delete"
                      onClick={() => handleEliminarProducto(p.id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryView;