import { z } from 'zod';

const tiposCuenta = ['EFECTIVO', 'BANCO', 'TARJETA_CREDITO', 'OTRO'];

export const esquemaCrearCuenta = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  tipo: z.enum(tiposCuenta, { message: 'Tipo de cuenta inválido' }),
  saldoInicial: z
    .number({ message: 'El saldo debe ser un número' })
    .min(0, 'El saldo inicial no puede ser negativo')
    .default(0),
});

export const esquemaActualizarCuenta = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),
  tipo: z.enum(tiposCuenta, { message: 'Tipo de cuenta inválido' }).optional(),
  saldoInicial: z
    .number({ message: 'El saldo debe ser un número' })
    .min(0, 'El saldo inicial no puede ser negativo')
    .optional(),
}).refine(
  (datos) => Object.keys(datos).length > 0,
  { message: 'Debe proporcionar al menos un campo para actualizar' },
);
