import OrderItem from '../infra/typeorm/entities/Order_item';
import ICreateOrderItemDTO from '../dtos/ICreateOrderItemDTO';

export default interface IOrderItemsRepository {
    create(data: ICreateOrderItemDTO): Promise<OrderItem>;
    save(order_item: OrderItem): Promise<OrderItem>;
}
