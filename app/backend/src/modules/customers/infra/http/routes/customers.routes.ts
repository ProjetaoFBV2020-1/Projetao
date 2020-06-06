import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import CustomerController from '../controllers/CustomerController';
import SetInactiveControler from '../controllers/SetInactiveControler';

const customersRouter = Router();
const customerController = new CustomerController();
const setInactiveControler = new SetInactiveControler();

customersRouter.post('/', customerController.create);

customersRouter.get('/', customerController.index);

customersRouter.put('/', customerController.update);

customersRouter.patch(
    '/',
    ensureAuthenticated,
    setInactiveControler.setInactive,
);

export default customersRouter;
