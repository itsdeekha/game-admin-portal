import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { config } from '~/config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  dropSchema: false,
  logging: !config.app.isProd,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  extra: {
    // based on https://node-postgres.com/apis/pool
    // max connection pool size
    max: config.database.max,
    ssl: config.database.ssl
      ? {
          rejectUnauthorized: config.database.rejectUnauthorized,
          ca: config.database.ca ?? undefined,
          key: config.database.key ?? undefined,
          cert: config.database.cert ?? undefined,
        }
      : undefined,
  },
});

export default dataSource;
