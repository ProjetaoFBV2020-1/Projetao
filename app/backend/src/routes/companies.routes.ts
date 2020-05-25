import { Router } from 'express';

// import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

// import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateCompanyService from '../services/CreateCompanyService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const companiesRouter = Router();

// appointmentsRouter.use(ensureAuthenticated);

companiesRouter.post('/', async (request, response) => {
    const {
        cnpj,
        company_name,
        trade_name,
        email,
        password,
        adress,
        phones,
    } = request.body;

    const createCompanyService = new CreateCompanyService();

    const { company, adressCompany } = await createCompanyService.execute({
        cnpj,
        company_name,
        trade_name,
        email,
        password,
        phones,
        adress,
    });

    delete company.password;

    return response.json({ company, adressCompany });
});

export default companiesRouter;
