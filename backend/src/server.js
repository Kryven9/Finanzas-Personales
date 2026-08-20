import app from './app.js';
import { configuracion } from './shared/config/env.js';

const inicio = async () => {
  try {
    app.listen(configuracion.puerto, () => {
      console.log(`Servidor ejecutandose en el puerto ${configuracion.puerto}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

inicio();
