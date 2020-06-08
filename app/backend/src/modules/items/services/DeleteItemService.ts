import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
    id_company: string;
    id_item: string;
}
@injectable()
class UpdateItemImageService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,

        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ id_company, id_item }: IRequest): Promise<void> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError(
                'Only authenticated companies can delete items',
                401,
            );
        }

        const item = await this.itemsRepository.findById(id_item);
        if (!item) {
            throw new AppError('You cannot delete a non-existing item');
        }

        if (item.company_id !== id_company) {
            throw new AppError('You have no permission to delete this item');
        }

        await this.storageProvider.deleteFile(item.image);

        await this.itemsRepository.delete(item);
    }
}

export default UpdateItemImageService;
