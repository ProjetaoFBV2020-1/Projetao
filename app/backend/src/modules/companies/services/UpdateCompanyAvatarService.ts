import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequest {
    id_company: string;
    avatarFilename: string;
}
@injectable()
class UpdateCompanyAvatarService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        id_company,
        avatarFilename,
    }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(id_company);

        if (!company) {
            throw new AppError(
                'Only authenticated companies can change avatar',
                401,
            );
        }

        if (company.avatar) {
            // deletar avatar anterior
            await this.storageProvider.deleteFile(company.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        company.avatar = filename;

        await this.companiesRepository.save(company);

        return company;
    }
}

export default UpdateCompanyAvatarService;
