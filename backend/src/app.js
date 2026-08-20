import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { manejarErrores } from './shared/middlewares/error.middleware.js';

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ data: { status: 'ok' }, error: null });
});

// Middleware de manejo de errores
app.use(manejarErrores);

export default app;
