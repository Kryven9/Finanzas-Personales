import * as accountService from './account.service.js';

// POST /api/accounts
export const crear = async (req, res, next) => {
  try {
    const cuenta = await accountService.crearCuenta(req.userId, req.body);
    res.status(201).json({ data: cuenta, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/accounts
export const listar = async (req, res, next) => {
  try {
    const cuentas = await accountService.listarCuentas(req.userId);
    res.json({ data: cuentas, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/accounts/net-worth
export const patrimonioNeto = async (req, res, next) => {
  try {
    const patrimonio = await accountService.obtenerPatrimonioNeto(req.userId);
    res.json({ data: { patrimonioNeto: patrimonio }, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/accounts/:id
export const obtener = async (req, res, next) => {
  try {
    const cuenta = await accountService.obtenerCuenta(req.userId, req.params.id);
    res.json({ data: cuenta, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/accounts/:id
export const actualizar = async (req, res, next) => {
  try {
    const cuenta = await accountService.actualizarCuenta(req.userId, req.params.id, req.body);
    res.json({ data: cuenta, error: null });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/accounts/:id
export const eliminar = async (req, res, next) => {
  try {
    await accountService.eliminarCuenta(req.userId, req.params.id);
    res.json({ data: { mensaje: 'Cuenta eliminada correctamente' }, error: null });
  } catch (error) {
    next(error);
  }
};
