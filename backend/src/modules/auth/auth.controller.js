import * as authService from './auth.service.js';

// POST /api/auth/register
export const registrar = async (req, res, next) => {
  try {
    const resultado = await authService.registrar(req.body);
    res.status(201).json({ data: resultado, error: null });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const iniciarSesion = async (req, res, next) => {
  try {
    const resultado = await authService.iniciarSesion(req.body);
    res.json({ data: resultado, error: null });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
export const cerrarSesion = async (req, res) => {
  res.json({ data: { mensaje: 'Sesion cerrada correctamente' }, error: null });
};
