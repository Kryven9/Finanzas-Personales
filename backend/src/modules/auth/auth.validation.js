import { z } from 'zod';

export const esquemaRegistro = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  correo: z.string().min(1, 'El correo es requerido').email('Formato de correo invalido'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
});

export const esquemaLogin = z.object({
  correo: z.string().min(1, 'El correo es requerido').email('Formato de correo invalido'),
  contrasena: z.string().min(1, 'La contraseña es requerida'),
});
