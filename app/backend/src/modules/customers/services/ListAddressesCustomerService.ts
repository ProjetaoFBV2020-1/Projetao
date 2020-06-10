import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomer';

@injectable()
class ListAddressesCustomerService {
    constructor(
        @inject('AddressesCustomerRepository')
        private addressesCustomerRepository: IAddressesCustomerRepository,
    ) {}

    public async execute(customer_id: string): Promise<AddressCustomer[]> {
        const addressesCustomer = await this.addressesCustomerRepository.all(
            customer_id,
        );

        if (!addressesCustomer) {
            throw new AppError('No addresses found');
        }
        return addressesCustomer;
    }
}
export default ListAddressesCustomerService;
