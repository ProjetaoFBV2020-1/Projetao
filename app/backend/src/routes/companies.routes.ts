import Router from 'express';
import CreateCompanyService from '../services/CreateCompanyService';

const companiesRouter = Router();

companiesRouter.post('/', async (request, response) => {
    try {
        const {
            cnpj,
            company_name,
            trade_name,
            email,
            password,
            adress,
            phones,
        } = request.body;

        const createCompany = new CreateCompanyService();

        const { company, adressCompany } = await createCompany.execute({
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
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default companiesRouter;
