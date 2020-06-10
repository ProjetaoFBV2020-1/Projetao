import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrderItemsRepository from '../repositories/IOrderItemsRepository';
import Order_item from '../infra/typeorm/entities/Order_item';

interface IRequest {
    order_id: string;
}
interface IResponse {
    order_items: Order_item[];
}

@injectable()
class ListOrderItemsService {
    constructor(
        @inject('OrderItemsRepository')
        private orderItemsRepository: IOrderItemsRepository,
    ) {}

    public async execute(id_order: string): Promise<IResponse> {
        const order_items = await this.orderItemsRepository.findByOrderId(
            id_order,
        );
        if (!order_items) {
            throw new AppError('No orders found');
        }

        return { order_items };
    }
}

export default ListOrderItemsService;
