import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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
    whatsapp: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Company;
