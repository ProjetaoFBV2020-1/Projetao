import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import UpdateCustomersService from '@modules/customers/services/UpdateCustomersService';

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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_customer, name, email, date_birth, phone } = request.body;

        const updateCustomersService = container.resolve(
            UpdateCustomersService,
        );

        const customer = await updateCustomersService.execute({
            id_customer,
            name,
            email,
            date_birth,
            phone,
        });

        return response.json(customer);
    }
}
