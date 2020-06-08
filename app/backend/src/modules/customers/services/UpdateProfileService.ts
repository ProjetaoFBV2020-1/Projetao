import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    id_customer: string;
    name: string;
    email: string;
    date_birth: Date;
    phone: string;
    password?: string;
    old_password?: string;
}
@injectable()
class UpdateProfileService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        phone,
        email,
        date_birth,
        id_customer,
        old_password,
        password,
    }: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(id_customer);

        if (!customer) {
            throw new AppError('User not found');
        }

        const userWithUpdateEmail = await this.customersRepository.findByEmail(
            email,
        );

        if (
            userWithUpdateEmail &&
            userWithUpdateEmail.id_customer !== id_customer
        ) {
            throw new AppError('Email already in use');
        }

        const userWithUpdatePhone = await this.customersRepository.findByPhone(
            phone,
        );

        if (userWithUpdatePhone && userWithUpdatePhone.phone !== phone) {
            throw new AppError('Phone already in use');
        }

        customer.name = name;
        customer.date_birth = date_birth;
        customer.phone = phone;
        customer.email = email;

        if (password && !old_password) {
            throw new AppError('You need to inform the old password');
        }

        if (password && old_password) {
            const checkPassword = await this.hashProvider.compareHash(
                old_password,
                customer.password,
            );
            if (!checkPassword) {
                throw new AppError('Old password doesnt match');
            }
        }

        if (password) {
            customer.password = await this.hashProvider.generateHash(password);
        }

        return this.customersRepository.save(customer);
    }
}

export default UpdateProfileService;
