import { create } from 'zustand';
import budgetService from '../services/budgetService';
import categoryService from '../services/categoryService';

const useBudgetStore = create((set) => ({
  presupuestos: [],
  categorias: [],
  mesActual: new Date().getMonth() + 1,
  anioActual: new Date().getFullYear(),
  cargando: false,
  error: null,

  cargarDatos: async () => {
    set({ cargando: true, error: null });
    try {
      const categorias = await categoryService.listar();
      set({ categorias, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar datos';
      set({ error: mensaje, cargando: false });
    }
  },

  listarPresupuestos: async (mes, anio) => {
    set({ cargando: true, error: null });
    try {
      const presupuestos = await budgetService.listar(mes, anio);
      set({ presupuestos, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar presupuestos';
      set({ error: mensaje, cargando: false });
    }
  },

  crearPresupuesto: async (datos) => {
    set({ cargando: true, error: null });
    try {
      await budgetService.crear(datos);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al crear presupuesto';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  actualizarPresupuesto: async (id, datos) => {
    set({ cargando: true, error: null });
    try {
      await budgetService.actualizar(id, datos);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar presupuesto';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  eliminarPresupuesto: async (id) => {
    set({ cargando: true, error: null });
    try {
      await budgetService.eliminar(id);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al eliminar presupuesto';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  setMesAnio: (mes, anio) => set({ mesActual: mes, anioActual: anio }),

  limpiarError: () => set({ error: null }),
}));

export default useBudgetStore;
