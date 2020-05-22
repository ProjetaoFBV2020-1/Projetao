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
    status: string;

    @OneToMany(() => Order_item, order_item => order_item.order_id)
    order_items: Order_item[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
