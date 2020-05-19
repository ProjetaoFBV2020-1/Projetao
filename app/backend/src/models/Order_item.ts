import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ordens')
class Order_item {
    @Column()
    order_id: string;

    @Column()
    item_id: string;

    @Column()
    valor_prato: number;

    @Column()
    valor_total: number;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order_item;
