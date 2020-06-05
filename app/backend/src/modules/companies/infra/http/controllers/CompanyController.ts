import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import InactivateCompanyService from '@modules/companies/services/InactivateCompanyService';

export default class CompanyController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            cnpj,
            company_name,
            trade_name,
            email,
            password,
        } = request.body;

        const createCompany = container.resolve(CreateCompanyService);

        const company = await createCompany.execute({
            cnpj,
            company_name,
            trade_name,
            email,
            password,
        });

        delete company.password;

        return response.json(company);
    }

    public async setInactive(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_company } = request.body;

        const inactivateCompanyService = container.resolve(
            InactivateCompanyService,
        );

        const inactve = await inactivateCompanyService.execute({
            id_company,
        });

        return response.json(inactve);
    }
}
