import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOrderItemsService from '@modules/orders/services/ListOrderItemsService';

export default class OrderCompanyController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { order_id } = request.query;
        const listOrderItemsService = container.resolve(ListOrderItemsService);
        const order_items = await listOrderItemsService.execute(
            String(order_id),
        );

        return response.json(order_items);
    }
}
