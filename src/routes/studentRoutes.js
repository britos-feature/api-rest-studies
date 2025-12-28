import { Router } from 'express';
import StudentControllers from '../controllers/StudentControllers';

const routes = new Router();

routes.get('/', StudentControllers.index);
routes.post('/', StudentControllers.store);
routes.get('/:id', StudentControllers.show);
routes.put('/:id', StudentControllers.update);
routes.delete('/:id', StudentControllers.delete);
export default routes;
