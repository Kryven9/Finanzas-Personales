import { z } from 'zod';

export const esquemaCrearPresupuesto = z.object({
  idCategoria: z.string().uuid('ID de categoría inválido'),
  montoLimite: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
  mes: z.number().int().min(1).max(12, 'Mes inválido (1-12)'),
  anio: z.number().int().min(2020).max(2100, 'Año inválido'),
});

export const esquemaActualizarPresupuesto = z.object({
  montoLimite: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0').optional(),
}).refine(
  (datos) => Object.keys(datos).length > 0,
  { message: 'Debe proporcionar al menos un campo para actualizar' },
);
