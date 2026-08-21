import api from './api';

const accountService = {
  listar: async () => {
    const { data } = await api.get('/accounts');
    return data.data;
  },

  obtener: async (id) => {
    const { data } = await api.get(`/accounts/${id}`);
    return data.data;
  },

  crear: async (datos) => {
    const { data } = await api.post('/accounts', datos);
    return data.data;
  },

  actualizar: async (id, datos) => {
    const { data } = await api.patch(`/accounts/${id}`, datos);
    return data.data;
  },

  eliminar: async (id) => {
    const { data } = await api.delete(`/accounts/${id}`);
    return data.data;
  },

  patrimonioNeto: async () => {
    const { data } = await api.get('/accounts/net-worth');
    return data.data.patrimonioNeto;
  },
};

export default accountService;
