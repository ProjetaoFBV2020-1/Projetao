import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
    id_customer: string;
    name: string;
    email: string;
    date_birth: Date;
    phone: string;
}

@injectable()
class UpdateCustomersService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({
        id_customer,
        name,
        email,
        date_birth,
        phone,
    }: IRequest): Promise<Customer> {
        /* const sameEmail = await this.customersRepository.findByEmail(email);

        if (sameEmail) {
            throw new AppError('E-mail already in use', 400);
        }

        const samePhone = await this.customersRepository.findByPhone(phone);

        if (samePhone) {
            throw new AppError('Phone already in use', 400);
        } */

        const customer = await this.customersRepository.findOneById(
            id_customer,
        );

        if (!customer) {
            throw new AppError('Customer not found', 404);
        }

        customer.name = name;
        customer.email = email;
        customer.date_birth = date_birth;
        customer.phone = phone;

        this.customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomersService;
