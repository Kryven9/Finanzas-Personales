export const manejarErrores = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    data: null,
    error: mensaje,
  });
};
