import { getRepository, Repository } from 'typeorm';

import IOrderItemsRepository from '@modules/orders/repositories/IOrderItemsRepository';
import ICreateOrderItemDTO from '@modules/orders/dtos/ICreateOrderItemDTO';
import OrderItem from '../entities/Order_item';

class OrdersItemsRepository implements IOrderItemsRepository {
    private ormRepository: Repository<OrderItem>;

    constructor() {
        this.ormRepository = getRepository(OrderItem);
    }

    public async create(data: ICreateOrderItemDTO): Promise<OrderItem> {
        const orderItem = this.ormRepository.create(data);
        await this.ormRepository.save(orderItem);
        return orderItem;
    }

    public async save(orderItem: OrderItem): Promise<OrderItem> {
        return this.ormRepository.save(orderItem);
    }

    public async findByOrderId(id_order: string): Promise<OrderItem[]> {
        const orderItems = this.ormRepository.find({
            where: { order_id: id_order },
        });
        return orderItems;
    }
}

export default OrdersItemsRepository;
