import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomer';

@injectable()
class ShowAddressCustomerService {
    constructor(
        @inject('AddressesCustomerRepository')
        private addressesCustomerRepository: IAddressesCustomerRepository,
    ) {}

    public async execute(
        id_address_customer: string,
    ): Promise<AddressCustomer> {
        const addressCustomer = await this.addressesCustomerRepository.findById(
            id_address_customer,
        );

        if (!addressCustomer) {
            throw new AppError('No address found');
        }
        return addressCustomer;
    }
}
export default ShowAddressCustomerService;
