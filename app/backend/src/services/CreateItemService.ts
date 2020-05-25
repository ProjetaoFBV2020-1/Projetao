import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Item from '../models/Item';

interface Request {
    company_id: string;
    name: string;
    value: number;
    description: string;
}

class CreateItemService {
    public async execute({
        company_id,
        name,
        value,
        description,
    }: Request): Promise<Item> {
        const itemsRepository = getRepository(Item);

        const sameName = await itemsRepository.findOne({ where: name });

        if (sameName) {
            throw new AppError('Item with the same name already exists. ', 400);
        }

        const item = itemsRepository.create({
            company_id,
            name,
            value,
            description,
        });

        await itemsRepository.save(item);

        return item;
    }
}

export default CreateItemService;
