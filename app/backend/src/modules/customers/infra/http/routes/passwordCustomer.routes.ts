import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordCustomerRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordCustomerRouter.post('/forgot', forgotPasswordController.create);
passwordCustomerRouter.post('/reset', resetPasswordController.create);

export default passwordCustomerRouter;
