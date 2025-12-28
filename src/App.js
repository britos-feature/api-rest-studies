import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';
import studentRoutes from './routes/studentRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import photoRoutes from './routes/photoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/std', studentRoutes);
    this.app.use('/usr', userRoutes);
    this.app.use('/tk', tokenRoutes);
    this.app.use('/ph', photoRoutes);
  }
}

export default new App().app;
