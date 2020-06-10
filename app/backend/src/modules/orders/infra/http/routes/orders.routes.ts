import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import OrderController from '../controllers/OrderController';

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', orderController.show);

export default ordersRouter;
