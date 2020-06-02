import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    date_birth: Date;
    phone: string;
}

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        date_birth,
        password,
        phone,
    }: IRequest): Promise<Customer> {
        const sameEmail = await this.customersRepository.findByEmail(email);

        if (sameEmail) {
            throw new AppError('email already in use', 400);
        }

        const samePhone = await this.customersRepository.findByPhone(phone);

        if (samePhone) {
            throw new AppError('phone already in use', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const customer = this.customersRepository.create({
            name,
            email,
            date_birth,
            password: hashedPassword,
            phone,
        });

        return customer;
    }
}
export default CreateCustomerService;
