import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import AdressCostumer from './AdressCostumer';

@Entity('customers')
class Customer {
    @PrimaryGeneratedColumn('uuid')
    id_customer: string;

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

    @OneToMany(() => AdressCostumer, adress => adress.customer_id)
    adresses: AdressCostumer[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Customer;
