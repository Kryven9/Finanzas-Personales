import * as userService from './user.service.js';

// GET /api/users/me
export const obtenerPerfil = async (req, res, next) => {
  try {
    const usuario = await userService.obtenerPerfil(req.userId);
    res.json({ data: usuario, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/users/me
export const actualizarPerfil = async (req, res, next) => {
  try {
    const usuario = await userService.actualizarPerfil(req.userId, req.body);
    res.json({ data: usuario, error: null });
  } catch (error) {
    next(error);
  }
};
