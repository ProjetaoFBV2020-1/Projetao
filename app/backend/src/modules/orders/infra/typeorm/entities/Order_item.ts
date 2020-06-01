import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('order_items')
class Order_item {
    @PrimaryColumn()
    order_id: string;

    @Column()
    item_id: string;

    @Column()
    item_value: number;

    @Column()
    total_value: number;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order_item;
