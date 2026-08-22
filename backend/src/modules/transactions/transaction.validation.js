import { z } from 'zod';

const tiposTransaccion = ['INGRESO', 'GASTO'];
const frecuencias = ['SEMANAL', 'MENSUAL', 'ANUAL'];

export const esquemaCrearTransaccion = z.object({
  idCuenta: z.string().uuid('ID de cuenta inválido'),
  idCategoria: z.string().uuid('ID de categoria inválido'),
  tipo: z.enum(tiposTransaccion, { message: 'Tipo de transacción inválido' }),
  monto: z.number({ message: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
  descripcion: z.string().max(255, 'La descripcion no puede exceder 255 caracteres').optional(),
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  esRecurrente: z.boolean().default(false),
  frecuenciaRecurrencia: z.enum(frecuencias).optional(),
}).refine(
  (datos) => {
    if (datos.esRecurrente && !datos.frecuenciaRecurrencia) return false;
    if (!datos.esRecurrente && datos.frecuenciaRecurrencia) return false;
    return true;
  },
  { message: 'Si es recurrente, debe especificar frecuencia. Si no es recurrente, no debe tener frecuencia.' },
);

export const esquemaActualizarTransaccion = z.object({
  idCuenta: z.string().uuid('ID de cuenta inválido').optional(),
  idCategoria: z.string().uuid('ID de categoría inválido').optional(),
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

export const esquemaFiltros = z.object({
  fechaInicio: z.string().optional(),
  fechaFin: z.string().optional(),
  idCategoria: z.string().uuid().optional(),
  idCuenta: z.string().uuid().optional(),
  montoMin: z.coerce.number().optional(),
  montoMax: z.coerce.number().optional(),
});
