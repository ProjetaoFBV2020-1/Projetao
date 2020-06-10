import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import AddressCompany from '@modules/companies/infra/typeorm/entities/AddressCompany';
import IAddressCompaniesRepository from '@modules/companies/repositories/IAddressCompaniesRepository';

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
class CreateCompanyService {
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
        const address = this.addressCompaniesRepository.findAddressByCompanyId(
            company_id,
        );

        if (address) {
            throw new AppError(
                'There is already a registered address for this company',
                403,
            );
        }

        const addressCompany = this.addressCompaniesRepository.create({
            company_id,
            state,
            street,
            number,
            neighborhood,
            city,
            reference,
            complement,
            cep,
        });

        return addressCompany;
    }
}
export default CreateCompanyService;
