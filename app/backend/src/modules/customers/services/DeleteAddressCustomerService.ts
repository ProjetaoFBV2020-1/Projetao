import { inject, injectable } from 'tsyringe';

import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';

@injectable()
class DeleteAddressCustomerService {
    constructor(
        @inject('AddressesCustomersRepository')
        private addressesCustomersRepository: IAddressesCustomerRepository,
    ) {}

    public async execute(id_address_customer: string): Promise<void> {
        await this.addressesCustomersRepository.delete(id_address_customer);
    }
}
export default DeleteAddressCustomerService;
