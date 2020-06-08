import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import ICompanyTokensRepository from '../repositories/ICompanyTokensRepository';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('CompanyTokensRepository')
        private companyTokensRepository: ICompanyTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const companyToken = await this.companyTokensRepository.findByToken(
            token,
        );

        if (!companyToken) {
            throw new AppError('user token does not exists');
        }
        const company = await this.companiesRepository.findById(
            companyToken.company_id,
        );

        if (!company) {
            throw new AppError('user does not exists');
        }

        const tokenCreatedAt = companyToken.created_at;

        if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
            throw new AppError('token expired');
        }
        company.password = await this.hashProvider.generateHash(password);

        await this.companiesRepository.save(company);
    }
}
