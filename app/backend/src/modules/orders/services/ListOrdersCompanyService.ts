import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    company_id: string;
}

@injectable()
class ListOrdersCompanyService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Order[]> {
        const orders = await this.ordersRepository.findByIdCompany(company_id);
        if (!orders) {
            throw new AppError('No orders found');
        }
        return orders;
    }
}

export default ListOrdersCompanyService;
