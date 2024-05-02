import * as dotenv from 'dotenv';
dotenv.config();

export default {
  app: {
    host: process.env.APP_HOST,
    port: +process.env.APP_PORT,
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  passwords: {
    salt: +process.env.SALT_FOR_ENCRYPTION,
  },
  jwt: {
    access_token_secret: process.env.JWT_SECRET,
  },
};
