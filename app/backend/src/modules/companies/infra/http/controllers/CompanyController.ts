import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '../../../services/CreateCompanyService';

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
            adress,
            phones,
        } = request.body;

        const createCompany = container.resolve(CreateCompanyService);

        const company = await createCompany.execute({
            cnpj,
            company_name,
            trade_name,
            email,
            password,
            phones,
            adress,
        });

        delete company.password;

        return response.json(company);
    }
}
