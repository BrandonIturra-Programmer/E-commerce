const API_URL = 'http://localhost:3000';

export const getProductos = async () => {
  const response = await fetch(`/productos`);
  return response.json();
};

export const getCategorias = async () => {
  const response = await fetch(`/categorias`);
  return response.json();
};