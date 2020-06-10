import { inject, injectable } from 'tsyringe';

import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';
import AppError from '@shared/errors/AppError';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomer';

interface IRequest {
    id_address_customer: string;
    customer_id: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    reference: string;
    cep: string;
}

@injectable()
class UpdateAddressCustomerService {
    constructor(
        @inject('AddressesCustomerRepository')
        private addressesCustomerRepository: IAddressesCustomerRepository,
    ) {}

    public async execute(data: IRequest): Promise<AddressCustomer> {
        const address = await this.addressesCustomerRepository.findById(
            data.id_address_customer,
        );
        if (!address) {
            throw new AppError('Address not found');
        }

        if (address.customer_id !== data.customer_id) {
            throw new AppError(
                'You dont have permission to change this address',
                401,
            );
        }
        address.cep = data.cep;
        address.complement = data.complement;
        address.city = data.city;
        address.neighborhood = data.neighborhood;
        address.reference = data.reference;
        address.street = data.street;
        address.number = data.number;
        address.state = data.state;

        const addressCustomer = await this.addressesCustomerRepository.save(
            address,
        );

        return addressCustomer;
    }
}
export default UpdateAddressCustomerService;
