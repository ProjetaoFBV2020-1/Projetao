import { inject, injectable } from 'tsyringe';

import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';
import ICreateAddressCustomerDTO from '@modules/customers/dtos/ICreateAddressCustomerDTO';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomer';

@injectable()
class CreateAddressCustomerService {
    constructor(
        @inject('AddressesCustomerRepository')
        private addressesCustomerRepository: IAddressesCustomerRepository,
    ) {}

    public async execute({
        customer_id,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
        reference,
        cep,
    }: ICreateAddressCustomerDTO): Promise<AddressCustomer> {
        const addressCustomer = await this.addressesCustomerRepository.create({
            customer_id,
            state,
            street,
            number,
            neighborhood,
            city,
            reference,
            complement,
            cep,
        });

        return addressCustomer;
    }
}
export default CreateAddressCustomerService;
