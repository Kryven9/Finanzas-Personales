import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriasPredefinidas = [
  // Categorías de gasto
  { nombre: 'Alimentación', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Transporte', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Vivienda', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Servicios', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Salud', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Educación', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Entretenimiento', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Ropa', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Tecnología', tipo: 'GASTO', esPredefinida: true },
  { nombre: 'Otros Gastos', tipo: 'GASTO', esPredefinida: true },

  // Categorías de ingreso
  { nombre: 'Salario', tipo: 'INGRESO', esPredefinida: true },
  { nombre: 'Freelance', tipo: 'INGRESO', esPredefinida: true },
  { nombre: 'Inversiones', tipo: 'INGRESO', esPredefinida: true },
  { nombre: 'Otros Ingresos', tipo: 'INGRESO', esPredefinida: true },
];

const semilla = async () => {
  console.log('Creando categorías predefinidas...');

  for (const categoria of categoriasPredefinidas) {
    const existente = await prisma.categoria.findFirst({
      where: {
        nombre: categoria.nombre,
        esPredefinida: true,
      },
    });

    if (!existente) {
      await prisma.categoria.create({
        data: {
          nombre: categoria.nombre,
          tipo: categoria.tipo,
          esPredefinida: categoria.esPredefinida,
        },
      });
      console.log(`  ✓ Categoría creada: ${categoria.nombre}`);
    } else {
      console.log(`  - Categoría ya existe: ${categoria.nombre}`);
    }
  }

  console.log('Seed completado.');
};

semilla()
  .catch((error) => {
    console.error('Error durante el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
