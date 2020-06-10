import { getRepository, Repository } from 'typeorm';

import IAddressCompaniesRepository from '@modules/companies/repositories/IAddressCompaniesRepository';
import ICreateAddressCompanyDTO from '@modules/companies/dtos/ICreateAddressCompanyDTO';
import AddressCompany from '../entities/AddressCompany';

class AddressCompaniesRepository implements IAddressCompaniesRepository {
    private ormRepository: Repository<AddressCompany>;

    constructor() {
        this.ormRepository = getRepository(AddressCompany);
    }

    public async create(
        data: ICreateAddressCompanyDTO,
    ): Promise<AddressCompany> {
        const address = this.ormRepository.create(data);
        await this.ormRepository.save(address);
        return address;
    }

    public async findAddressByCompanyId(
        company_id: string,
    ): Promise<AddressCompany | undefined> {
        const findAddress = this.ormRepository.findOne({
            where: { company_id },
        });
        return findAddress;
    }

    public async save(addressCompany: AddressCompany): Promise<AddressCompany> {
        return this.ormRepository.save(addressCompany);
    }

    public async delete(addressCompany: AddressCompany): Promise<void> {
        this.ormRepository.remove(addressCompany);
    }
}

export default AddressCompaniesRepository;
