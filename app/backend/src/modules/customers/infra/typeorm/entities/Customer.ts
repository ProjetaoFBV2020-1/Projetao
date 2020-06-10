import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import AddressCustomer from './AddressCustomer';

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
    avatar: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    inactive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Order, orders => orders.customer_id)
    orders: Order;

    @OneToMany(
        () => AddressCustomer,
        addresses_customer => addresses_customer.customer_id,
    )
    adresses: AddressCustomer[];
}

export default Customer;
