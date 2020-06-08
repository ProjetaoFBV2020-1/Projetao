import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    id_order: string;
    status: string;
    id_company: string;
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({
        id_order,
        id_company,
        status,
    }: IRequest): Promise<Order> {
        const order = await this.ordersRepository.findById(id_order);
        if (!order) {
            throw new AppError('Non-existing order');
        }

        if (order.company_id !== id_company) {
            throw new AppError(
                'You do not have permission to change this order',
            );
        }
        order.status = status;
        return this.ordersRepository.save(order);
    }
}

export default CreateOrderService;
