import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Order_item from './Order_item';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id_order: string;

    @Column()
    company_id: string;

    @Column()
    customer_id: string;

    @Column()
    company_name: string;

    @Column()
    customer_name: string;

    @Column()
    status: string;

    @Column()
    description: string;

    @Column()
    total_value: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Order_item, order_item => order_item.order_id)
    order_items: Order_item[];
}

export default Order;
