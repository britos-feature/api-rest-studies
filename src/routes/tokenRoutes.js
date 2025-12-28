import { Router } from 'express';
import TokenControllers from '../controllers/TokenControllers';

const routes = new Router();

routes.post('/', TokenControllers.store);

export default routes;
