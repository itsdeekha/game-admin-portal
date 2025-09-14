export const database = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL_ENABLED === 'true',
  max: parseInt(process.env.DATABASE_MAX_CONNECTIONS!),
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
};
