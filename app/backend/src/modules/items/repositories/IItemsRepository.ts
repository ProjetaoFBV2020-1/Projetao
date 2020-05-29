import Item from '../infra/typeorm/entities/Item';
import ICreateUserDTO from '../dtos/ICreateItemDTO';

export default interface IItemsRepository {
    findByName(name: string, company_id: string): Promise<Item | undefined>;
    create(data: ICreateUserDTO): Promise<Item>;
    save(item: Item): Promise<Item>;
    findById(id_tem: string): Promise<Item | undefined>;
}
