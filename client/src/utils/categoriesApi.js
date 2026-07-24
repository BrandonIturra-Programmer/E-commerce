export const getCategorias = async () => {
  const response = await fetch('/api/categories');
  return response.json();
};

export const getCategoriaPorId = async (id) => {
  const response = await fetch(`/api/categories/${id}`);
  return response.json();
};

export const createCategoria = async (categoria) => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  return response.json();
};

export const updateCategoria = async (id, categoria) => {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  return response.json();
};

export const deleteCategoria = async (id) => {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};