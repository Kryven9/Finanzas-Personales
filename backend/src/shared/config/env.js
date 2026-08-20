import dotenv from 'dotenv';

dotenv.config();

export const configuracion = {
  puerto: process.env.PORT || 4000,
  entorno: process.env.NODE_ENV || 'development',
  baseDatos: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secreto: process.env.JWT_SECRET,
    expiracion: process.env.JWT_EXPIRATION || '7d',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  },
};
