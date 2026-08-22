import { create } from 'zustand';
import categoryService from '../services/categoryService';

const useCategoryStore = create((set) => ({
  categorias: [],
  cargando: false,
  error: null,

  listarCategorias: async () => {
    set({ cargando: true, error: null });
    try {
      const categorias = await categoryService.listar();
      set({ categorias, cargando: false });
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al cargar categorias';
      set({ error: mensaje, cargando: false });
    }
  },

  crearCategoria: async (datos) => {
    set({ cargando: true, error: null });
    try {
      await categoryService.crear(datos);
      const categorias = await categoryService.listar();
      set({ categorias, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al crear categoria';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  actualizarCategoria: async (id, datos) => {
    set({ cargando: true, error: null });
    try {
      await categoryService.actualizar(id, datos);
      const categorias = await categoryService.listar();
      set({ categorias, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar categoria';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  eliminarCategoria: async (id) => {
    set({ cargando: true, error: null });
    try {
      await categoryService.eliminar(id);
      const categorias = await categoryService.listar();
      set({ categorias, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al eliminar categoria';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  limpiarError: () => set({ error: null }),
}));

export default useCategoryStore;
