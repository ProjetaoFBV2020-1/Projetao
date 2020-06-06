import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
    id_customer: string;
}

@injectable()
class InactivateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id_customer }: IRequest): Promise<boolean> {
        const customer = await this.customersRepository.findOneById(
            id_customer,
        );

        if (!customer) {
            throw new AppError('Customer does not exist', 400);
        }

        if (customer.inactive === true) {
            throw new AppError('Customer is already inactive', 401);
        }

        customer.inactive = true;
        this.customersRepository.save(customer);
        return true;
    }
}

export default InactivateCustomerService;
