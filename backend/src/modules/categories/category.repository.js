import { prisma } from '../../shared/config/prisma-client.js';

export const listarPorUsuario = async (idUsuario) => {
  return prisma.categoria.findMany({
    where: {
      OR: [{ esPredefinida: true }, { idUsuario }],
    },
    orderBy: [{ esPredefinida: 'desc' }, { nombre: 'asc' }],
  });
};

export const buscarPorId = async (id) => {
  return prisma.categoria.findUnique({ where: { id } });
};

export const buscarPorIdYUsuario = async (id, idUsuario) => {
  return prisma.categoria.findFirst({
    where: { id, idUsuario },
  });
};

export const crear = async (datos) => {
  return prisma.categoria.create({ data: datos });
};

export const actualizar = async (id, datos) => {
  return prisma.categoria.update({ where: { id }, data: datos });
};

export const eliminar = async (id) => {
  return prisma.categoria.delete({ where: { id } });
};

export const contarTransacciones = async (idCategoria) => {
  return prisma.transaccion.count({ where: { idCategoria } });
};

export const contarPresupuestos = async (idCategoria) => {
  return prisma.presupuesto.count({ where: { idCategoria } });
};
