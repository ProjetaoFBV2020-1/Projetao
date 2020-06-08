import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordCompanyRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordCompanyRouter.post('/forgot', forgotPasswordController.create);
passwordCompanyRouter.post('/reset', resetPasswordController.create);

export default passwordCompanyRouter;
