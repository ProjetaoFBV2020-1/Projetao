import Router from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import CompanyController from '../controllers/CompanyController';

const companiesRouter = Router();
const companyController = new CompanyController();

companiesRouter.post('/', companyController.create);

companiesRouter.get('/', ensureAuthenticated, companyController.index);

// Inativar empresa
companiesRouter.patch('/', ensureAuthenticated, companyController.setInactive);

export default companiesRouter;
