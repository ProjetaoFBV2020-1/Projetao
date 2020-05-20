import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('adresses_costumer')
class AdressCostumer {
    @Column()
    costumer_id: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    reference: string;

    @Column()
    complement: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default AdressCostumer;
