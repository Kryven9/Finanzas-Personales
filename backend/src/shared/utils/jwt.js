import jwt from 'jsonwebtoken';
import { configuracion } from '../config/env.js';

// genera un token jwt con el id del usuario
export const generarToken = (idUsuario) => {
  return jwt.sign({ id: idUsuario }, configuracion.jwt.secreto, {
    expiresIn: configuracion.jwt.expiracion,
  });
};

// verifica y decodifica un token jwt
export const verificarToken = (token) => {
  return jwt.verify(token, configuracion.jwt.secreto);
};
