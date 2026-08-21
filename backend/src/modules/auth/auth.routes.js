import { Router } from 'express';
import { registrar, iniciarSesion, cerrarSesion } from './auth.controller.js';
import { esquemaRegistro, esquemaLogin } from './auth.validation.js';
import { validar } from '../../shared/middlewares/validate.middleware.js';
import { autenticar } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validar(esquemaRegistro), registrar);
router.post('/login', validar(esquemaLogin), iniciarSesion);
router.post('/logout', autenticar, cerrarSesion);

export default router;
