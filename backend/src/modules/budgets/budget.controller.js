import * as budgetService from './budget.service.js';

// POST /api/budgets
export const crear = async (req, res, next) => {
  try {
    const presupuesto = await budgetService.crearPresupuesto(req.userId, req.body);
    res.status(201).json({ data: presupuesto, error: null });
  } catch (error) {
    next(error);
  }
};

// GET /api/budgets?month=&year=
export const listar = async (req, res, next) => {
  try {
    const mes = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
    const anio = parseInt(req.query.year, 10) || new Date().getFullYear();
    const presupuestos = await budgetService.listarPresupuestos(req.userId, mes, anio);
    res.json({ data: presupuestos, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/budgets/:id
export const actualizar = async (req, res, next) => {
  try {
    const presupuesto = await budgetService.actualizarPresupuesto(req.userId, req.params.id, req.body);
    res.json({ data: presupuesto, error: null });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/budgets/:id
export const eliminar = async (req, res, next) => {
  try {
    await budgetService.eliminarPresupuesto(req.userId, req.params.id);
    res.json({ data: { mensaje: 'Presupuesto eliminado correctamente' }, error: null });
  } catch (error) {
    next(error);
  }
};
