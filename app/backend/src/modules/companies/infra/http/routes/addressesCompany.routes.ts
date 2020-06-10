import Router from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AddressCompanyController from '../controllers/AddressCompanyController';

const addressCompanyRouter = Router();

const addressCompanyController = new AddressCompanyController();

addressCompanyRouter.post(
    '/',
    ensureAuthenticated,
    addressCompanyController.create,
);

addressCompanyRouter.get(
    '/',
    ensureAuthenticated,
    addressCompanyController.index,
);

addressCompanyRouter.put(
    '/',
    ensureAuthenticated,
    addressCompanyController.update,
);

addressCompanyRouter.delete(
    '/',
    ensureAuthenticated,
    addressCompanyController.delete,
);

export default addressCompanyRouter;
