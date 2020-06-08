import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    customer_id: string;
}

@injectable()
class ListOrdersCustomerService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({ customer_id }: IRequest): Promise<Order[]> {
        const orders = await this.ordersRepository.findByIdCustomer(
            customer_id,
        );
        if (!orders) {
            throw new AppError('No orders found');
        }
        return orders;
    }
}

export default ListOrdersCustomerService;
