import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileCustomerController';

const profileCustomerRouter = Router();
const profileController = new ProfileController();

profileCustomerRouter.use(ensureAuthenticated);

profileCustomerRouter.put('/', profileController.update);
profileCustomerRouter.get('/', profileController.show);

export default profileCustomerRouter;
