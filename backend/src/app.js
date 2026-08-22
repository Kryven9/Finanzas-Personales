import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { manejarErrores } from './shared/middlewares/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import accountRoutes from './modules/accounts/account.routes.js';
import categoryRoutes from './modules/categories/category.routes.js';
import transactionRoutes from './modules/transactions/transaction.routes.js';

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ data: { status: 'ok' }, error: null });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Middleware de manejo de errores
app.use(manejarErrores);

export default app;
