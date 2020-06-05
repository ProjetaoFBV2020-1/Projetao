import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/items/services/CreateItemService';
import InactivateItemService from '@modules/items/services/InactivateItemService';

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

    public async setInactive(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_item } = request.body;

        const inactivateItemService = container.resolve(InactivateItemService);

        const inactve = await inactivateItemService.execute({
            id_item,
        });

        return response.json(inactve);
    }
}
