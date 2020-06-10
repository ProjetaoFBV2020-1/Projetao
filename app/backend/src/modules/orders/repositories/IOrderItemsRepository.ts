import Order_item from '../infra/typeorm/entities/Order_item';
import ICreateOrderItemDTO from '../dtos/ICreateOrderItemDTO';

export default interface IOrderItemsRepository {
    create(data: ICreateOrderItemDTO): Promise<Order_item>;
    save(order_item: Order_item): Promise<Order_item>;
    findByOrderId(id_order: string): Promise<Order_item[]>;
    createArray(data: ICreateOrderItemDTO[]): Promise<Order_item[]>;
    deleteByOrderId(order_id: string): Promise<void>;
    findByIdsOrders(order_id: string[]): Promise<Order_item[] | undefined>;
    createInstance(data: ICreateOrderItemDTO[]): Promise<Order_item[]>;
}
