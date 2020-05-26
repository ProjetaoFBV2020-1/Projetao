import { Router } from 'express';
import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

import CreateCustomerService from '../services/CreateCustomerService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const costumersRouter = Router();

costumersRouter.post('/', async (request, response) => {
    try {
        const { name, email, date_birth, password, phone } = request.body;

        const date_birth_convert = parseISO(date_birth);

        const createCustomerService = new CreateCustomerService();

        const customer = await createCustomerService.execute({
            name,
            email,
            date_birth: date_birth_convert,
            password,
            phone,
        });

        delete customer.password;

        return response.json(customer);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default costumersRouter;
