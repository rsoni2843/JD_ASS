import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '../config/env';
import { join } from 'path';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [join(__dirname, 'entities', '*.js')],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
  synchronize: true, // Auto-generate and apply database schema changes in development (avoid in production)
};

export default ormConfig;
