import { Router } from 'express';

import SessionsCustomerController from '../controllers/SessionsCustomerController';

const sessionsCustomerRouter = Router();
const sessionsCustomerController = new SessionsCustomerController();

<<<<<<< HEAD
sessionsCustomerRouter.post('/customers', sessionsCustomerController.create);
=======
sessionsCustomerRouter.post('/', sessionsCustomerController.create);
>>>>>>> 335d7dc5ee9018376201d6c8ca32ddd466e430f9

export default sessionsCustomerRouter;
