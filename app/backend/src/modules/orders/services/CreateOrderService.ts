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
    private totalPrice = 0;

    // private id_items = [];

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
        const id_items: string[] = [];

        orderItems.map(orderItem => id_items.push(orderItem.item_id));

        const items = await this.itemsRepository.findByIds(id_items);

        if (!items) {
            await this.ordersRepository.deleteOrder(order);
            await this.orderItemsRepository.deleteByOrderId(order.id_order);
            throw new AppError('item not found');
        }

        // eslint-disable-next-line array-callback-return
        orderItems.map(orderItem => {
            const itemOrder = items.find(
                item => orderItem.item_id === item.id_item,
            );
            if (!itemOrder) {
                return;
            }
            orderItem.item_value = itemOrder.price;
            orderItem.name = itemOrder.name;
            orderItem.order_id = order.id_order;
            orderItem.total_value = itemOrder.price * orderItem.quantity;
            orderItem.order_id = order.id_order;
            orderItem.description = order.description;

            this.totalPrice += orderItem.total_value;
        });

        order.total_value = this.totalPrice;

        await this.ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
