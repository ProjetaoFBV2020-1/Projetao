import Router from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import CompanyController from '../controllers/CompanyController';
import CompanyAvatarController from '../controllers/CompanyAvatarController';

const companiesRouter = Router();
const upload = multer(uploadConfig);

const companyController = new CompanyController();
const companyAvatarController = new CompanyAvatarController();

companiesRouter.post('/', companyController.create);

companiesRouter.get('/', ensureAuthenticated, companyController.index);

// Inativar empresa
companiesRouter.patch('/', ensureAuthenticated, companyController.setInactive);

companiesRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    companyAvatarController.update,
);

export default companiesRouter;
