import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileCompanyController';

const profileCompanyRouter = Router();
const profileController = new ProfileController();

profileCompanyRouter.use(ensureAuthenticated);

profileCompanyRouter.put('/', profileController.update);
profileCompanyRouter.get('/', profileController.show);

export default profileCompanyRouter;
