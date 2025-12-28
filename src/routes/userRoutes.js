import { Router } from 'express';
import UserControllers from '../controllers/UserControllers';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

// OPCIONAL
routes.get('/', UserControllers.index);
routes.get('/:id', UserControllers.show);

routes.post('/', UserControllers.store);
routes.put('/', loginRequired, UserControllers.update);
routes.delete('/', loginRequired, UserControllers.delete);
export default routes;
