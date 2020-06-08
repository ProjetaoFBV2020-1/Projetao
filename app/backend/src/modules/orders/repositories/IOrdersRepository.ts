import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
    create(data: ICreateOrderDTO): Promise<Order>;
    save(order: Order): Promise<Order>;
    findById(id_order: string): Promise<Order | undefined>;
    findByIdCompany(company_id: string): Promise<Order[] | undefined>;
    findByIdCustomer(customer_id: string): Promise<Order[] | undefined>;
    deleteOrder(order: Order): Promise<void>;
}
