import * as transactionRepository from './transaction.repository.js';
import { prisma } from '../../shared/config/prisma-client.js';

// crear transacción
export const crearTransaccion = async (idUsuario, datos) => {
  // verificar que la cuenta pertenece al usuario
  const cuenta = await prisma.cuenta.findFirst({
    where: { id: datos.idCuenta, idUsuario },
  });
  if (!cuenta) {
    const error = new Error('Cuenta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  // verificar que la categoria existe
  const categoria = await prisma.categoria.findUnique({ where: { id: datos.idCategoria } });
  if (!categoria) {
    const error = new Error('Categoria no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return transactionRepository.crear({ ...datos, idUsuario });
};

// listar con filtros
export const listarTransacciones = async (idUsuario, filtros) => {
  return transactionRepository.listarPorUsuario(idUsuario, filtros);
};

// obtener detalle
export const obtenerTransaccion = async (idUsuario, idTransaccion) => {
  const transaccion = await transactionRepository.buscarPorIdYUsuario(idTransaccion, idUsuario);
  if (!transaccion) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }
  return transaccion;
};

// editar la transaccion
// si cambia la cuenta o el monto, recalcular saldo de ambas cuentas
export const actualizarTransaccion = async (idUsuario, idTransaccion, datos) => {
  const existente = await transactionRepository.buscarPorIdYUsuario(idTransaccion, idUsuario);
  if (!existente) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  // validar nueva cuenta si se cambia
  if (datos.idCuenta && datos.idCuenta !== existente.idCuenta) {
    const nuevaCuenta = await prisma.cuenta.findFirst({
      where: { id: datos.idCuenta, idUsuario },
    });
    if (!nuevaCuenta) {
      const error = new Error('Cuenta no encontrada');
      error.statusCode = 404;
      throw error;
    }
  }

  return transactionRepository.actualizar(idTransaccion, datos);
};

// eliminar transaccion
export const eliminarTransaccion = async (idUsuario, idTransaccion) => {
  const existente = await transactionRepository.buscarPorIdYUsuario(idTransaccion, idUsuario);
  if (!existente) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return transactionRepository.eliminar(idTransaccion);
};

// listar transacciones recurrentes con proxima fecha
export const listarRecurrentes = async (idUsuario) => {
  const transacciones = await transactionRepository.listarRecurrentes(idUsuario);

  return transacciones.map((t) => {
    const proximaFecha = calcularProximaFecha(t.fecha, t.frecuenciaRecurrencia);
    return { ...t, proximaFecha };
  });
};

// desactivar recurrencia
export const desactivarRecurrencia = async (idUsuario, idTransaccion) => {
  const existente = await transactionRepository.buscarPorIdYUsuario(idTransaccion, idUsuario);
  if (!existente) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  if (!existente.esRecurrente) {
    const error = new Error('La transacción no es recurrente');
    error.statusCode = 400;
    throw error;
  }

  return transactionRepository.desactivarRecurrencia(idTransaccion);
};

// calcular proxima fecha segun frecuencia
const calcularProximaFecha = (fechaBase, frecuencia) => {
  const fecha = new Date(fechaBase);
  switch (frecuencia) {
    case 'SEMANAL':
      fecha.setDate(fecha.getDate() + 7);
      break;
    case 'MENSUAL':
      fecha.setMonth(fecha.getMonth() + 1);
      break;
    case 'ANUAL':
      fecha.setFullYear(fecha.getFullYear() + 1);
      break;
  }
  return fecha;
};
