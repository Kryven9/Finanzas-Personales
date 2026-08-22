import { Router } from 'express';
import {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
  listarRecurrentes,
  desactivarRecurrencia,
} from './transaction.controller.js';
import { esquemaCrearTransaccion, esquemaActualizarTransaccion } from './transaction.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.use(autenticar);

router.get('/recurring', listarRecurrentes);
router.post('/', validar(esquemaCrearTransaccion), crear);
router.get('/', listar);
router.get('/:id', obtener);
router.patch('/:id', validar(esquemaActualizarTransaccion), actualizar);
router.patch('/:id/disable-recurrence', desactivarRecurrencia);
router.delete('/:id', eliminar);

export default router;
