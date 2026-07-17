const API_URL = 'http://localhost:3000';

export const getProductos = async () => {
  const response = await fetch(`/productos`);
  return response.json();
};

export const getCategorias = async () => {
  const response = await fetch(`/categorias`);
  return response.json();
};

export const getProductoPorId = async (id) => {
  const response = await fetch(`/productos/${id}`);
  return response.json();
};

export const updateProducto = async (id, producto) => {
  const response = await fetch(`/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return response.json();
};

export const deleteProducto = async (id) => {
  const response = await fetch(`/productos/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const createProducto = async (producto) => {
  const response = await fetch(`/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return response.json();
};
