import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductoPorId,
  updateProducto,
  deleteProducto,
  createProducto,
  getCategorias,
} from '../../../utils/api';
import Header from '../../../components/Header/Header';
import './ProductView.css';

const PRODUCTO_VACIO = {
  nombre: '',
  precio: 0,
  descripcion: '',
  imagen: '',
  stock: 0,
  categoria_id: '',
};

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esNuevo = !id;

  const [producto, setProducto] = useState(PRODUCTO_VACIO);
  const [original, setOriginal] = useState(PRODUCTO_VACIO);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(!esNuevo);

  useEffect(() => {
    getCategorias().then(setCategorias);
    if (!esNuevo) {
      getProductoPorId(id).then((data) => {
        setProducto(data);
        setOriginal(data);
        setLoading(false);
      });
    }
  }, [id, esNuevo]);

  const handleChange = (campo, valor) => {
    setProducto((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleStock = (delta) => {
    setProducto((prev) => ({ ...prev, stock: Math.max(0, Number(prev.stock) + delta) }));
  };

  const handleCancelar = () => {
    setProducto(original);
  };

  const handleGuardar = async () => {
    if (!producto.nombre) {
      alert('El nombre es requerido');
      return;
    }
    const payload = {
      ...producto,
      precio: parseInt(producto.precio) || 0,
      stock: parseInt(producto.stock) || 0,
    };

    if (esNuevo) {
      const creado = await createProducto(payload);
      navigate(`/products/${creado.id}`);
    } else {
      const actualizado = await updateProducto(id, payload);
      setProducto(actualizado);
      setOriginal(actualizado);
    }
  };

  const handleEliminar = async () => {
    await deleteProducto(id);
    navigate('/products');
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="product-view">
      <Header
        title={esNuevo ? 'Productos > Nuevo' : `Productos #${id}`}
        actions={
          !esNuevo && (
            <button className="btn btn--danger" onClick={handleEliminar}>
              Eliminar
            </button>
          )
        }
      />

      <div className="product-view__body">
        {/* Panel izquierdo */}
        <div className="product-view__left">
          <div className="product-view__imagen-wrapper">
            <img
              src={producto.imagen ? `/img/${producto.imagen}` : '/img/fallback.jpg'}
              alt={producto.nombre}
            />
          </div>
          <p className="product-view__nombre-imagen">{producto.nombre || 'Nuevo Producto'}</p>
        </div>

        {/* Panel derecho */}
        <div className="product-view__right">
          <h2>Detalles del Producto</h2>

          <div className="product-view__field">
            <label>Nombre</label>
            <input
              value={producto.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              placeholder="Nombre del producto"
            />
          </div>

          <div className="product-view__row">
            <div className="product-view__field">
              <label>Valor</label>
              <div className="input-prefix">
                <span>$</span>
                <input
                  type="number"
                  value={producto.precio}
                  onChange={(e) => handleChange('precio', e.target.value)}
                />
              </div>
            </div>

            <div className="product-view__field">
              <label>Stock</label>
              <div className="stock-control">
                <button onClick={() => handleStock(-1)}>−</button>
                <span>{producto.stock}</span>
                <button onClick={() => handleStock(1)}>+</button>
              </div>
            </div>
          </div>

          <div className="product-view__field">
            <label>Descripción</label>
            <textarea
              value={producto.descripcion || ''}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              placeholder="Descripción del producto"
            />
          </div>

          <div className="product-view__field">
            <label>Categoría</label>
            <select
              value={producto.categoria_id || ''}
              onChange={(e) => handleChange('categoria_id', e.target.value)}
            >
              <option value="">Seleccionar...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="product-view__buttons">
            <button className="btn btn--secondary" onClick={handleCancelar} disabled={esNuevo}>
              Cancelar
            </button>
            <button className="btn btn--primary" onClick={handleGuardar}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;