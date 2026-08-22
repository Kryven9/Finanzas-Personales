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
    _avg: { monto: true },
  });

  // sumar ingresos, restar gastos
  const ingresos = await prisma.transaccion.aggregate({
    where: { idCuenta, tipo: 'INGRESO' },
    _sum: { monto: true },
  });

  const gastos = await prisma.transaccion.aggregate({
    where: { idCuenta, tipo: 'GASTO' },
    _sum: { monto: true },
  });

  const totalIngresos = Number(ingresos._sum.monto || 0);
  const totalGastos = Number(gastos._sum.monto || 0);

  return Number(cuenta.saldoInicial) + totalIngresos - totalGastos;
};

export const calcularPatrimonioNeto = async (idUsuario) => {
  const cuentas = await prisma.cuenta.findMany({
    where: { idUsuario },
    include: {
      transacciones: { select: { monto: true, tipo: true } },
    },
  });

  return cuentas.reduce((total, cuenta) => {
    const balance = cuenta.transacciones.reduce((sum, t) => {
      return t.tipo === 'INGRESO' ? sum + Number(t.monto) : sum - Number(t.monto);
    }, 0);
    return total + Number(cuenta.saldoInicial) + balance;
  }, 0);
};
