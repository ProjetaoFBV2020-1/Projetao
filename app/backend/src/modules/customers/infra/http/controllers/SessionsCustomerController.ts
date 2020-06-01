import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateCustomerService from '../../../services/AuthenticateCustomerService';

export default class SessionsCustomerController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateCustomerService = container.resolve(
            AuthenticateCustomerService,
        );

        const { customer, token } = await authenticateCustomerService.execute({
            email,
            password,
        });

        delete customer.password;

        return response.json({ customer, token });
    }
}
