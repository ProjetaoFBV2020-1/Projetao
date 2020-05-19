import { uuid } from 'uuidv4';
import { Timestamp } from 'typeorm';

class Company {
    idCompany: string;

    cnpj: string;

    companyName: string;

    tradeName: string;

    email: string;

    whatsapp: string;

    password: string;

    createdAt: Timestamp;

    modifiedAt: Timestamp;

    constructor({
        cnpj,
        companyName,
        tradeName,
        email,
        whatsapp,
        password,
    }: Omit<Company, 'id_company, created_at, modified_at'>) {
        this.idCompany = uuid();
        this.cnpj = cnpj;
        this.companyName = companyName;
        this.tradeName = tradeName;
        this.email = email;
        this.whatsapp = whatsapp;
        this.password = password;
        this.createdAt = ;
        this.modifiedAt = ;
    }
}
