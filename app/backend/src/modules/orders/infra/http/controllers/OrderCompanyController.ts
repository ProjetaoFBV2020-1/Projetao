import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeStatusOrderService from '@modules/orders/services/ChangeStatusOrderService';
import ListOrdersCompanyService from '@modules/orders/services/ListOrdersCompanyService';

export default class OrderCompanyController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_order, status } = request.body;

        const id_company = request.user.id;

        const changeStatusOrderService = container.resolve(
            ChangeStatusOrderService,
        );

        const order = await changeStatusOrderService.execute({
            id_company,
            id_order,
            status,
        });

        return response.json(order);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const company_id = request.user.id;

        const listOrdersCompanyService = container.resolve(
            ListOrdersCompanyService,
        );

        const orders = await listOrdersCompanyService.execute({ company_id });

        return response.json(orders);
    }
}
