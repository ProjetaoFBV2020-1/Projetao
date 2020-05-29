import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import Item from '@modules/items/infra/typeorm/entities/Item';
import uploadConfig from '@config/upload';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
    id_item: string;
    imageFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('ItemsRepository')
        private itemsRepository: IItemsRepository,
    ) {}

    public async execute({ id_item, imageFilename }: IRequest): Promise<Item> {
        const item = await this.itemsRepository.findById(id_item);

        if (!item) {
            throw new AppError(
                'Only authenticated company can change image.',
                401,
            );
        }

        if (item.image) {
            // Verificar se o imagem já existe, se existir, deleta a anterior e insere uma nova.
            const itemImageFilePath = path.join(
                uploadConfig.directory,
                item.image,
            );
            const itemImageFileExists = await fs.promises.stat(
                itemImageFilePath,
            );

            if (itemImageFileExists) {
                await fs.promises.unlink(itemImageFilePath);
            }
        }

        item.image = imageFilename;

        await this.itemsRepository.save(item);

        return item;
    }
}

export default UpdateUserAvatarService;
