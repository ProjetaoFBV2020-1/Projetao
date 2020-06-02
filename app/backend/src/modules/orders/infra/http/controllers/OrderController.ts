import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';

export default class OrderController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            company_id,
            customer_id,
            status,
            description,
            items,
        } = request.body;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            company_id,
            customer_id,
            status,
            description,
            items,
        });

        return response.json(order);
    }
}
