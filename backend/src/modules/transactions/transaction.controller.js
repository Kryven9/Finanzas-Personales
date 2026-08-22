import * as transactionService from './transaction.service.js';

// POST /api/transactions
export const crear = async (req, res, next) => {
  try {
    const transaccion = await transactionService.crearTransaccion(req.userId, req.body);
    res.status(201).json({ data: transaccion, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/transactions
export const listar = async (req, res, next) => {
  try {
    const transacciones = await transactionService.listarTransacciones(req.userId, req.query);
    res.json({ data: transacciones, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/transactions/recurring
export const listarRecurrentes = async (req, res, next) => {
  try {
    const transacciones = await transactionService.listarRecurrentes(req.userId);
    res.json({ data: transacciones, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/transactions/:id
export const obtener = async (req, res, next) => {
  try {
    const transaccion = await transactionService.obtenerTransaccion(req.userId, req.params.id);
    res.json({ data: transaccion, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/transactions/:id
export const actualizar = async (req, res, next) => {
  try {
    const transaccion = await transactionService.actualizarTransaccion(req.userId, req.params.id, req.body);
    res.json({ data: transaccion, error: null });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/transactions/:id
export const eliminar = async (req, res, next) => {
  try {
    await transactionService.eliminarTransaccion(req.userId, req.params.id);
    res.json({ data: { mensaje: 'Transacción eliminada correctamente' }, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/transactions/:id/disable-recurrence
export const desactivarRecurrencia = async (req, res, next) => {
  try {
    const transaccion = await transactionService.desactivarRecurrencia(req.userId, req.params.id);
    res.json({ data: transaccion, error: null });
  } catch (error) {
    next(error);
  }
};
