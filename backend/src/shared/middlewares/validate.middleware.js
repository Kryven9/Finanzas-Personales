// Middleware de validacion de payloads usando Zod
// recibe un esquema Zod y valida el body de la peticion
export const validar = (esquema) => {
  return (req, res, next) => {
    const resultado = esquema.safeParse(req.body);

    if (!resultado.success) {
      const errores = resultado.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensaje: issue.message,
      }));

      return res.status(400).json({
        data: null,
        error: 'Datos de entrada invalidos',
        detalles: errores,
      });
    }

    req.body = resultado.data;
    next();
  };
};
