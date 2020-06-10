import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import AddressCompany from '@modules/companies/infra/typeorm/entities/AddressCompany';
import IAddressCompaniesRepository from '../repositories/IAddressCompaniesRepository';

interface IRequest {
    company_id: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    reference: string;
    cep: string;
}

@injectable()
class UpdateAddressCompanyService {
    constructor(
        @inject('AddressCompaniesRepository')
        private addressCompaniesRepository: IAddressCompaniesRepository,
    ) {}

    public async execute({
        company_id,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
        reference,
        cep,
    }: IRequest): Promise<AddressCompany> {
        const address = await this.addressCompaniesRepository.findAddressByCompanyId(
            company_id,
        );

        if (!address) {
            throw new AppError('Address not found', 404);
        }

        address.state = state;
        address.city = city;
        address.neighborhood = neighborhood;
        address.street = street;
        address.number = number;
        address.complement = complement;
        address.reference = reference;
        address.cep = cep;

        this.addressCompaniesRepository.save(address);

        return address;
    }
}
export default UpdateAddressCompanyService;
