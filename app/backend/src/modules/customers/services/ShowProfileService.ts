import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    id_customer: string;
}
@injectable()
class ShowProfileService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id_customer }: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(id_customer);

        if (!customer) {
            throw new AppError('customer not found');
        }

        return customer;
    }
}

export default ShowProfileService;
