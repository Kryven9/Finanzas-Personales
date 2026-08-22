import { z } from 'zod';

const tiposCategoria = ['INGRESO', 'GASTO'];

export const esquemaCrearCategoria = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  tipo: z.enum(tiposCategoria, { message: 'Tipo de categoría inválido' }),
});

export const esquemaActualizarCategoria = z
  .object({
    nombre: z
      .string()
      .min(1, 'El nombre es requerido')
      .max(100, 'El nombre no puede exceder 100 caracteres')
      .optional(),
    tipo: z.enum(tiposCategoria, { message: 'Tipo de categoría inválido' }).optional(),
  })
  .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe proporcionar al menos un campo para actualizar',
  });
