import { create } from 'zustand';
import accountService from '../services/accountService';

const useAccountStore = create((set) => ({
  cuentas: [],
  patrimonioNeto: 0,
  cargando: false,
  error: null,

  listarCuentas: async () => {
    set({ cargando: true, error: null });
    try {
      const [cuentas, patrimonioNeto] = await Promise.all([
        accountService.listar(),
        accountService.patrimonioNeto(),
      ]);
      set({ cuentas, patrimonioNeto, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar cuentas';
      set({ error: mensaje, cargando: false });
    }
  },

  crearCuenta: async (datos) => {
    set({ cargando: true, error: null });
    try {
      await accountService.crear(datos);
      const [cuentas, patrimonioNeto] = await Promise.all([
        accountService.listar(),
        accountService.patrimonioNeto(),
      ]);
      set({ cuentas, patrimonioNeto, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al crear cuenta';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  actualizarCuenta: async (id, datos) => {
    set({ cargando: true, error: null });
    try {
      await accountService.actualizar(id, datos);
      const [cuentas, patrimonioNeto] = await Promise.all([
        accountService.listar(),
        accountService.patrimonioNeto(),
      ]);
      set({ cuentas, patrimonioNeto, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar cuenta';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  eliminarCuenta: async (id) => {
    set({ cargando: true, error: null });
    try {
      await accountService.eliminar(id);
      const [cuentas, patrimonioNeto] = await Promise.all([
        accountService.listar(),
        accountService.patrimonioNeto(),
      ]);
      set({ cuentas, patrimonioNeto, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al eliminar cuenta';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  limpiarError: () => set({ error: null }),
}));

export default useAccountStore;
