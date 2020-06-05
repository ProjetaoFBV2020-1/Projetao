import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import CustomerController from '../controllers/CustomerController';

const customersRouter = Router();
const customerController = new CustomerController();

customersRouter.post('/', customerController.create);

customersRouter.patch('/', ensureAuthenticated, customerController.setInactive);

export default customersRouter;
