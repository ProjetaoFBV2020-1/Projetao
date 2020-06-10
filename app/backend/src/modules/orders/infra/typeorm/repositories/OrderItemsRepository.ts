import { getRepository, Repository, In } from 'typeorm';

import IOrderItemsRepository from '@modules/orders/repositories/IOrderItemsRepository';
import ICreateOrderItemDTO from '@modules/orders/dtos/ICreateOrderItemDTO';
import Order_item from '../entities/Order_item';

class OrdersItemsRepository implements IOrderItemsRepository {
    private ormRepository: Repository<Order_item>;

    constructor() {
        this.ormRepository = getRepository(Order_item);
    }

    public async create(data: ICreateOrderItemDTO): Promise<Order_item> {
        const orderItem = this.ormRepository.create(data);
        await this.ormRepository.save(orderItem);
        return orderItem;
    }

    public async save(orderItem: Order_item): Promise<Order_item> {
        return this.ormRepository.save(orderItem);
    }

    public async findByOrderId(order_id: string): Promise<Order_item[]> {
        const orderItems = await this.ormRepository.find({
            where: { order_id },
        });
        console.log(orderItems);
        return orderItems;
    }

    public async createArray(
        data: ICreateOrderItemDTO[],
    ): Promise<Order_item[]> {
        const orderItems = this.ormRepository.create(data);
        return this.ormRepository.save(orderItems);
    }

    public async deleteByOrderId(order_id: string): Promise<void> {
        const orderItems = await this.ormRepository.find({
            where: { order_id },
        });
        await this.ormRepository.remove(orderItems);
    }

    public async findByIdsOrders(
        order_id: string[],
    ): Promise<Order_item[] | undefined> {
        const order_items = await this.ormRepository.find({
            where: { order_id: In(order_id) },
        });
        console.log(order_items);
        return order_items;
    }

    public async createInstance(
        data: ICreateOrderItemDTO[],
    ): Promise<Order_item[]> {
        return this.ormRepository.create(data);
    }
}

export default OrdersItemsRepository;
