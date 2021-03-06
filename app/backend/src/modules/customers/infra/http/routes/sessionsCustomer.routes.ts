import { Router } from 'express';

import SessionsCustomerController from '../controllers/SessionsCustomerController';

const sessionsCustomerRouter = Router();
const sessionsCustomerController = new SessionsCustomerController();

sessionsCustomerRouter.post('/', sessionsCustomerController.create);

export default sessionsCustomerRouter;
