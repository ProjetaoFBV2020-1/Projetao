import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('adresses_company')
class AdressCompany {
    @Column()
    company_id: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    reference: string;

    @Column()
    complement: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default AdressCompany;
