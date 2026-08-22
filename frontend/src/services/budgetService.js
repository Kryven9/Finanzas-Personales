import api from './api';

const budgetService = {
  listar: async (mes, anio) => {
    const { data } = await api.get(`/budgets?month=${mes}&year=${anio}`);
    return data.data;
  },

  crear: async (datos) => {
    const { data } = await api.post('/budgets', datos);
    return data.data;
  },

  actualizar: async (id, datos) => {
    const { data } = await api.patch(`/budgets/${id}`, datos);
    return data.data;
  },

  eliminar: async (id) => {
    const { data } = await api.delete(`/budgets/${id}`);
    return data.data;
  },
};

export default budgetService;
