import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;
}

export default Customer;
