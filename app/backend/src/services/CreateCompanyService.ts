import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Company from '../models/Company';
import PhoneCompany from '../models/PhoneCompany';
import AdressCompany from '../models/AdressCompany';

interface Request {
    cnpj: string;
    company_name: string;
    trade_name: string;
    email: string;

    adress: AdressCompany;
    password: string;
    phones: PhoneCompany[];
}
interface Response {
    company: Company;
    adressCompany: AdressCompany;
}

class CreateCompanyService {
    public async execute({
        cnpj,
        company_name,
        trade_name,
        email,
        password,
        adress,
        phones,
    }: Request): Promise<Response> {
        const companyRepository = getRepository(Company);

        // Valida se já existe um mesmo cnpj cadastrado
        const sameCnpj = await companyRepository.findOne({
            where: { cnpj },
        });

        if (sameCnpj) {
            throw new AppError('cnpj already in use', 400);
        }

        // Valida se já existe um mesmo e-mail cadastrado
        const sameEmail = await companyRepository.findOne({ where: { email } });

        if (sameEmail) {
            throw new AppError('email already in use', 400);
        }

        const phoneCompanyRepository = getRepository(PhoneCompany);

        // Varre o array de telefones que está sendo enviado na request e verifica se tem algum igual dentro da requisição
        for (let i = 1; i < phones.length; i += 1) {
            if (phones[i].number === phones[i - 1].number) {
                throw new AppError('Equal phone numbers being inserted.');
            }
        }

        // Valida se já existe algum telefone no banco de dados, igual o que está tentando inserir
        phones.forEach(async phone => {
            const samePhone = await phoneCompanyRepository.findOne({
                where: `${phone.number}`,
            });
            if (samePhone) {
                throw new AppError(`${phone.number} is already in use`);
            }
        });

        const hashedPassword = await hash(password, 8);

        const company = companyRepository.create({
            cnpj,
            company_name,
            trade_name,
            email,
            password: hashedPassword,
        });

        await companyRepository.save(company);

        phones.forEach(async phone => {
            const phoneCompany = phoneCompanyRepository.create({
                company_id: company.id_company,
                number: phone.number,
                type: phone.type,
            });

            await phoneCompanyRepository.save(phoneCompany);
        });

        const adressRepository = getRepository(AdressCompany);

        const adressCompany = adressRepository.create({
            company_id: company.id_company,
            state: adress.state,
            street: adress.street,
            number: adress.number,
            neighborhood: adress.neighborhood,
            city: adress.city,
            reference: adress.reference,
            complement: adress.complement,
        });

        await adressRepository.save(adressCompany);

        return { company, adressCompany };
    }
}
export default CreateCompanyService;
