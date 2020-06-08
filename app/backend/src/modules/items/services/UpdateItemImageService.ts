import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
    id_company: string;
    imageFileName: string;
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

    public async execute({
        id_company,
        id_item,
        imageFileName,
    }: IRequest): Promise<Item> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError(
                'Only authenticated companies can change item image',
                401,
            );
        }

        const item = await this.itemsRepository.findById(id_item);
        if (!item) {
            throw new AppError(
                'You cannot change a image of a non-existing item',
            );
        }

        if (item.company_id !== id_company) {
            throw new AppError(
                'You have no permission to change this item image',
            );
        }

        if (item.image) {
            // deleta imagem anterior
            await this.storageProvider.deleteFile(item.image);
        }

        const filename = await this.storageProvider.saveFile(imageFileName);

        item.image = filename;

        await this.itemsRepository.save(item);

        return item;
    }
}

export default UpdateItemImageService;
