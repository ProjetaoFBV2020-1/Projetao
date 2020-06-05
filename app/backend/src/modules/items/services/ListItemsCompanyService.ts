import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
    company_id: string;
}

@injectable()
class ListItemsCompanyService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Item[]> {
        const items = await this.itemsRepository.findByCompanyId(company_id);

        if (!items) {
            throw new AppError('No items inserted ', 400);
        }

        return items;
    }
}

export default ListItemsCompanyService;
