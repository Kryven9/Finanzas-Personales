import * as categoryRepository from './category.repository.js';

// listar categorias predefinidas mas las propias del usuario
export const listarCategorias = async (idUsuario) => {
  return categoryRepository.listarPorUsuario(idUsuario);
};

// crear categoria personalizada
export const crearCategoria = async (idUsuario, datos) => {
  return categoryRepository.crear({ ...datos, idUsuario });
};

// editar categoria solo las propias y no las predefinidas
export const actualizarCategoria = async (idUsuario, idCategoria, datos) => {
  const categoria = await categoryRepository.buscarPorIdYUsuario(idCategoria, idUsuario);

  if (!categoria) {
    const error = new Error('Categoria no encontrada');
    error.statusCode = 404;
    throw error;
  }

  if (categoria.esPredefinida) {
    const error = new Error('No se pueden editar categorias predefinidas');
    error.statusCode = 403;
    throw error;
  }

  return categoryRepository.actualizar(idCategoria, datos);
};

// eliminar categoria
// bloquear si es predefinida
// bloquear si tiene transacciones o presupuestos asociados
export const eliminarCategoria = async (idUsuario, idCategoria) => {
  const categoria = await categoryRepository.buscarPorIdYUsuario(idCategoria, idUsuario);

  if (!categoria) {
    const error = new Error('Categoria no encontrada');
    error.statusCode = 404;
    throw error;
  }

  if (categoria.esPredefinida) {
    const error = new Error('No se pueden eliminar categorias predefinidas');
    error.statusCode = 403;
    throw error;
  }

  const [transacciones, presupuestos] = await Promise.all([
    categoryRepository.contarTransacciones(idCategoria),
    categoryRepository.contarPresupuestos(idCategoria),
  ]);

  if (transacciones > 0 || presupuestos > 0) {
    const motivos = [];
    if (transacciones > 0) motivos.push(`${transacciones} transaccion(es)`);
    if (presupuestos > 0) motivos.push(`${presupuestos} presupuesto(s)`);

    const error = new Error(
      `No se puede eliminar la categoria porque tiene ${motivos.join(' y ')} asociados. Elimine o reclasifique dichos registros primero`,
    );
    error.statusCode = 409;
    throw error;
  }

  return categoryRepository.eliminar(idCategoria);
};
