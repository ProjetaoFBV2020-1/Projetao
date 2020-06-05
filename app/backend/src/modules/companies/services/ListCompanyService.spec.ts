import 'reflect-metadata';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from './CreateCompanyService';
import ListCompanyService from './ListCompanyService';

describe('ListCompany', () => {
    it('should be able to list all companies', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const listCompanyService = new ListCompanyService(
            fakeCompaniesRepository,
        );

        const createCompanyService = new CreateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );

        const company = await createCompanyService.execute({
            cnpj: '123456',
            company_name: 'teste ltda',
            trade_name: 'testing',
            email: 'test@gmail.com',
            password: 'secretxd',
        });

        const company2 = await createCompanyService.execute({
            cnpj: '321321',
            company_name: 'teste 2 ltda',
            trade_name: 'testing 2',
            email: 'test2@gmail.com',
            password: 'secretxd',
        });

        const companies = await listCompanyService.execute();

        expect(companies).toContain(company);
        expect(companies).toContain(company2);
    });
});
