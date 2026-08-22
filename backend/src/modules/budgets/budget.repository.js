import { prisma } from '../../shared/config/prisma-client.js';

export const crear = async (datos) => {
  return prisma.presupuesto.create({
    data: datos,
    include: { categoria: { select: { id: true, nombre: true, tipo: true } } },
  });
};

export const buscarPorIdYUsuario = async (id, idUsuario) => {
  return prisma.presupuesto.findFirst({
    where: { id, idUsuario },
    include: { categoria: { select: { id: true, nombre: true, tipo: true } } },
  });
};

export const listarPorPeriodo = async (idUsuario, mes, anio) => {
  return prisma.presupuesto.findMany({
    where: { idUsuario, mes, anio },
    include: { categoria: { select: { id: true, nombre: true, tipo: true } } },
    orderBy: { fechaCreacion: 'desc' },
  });
};

export const buscarPorCategoriaPeriodo = async (idUsuario, idCategoria, mes, anio) => {
  return prisma.presupuesto.findFirst({
    where: { idUsuario, idCategoria, mes, anio },
  });
};

export const actualizar = async (id, datos) => {
  return prisma.presupuesto.update({
    where: { id },
    data: datos,
    include: { categoria: { select: { id: true, nombre: true, tipo: true } } },
  });
};

export const eliminar = async (id) => {
  return prisma.presupuesto.delete({ where: { id } });
};

// calcular gasto real de una categoría en un período específico
export const calcularGastoReal = async (idUsuario, idCategoria, mes, anio) => {
  const inicio = new Date(anio, mes - 1, 1);
  const fin = new Date(anio, mes, 0, 23, 59, 59);

  const resultado = await prisma.transaccion.aggregate({
    where: {
      idUsuario,
      idCategoria,
      tipo: 'GASTO',
      fecha: { gte: inicio, lte: fin },
    },
    _sum: { monto: true },
  });

  return Number(resultado._sum.monto || 0);
};
