import * as categoryService from './category.service.js';

// GET /api/categories
export const listar = async (req, res, next) => {
  try {
    const categorias = await categoryService.listarCategorias(req.userId);
    res.json({ data: categorias, error: null });
  } catch (error) {
    next(error);
  }
};

// POST /api/categories
export const crear = async (req, res, next) => {
  try {
    const categoria = await categoryService.crearCategoria(req.userId, req.body);
    res.status(201).json({ data: categoria, error: null });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/categories/:id
export const actualizar = async (req, res, next) => {
  try {
    const categoria = await categoryService.actualizarCategoria(req.userId, req.params.id, req.body);
    res.json({ data: categoria, error: null });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id
export const eliminar = async (req, res, next) => {
  try {
    await categoryService.eliminarCategoria(req.userId, req.params.id);
    res.json({ data: { mensaje: 'Categoria eliminada correctamente' }, error: null });
  } catch (error) {
    next(error);
  }
};
