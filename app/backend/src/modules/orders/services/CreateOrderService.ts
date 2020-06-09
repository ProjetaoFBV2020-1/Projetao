import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';
import ICreateOrderItemDTO from '../dtos/ICreateOrderItemDTO';

interface IRequest {
    company_id: string;
    customer_id: string;
    description: string;
    orderItems: ICreateOrderItemDTO[];
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,

        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute({
        company_id,
        customer_id,
        description,
        orderItems,
    }: IRequest): Promise<Order> {
        const order = await this.ordersRepository.create({
            company_id,
            customer_id,
            description,
        });

        orderItems.forEach(async orderItem => {
            const item = await this.itemsRepository.findById(orderItem.item_id);

            if (!item) {
                await this.ordersRepository.deleteOrder(order);
                await this.orderItemsRepository.deleteByOrderId(order.id_order);
                throw new AppError('item not found');
            }

            await this.orderItemsRepository.create({
                order_id: order.id_order,
                item_id: orderItem.item_id,
                name: item.name,
                description: orderItem.description,
                item_value: item.price,
                quantity: orderItem.quantity,
                total_value: item.price * orderItem.quantity,
            });
        });

        return order;
    }
}

export default CreateOrderService;
