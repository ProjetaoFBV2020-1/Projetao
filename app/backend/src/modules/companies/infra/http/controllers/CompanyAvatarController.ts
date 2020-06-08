import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCompanyAvatarService from '@modules/companies/services/UpdateCompanyAvatarService';

export default class CompanyAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateCompanyAvatarService = container.resolve(
            UpdateCompanyAvatarService,
        );

        const company = await updateCompanyAvatarService.execute({
            id_company: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete company.password;
        return response.json(company);
    }
}
