import express, { urlencoded } from 'express';
import routes from './routes.js';

class Server {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new Server().express;