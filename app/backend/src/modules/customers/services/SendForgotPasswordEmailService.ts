import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';
import ICustomerTokensRepository from '../repositories/ICustomerTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('CustomerTokensRepository')
        private customerTokensRepository: ICustomerTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const customer = await this.customersRepository.findByEmail(email);

        if (!customer) {
            throw new AppError('Invalid email');
        }

        const tokenCustomer = await this.customerTokensRepository.generate(
            customer.id_customer,
        );

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'shared',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: customer.name,
                email: customer.email,
            },
            subject: '[GoBarber]Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: customer.name,
                    link: `http://localhost:3000/reset_password?token=${tokenCustomer.token}`,
                },
            },
        });
    }
}
