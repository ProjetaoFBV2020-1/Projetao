import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import PhoneCompany from './PhoneCompany';
import AdressCompany from './AdressCompany';

@Entity('companies')
class Company {
    @PrimaryGeneratedColumn('uuid')
    id_company: string;

    @Column()
    cnpj: string;

    @Column()
    company_name: string;

    @Column()
    trade_name: string;

    @Column()
    email: string;

    @OneToOne(() => AdressCompany, adress => adress.company_id)
    adresses: AdressCompany;

    @OneToMany(() => PhoneCompany, phone => phone.company_id)
    phones: PhoneCompany[];

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Company;
