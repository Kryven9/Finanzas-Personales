import { z } from 'zod';

const tiposTransaccion = ['INGRESO', 'GASTO'];
const frecuencias = ['SEMANAL', 'MENSUAL', 'ANUAL'];

export const esquemaCrearTransaccion = z.object({
  idCuenta: z.string().min(1, 'La cuenta es requerida'),
  idCategoria: z.string().min(1, 'La categoría es requerida'),
  tipo: z.enum(tiposTransaccion, { message: 'Tipo de transacción inválido' }),
  monto: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
  descripcion: z.string().max(255, 'La descripción no puede exceder 255 caracteres').optional(),
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  esRecurrente: z.boolean().default(false),
  frecuenciaRecurrencia: z.enum(frecuencias).optional(),
}).refine(
  (datos) => {
    if (datos.esRecurrente && !datos.frecuenciaRecurrencia) return false;
    if (!datos.esRecurrente && datos.frecuenciaRecurrencia) return false;
    return true;
  },
  { message: 'Si es recurrente, debe especificar frecuencia' },
);

export const esquemaActualizarTransaccion = z.object({
  idCuenta: z.string().min(1, 'La cuenta es requerida').optional(),
  idCategoria: z.string().min(1, 'La categoría es requerida').optional(),
  tipo: z.enum(tiposTransaccion, { message: 'Tipo de transacción inválido' }).optional(),
  monto: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0').optional(),
  descripcion: z.string().max(255, 'La descripción no puede exceder 255 caracteres').optional(),
  fecha: z.string().or(z.date()).optional(),
  esRecurrente: z.boolean().optional(),
  frecuenciaRecurrencia: z.enum(frecuencias).optional(),
}).refine(
  (datos) => Object.keys(datos).length > 0,
  { message: 'Debe proporcionar al menos un campo para actualizar' },
);
