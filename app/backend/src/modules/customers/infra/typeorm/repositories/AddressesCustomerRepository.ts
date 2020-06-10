import { getRepository, Repository } from 'typeorm';

import IAddressesCustomerRepository from '@modules/customers/repositories/IAddressesCustomerRepository';
import ICreateAddressCustomerDTO from '@modules/customers/dtos/ICreateAddressCustomerDTO';
import AddressCustomer from '../entities/AddressCustomer';

class AddressesCustomerRepository implements IAddressesCustomerRepository {
    private ormRepository: Repository<AddressCustomer>;

    constructor() {
        this.ormRepository = getRepository(AddressCustomer);
    }

    public async create(
        data: ICreateAddressCustomerDTO,
    ): Promise<AddressCustomer> {
        const addressCustomer = this.ormRepository.create(data);
        await this.ormRepository.save(addressCustomer);
        return addressCustomer;
    }

    public async findById(
        id_address_customer: string,
    ): Promise<AddressCustomer | undefined> {
        const addressCustomer = await this.ormRepository.findOne({
            where: { id_address_customer },
        });
        return addressCustomer;
    }

    public async save(
        addressCustomer: AddressCustomer,
    ): Promise<AddressCustomer> {
        return this.ormRepository.save(addressCustomer);
    }

    public async all(
        customer_id: string,
    ): Promise<AddressCustomer[] | undefined> {
        const addresses = await this.ormRepository.find({
            where: { customer_id },
        });
        return addresses;
    }

    public async delete(id_address_customer: string): Promise<void> {
        const address = await this.ormRepository.find({
            where: { id_address_customer },
        });
        await this.ormRepository.remove(address);
    }
}

export default AddressesCustomerRepository;
