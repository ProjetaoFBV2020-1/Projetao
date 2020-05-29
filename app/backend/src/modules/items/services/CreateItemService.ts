import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
    company_id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

@injectable()
class CreateItemService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute({
        company_id,
        name,
        price,
        description,
        image,
    }: IRequest): Promise<Item> {
        const sameName = await this.itemsRepository.findByName(
            name,
            company_id,
        );

        if (sameName) {
            throw new AppError('Item with the same name already exists. ', 400);
        }

        const item = this.itemsRepository.create({
            company_id,
            name,
            price,
            description,
            image,
        });

        return item;
    }
}

export default CreateItemService;
