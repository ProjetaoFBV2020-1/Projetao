import Router from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import CustomerController from '../controllers/CustomerController';
import SetInactiveControler from '../controllers/SetInactiveControler';
import CustomerAvatarController from '../controllers/CustomerAvatarController';

const customersRouter = Router();
const upload = multer(uploadConfig);

const customerController = new CustomerController();
const setInactiveControler = new SetInactiveControler();
const customerAvatarController = new CustomerAvatarController();

customersRouter.post('/', customerController.create);

customersRouter.get('/', customerController.index);

customersRouter.patch(
    '/',
    ensureAuthenticated,
    setInactiveControler.setInactive,
);

customersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    customerAvatarController.update,
);

export default customersRouter;
