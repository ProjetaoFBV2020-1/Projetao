import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAddressCustomerService from '@modules/customers/services/CreateAddressCustomerService';
import ListAddressesCustomerService from '@modules/customers/services/ListAddressesCustomerService';
import UpdateAddressCustomerService from '@modules/customers/services/UpdateAddressCustomerService';
import DeleteAddressCustomerService from '@modules/customers/services/DeleteAddressCustomerService';
import ShowAddressCustomerService from '@modules/customers/services/ShowAddressCustomerService';

export default class AddressCustomerController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        } = request.body;

        const createAddressCustomerService = container.resolve(
            CreateAddressCustomerService,
        );

        const customer_id = request.user.id;

        const address = await createAddressCustomerService.execute({
            customer_id,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        });

        return response.json(address);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listAddressesCustomerService = container.resolve(
            ListAddressesCustomerService,
        );

        const customer_id = request.user.id;

        const addresses = await listAddressesCustomerService.execute(
            customer_id,
        );

        return response.json(addresses);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            id_address_customer,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        } = request.body;
        const customer_id = request.user.id;
        const updateAddressCustomerService = container.resolve(
            UpdateAddressCustomerService,
        );

        const addressUpdated = await updateAddressCustomerService.execute({
            id_address_customer,
            customer_id,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            reference,
            cep,
        });

        return response.json(addressUpdated);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id_address_customer = request.body;

        const deleteAddressCustomerService = container.resolve(
            DeleteAddressCustomerService,
        );

        deleteAddressCustomerService.execute(id_address_customer);

        return response.status(204).json();
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showAddressCustomerService = container.resolve(
            ShowAddressCustomerService,
        );

        const { id_address_customer } = request.query;

        const addresses = await showAddressCustomerService.execute(
            String(id_address_customer),
        );

        return response.json(addresses);
    }
}
