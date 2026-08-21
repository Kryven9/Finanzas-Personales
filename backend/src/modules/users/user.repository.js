import { prisma } from '../../shared/config/prisma-client.js';

export const buscarPorId = async (id) => {
  return prisma.usuario.findUnique({ where: { id } });
};

export const buscarPorIdSelect = async (id) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      correo: true,
      fechaCreacion: true,
      fechaActualizacion: true,
    },
  });
};

export const buscarPorCorreo = async (correo) => {
  return prisma.usuario.findUnique({ where: { correo } });
};

export const actualizar = async (id, datos) => {
  return prisma.usuario.update({
    where: { id },
    data: datos,
    select: {
      id: true,
      nombre: true,
      correo: true,
      fechaCreacion: true,
      fechaActualizacion: true,
    },
  });
};
