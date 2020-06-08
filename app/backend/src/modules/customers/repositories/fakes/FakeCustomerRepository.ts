import { uuid } from 'uuidv4';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import ICustomersRepository from '../ICustomersRepository';

export default class FakeCustomerRepository implements ICustomersRepository {
    private customersRepository: Customer[] = [];

    public async create(data: ICreateCustomerDTO): Promise<Customer> {
        const customer = new Customer();
        Object.assign(customer, { id_customer: uuid() }, data);
        this.customersRepository.push(customer);
        return customer;
    }

    public async findById(id_customer: string): Promise<Customer | undefined> {
        const findCustomer = this.customersRepository.find(
            customer => customer.id_customer === id_customer,
        );
        return findCustomer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const findCustomer = this.customersRepository.find(
            customer => customer.email === email,
        );
        return findCustomer;
    }

    public async findByPhone(phone: string): Promise<Customer | undefined> {
        const findCustomer = this.customersRepository.find(
            customer => customer.phone === phone,
        );
        return findCustomer;
    }

    public async save(customer: Customer): Promise<Customer> {
        const findIndex = this.customersRepository.findIndex(
            Rcustomer => Rcustomer.id_customer === customer.id_customer,
        );
        this.customersRepository[findIndex] = customer;
        return customer;
    }

    public async findAllActive(): Promise<Customer[]> {
        return this.customersRepository;
    }
}
