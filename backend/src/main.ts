import 'dotenv/config';
import 'reflect-metadata';

import { config } from './config';
import dataSource from './infra/database/data-source';
import { createServer } from './server';

void (async () => {
  try {
    const server = await createServer();

    await dataSource.initialize();
    await server.ready();
    await server.listen({ port: config.app.port, host: '0.0.0.0' });
  } catch (error) {
    console.error('Server startup error:', error);
  }
})();
