import { create } from 'zustand';
import transactionService from '../services/transactionService';
import accountService from '../services/accountService';
import categoryService from '../services/categoryService';

const useTransactionStore = create((set) => ({
  transacciones: [],
  recurrentes: [],
  cuentas: [],
  categorias: [],
  cargando: false,
  error: null,

  cargarDatos: async () => {
    set({ cargando: true, error: null });
    try {
      const [cuentas, categorias] = await Promise.all([
        accountService.listar(),
        categoryService.listar(),
      ]);
      set({ cuentas, categorias, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar datos';
      set({ error: mensaje, cargando: false });
    }
  },

  listarTransacciones: async (filtros = {}) => {
    set({ cargando: true, error: null });
    try {
      const transacciones = await transactionService.listar(filtros);
      set({ transacciones, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar transacciones';
      set({ error: mensaje, cargando: false });
    }
  },

  crearTransaccion: async (datos) => {
    set({ cargando: true, error: null });
    try {
      await transactionService.crear(datos);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al crear transacción';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  actualizarTransaccion: async (id, datos) => {
    set({ cargando: true, error: null });
    try {
      await transactionService.actualizar(id, datos);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar transacción';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  eliminarTransaccion: async (id) => {
    set({ cargando: true, error: null });
    try {
      await transactionService.eliminar(id);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al eliminar transacción';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  listarRecurrentes: async () => {
    set({ cargando: true, error: null });
    try {
      const recurrentes = await transactionService.listarRecurrentes();
      set({ recurrentes, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar recurrentes';
      set({ error: mensaje, cargando: false });
    }
  },

  desactivarRecurrencia: async (id) => {
    set({ cargando: true, error: null });
    try {
      await transactionService.desactivarRecurrencia(id);
      set({ cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al desactivar recurrencia';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  limpiarError: () => set({ error: null }),
}));

export default useTransactionStore;
