import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('addresses_company')
class AdressCompany {
    @PrimaryColumn()
    company_id: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    complement: string;

    @Column()
    reference: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default AdressCompany;
