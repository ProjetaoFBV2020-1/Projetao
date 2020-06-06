import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async create(data: ICreateCustomerDTO): Promise<Customer> {
        const customer = this.ormRepository.create(data);
        await this.ormRepository.save(customer);
        return customer;
    }

    public async findAllActive(): Promise<Customer[]> {
        const customers = this.ormRepository.find({
            where: { inactive: false },
        });
        return customers;
    }

    public async findOneById(
        id_customer: string,
    ): Promise<Customer | undefined> {
        const customer = this.ormRepository.findOne({ where: { id_customer } });
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = this.ormRepository.findOne({ where: { email } });
        return customer;
    }

    public async findByPhone(phone: string): Promise<Customer | undefined> {
        const customer = this.ormRepository.findOne({ where: { phone } });
        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        return this.ormRepository.save(customer);
    }
}

export default CustomersRepository;
