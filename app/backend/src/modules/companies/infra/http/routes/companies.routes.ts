import Router from 'express';

import CompanyController from '../controllers/CompanyController';

const companiesRouter = Router();
const companyController = new CompanyController();

companiesRouter.post('/', companyController.create);

export default companiesRouter;
