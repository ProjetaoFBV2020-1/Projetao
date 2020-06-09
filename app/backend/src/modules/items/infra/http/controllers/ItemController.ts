import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/items/services/CreateItemService';
import ListItemsCompanyService from '@modules/items/services/ListItemsCompanyService';
import DeleteItemService from '@modules/items/services/DeleteItemService';

export default class ItemController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, description } = request.body;
        const company_id = request.user.id;

        const createItem = container.resolve(CreateItemService);

        const item = await createItem.execute({
            company_id,
            name,
            price,
            description,
        });
        return response.json(item);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_item } = request.body;
        const id_company = request.user.id;

        const deleteItemService = container.resolve(DeleteItemService);

        deleteItemService.execute({ id_company, id_item });

        return response.status(204).json();
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { company_id } = request.query;

        const listItemsCompanyService = container.resolve(
            ListItemsCompanyService,
        );

        const inactve = await listItemsCompanyService.execute({
            company_id: String(company_id),
        });

        return response.json(inactve);
    }
}
