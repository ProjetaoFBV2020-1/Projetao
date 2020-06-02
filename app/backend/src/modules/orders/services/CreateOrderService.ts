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
            await this.orderItemsRepository.create({
                order_id: order.id_order,
                item_id: item.item_id,
                quantity: item.quantity,
                item_value: item.item_value,
                description: item.description,
            });
        });

        return order;
    }
}
export default CreateOrderService;