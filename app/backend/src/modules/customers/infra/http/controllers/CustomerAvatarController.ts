import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCustomerAvatarService from '@modules/customers/services/UpdateCustomerAvatarService';

export default class CustomerAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateCustomerAvatarService = container.resolve(
            UpdateCustomerAvatarService,
        );

        const customer = await updateCustomerAvatarService.execute({
            id_customer: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete customer.password;
        return response.json(customer);
    }
}
