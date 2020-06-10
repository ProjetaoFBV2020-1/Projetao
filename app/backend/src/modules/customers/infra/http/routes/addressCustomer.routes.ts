import Router from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AddressCustomerController from '../controllers/AddressCustomerController';

const addressCustomerRouter = Router();

const addressCustomerController = new AddressCustomerController();

addressCustomerRouter.use(ensureAuthenticated);

addressCustomerRouter.post('/', addressCustomerController.create);

addressCustomerRouter.get('/', addressCustomerController.index);

addressCustomerRouter.get('/show', addressCustomerController.show);

addressCustomerRouter.put('/', addressCustomerController.update);

addressCustomerRouter.delete('/', addressCustomerController.delete);

export default addressCustomerRouter;
