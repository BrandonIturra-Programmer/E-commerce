import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductoPorId,
  updateProducto,
  deleteProducto,
  createProducto,
} from '../../../utils/productsApi';
import { getCategorias } from '../../../utils/categoriesApi';
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
  const [editando, setEditando] = useState(false);

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
    setEditando(false);
  };

  const handleGuardar = async () => {
    //Nombre: No puede ser vacio
    if (!producto.nombre) {
      alert('❌ El nombre es obligatorio');
      return;
    }

    //Descripcion: No puede ser vacia
    const palabras = producto.descripcion?.trim().split(/\s+/) || [];
    if (palabras.length <= 5) {
      alert('❌ Descripcion corta\n❌ Debe contener al menos una palabra');
      return;
    }

    //Precio: Debe mayor a 0
    if (!producto.precio || parseInt(producto.precio) <= 0) {
      alert('❌ Precio invalido\n❌ Debe ser un número mayor 0');
      return;
    }

    //Stock: Debe contener al menos un stock
    if (esNuevo && parseInt(producto.stock) < 1) {
      alert('❌ Stock invalido\n❌ Debes ingresar al menos un stock');
      return;
    }

    //URL: Debe ser una URL valida
    if (esNuevo && (!producto.imagen || producto.imagen.trim() === '')) {
      alert('❌ La imagen es obligatoria');
      return;
    }

    //Categoría obligatoria
    if (!producto.categoria_id || producto.categoria_id === '') {
      alert('❌ Debes seleccionar una categoría');
      return;
    }

    const payload = {
      ...producto,
      precio: parseInt(producto.precio) || 0,
      stock: parseInt(producto.stock) || 0,
    };

    if (esNuevo) {
      const creado = await createProducto(payload);
      alert('✅ Producto Agregado');
      if (creado && creado.id) {
        navigate(`/products/${creado.id}`);
      }
      else{
        navigate('/products');
      }
    } else {
      const actualizado = await updateProducto(id, payload);
      setProducto(actualizado);
      setOriginal(actualizado);
      setEditando(false);
      alert('✅ Cambios Guardados');
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await deleteProducto(id);
    navigate('/products');
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="product-view">
      <Header
        title={esNuevo ? 'Producto Nuevo' : `Producto #${id}`}
        showBack
        onBack={() => navigate('/products')}
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
              src={
                producto.imagen
                  ? producto.imagen.startsWith('http')
                    ? producto.imagen
                    : `/img/${producto.imagen}`
                  : 'https://placehold.co/300x200?text=Sin+imagen'
              }
              alt={producto.nombre}
            />
          </div>
          <p className="product-view__nombre-imagen">{producto.nombre || 'Nuevo Producto'}</p>

          {esNuevo && (
            <div className="product-view__url-input">
              <label>URL de imagen</label>
              <input
                placeholder="https://ejemplo.com/imagen.jpg"
                value={producto.imagen || ''}
                onChange={(e) => handleChange('imagen', e.target.value)}
              />
            </div>
          )}
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
              disabled={!esNuevo && !editando}
            />
          </div>

          <div className="product-view__row">
            <div className="product-view__field">
              <label>Precio</label>
              <div className="input-prefix">
                <span>$</span>
                <input
                  type="number"
                  value={producto.precio}
                  onChange={(e) => handleChange('precio', e.target.value)}
                  disabled={!esNuevo && !editando}
                />
              </div>
            </div>

            <div className="product-view__field">
              <label>Stock</label>
              <div className="stock-control">
                <button onClick={() => handleStock(-1)} disabled={!esNuevo && !editando}>−</button>
                <span>{producto.stock}</span>
                <button onClick={() => handleStock(1)} disabled={!esNuevo && !editando}>+</button>
              </div>
            </div>
          </div>

          <div className="product-view__field">
            <label>Descripción</label>
            <textarea
              value={producto.descripcion || ''}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              placeholder="Descripción del producto"
              disabled={!esNuevo && !editando}
            />
          </div>

          <div className="product-view__field">
            <label>Categoría</label>
            <select
              value={producto.categoria_id || ''}
              onChange={(e) => handleChange('categoria_id', e.target.value)}
              disabled={!esNuevo && !editando}
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
            {esNuevo ? (
              <button className="btn btn--primary" onClick={handleGuardar}>
                Guardar
              </button>
            ) : editando ? (
              <>
                <button className="btn btn--secondary" onClick={handleCancelar}>
                  Cancelar
                </button>
                <button className="btn btn--primary" onClick={handleGuardar}>
                  Guardar Cambios
                </button>
              </>
            ) : (
              <button className="btn btn--primary" onClick={() => setEditando(true)}>
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;