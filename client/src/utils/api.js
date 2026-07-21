
//Productos
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

//Categorias
export const getCategoriaPorId = async (id) => {
  const response = await fetch(`/categorias/${id}`);
  return response.json();
};

export const createCategoria = async (categoria) => {
  const response = await fetch(`/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  return response.json();
};

export const updateCategoria = async (id, categoria) => {
  const response = await fetch(`/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  return response.json();
};

export const deleteCategoria = async (id) => {
  const response = await fetch(`/categorias/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
