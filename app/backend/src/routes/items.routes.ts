import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateItemImageService from '../services/UpdateItemImageService';
import CreateItemService from '../services/CreateItemService';

const itemsRouter = Router();
const upload = multer(uploadConfig);

itemsRouter.use(ensureAuthenticated);

itemsRouter.post('/', async (request, response) => {
    const { company_id, name, price, description, image } = request.body;

    const createItem = new CreateItemService();

    const item = await createItem.execute({
        company_id,
        name,
        price,
        description,
        image,
    });
    return response.json(item);
});

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

export default itemsRouter;
