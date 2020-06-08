import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateItemImageService from '../../../services/UpdateItemImageService';

export default class ItemImageController {
    public async save(request: Request, response: Response): Promise<Response> {
        const { id_item } = request.body;

        const updateItemImage = container.resolve(UpdateItemImageService);

        const item = await updateItemImage.execute({
            id_company: request.user.id,
            id_item,
            imageFileName: request.file.filename,
        });

        return response.json(item);
    }
}
