import { verificarToken } from '../utils/jwt.js';

// Middleware de autenticacion JWT
// verifica el token y inyecta req.userId con el id del usuario
export const autenticar = (req, res, next) => {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith('Bearer ')) {
    return res.status(401).json({
      data: null,
      error: 'Token de autenticacion requerido',
    });
  }

  const token = encabezado.split(' ')[1];

  try {
    const decodificado = verificarToken(token);
    req.userId = decodificado.id;
    next();
  } catch {
    return res.status(401).json({
      data: null,
      error: 'Token invalido o expirado',
    });
  }
};
