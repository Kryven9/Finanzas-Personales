import { z } from 'zod';

export const esquemaCrearPresupuesto = z.object({
  idCategoria: z.string().min(1, 'La categoría es requerida'),
  montoLimite: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
  mes: z.number().int().min(1).max(12),
  anio: z.number().int().min(2020).max(2100),
});

export const esquemaActualizarPresupuesto = z.object({
  montoLimite: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
});
