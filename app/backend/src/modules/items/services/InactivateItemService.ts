import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
    id_item: string;
}

@injectable()
class InactivateItemService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute({ id_item }: IRequest): Promise<boolean> {
        const item = await this.itemsRepository.findById(id_item);

        if (!item) {
            throw new AppError('Item does not exist', 400);
        }

        if (item.inactive === true) {
            throw new AppError('Item is already inactive', 401);
        }

        item.inactive = true;
        this.itemsRepository.save(item);
        return true;
    }
}

export default InactivateItemService;
