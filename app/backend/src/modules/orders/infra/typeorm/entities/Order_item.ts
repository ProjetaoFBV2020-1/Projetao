import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import Order from './Order';

@Entity('order_items')
class Order_item {
    @PrimaryGeneratedColumn('uuid')
    id_order_item: string;

    @Column()
    order_id: string;

    @Column()
    item_id: string;

    @Column()
    quantity: number;

    @Column()
    item_value: number;

    @Column()
    name: string;

    @Column()
    total_value: number;

    @Column()
    description: string;

    // @ManyToOne(() => Order, order => order.id_order)

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order_item;
