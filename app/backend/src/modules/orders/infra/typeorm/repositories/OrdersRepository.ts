import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = getRepository(Order);
    }

    public async create(data: ICreateOrderDTO): Promise<Order> {
        const order = this.ormRepository.create(data);
        await this.ormRepository.save(order);
        return order;
    }

    public async save(order: Order): Promise<Order> {
        return this.ormRepository.save(order);
    }

    public async findById(id_order: string): Promise<Order | undefined> {
        const order = this.ormRepository.findOne({ where: { id_order } });
        return order;
    }

    public async findByIdCompany(
        company_id: string,
    ): Promise<Order[] | undefined> {
        const orders = this.ormRepository.find({ where: { company_id } });
        return orders;
    }

    public async findByIdCustomer(
        customer_id: string,
    ): Promise<Order[] | undefined> {
        const orders = this.ormRepository.find({ where: { customer_id } });
        return orders;
    }

    public async deleteOrder(order: Order): Promise<void> {
        await this.ormRepository.remove(order);
    }
}

export default OrdersRepository;
