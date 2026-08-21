import { Router } from 'express';
import { crear, listar, obtener, actualizar, eliminar, patrimonioNeto } from './account.controller.js';
import { esquemaCrearCuenta, esquemaActualizarCuenta } from './account.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.use(autenticar);

router.get('/net-worth', patrimonioNeto);
router.post('/', validar(esquemaCrearCuenta), crear);
router.get('/', listar);
router.get('/:id', obtener);
router.patch('/:id', validar(esquemaActualizarCuenta), actualizar);
router.delete('/:id', eliminar);

export default router;
