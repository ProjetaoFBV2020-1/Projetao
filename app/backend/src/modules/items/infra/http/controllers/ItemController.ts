import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '../../../services/CreateItemService';

export default class ItemController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { company_id, name, price, description, image } = request.body;

        const createItem = container.resolve(CreateItemService);

        const item = await createItem.execute({
            company_id,
            name,
            price,
            description,
            image,
        });
        return response.json(item);
    }
}
