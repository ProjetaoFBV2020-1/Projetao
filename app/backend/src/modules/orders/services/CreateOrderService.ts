import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';
import ICreateOrderItemDTO from '../dtos/ICreateOrderItemDTO';
import IReceiveDTO from '../dtos/IReceiveDTO';

interface IRequest {
    company_id: string;
    customer_id: string;
    status: string;
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
        status,
        description,
        orderItems,
    }: IRequest): Promise<Order> {
        const order = await this.ordersRepository.create({
            company_id,
            customer_id,
            status,
            description,
        });
        const orderAssist: ICreateOrderItemDTO[] = [];
        let total = 0;
        orderItems.forEach(async orderItem => {
            const items = await this.itemsRepository.findById(
                orderItem.item_id,
            );

            if (!items) {
                await this.ordersRepository.deleteOrder(order);
                await this.orderItemsRepository.deleteByOrderId(order.id_order);
                throw new AppError('item not found');
            }
            console.log(orderItems);
            await this.orderItemsRepository.create({
                description: orderItem.description,
                item_id: orderItem.item_id,
                name: items.name,
                order_id: order.id_order,
                item_value: items.price,
                quantity: orderItem.quantity,
                total_value: orderItem.item_value * orderItem.quantity,
            });
            total += orderItem.item_value * orderItem.quantity;
        });

        order.total_value = total;

        await this.ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
