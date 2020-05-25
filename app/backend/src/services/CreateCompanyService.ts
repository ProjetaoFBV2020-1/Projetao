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
        const sameCnpj = await companyRepository.findOne({ where: cnpj });

        if (sameCnpj) {
            throw new AppError('cnpj already in use', 400);
        }

        const sameEmail = await companyRepository.findOne({ where: email });

        if (sameEmail) {
            throw new AppError('email already in use', 400);
        }

        const phoneCompanyRepository = getRepository(PhoneCompany);

        phones.forEach(async phone => {
            const samePhone = await phoneCompanyRepository.findOne({
                where: phone.number,
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
