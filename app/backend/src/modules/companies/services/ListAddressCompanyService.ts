/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AddressCompany from '@modules/companies/infra/typeorm/entities/AddressCompany';

import IAddressCompaniesRepository from '../repositories/IAddressCompaniesRepository';

@injectable()
class ListAddressCompanyService {
    constructor(
        @inject('AddressCompaniesRepository')
        private addressCompaniesRepository: IAddressCompaniesRepository,
    ) {}

    public async execute(company_id: string): Promise<AddressCompany> {
        const address = await this.addressCompaniesRepository.findAddressByCompanyId(
            company_id,
        );

        if (!address) {
            throw new AppError('Address not found', 404);
        }

        return address;
    }
}
export default ListAddressCompanyService;
