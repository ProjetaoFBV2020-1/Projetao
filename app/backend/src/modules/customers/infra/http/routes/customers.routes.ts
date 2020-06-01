import { Router } from 'express';

import CustomerController from '../controllers/CustomerController';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const customersRouter = Router();
const customerController = new CustomerController();

customersRouter.post('/', customerController.create);

export default customersRouter;
