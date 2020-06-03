import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import Company from '../infra/typeorm/entities/Company';

import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
    cnpj: string;
    company_name: string;
    trade_name: string;
    email: string;
    password: string;
}

@injectable()
class CreateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        cnpj,
        company_name,
        trade_name,
        email,
        password,
    }: IRequest): Promise<Company> {
        // Valida se já existe um cnpj cadastrado repetido
        const sameCnpj = await this.companiesRepository.findByCpnj(cnpj);

        if (sameCnpj) {
            throw new AppError('cnpj already in use', 400);
        }

        // Valida se já existe um mesmo e-mail cadastrado
        const sameEmail = await this.companiesRepository.findByEmail(email);

        if (sameEmail) {
            throw new AppError('email already in use', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const company = this.companiesRepository.create({
            cnpj,
            company_name,
            trade_name,
            email,
            password: hashedPassword,
        });

        /* phones.forEach(async phone => {
            const phoneCompany = phoneCompanyRepository.create({
                company_id: company.id_company,
                number: phone.number,
                type: phone.type,
            });

            await phoneCompanyRepository.save(phoneCompany);
        });

        const adressRepository = getRepository(AdressCompany);

        const adressCompany = adressRepository.create({
            company_id: company.id_company,
            state: adress.state,
            street: adress.street,
            number: adress.number,
            neighborhood: adress.neighborhood,
            city: adress.city,
            reference: adress.reference,
            complement: adress.complement,
        });

        await adressRepository.save(adressCompany); */

        return company;
    }
}
export default CreateCompanyService;
