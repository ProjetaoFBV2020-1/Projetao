import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import ICompanyTokensRepository from '../repositories/ICompanyTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('CompanyTokensRepository')
        private companyTokensRepository: ICompanyTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const company = await this.companiesRepository.findByEmail(email);

        if (!company) {
            throw new AppError('Invalid email');
        }

        const tokenCompany = await this.companyTokensRepository.generate(
            company.id_company,
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
                name: company.trade_name,
                email: company.email,
            },
            subject: '[GoBarber]Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: company.trade_name,
                    link: `http://localhost:3000/reset-password-company/${tokenCompany.token}`,
                },
            },
        });
    }
}
