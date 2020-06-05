import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
    private ormRepository: Repository<Company>;

    constructor() {
        this.ormRepository = getRepository(Company);
    }

    public async create(data: ICreateCompanyDTO): Promise<Company> {
        const company = this.ormRepository.create(data);
        await this.ormRepository.save(company);
        return company;
    }

    public async findById(id_company: string): Promise<Company | undefined> {
        const company = this.ormRepository.findOne({ where: { id_company } });
        return company;
    }

    public async findByCpnj(cnpj: string): Promise<Company | undefined> {
        const company = this.ormRepository.findOne({ where: { cnpj } });
        return company;
    }

    public async findByEmail(email: string): Promise<Company | undefined> {
        const company = this.ormRepository.findOne({ where: { email } });
        return company;
    }

    public async findByPhones(phones: string[]): Promise<Company | undefined> {
        const company = this.ormRepository.findOne({ where: { phones } });
        return company;
    }

    public async save(company: Company): Promise<Company> {
        return this.ormRepository.save(company);
    }

    public async all(): Promise<Company[]> {
        return this.ormRepository.find();
    }
}

export default CompaniesRepository;
