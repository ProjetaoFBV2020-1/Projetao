import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ItemController from '../controllers/ItemController';
import ItemImageController from '../controllers/ItemImageController';

const itemsRouter = Router();
const upload = multer(uploadConfig);
const itemController = new ItemController();
const itemImageController = new ItemImageController();

itemsRouter.use(ensureAuthenticated);
// toda a rota está sendo verificada a autenticação
itemsRouter.post('/', itemController.create);

itemsRouter.get('/', itemController.index);

itemsRouter.delete('/', itemController.delete);

itemsRouter.patch('/image', upload.single('image'), itemImageController.save);

export default itemsRouter;
