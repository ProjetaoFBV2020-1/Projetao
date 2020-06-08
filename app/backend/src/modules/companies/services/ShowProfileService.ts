import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequest {
    id_company: string;
}
@injectable()
class ShowProfileService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ id_company }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError('company not found');
        }

        return company;
    }
}

export default ShowProfileService;
