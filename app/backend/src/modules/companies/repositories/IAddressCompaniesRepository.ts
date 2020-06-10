import ICreateAddressCompanyDTO from '@modules/companies/dtos/ICreateAddressCompanyDTO';
import AddressCompany from '@modules/companies/infra/typeorm/entities/AddressCompany';

export default interface IAddressCompaniesRepository {
    findAddressByCompanyId(
        company_id: string,
    ): Promise<AddressCompany | undefined>;
    create(data: ICreateAddressCompanyDTO): Promise<AddressCompany>;
    save(addressCompany: AddressCompany): Promise<AddressCompany>;
    delete(addressCompany: AddressCompany): Promise<void>;
}
