import * as userRepository from './user.repository.js';
import { hashearContrasena } from '../../shared/utils/hash.js';

// obtiene el perfil del usuario por ID
export const obtenerPerfil = async (idUsuario) => {
  const usuario = await userRepository.buscarPorIdSelect(idUsuario);

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return usuario;
};

// Actualiza el perfil del usuario
// si se cambia el correo, se valida que no este en uso
// si se cambia la contraseña, se hashea la nueva
export const actualizarPerfil = async (idUsuario, datos) => {
  const usuario = await userRepository.buscarPorId(idUsuario);

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  // validar correo unico si se esta cambiando
  if (datos.correo && datos.correo !== usuario.correo) {
    const existente = await userRepository.buscarPorCorreo(datos.correo);

    if (existente) {
      const error = new Error('El correo ya está en uso');
      error.statusCode = 409;
      throw error;
    }
  }

  const datosActualizar = { ...datos };

  // hashear contraseña si se proporciona
  if (datosActualizar.contrasena) {
    datosActualizar.contrasenaHash = await hashearContrasena(datosActualizar.contrasena);
    delete datosActualizar.contrasena;
  }

  return userRepository.actualizar(idUsuario, datosActualizar);
};
