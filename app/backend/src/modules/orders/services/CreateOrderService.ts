import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import OrderItems from '../infra/typeorm/entities/Order_item';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IOrderItemsRepository from '../repositories/IOrderItemsRepository';

interface IRequest {
    company_id: string;
    customer_id: string;
    status: string;
    description: string;
    items: OrderItems[];
}

let orderTotalValue = 0;

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,
    ) {}

    public async execute({
        company_id,
        customer_id,
        status,
        description,
        items,
    }: IRequest): Promise<Order> {
        const order = await this.ordersRepository.create({
            company_id,
            customer_id,
            status,
            description,
        });

        items.forEach(async item => {
            this.orderItemsRepository.create({
                order_id: order.id_order,
                item_id: item.item_id,
                quantity: item.quantity,
                item_value: item.item_value,
                total_value: item.item_value * item.quantity,
                description: item.description,
            });
        });

        // Erro aqui, tenta buscar o order_id mas ainda não foi cadastrado na order_items
        const orderItems = await this.orderItemsRepository.findByOrderId(
            order.id_order,
        );

        orderItems.forEach(orderItem => {
            orderTotalValue += orderItem.total_value;
        });

        order.total_value = orderTotalValue;

        await this.ordersRepository.save(order);

        return order;
    }
}

export default CreateOrderService;
