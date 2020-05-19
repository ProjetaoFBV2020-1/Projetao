import { uuid } from 'uuidv4';
import { Timestamp } from 'typeorm';

class Customer {
    id_customer: string;

    cpf: string;

    name: string;

    email: string;

    date_birth: Date;

    password: string;

    created_at: Date;

    modified_at: Date;

    constructor({
        cpf,
        name,
        email,
        date_birth,
        password,
    }: Omit<Customer, 'id_customer, created_at, modified_at'>) {
        this.id_customer = uuid();
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.date_birth = date_birth;
        this.password = password;
        this.created_at = ;
        this.modified_at = ;

    }
}

export default Customer
