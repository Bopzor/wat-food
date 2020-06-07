import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Connection, createConnection } from 'typeorm';

import App from './app';

const PORT = process.env.PORT || 3000;

export const app = new App().app;

const main = async () => {
  try {
    const connection: Connection = await createConnection();

    const app: Application = new App().app;

    const server: HttpServer = createServer(app).listen(PORT);

    server.on('listening', () => console.log(`App listening on ${PORT}`));

    server.on('close', () => {
      console.log('App closed');
      void connection.close();
    });
  } catch (err) {
    console.log(err);
  }
};

main().catch(console.error);
