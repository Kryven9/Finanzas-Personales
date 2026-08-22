import * as budgetRepository from './budget.repository.js';
import { prisma } from '../../shared/config/prisma-client.js';

// crear presupuesto
export const crearPresupuesto = async (idUsuario, datos) => {
  // verificar que la categoria existe
  const categoria = await prisma.categoria.findUnique({ where: { id: datos.idCategoria } });
  if (!categoria) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }

  // verificar que no exista un presupuesto para esa categoría en ese periodo
  const existente = await budgetRepository.buscarPorCategoriaPeriodo(
    idUsuario,
    datos.idCategoria,
    datos.mes,
    datos.anio,
  );

  if (existente) {
    const error = new Error('Ya existe un presupuesto para esta categoria en este período');
    error.statusCode = 409;
    throw error;
  }

  return budgetRepository.crear({ ...datos, idUsuario });
};

// listar presupuestos del periodo con gasto real y alertas
export const listarPresupuestos = async (idUsuario, mes, anio) => {
  const presupuestos = await budgetRepository.listarPorPeriodo(idUsuario, mes, anio);

  const presupuestosConGasto = await Promise.all(
    presupuestos.map(async (presupuesto) => {
      const gastoReal = await budgetRepository.calcularGastoReal(
        idUsuario,
        presupuesto.idCategoria,
        mes,
        anio,
      );

      const montoLimite = Number(presupuesto.montoLimite);
      const porcentajeUsado = montoLimite > 0 ? (gastoReal / montoLimite) * 100 : 0;

      let alerta = null;
      if (porcentajeUsado >= 100) alerta = 'excedido';
      else if (porcentajeUsado >= 80) alerta = 'cercano';

      return {
        ...presupuesto,
        gastoReal,
        porcentajeUsado: Math.round(porcentajeUsado * 100) / 100,
        alerta,
      };
    }),
  );

  return presupuestosConGasto;
};

// editar limite
export const actualizarPresupuesto = async (idUsuario, idPresupuesto, datos) => {
  const existente = await budgetRepository.buscarPorIdYUsuario(idPresupuesto, idUsuario);
  if (!existente) {
    const error = new Error('Presupuesto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return budgetRepository.actualizar(idPresupuesto, datos);
};

// eliminar
export const eliminarPresupuesto = async (idUsuario, idPresupuesto) => {
  const existente = await budgetRepository.buscarPorIdYUsuario(idPresupuesto, idUsuario);
  if (!existente) {
    const error = new Error('Presupuesto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return budgetRepository.eliminar(idPresupuesto);
};
