import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Item from '../models/Item';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
    id_item: string;
    imageFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ id_item, imageFilename }: Request): Promise<Item> {
        const itemsRepository = getRepository(Item);

        const item = await itemsRepository.findOne(id_item);

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

        await itemsRepository.save(item);

        return item;
    }
}

export default UpdateUserAvatarService;
