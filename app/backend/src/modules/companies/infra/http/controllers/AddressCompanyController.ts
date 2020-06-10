/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressCompanyService from '@modules/companies/services/CreateAddressCompanyService';
import ListAddressCompanyService from '@modules/companies/services/ListAddressCompanyService';
import UpdateAddressCompanyService from '@modules/companies/services/UpdateAddressCompanyService';
import DeleteAddressCompanyService from '@modules/companies/services/DeleteAddressCompanyService';

export default class CompanyController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        } = request.body;

        const createAddressCompany = container.resolve(
            CreateAddressCompanyService,
        );

        const company_id = request.user.id;

        const address = await createAddressCompany.execute({
            company_id,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        });

        return response.json(address);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listAddressCompanyService = container.resolve(
            ListAddressCompanyService,
        );

        const company_id = request.user.id;

        const address = await listAddressCompanyService.execute(company_id);

        return response.json(address);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const company_id = request.user.id;
        const {
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        } = request.body;

        const updateAddressCompanyService = container.resolve(
            UpdateAddressCompanyService,
        );

        const address = await updateAddressCompanyService.execute({
            company_id,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        });

        return response.json(address);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const company_id = request.user.id;

        const deleteAddressCompanyService = container.resolve(
            DeleteAddressCompanyService,
        );

        deleteAddressCompanyService.execute(company_id);

        return response.status(204).json();
    }
}
