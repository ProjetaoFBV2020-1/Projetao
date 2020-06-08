import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersCustomerService from '@modules/orders/services/ListOrdersCustomerService';

export default class OrderCustomerController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { company_id, status, description, orderItems } = request.body;
        const customer_id = request.user.id;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            company_id,
            customer_id,
            status,
            description,
            orderItems,
        });

        return response.json(order);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const customer_id = request.user.id;

        const listOrdersCustomerService = container.resolve(
            ListOrdersCustomerService,
        );

        const orders = await listOrdersCustomerService.execute({ customer_id });

        return response.json(orders);
    }
}
