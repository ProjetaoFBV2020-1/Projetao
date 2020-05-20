import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import PhoneCompany from './PhoneCompany';

@Entity('companies')
class Company {
    @PrimaryGeneratedColumn('uuid')
    id_company: string;

    @Column()
    cnpj: string;

    @Column()
    companyName: string;

    @Column()
    tradeName: string;

    @Column()
    email: string;

    @Column()
    adress: string;

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
