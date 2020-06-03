import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';

import CreateCompanyService from './CreateCompanyService';

describe('CreateCompany', () => {
    it('should be able to create a company', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

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

        expect(company).toHaveProperty('id_company');
    });
    it('should not be able to create a company with cnpj already used by another', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createCompanyService = new CreateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );

        await createCompanyService.execute({
            cnpj: '123456',
            company_name: 'teste ltda',
            trade_name: 'testing',
            email: 'test@gmail.com',
            password: 'secretxd',
        });

        expect(
            createCompanyService.execute({
                cnpj: '123456',
                company_name: 'teste2 ltda',
                trade_name: 'testing2',
                email: 'test2@gmail.com',
                password: 'secretxd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a company with email already used by another', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createCompanyService = new CreateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );

        await createCompanyService.execute({
            cnpj: '123456',
            company_name: 'teste ltda',
            trade_name: 'testing',
            email: 'test@gmail.com',
            password: 'secretxd',
        });

        expect(
            createCompanyService.execute({
                cnpj: '654321',
                company_name: 'teste2 ltda',
                trade_name: 'testing2',
                email: 'test@gmail.com',
                password: 'secretxd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
