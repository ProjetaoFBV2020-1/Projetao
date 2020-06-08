import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import FakeCompanyTokensRepository from '../repositories/fakes/FakeCompanyTokensRepository';

let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeMailProvider: FakeMailProvider;
let fakeCompanyTokensRepository: FakeCompanyTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeCompaniesRepository = new FakeCompaniesRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeCompanyTokensRepository = new FakeCompanyTokensRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeCompaniesRepository,
            fakeMailProvider,
            fakeCompanyTokensRepository,
        );
    });
    it('should be able to recover password with email', async () => {
        const sendmail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeCompaniesRepository.create({
            email: 'teste@gmail.com',
            trade_name: 'OffTalk',
            cnpj: '123',
            company_name: 'OffTalk LTDA',
            password: '123321',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(sendmail).toHaveBeenCalled();
    });
    it('should not be able to recover password with non-existing email', async () => {
        await expect(
            sendForgotPasswordEmailService.execute({
                email: 'non-existing-email@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(
            fakeCompanyTokensRepository,
            'generate',
        );

        const company = await fakeCompaniesRepository.create({
            email: 'teste@gmail.com',
            trade_name: 'OffTalk',
            cnpj: '123',
            company_name: 'OffTalk LTDA',
            password: '123321',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(company.id_company);
    });
});
