export const app = {
  port: parseInt(process.env.APP_PORT!),
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? [],
};
