import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import FakeCompanyTokensRepository from '../repositories/fakes/FakeCompanyTokensRepository';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeCompanyTokensRepository: FakeCompanyTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeCompaniesRepository = new FakeCompaniesRepository();
        fakeCompanyTokensRepository = new FakeCompanyTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeCompaniesRepository,
            fakeCompanyTokensRepository,
            fakeHashProvider,
        );
    });
    it('should be able to reset the passoword', async () => {
        const company = await fakeCompaniesRepository.create({
            email: 'teste@gmail.com',
            trade_name: 'OffTalk',
            cnpj: '123',
            company_name: 'OffTalk LTDA',
            password: '123321',
        });
        const token = await fakeCompanyTokensRepository.generate(
            company.id_company,
        );

        const hash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token: token.token,
            password: '123123',
        });

        const updatedUser = await fakeCompaniesRepository.findById(
            company.id_company,
        );

        expect(hash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the passoword of a non-existing user', async () => {
        const token = await fakeCompanyTokensRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPasswordService.execute({
                token: token.token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more than 2 hours', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        const company = await fakeCompaniesRepository.create({
            email: 'teste@gmail.com',
            trade_name: 'OffTalk',
            cnpj: '123',
            company_name: 'OffTalk LTDA',
            password: '123321',
        });

        const token = await fakeCompanyTokensRepository.generate(
            company.id_company,
        );

        await expect(
            resetPasswordService.execute({
                token: token.token,
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
