import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
    findByEmail(email: string): Promise<Customer | undefined>;
    findByPhone(phone: string): Promise<Customer | undefined>;
    create(data: ICreateCustomerDTO): Promise<Customer>;
    save(customer: Customer): Promise<Customer>;
}
