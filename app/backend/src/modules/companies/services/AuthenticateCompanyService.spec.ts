import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';

import CreateCompanyService from './CreateCompanyService';
import AuthenticateCompanyService from './AuthenticateCompanyService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createCompanyService = new CreateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );
        const authenticateCompanyService = new AuthenticateCompanyService(
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

        const response = await authenticateCompanyService.execute({
            email: 'test@gmail.com',
            password: 'secretxd',
        });

        expect(response).toHaveProperty('token');
        expect(response.company).toEqual(company);
    });
    it('should not be able to authenticate with a non existing email', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateCompanyService = new AuthenticateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );

        expect(
            authenticateCompanyService.execute({
                email: 'non-existing-email',
                password: 'secretxd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with a non existing email', async () => {
        const fakeCompaniesRepository = new FakeCompaniesRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createCompanyService = new CreateCompanyService(
            fakeCompaniesRepository,
            fakeHashProvider,
        );
        const authenticateCompanyService = new AuthenticateCompanyService(
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
            authenticateCompanyService.execute({
                email: 'test@gmail.com',
                password: 'wrongPassword',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
