import PhoneCompany from '../infra/typeorm/entities/PhoneCompany';
import AdressCompany from '../infra/typeorm/entities/AdressCompany';

export default interface ICreateCompanyDTO {
    cnpj: string;
    company_name: string;
    trade_name: string;
    email: string;
    adress: AdressCompany;
    password: string;
    phones: PhoneCompany[];
}
