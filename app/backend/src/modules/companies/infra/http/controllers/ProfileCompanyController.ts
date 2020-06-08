import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/companies/services/UpdateProfileService';
import ShowProfileService from '@modules/companies/services/ShowProfileService';

export default class ProfileCompanyController {
    public async show(request: Request, response: Response): Promise<Response> {
        const id_company = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);
        const user = await showProfileService.execute({ id_company });

        delete user.password;
        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id_company = request.user.id;
        const {
            email,
            cnpj,
            company_name,
            trade_name,
            old_password,
            password,
        } = request.body;
        const updateProfileService = container.resolve(UpdateProfileService);
        const user = await updateProfileService.execute({
            email,
            cnpj,
            company_name,
            id_company,
            trade_name,
            old_password,
            password,
        });

        delete user.password;
        return response.json(user);
    }
}
