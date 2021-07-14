import dotenv from 'dotenv';
import {resolve} from 'path';

dotenv.config();

import './database';

import express from 'express';

import home from './routes/home';
import student from './routes/student';
import photo from './routes/Photo';
import user from './routes/user';
import token from './routes/token';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/student/', student);
    this.app.use('/photo/', photo);
    this.app.use('/token/', token);
  }
}

export default new App().app;
