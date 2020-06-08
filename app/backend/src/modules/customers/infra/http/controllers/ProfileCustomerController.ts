import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/customers/services/UpdateProfileService';
import ShowProfileService from '@modules/customers/services/ShowProfileService';

export default class ProfileCustomerController {
    public async show(request: Request, response: Response): Promise<Response> {
        const id_customer = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);
        const user = await showProfileService.execute({ id_customer });

        delete user.password;
        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id_customer = request.user.id;
        const {
            name,
            email,
            date_birth,
            password,
            phone,
            old_password,
        } = request.body;
        const updateProfileService = container.resolve(UpdateProfileService);
        const user = await updateProfileService.execute({
            phone,
            name,
            date_birth,
            email,
            id_customer,
            old_password,
            password,
        });

        delete user.password;
        return response.json(user);
    }
}
