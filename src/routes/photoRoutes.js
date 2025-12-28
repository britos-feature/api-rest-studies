import { Router } from 'express';
import PhotoControllers from '../controllers/PhotoControllers';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.post('/', loginRequired, PhotoControllers.store);

export default routes;
