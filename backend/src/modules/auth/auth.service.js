import * as authRepository from './auth.repository.js';
import { hashearContrasena, compararContrasenas } from '../../shared/utils/hash.js';
import { generarToken } from '../../shared/utils/jwt.js';

// Registrar un nuevo usuario
// Validar que el correo no este en uso, hashea la contraseña y genera un JWT
export const registrar = async ({ nombre, correo, contrasena }) => {
  const existente = await authRepository.buscarPorCorreo(correo);

  if (existente) {
    const error = new Error('El correo ya esta registrado');
    error.statusCode = 409;
    throw error;
  }

  const contrasenaHash = await hashearContrasena(contrasena);

  const usuario = await authRepository.crear({ nombre, correo, contrasenaHash });

  const token = generarToken(usuario.id);

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
    },
    token,
  };
};

// Inicia sesion con correo y contraseña
// retorna el usuario y un JWT
export const iniciarSesion = async ({ correo, contrasena }) => {
  const usuario = await authRepository.buscarPorCorreo(correo);

  if (!usuario) {
    const error = new Error('Credenciales invalidas');
    error.statusCode = 401;
    throw error;
  }

  const contrasenaValida = await compararContrasenas(contrasena, usuario.contrasenaHash);

  if (!contrasenaValida) {
    const error = new Error('Credenciales invalidas');
    error.statusCode = 401;
    throw error;
  }

  const token = generarToken(usuario.id);

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
    },
    token,
  };
};
