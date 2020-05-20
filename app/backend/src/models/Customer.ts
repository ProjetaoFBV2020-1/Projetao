import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import AdressCostumer from './AdressCostumer';

@Entity('costumers')
class Customer {
    @PrimaryGeneratedColumn('uuid')
    id_customer: string;

    @Column()
    cpf: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    date_birth: Date;

    @Column()
    password: string;

    @Column()
    phone: string;

    @OneToMany(() => AdressCostumer, adress => adress.costumer_id)
    adresses: AdressCostumer[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}

export default Customer;
