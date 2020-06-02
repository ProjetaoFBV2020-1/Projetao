import { uuid } from 'uuidv4';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '@modules/companies/infra/typeorm/entities/Company';

export default class FakeCompanyRepository implements ICompaniesRepository {
    private companiesRepository: Company[] = [];

    public async create(data: ICreateCompanyDTO): Promise<Company> {
        const company = new Company();
        Object.assign(company, { id_company: uuid() }, data);
        this.companiesRepository.push(company);
        return company;
    }

    public async findByCpnj(cnpj: string): Promise<Company | undefined> {
        const findCompany = this.companiesRepository.find(
            company => company.cnpj === cnpj,
        );
        return findCompany;
    }

    public async findByEmail(email: string): Promise<Company | undefined> {
        const findCompany = this.companiesRepository.find(
            company => company.email === email,
        );
        return findCompany;
    }

    public async findByPhones(phones: string[]): Promise<Company | undefined> {
        const findCompany = this.companiesRepository.find(company =>
            company.phones.find(Rphone =>
                phones.find(phone => phone === Rphone.number),
            ),
        );
        return findCompany;
    }

    public async save(company: Company): Promise<Company> {
        const findIndex = this.companiesRepository.findIndex(
            Rcompany => Rcompany.id_company === company.id_company,
        );
        this.companiesRepository[findIndex] = company;
        return company;
    }
}
