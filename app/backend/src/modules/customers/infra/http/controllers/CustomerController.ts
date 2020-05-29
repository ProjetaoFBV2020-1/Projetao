import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateCustomerService from '../../../services/CreateCustomerService';

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
}
