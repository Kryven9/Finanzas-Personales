import { Router } from 'express';
import { obtenerPerfil, actualizarPerfil } from './user.controller.js';
import { esquemaActualizarPerfil } from './user.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.use(autenticar);

router.get('/me', obtenerPerfil);
router.patch('/me', validar(esquemaActualizarPerfil), actualizarPerfil);

export default router;
