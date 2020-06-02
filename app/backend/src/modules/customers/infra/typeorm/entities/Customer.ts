import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import AdressCustomer from './AdressCustomer';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Order, orders => orders.customer_id)
    orders: Order;

    @OneToMany(
        () => AdressCustomer,
        adresses_customer => adresses_customer.customer_id,
    )
    adresses: AdressCustomer[];
}

export default Customer;
