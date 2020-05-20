import { Router } from 'express';
import AuthenticateCompanyService from '../services/AuthenticateCompanyService';
import AuthenticateCostumerService from '../services/AuthenticateCostumerService';

const sessionsRouter = Router();

sessionsRouter.post('/companies', async (request, response) => {
    const { email, password } = request.body;

    const authenticateCompanyService = new AuthenticateCompanyService();

    const { company, token } = await authenticateCompanyService.execute({
        email,
        password,
    });

    delete company.password;

    return response.json({ company, token });
});

sessionsRouter.post('/costumers', async (request, response) => {
    const { email, password } = request.body;

    const authenticateCostumerService = new AuthenticateCostumerService();

    const { costumer, token } = await authenticateCostumerService.execute({
        email,
        password,
    });

    delete costumer.password;

    return response.json({ costumer, token });
});

export default sessionsRouter;
