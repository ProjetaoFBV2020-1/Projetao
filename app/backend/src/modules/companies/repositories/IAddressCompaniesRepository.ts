import ICreateAddressCompanyDTO from '../dtos/ICreateAddressCompanyDTO';
import AddressCompany from '../infra/typeorm/entities/AddressCompany';

export default interface IAddressCompaniesRepository {
    findByCompanyId(company_id: string): Promise<AddressCompany | undefined>;
    create(data: ICreateAddressCompanyDTO): Promise<AddressCompany>;
    save(addressCompany: AddressCompany): Promise<AddressCompany>;
}
