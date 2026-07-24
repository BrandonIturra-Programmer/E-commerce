import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  getCategoriaPorId,
  updateCategoria,
  deleteCategoria,
  createCategoria,
} from '../../../utils/categoriesApi';
import Header from '../../../components/Header/Header';
import './CategoryView.css';

const COLORES = {
  'Indumentaria': { bg: '#fde8e8', color: '#c0392b' },
  'Electrónica':  { bg: '#fef9e7', color: '#b7770d' },
  'Accesorios':   { bg: '#e8f4fd', color: '#1a6fa0' },
  'Hogar':        { bg: '#e8f8f0', color: '#1a7a44' },
};

const COLORES_DISPONIBLES = [
  { nombre: 'Rojo',     bg: '#fde8e8', color: '#c0392b', dot: '#e74c3c' },
  { nombre: 'Amarillo', bg: '#fef9e7', color: '#b7770d', dot: '#f1c40f' },
  { nombre: 'Azul',     bg: '#e8f4fd', color: '#1a6fa0', dot: '#3498db' },
  { nombre: 'Verde',    bg: '#e8f8f0', color: '#1a7a44', dot: '#2ecc71' },
  { nombre: 'Violeta',  bg: '#f3e8fd', color: '#6c3483', dot: '#9b59b6' },
  { nombre: 'Naranja',  bg: '#fef0e7', color: '#b7510d', dot: '#e67e22' },
];

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
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState(COLORES_DISPONIBLES[0]);

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

  const handleGuardarNueva = async () => {
    if (!nombreNuevo.trim()) {
      alert('❌ Nombre de la categoría es obligatorio');
      return;
    }

    if (/\d/.test(nombreNuevo)) {
      alert('❌ Nombre de categoría invalido\n❌ No puede contener números');
      return;
    }

    if (nombreNuevo.trim().length < 3) {
      alert('❌ Nombre de categoría invalido\n❌ Debe tener al menos 3 caracteres');
      return;
    }

    await createCategoria({ nombre: nombreNuevo });
    alert('✅ Categoría Creada');
    navigate('/categories');
  };

  if (loading) return <p>Cargando...</p>;

  // ── Modo creación ──────────────────────────────────────────────
  if (esNuevo) {
    return (
      <div className="category-view">
        <Header title="Nueva Categoría" showBack />
        <div className="category-view__content">
          <div className="category-view__nueva-card">
            <div className="category-view__nueva-field">
              <div className="category-view__nueva-label-row">
                <label>Categoría</label>
                {nombreNuevo && (
                  <span
                    className="category-view__badge"
                    style={{ backgroundColor: colorSeleccionado.bg, color: colorSeleccionado.color }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colorSeleccionado.dot, display: 'inline-block', marginRight: 6 }}></span>
                    {nombreNuevo}
                  </span>
                )}
              </div>
              <input
                placeholder="Ej: Herramientas"
                value={nombreNuevo}
                onChange={(e) => setNombreNuevo(e.target.value)}
                className="category-view__nueva-input"
              />
            </div>

            <div className="category-view__nueva-field">
              <label style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>Color</label>
              <div className="category-view__colores">
                {COLORES_DISPONIBLES.map((c) => (
                  <button
                    key={c.nombre}
                    className={`category-view__color-btn ${colorSeleccionado.nombre === c.nombre ? 'category-view__color-btn--active' : ''}`}
                    style={{ backgroundColor: c.bg, color: c.color, borderColor: colorSeleccionado.nombre === c.nombre ? c.dot : 'transparent' }}
                    onClick={() => setColorSeleccionado(c)}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c.dot, display: 'inline-block' }}></span>
                    {c.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div className="category-view__nueva-buttons">
              <button className="btn btn--secondary" onClick={() => navigate('/categories')}>
                Cancelar
              </button>
              <button className="btn btn--primary" onClick={handleGuardarNueva}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Modo detalle ───────────────────────────────────────────────
  const color = getColor(categoria.nombre);

  return (
    <div className="category-view">
      <Header
        title="Detalle de Categoría"
        showBack
        actions={
          <button className="btn btn--danger" onClick={handleEliminarCategoria}>
            Eliminar Categoría
          </button>
        }
      />

      <div className="category-view__content">
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
                <span className="category-view__precio">${p.precio.toLocaleString()}</span>
                <span className="category-view__stock-number">{p.stock === 0 ? '❌ Sin stock' : `✅ ${p.stock} unidades`} </span>
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
      </div>
    </div>
  );
}

export default CategoryView;