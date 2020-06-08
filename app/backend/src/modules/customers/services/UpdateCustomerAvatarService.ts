import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    id_customer: string;
    avatarFilename: string;
}
@injectable()
class UpdateCustomerAvatarService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        id_customer,
        avatarFilename,
    }: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(id_customer);

        if (!customer) {
            throw new AppError(
                'Only authenticated companies can change avatar',
                401,
            );
        }

        if (customer.avatar) {
            // deletar avatar anterior
            await this.storageProvider.deleteFile(customer.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        customer.avatar = filename;

        await this.customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerAvatarService;
