import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
    id_company: string;
}

@injectable()
class InactivateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ id_company }: IRequest): Promise<boolean> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError('Company does not exist', 400);
        }

        if (company.inactive === true) {
            throw new AppError('Company is already inactive', 401);
        }

        company.inactive = true;
        this.companiesRepository.save(company);
        return true;
    }
}

export default InactivateCompanyService;
