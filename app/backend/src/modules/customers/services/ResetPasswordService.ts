import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';
import ICustomerTokensRepository from '../repositories/ICustomerTokensRepository';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('CustomerTokensRepository')
        private customerTokensRepository: ICustomerTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const customerToken = await this.customerTokensRepository.findByToken(
            token,
        );

        if (!customerToken) {
            throw new AppError('user token does not exists');
        }
        const customer = await this.customersRepository.findById(
            customerToken.customer_id,
        );

        if (!customer) {
            throw new AppError('user does not exists');
        }

        const tokenCreatedAt = customerToken.created_at;

        if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
            throw new AppError('token expired');
        }
        customer.password = await this.hashProvider.generateHash(password);

        await this.customersRepository.save(customer);
    }
}
