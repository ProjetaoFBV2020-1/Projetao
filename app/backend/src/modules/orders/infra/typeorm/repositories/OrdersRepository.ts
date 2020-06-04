import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
    private orderRepository: Repository<Order>;

    constructor() {
        this.orderRepository = getRepository(Order);
    }

    public async create(data: ICreateOrderDTO): Promise<Order> {
        const order = this.orderRepository.create(data);
        await this.orderRepository.save(order);
        return order;
    }

    public async save(order: Order): Promise<Order> {
        return this.orderRepository.save(order);
    }

    public async findById(id_order: string): Promise<Order | undefined> {
        const order = this.orderRepository.findOne({ where: { id_order } });
        return order;
    }
}

export default OrdersRepository;
