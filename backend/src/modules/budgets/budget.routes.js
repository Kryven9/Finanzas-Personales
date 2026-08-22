import { Router } from 'express';
import { crear, listar, actualizar, eliminar } from './budget.controller.js';
import { esquemaCrearPresupuesto, esquemaActualizarPresupuesto } from './budget.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.use(autenticar);

router.post('/', validar(esquemaCrearPresupuesto), crear);
router.get('/', listar);
router.patch('/:id', validar(esquemaActualizarPresupuesto), actualizar);
router.delete('/:id', eliminar);

export default router;
