import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Order_item from './Order_item';

@Entity('ordens')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id_order: string;

    @Column()
    status: string;

    @OneToMany(type => Order_item, order_item => ordem_item.order_id)
    order_itens: Order_item[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
