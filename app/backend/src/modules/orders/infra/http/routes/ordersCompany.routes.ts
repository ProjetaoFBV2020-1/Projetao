import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import OrderCompanyController from '../controllers/OrderCompanyController';

const ordersCompanyRouter = Router();
const orderCompanyController = new OrderCompanyController();

ordersCompanyRouter.use(ensureAuthenticated);

ordersCompanyRouter.get('/', orderCompanyController.index);

ordersCompanyRouter.patch('/', orderCompanyController.update);

export default ordersCompanyRouter;
