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
            item.order_id = order.id_order;
            item.total_value = item.item_value * item.quantity;
            await this.orderItemsRepository.create(item);
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
