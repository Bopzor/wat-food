import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import App from '../app';

import 'reflect-metadata';

const PORT = process.env.TEST_PORT;

export class TestFactory {
  private _app: Application;
  private _connection: Connection;
  private _server: HttpServer;

  private options: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
  };

  public get app(): SuperTest<Test> {
    return supertest(this._app);
  }

  public get connection(): Connection {
    return this._connection;
  }

  public get server(): HttpServer {
    return this._server;
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    this._server.close();
    await this._connection.close();
  }

  private async startup(): Promise<void> {
    this._connection = await createConnection(this.options);
    this._app = new App().app;
    this._server = createServer(this._app).listen(PORT);
  }
}
