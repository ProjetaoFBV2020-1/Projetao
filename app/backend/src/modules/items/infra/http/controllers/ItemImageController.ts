import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateItemImageService from '../../../services/UpdateItemImageService';

export default class ItemImageController {
    public async save(request: Request, response: Response): Promise<Response> {
        const updateItemImage = container.resolve(UpdateItemImageService);

        const item = await updateItemImage.execute({
            id_item: request.body.id_item,
            imageFilename: request.file.fieldname,
        });

        return response.json(item);
    }
}
