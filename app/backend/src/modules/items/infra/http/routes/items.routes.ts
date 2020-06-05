import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import ItemController from '../controllers/ItemController';
import ItemImageController from '../controllers/ItemImageController';

const itemsRouter = Router();
const upload = multer(uploadConfig);
const itemController = new ItemController();
const itemImageController = new ItemImageController();

itemsRouter.use(ensureAuthenticated);

itemsRouter.post('/', ensureAuthenticated, itemController.create);

itemsRouter.get('/', ensureAuthenticated, itemController.index);

itemsRouter.patch('/', ensureAuthenticated, itemController.setInactive);

itemsRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    itemImageController.save,
);

export default itemsRouter;
