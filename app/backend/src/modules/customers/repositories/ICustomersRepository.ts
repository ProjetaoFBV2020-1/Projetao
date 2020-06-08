import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
    findById(id_customer: string): Promise<Customer | undefined>;
    findByEmail(email: string): Promise<Customer | undefined>;
    findByPhone(phone: string): Promise<Customer | undefined>;
    create(data: ICreateCustomerDTO): Promise<Customer>;
    save(customer: Customer): Promise<Customer>;
    findAllActive(): Promise<Customer[]>;
}
