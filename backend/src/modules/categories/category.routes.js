import { Router } from 'express';
import { listar, crear, actualizar, eliminar } from './category.controller.js';
import { esquemaCrearCategoria, esquemaActualizarCategoria } from './category.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.use(autenticar);

router.get('/', listar);
router.post('/', validar(esquemaCrearCategoria), crear);
router.patch('/:id', validar(esquemaActualizarCategoria), actualizar);
router.delete('/:id', eliminar);

export default router;
