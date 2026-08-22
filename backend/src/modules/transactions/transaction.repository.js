import { prisma } from '../../shared/config/prisma-client.js';

export const crear = async (datos) => {
  return prisma.transaccion.create({
    data: datos,
    include: { cuenta: true, categoria: true },
  });
};

export const buscarPorIdYUsuario = async (id, idUsuario) => {
  return prisma.transaccion.findFirst({
    where: { id, idUsuario },
    include: { cuenta: true, categoria: true },
  });
};

export const listarPorUsuario = async (idUsuario, filtros = {}) => {
  const { fechaInicio, fechaFin, idCategoria, idCuenta, montoMin, montoMax } = filtros;

  const where = { idUsuario };

  if (fechaInicio || fechaFin) {
    where.fecha = {};
    if (fechaInicio) where.fecha.gte = new Date(fechaInicio);
    if (fechaFin) where.fecha.lte = new Date(fechaFin);
  }
  if (idCategoria) where.idCategoria = idCategoria;
  if (idCuenta) where.idCuenta = idCuenta;
  if (montoMin || montoMax) {
    where.monto = {};
    if (montoMin) where.monto.gte = Number(montoMin);
    if (montoMax) where.monto.lte = Number(montoMax);
  }

  return prisma.transaccion.findMany({
    where,
    include: { cuenta: { select: { id: true, nombre: true } }, categoria: { select: { id: true, nombre: true, tipo: true } } },
    orderBy: { fecha: 'desc' },
  });
};

export const actualizar = async (id, datos) => {
  return prisma.transaccion.update({
    where: { id },
    data: datos,
    include: { cuenta: true, categoria: true },
  });
};

export const eliminar = async (id) => {
  return prisma.transaccion.delete({ where: { id } });
};

export const listarRecurrentes = async (idUsuario) => {
  return prisma.transaccion.findMany({
    where: {
      idUsuario,
      esRecurrente: true,
    },
    include: { cuenta: { select: { id: true, nombre: true } }, categoria: { select: { id: true, nombre: true } } },
    orderBy: { fecha: 'asc' },
  });
};

export const desactivarRecurrencia = async (id) => {
  return prisma.transaccion.update({
    where: { id },
    data: { esRecurrente: false, frecuenciaRecurrencia: null },
    include: { cuenta: true, categoria: true },
  });
};
