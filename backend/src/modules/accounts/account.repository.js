import { prisma } from '../../shared/config/prisma-client.js';

export const crear = async (datos) => {
  return prisma.cuenta.create({ data: datos });
};

export const buscarPorIdYUsuario = async (id, idUsuario) => {
  return prisma.cuenta.findFirst({ where: { id, idUsuario } });
};

export const listarPorUsuario = async (idUsuario) => {
  return prisma.cuenta.findMany({
    where: { idUsuario },
    orderBy: { fechaCreacion: 'desc' },
  });
};

export const actualizar = async (id, datos) => {
  return prisma.cuenta.update({ where: { id }, data: datos });
};

export const eliminar = async (id) => {
  return prisma.cuenta.delete({ where: { id } });
};

export const contarTransacciones = async (idCuenta) => {
  return prisma.transaccion.count({ where: { idCuenta } });
};

export const calcularSaldoActual = async (idCuenta) => {
  const cuenta = await prisma.cuenta.findUnique({ where: { id: idCuenta } });

  if (!cuenta) return null;

  const resultado = await prisma.transaccion.aggregate({
    where: { idCuenta },
    _sum: { monto: true },
  });

  const sumaTransacciones = resultado._sum.monto || 0;
  return Number(cuenta.saldoInicial) + Number(sumaTransacciones);
};

export const calcularPatrimonioNeto = async (idUsuario) => {
  const cuentas = await prisma.cuenta.findMany({
    where: { idUsuario },
    include: {
      transacciones: { select: { monto: true } },
    },
  });

  return cuentas.reduce((total, cuenta) => {
    const sumaTransacciones = cuenta.transacciones.reduce((sum, t) => sum + Number(t.monto), 0);
    return total + Number(cuenta.saldoInicial) + sumaTransacciones;
  }, 0);
};
