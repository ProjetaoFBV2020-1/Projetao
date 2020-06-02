import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('address_order')
class AdressOrder {
    @PrimaryColumn()
    order_id: string;

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

export default AdressOrder;
