import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order_item from '../infra/typeorm/entities/Order_item';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';

interface IRequest {
    company_id: string;
}
interface IResponse {
    orders: Order[];
    order_items: Order_item[];
}

@injectable()
class ListOrdersCompanyService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<IResponse> {
        const orders = await this.ordersRepository.findByIdCompany(company_id);
        if (!orders) {
            throw new AppError('No orders found');
        }
        const orders_ids: string[] = [];

        // eslint-disable-next-line array-callback-return
        orders.map(order => {
            orders_ids.push(order.id_order);
        });

        const order_items = await this.orderItemsRepository.findByIdsOrders(
            orders_ids,
        );

        if (!order_items) {
            throw new AppError('No items found');
        }

        return { orders, order_items };
    }
}

export default ListOrdersCompanyService;
