import api from './api';

const transactionService = {
  listar: async (filtros = {}) => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([clave, valor]) => {
      if (valor) params.append(clave, valor);
    });
    const { data } = await api.get(`/transactions?${params.toString()}`);
    return data.data;
  },

  obtener: async (id) => {
    const { data } = await api.get(`/transactions/${id}`);
    return data.data;
  },

  crear: async (datos) => {
    const { data } = await api.post('/transactions', datos);
    return data.data;
  },

  actualizar: async (id, datos) => {
    const { data } = await api.patch(`/transactions/${id}`, datos);
    return data.data;
  },

  eliminar: async (id) => {
    const { data } = await api.delete(`/transactions/${id}`);
    return data.data;
  },

  listarRecurrentes: async () => {
    const { data } = await api.get('/transactions/recurring');
    return data.data;
  },

  desactivarRecurrencia: async (id) => {
    const { data } = await api.patch(`/transactions/${id}/disable-recurrence`);
    return data.data;
  },
};

export default transactionService;
