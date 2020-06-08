import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';

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

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listCustomersService = container.resolve(ListCustomersService);

        const customers = await listCustomersService.execute();

        customers.forEach(customer => {
            delete customer.password;
        });

        return response.json(customers);
    }
}
