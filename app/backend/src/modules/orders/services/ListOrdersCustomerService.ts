import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';
import Order_item from '../infra/typeorm/entities/Order_item';

interface IRequest {
    customer_id: string;
}
interface IResponse {
    orders: Order[];
    order_items: Order_item[];
}
@injectable()
class ListOrdersCustomerService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,
    ) {}

    public async execute({ customer_id }: IRequest): Promise<IResponse> {
        const orders = await this.ordersRepository.findByIdCustomer(
            customer_id,
        );
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

export default ListOrdersCustomerService;
