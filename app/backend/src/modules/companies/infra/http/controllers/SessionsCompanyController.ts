import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateCompanyService from '../../../services/AuthenticateCompanyService';

export default class SessionsCompanyController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateCompanyService = container.resolve(
            AuthenticateCompanyService,
        );

        const { company, token } = await authenticateCompanyService.execute({
            email,
            password,
        });

        delete company.password;

        return response.json({ company, token });
    }
}
