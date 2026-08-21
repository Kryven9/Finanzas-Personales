import * as accountRepository from './account.repository.js';

// crear una cuenta para el usuario
export const crearCuenta = async (idUsuario, datos) => {
  const cuenta = await accountRepository.crear({ ...datos, idUsuario });
  return cuenta;
};

// listar todas las cuentas del usuario con saldo actual
export const listarCuentas = async (idUsuario) => {
  const cuentas = await accountRepository.listarPorUsuario(idUsuario);

  const cuentasConSaldo = await Promise.all(
    cuentas.map(async (cuenta) => {
      const saldo = await accountRepository.calcularSaldoActual(cuenta.id);
      return { ...cuenta, saldoActual: saldo };
    }),
  );

  return cuentasConSaldo;
};

// obtener detalle de una cuenta con saldo
export const obtenerCuenta = async (idUsuario, idCuenta) => {
  const cuenta = await accountRepository.buscarPorIdYUsuario(idCuenta, idUsuario);

  if (!cuenta) {
    const error = new Error('Cuenta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  const saldo = await accountRepository.calcularSaldoActual(idCuenta);
  return { ...cuenta, saldoActual: saldo };
};

// actualizar cuenta solo nombre y tipo
export const actualizarCuenta = async (idUsuario, idCuenta, datos) => {
  const cuenta = await accountRepository.buscarPorIdYUsuario(idCuenta, idUsuario);

  if (!cuenta) {
    const error = new Error('Cuenta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return accountRepository.actualizar(idCuenta, datos);
};

// eliminar cuenta pero bloquear si tiene transacciones
export const eliminarCuenta = async (idUsuario, idCuenta) => {
  const cuenta = await accountRepository.buscarPorIdYUsuario(idCuenta, idUsuario);

  if (!cuenta) {
    const error = new Error('Cuenta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  const totalTransacciones = await accountRepository.contarTransacciones(idCuenta);

  if (totalTransacciones > 0) {
    const error = new Error(
      'No se puede eliminar la cuenta porque tiene transacciones asociadas. Elimine o reasigne las transacciones primero.',
    );
    error.statusCode = 409;
    throw error;
  }

  return accountRepository.eliminar(idCuenta);
};

// patrimonio neto total del usuario, es la suma de saldos
export const obtenerPatrimonioNeto = async (idUsuario) => {
  return accountRepository.calcularPatrimonioNeto(idUsuario);
};
