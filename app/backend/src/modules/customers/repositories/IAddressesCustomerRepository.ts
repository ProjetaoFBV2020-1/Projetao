import ICreateAddressCustomerDTO from '../dtos/ICreateAddressCustomerDTO';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomer';

export default interface IAddressesCustomerRepository {
    findById(id_address_customer: string): Promise<AddressCustomer | undefined>;
    create(data: ICreateAddressCustomerDTO): Promise<AddressCustomer>;
    save(addressCustomer: AddressCustomer): Promise<AddressCustomer>;
    delete(id_address_customer: string): Promise<void>;
    all(customer_id: string): Promise<AddressCustomer[] | undefined>;
}
