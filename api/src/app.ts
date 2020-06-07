import express, { Application, NextFunction, Request, Response } from 'express';

const VERSION = process.env.npm_package_version;

class App {
  private readonly _app: Application = express();

  constructor() {
    this.init();
  }

  private init() {
    this._app.use(express.json());

    this._app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send({ version: VERSION });
      next();
    });

    this._app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      res.send(500).send(error);
      next();
    });
  }

  public get app(): Application {
    return this._app;
  }
}

export default App;
