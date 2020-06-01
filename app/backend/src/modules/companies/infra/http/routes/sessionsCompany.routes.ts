import { Router } from 'express';

import SessionsCompanyController from '../controllers/SessionsCompanyController';

const sessionsCompanyRouter = Router();
const sessionsCompanyController = new SessionsCompanyController();

sessionsCompanyRouter.post('/companies', sessionsCompanyController.create);
export default sessionsCompanyRouter;
