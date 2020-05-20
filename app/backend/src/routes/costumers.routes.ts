import { Router } from 'express';
import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

import CreateCostumerService from '../services/CreateCostumerService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const costumersRouter = Router();

costumersRouter.post('/', async (request, response) => {
    const { cpf, name, email, date_birth, password, phone } = request.body;

    const date_birth_convert = parseISO(date_birth);

    const createCostumerService = new CreateCostumerService();

    const costumer = await createCostumerService.execute({
        name,
        email,
        date_birth: date_birth_convert,
        password,
        cpf,
        phone,
    });

    delete costumer.password;

    return response.json(costumer);
});

export default costumersRouter;
