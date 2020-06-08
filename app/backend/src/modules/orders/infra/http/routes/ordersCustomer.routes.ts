import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

// import Order_item from '../models/Order_item';

import OrderCustomerController from '../controllers/OrderCustomerController';

const ordersCustomerRouter = Router();
const orderCustomerController = new OrderCustomerController();

ordersCustomerRouter.use(ensureAuthenticated);

ordersCustomerRouter.get('/', orderCustomerController.index);

ordersCustomerRouter.post('/', orderCustomerController.create);

export default ordersCustomerRouter;
