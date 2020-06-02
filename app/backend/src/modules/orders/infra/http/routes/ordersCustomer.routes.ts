import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
// import Order_item from '../models/Order_item';

import OrderController from '../controllers/OrderController';

const ordersCustomerRouter = Router();
const orderController = new OrderController();

ordersCustomerRouter.use(ensureAuthenticated);

ordersCustomerRouter.get('/', async (request, response) => {
    return response.json({ ok: true });
});

ordersCustomerRouter.post('/', orderController.create);

export default ordersCustomerRouter;
