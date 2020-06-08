import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequest {
    id_company: string;
    cnpj: string;
    company_name: string;
    trade_name: string;
    email: string;
    password?: string;
    old_password?: string;
}
@injectable()
class UpdateProfileService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        email,
        cnpj,
        company_name,
        id_company,
        trade_name,
        old_password,
        password,
    }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError('User not found');
        }

        const userWithUpdateEmail = await this.companiesRepository.findByEmail(
            email,
        );

        if (
            userWithUpdateEmail &&
            userWithUpdateEmail.id_company !== id_company
        ) {
            throw new AppError('Email already in use');
        }

        const userWithUpdateCpnj = await this.companiesRepository.findByCpnj(
            cnpj,
        );

        if (userWithUpdateCpnj && userWithUpdateCpnj.cnpj !== cnpj) {
            throw new AppError('CNPJ already in use');
        }

        company.cnpj = cnpj;
        company.company_name = company_name;
        company.trade_name = trade_name;
        company.email = email;

        if (password && !old_password) {
            throw new AppError('You need to inform the old password');
        }

        if (password && old_password) {
            const checkPassword = await this.hashProvider.compareHash(
                old_password,
                company.password,
            );
            if (!checkPassword) {
                throw new AppError('Old password doesnt match');
            }
        }

        if (password) {
            company.password = await this.hashProvider.generateHash(password);
        }

        return this.companiesRepository.save(company);
    }
}

export default UpdateProfileService;
