import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InactivateCustomerService from '@modules/customers/services/InactivateCustomerService';

class SetInactiveControler {
    public async setInactive(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_customer } = request.body;

        const inactivateCustomerService = container.resolve(
            InactivateCustomerService,
        );

        const inactve = await inactivateCustomerService.execute({
            id_customer,
        });

        return response.json(inactve);
    }
}

export default SetInactiveControler;
