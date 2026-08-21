import bcrypt from 'bcrypt';
import { configuracion } from '../config/env.js';

// hashear una contraseña usando bcrypt
export const hashearContrasena = async (contrasena) => {
  return bcrypt.hash(contrasena, configuracion.bcrypt.saltRounds);
};

// compara una contraseña con su hash
export const compararContrasenas = async (contrasena, hash) => {
  return bcrypt.compare(contrasena, hash);
};
