import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateItemImageService from '../services/UpdateItemImageService';

const itemsRouter = Router();
const upload = multer(uploadConfig);

itemsRouter.use(ensureAuthenticated);

itemsRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    async (request, response) => {
        try {
            const updateItemImage = new UpdateItemImageService();

            const item = await updateItemImage.execute({
                id_item: request.body.id_item,
                imageFilename: request.file.fieldname,
            });

            return response.json(item);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);
