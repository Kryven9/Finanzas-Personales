import api from './api';

const categoryService = {
  listar: async () => {
    const { data } = await api.get('/categories');
    return data.data;
  },

  crear: async (datos) => {
    const { data } = await api.post('/categories', datos);
    return data.data;
  },

  actualizar: async (id, datos) => {
    const { data } = await api.patch(`/categories/${id}`, datos);
    return data.data;
  },

  eliminar: async (id) => {
    const { data } = await api.delete(`/categories/${id}`);
    return data.data;
  },
};

export default categoryService;
