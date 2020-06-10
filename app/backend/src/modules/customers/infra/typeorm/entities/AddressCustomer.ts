import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addresses_customer')
class AddressCustomer {
    @PrimaryGeneratedColumn('uuid')
    id_address_customer: string;

    @Column()
    customer_id: string;

    @Column()
    cep: string;

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

export default AddressCustomer;
