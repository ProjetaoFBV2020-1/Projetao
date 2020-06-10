import { Repository, getRepository, In } from 'typeorm';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ICreateItemDTO from '../../../dtos/ICreateItemDTO';
import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
    private ormRepository: Repository<Item>;

    constructor() {
        this.ormRepository = getRepository(Item);
    }

    public async create(data: ICreateItemDTO): Promise<Item> {
        const item = this.ormRepository.create(data);
        await this.ormRepository.save(item);
        return item;
    }

    public async findByName(
        name: string,
        company_id: string,
    ): Promise<Item | undefined> {
        const item = await this.ormRepository.findOne({
            where: { name, company_id },
        });
        return item;
    }

    public async save(item: Item): Promise<Item> {
        return this.ormRepository.save(item);
    }

    public async findById(id_item: string): Promise<Item | undefined> {
        const item = await this.ormRepository.findOne(id_item);
        return item;
    }

    public async findByIds(id_items: string[]): Promise<Item[] | undefined> {
        const items = await this.ormRepository.find({
            where: { item_id: In(id_items) },
        });
        return items;
    }

    public async findByCompanyId(
        company_id: string,
    ): Promise<Item[] | undefined> {
        return this.ormRepository.find({ where: { company_id } });
    }

    public async delete(item: Item): Promise<void> {
        this.ormRepository.remove(item);
    }
}
export default ItemsRepository;
