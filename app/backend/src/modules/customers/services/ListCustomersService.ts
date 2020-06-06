import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListCustomersService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(): Promise<Customer[]> {
        const customers = await this.customersRepository.findAllActive();

        if (!customers) {
            throw new AppError('No active customers were found', 404);
        }

        return customers;
    }
}

export default ListCustomersService;
