import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressCompaniesRepository from '@modules/companies/repositories/IAddressCompaniesRepository';

@injectable()
class DeleteAddressCompanyService {
    constructor(
        @inject('AddressCompaniesRepository')
        private addressCompaniesRepository: IAddressCompaniesRepository,
    ) {}

    public async execute(company_id: string): Promise<void> {
        const address = await this.addressCompaniesRepository.findAddressByCompanyId(
            company_id,
        );
        if (!address) {
            throw new AppError('You cannot delete a non-existing address');
        }
        await this.addressCompaniesRepository.delete(address);
    }
}

export default DeleteAddressCompanyService;
