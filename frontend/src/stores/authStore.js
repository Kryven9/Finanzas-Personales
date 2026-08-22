import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  usuario: JSON.parse(localStorage.getItem('usuario')) || null,
  token: localStorage.getItem('token') || null,
  cargando: false,
  error: null,

  estaAutenticado: () => !!localStorage.getItem('token'),

  registrar: async (datos) => {
    set({ cargando: true, error: null });
    try {
      const { data: respuesta } = await api.post('/auth/register', datos);
      const { usuario, token } = respuesta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      set({ usuario, token, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al registrar';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  iniciarSesion: async (datos) => {
    set({ cargando: true, error: null });
    try {
      const { data: respuesta } = await api.post('/auth/login', datos);
      const { usuario, token } = respuesta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      set({ usuario, token, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al iniciar sesión';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  cerrarSesion: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignorar errores al cerrar sesión
    }
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    set({ usuario: null, token: null });
  },

  actualizarPerfil: async (datos) => {
    set({ cargando: true, error: null });
    try {
      const { data: respuesta } = await api.patch('/users/me', datos);
      const usuario = respuesta.data;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      set({ usuario, cargando: false });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al actualizar perfil';
      set({ error: mensaje, cargando: false });
      return false;
    }
  },

  limpiarError: () => set({ error: null }),
}));

export default useAuthStore;
