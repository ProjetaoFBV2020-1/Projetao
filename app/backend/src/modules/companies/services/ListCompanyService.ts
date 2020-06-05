/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';

import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
class ListCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute(): Promise<Company[]> {
        const companies = await this.companiesRepository.all();

        return companies;
    }
}
export default ListCompanyService;
