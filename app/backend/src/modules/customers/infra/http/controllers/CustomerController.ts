import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import InactivateCustomerService from '@modules/customers/services/InactivateCustomerService';

export default class CustomerController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, date_birth, password, phone } = request.body;

        const date_birth_convert = parseISO(date_birth);

        const createCustomerService = container.resolve(CreateCustomerService);

        const customer = await createCustomerService.execute({
            name,
            email,
            date_birth: date_birth_convert,
            password,
            phone,
        });

        delete customer.password;

        return response.json(customer);
    }

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
